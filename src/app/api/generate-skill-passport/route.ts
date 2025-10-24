import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const SkillPassportSchema = z.object({
  name: z.string(),
  roleSeeking: z.string(),
  locationPreference: z.string(),
  hardSkillsScore: z.number().min(0).max(100),
  softSkillsScore: z.number().min(0).max(100),
  languages: z.array(z.object({
    language: z.string(),
    proficiency: z.string(),
  })),
  availability: z.string(),
  readinessTier: z.string(),
  statusId: z.string(),
  lastUpdated: z.string(),
  careerHighlights: z.array(z.string()),
  education: z.array(z.object({
    degree: z.string(),
    institution: z.string(),
    year: z.string(),
  })).optional(),
  experience: z.array(z.object({
    position: z.string(),
    company: z.string(),
    duration: z.string(),
    description: z.string(),
  })).optional(),
  skills: z.object({
    hardSkills: z.array(z.string()),
    softSkills: z.array(z.string()),
  }).optional(),
});

type SkillPassportData = z.infer<typeof SkillPassportSchema>;

const callLLM = async (text: string): Promise<SkillPassportData> => {
  const schemaDescription = JSON.stringify({
    name: "string",
    roleSeeking: "string",
    locationPreference: "string",
    hardSkillsScore: "number (0-100)",
    softSkillsScore: "number (0-100)",
    languages: "array of objects with {language: string, proficiency: string}",
    availability: "string",
    readinessTier: "string",
    statusId: "string",
    lastUpdated: "string",
    careerHighlights: "array of strings",
    education: "optional array of objects with {degree: string, institution: string, year: string}",
    experience: "optional array of objects with {position: string, company: string, duration: string, description: string}",
    skills: "optional object with {hardSkills: array of strings, softSkills: array of strings}"
  }, null, 2);

  const prompt = `Extract and structure the following CV text into a skill passport JSON. Use this exact schema format:

${schemaDescription}

If information is not available, infer reasonably or use defaults. Output only valid JSON matching the schema.

CV Text:
${text}`;

  const response = await fetch('https://api.a0.dev/ai/llm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [
        {
          role: 'system',
          content: `You are an AI that extracts structured data from CVs for skill passports. Always output valid JSON that matches the provided Zod schema exactly. Do not include any extra text, only the JSON object.`,
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.1,
      max_tokens: 1500,
    }),
  });

  if (!response.ok) throw new Error('LLM API error');

  const data = await response.json();
  const content = data.completion || '{}';

  // Parse the response following the chatbot way: get completion and try to parse JSON
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const parsedContent = jsonMatch ? jsonMatch[0] : content;
    const parsed = SkillPassportSchema.safeParse(JSON.parse(parsedContent));
    if (parsed.success) {
      return parsed.data;
    } else {
      console.error('Zod validation failed:', parsed.error);
      throw new Error('Invalid JSON structure');
    }
  } catch (error) {
    console.error('Error parsing LLM response:', error);
    // Return default data if parsing fails
    return {
      name: 'Unknown',
      roleSeeking: 'Not specified',
      locationPreference: 'Not specified',
      hardSkillsScore: 0,
      softSkillsScore: 0,
      languages: [],
      availability: 'Not specified',
      readinessTier: 'Not specified',
      statusId: '3A-SP-2025-XXXX',
      lastUpdated: new Date().toLocaleString('en-US', {
        month: 'short',
        year: 'numeric',
      }),
      careerHighlights: [],
    };
  }
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const extractedText = formData.get('manualData') as string;

    if (!extractedText) {
      return NextResponse.json({ error: 'No manual data provided.' }, { status: 400 });
    }

    const structuredData = await callLLM(extractedText);

    return NextResponse.json({ data: structuredData });
  } catch (err: any) {
    console.error('Error generating skill passport:', err);
    return NextResponse.json({ error: 'Failed to generate skill passport.' }, { status: 500 });
  }
}