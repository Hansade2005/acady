'use client';

import React from 'react';
import { getTheme, type ThemeName } from '@/lib/themes';

interface SkillPassportData {
  name: string;
  roleSeeking: string;
  locationPreference: string;
  hardSkillsScore: number;
  softSkillsScore: number;
  languages: { language: string; proficiency: string }[];
  availability: string;
  readinessTier: string;
  statusId: string;
  lastUpdated: string;
  careerHighlights: string[];
  education?: { degree: string; institution: string; year: string }[];
  experience?: { position: string; company: string; duration: string; description: string }[];
  skills?: { hardSkills: string[]; softSkills: string[] };
}

interface SkillPassportDisplayProps {
  data: SkillPassportData;
  themeName?: ThemeName;
}

export default function SkillPassportDisplay({ data, themeName = 'default' }: SkillPassportDisplayProps) {
  const theme = getTheme(themeName);

  return (
    <div
      className={`max-w-4xl mx-auto ${theme.colors.background} ${theme.shadow} ${theme.borderRadius} ${theme.spacing.cardPadding} font-['Poppins']`}
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        borderColor: theme.colors.border,
      }}
    >
      <div className="text-center mb-8">
        <h1
          className={`${theme.fonts.heading} mb-2`}
          style={{ color: theme.colors.primary }}
        >
          3a SKILL PASSPORT™
        </h1>
        <div
          className="w-16 h-1 mx-auto"
          style={{ backgroundColor: theme.colors.primary }}
        ></div>
      </div>

      <section className={theme.spacing.sectionGap}>
        <h2 className={`${theme.fonts.heading} mb-4 flex items-center`} style={{ color: theme.colors.text }}>
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
          </svg>
          CANDIDATE BACKGROUND
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p style={{ color: theme.colors.text }}><strong>Name:</strong> {data.name}</p>
            <p style={{ color: theme.colors.text }}><strong>Role Seeking:</strong> {data.roleSeeking}</p>
            <p style={{ color: theme.colors.text }}><strong>Location Preference:</strong> {data.locationPreference}</p>
          </div>
          <div>
            <p style={{ color: theme.colors.text }}><strong>Hard Skills Score:</strong> {data.hardSkillsScore}%</p>
            <div className="progress-bar mb-2" style={{ borderColor: theme.colors.border }}>
              <div
                className="progress-fill"
                style={{ width: `${data.hardSkillsScore}%`, backgroundColor: theme.colors.primary }}
              ></div>
            </div>
            <p style={{ color: theme.colors.text }}><strong>Soft Skills Score:</strong> {data.softSkillsScore}%</p>
            <div className="progress-bar mb-2" style={{ borderColor: theme.colors.border }}>
              <div
                className="progress-fill"
                style={{ width: `${data.softSkillsScore}%`, backgroundColor: theme.colors.accent }}
              ></div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p style={{ color: theme.colors.text }}>
            <strong>Languages:</strong> {data.languages.map(l => `${l.language} (${l.proficiency})`).join(', ') || 'Not specified'}
          </p>
          <p style={{ color: theme.colors.text }}><strong>Availability:</strong> {data.availability}</p>
          <p style={{ color: theme.colors.text }}><strong>Readiness Tier:</strong> {data.readinessTier}</p>
        </div>
        <div
          className="mt-4 p-4 rounded-lg"
          style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
        >
          <p style={{ color: theme.colors.text }}>
            <strong>3a Skill Passport Status:</strong> {data.statusId} | Verified & Active | Last Updated: {data.lastUpdated}
          </p>
        </div>
      </section>

      {data.skills && (
        <section className={theme.spacing.sectionGap}>
          <h2 className={`${theme.fonts.heading} mb-4 flex items-center`} style={{ color: theme.colors.text }}>
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd"></path>
            </svg>
            SKILLS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2" style={{ color: theme.colors.text }}>Hard Skills</h3>
              <ul className="space-y-1">
                {data.skills.hardSkills.map((skill, index) => (
                  <li key={index} className="flex items-start" style={{ color: theme.colors.text }}>
                    <span className="mr-2" style={{ color: theme.colors.primary }}>•</span>{skill}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2" style={{ color: theme.colors.text }}>Soft Skills</h3>
              <ul className="space-y-1">
                {data.skills.softSkills.map((skill, index) => (
                  <li key={index} className="flex items-start" style={{ color: theme.colors.text }}>
                    <span className="mr-2" style={{ color: theme.colors.primary }}>•</span>{skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section className={theme.spacing.sectionGap}>
          <h2 className={`${theme.fonts.heading} mb-4 flex items-center`} style={{ color: theme.colors.text }}>
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path>
            </svg>
            EXPERIENCE
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="pl-4"
                style={{ borderLeftColor: theme.colors.primary, borderLeftWidth: '4px' }}
              >
                <h3 className="font-semibold" style={{ color: theme.colors.text }}>{exp.position}</h3>
                <p style={{ color: theme.colors.textSecondary }}>{exp.company} | {exp.duration}</p>
                <p className="mt-2" style={{ color: theme.colors.text }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section className={theme.spacing.sectionGap}>
          <h2 className={`${theme.fonts.heading} mb-4 flex items-center`} style={{ color: theme.colors.text }}>
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
            </svg>
            EDUCATION
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div
                key={index}
                className="pl-4"
                style={{ borderLeftColor: theme.colors.primary, borderLeftWidth: '4px' }}
              >
                <h3 className="font-semibold" style={{ color: theme.colors.text }}>{edu.degree}</h3>
                <p style={{ color: theme.colors.textSecondary }}>{edu.institution} | {edu.year}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className={`${theme.fonts.heading} mb-4 flex items-center`} style={{ color: theme.colors.text }}>
          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path>
          </svg>
          CAREER HIGHLIGHTS
        </h2>
        <ul className="space-y-2">
          {data.careerHighlights.map((highlight, index) => (
            <li key={index} className="flex items-start" style={{ color: theme.colors.text }}>
              <span className="mr-2" style={{ color: theme.colors.primary }}>•</span>{highlight}
            </li>
          ))}
        </ul>
      </section>

      <style jsx>{`
        .progress-bar {
          height: 8px;
          background-color: ${theme.colors.surface};
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          transition: width 0.3s ease;
        }
      `}</style>
    </div>
  );
}