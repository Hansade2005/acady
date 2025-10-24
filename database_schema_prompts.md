# 📋 Database Schema Prompts for Skill Passport App

## Important Instructions for Pipilot AI
When implementing features that require database tables, provide these exact prompts to the user so they can create the tables using the Pipilot schema generator. The prompts must be detailed with exact field names, types, relationships, and constraints.

---

## 1. User Preferences Table
**Table Name:** user_preferences

**Purpose:** Store user settings like theme preferences, privacy settings, etc.

**Prompt for Schema Generator:**
```
Create a table called "user_preferences" with the following structure:
- user_id: UUID, foreign key to users table (required, unique)
- theme: TEXT, default 'default' (options: 'default', 'minimalist', 'creative', 'corporate', 'dark')
- privacy_settings: JSONB, default {'profile_public': false, 'skills_public': true, 'endorsements_public': true}
- notification_settings: JSONB, default {'endorsement_requests': true, 'portfolio_updates': true, 'analytics_updates': false}
- created_at: TIMESTAMP WITH TIME ZONE, default now()
- updated_at: TIMESTAMP WITH TIME ZONE, default now()

Add indexes on:
- user_id (unique)
- theme

Add trigger to update updated_at on row changes.
```

---

## 2. Skill Passports Table
**Table Name:** skill_passports

**Purpose:** Store generated skill passport data for each user.

**Prompt for Schema Generator:**
```
Create a table called "skill_passports" with the following structure:
- id: UUID, primary key
- user_id: UUID, foreign key to users table (required)
- title: TEXT, required
- summary: TEXT
- skills: JSONB (array of skill objects with name, level, category)
- experience: JSONB (array of experience objects with company, role, duration, achievements)
- education: JSONB (array of education objects with institution, degree, year)
- certifications: JSONB (array of certification objects)
- raw_content: TEXT (original extracted text from CV)
- is_public: BOOLEAN, default true
- view_count: INTEGER, default 0
- share_count: INTEGER, default 0
- created_at: TIMESTAMP WITH TIME ZONE, default now()
- updated_at: TIMESTAMP WITH TIME ZONE, default now()

Add indexes on:
- user_id
- is_public
- created_at

Add trigger to update updated_at on row changes.
```

---

## 3. Analytics Events Table
**Table Name:** analytics_events

**Purpose:** Track views, shares, and other interactions with skill passports.

**Prompt for Schema Generator:**
```
Create a table called "analytics_events" with the following structure:
- id: UUID, primary key
- passport_id: UUID, foreign key to skill_passports table (required)
- user_id: UUID, foreign key to users table (the viewer, nullable for anonymous views)
- event_type: TEXT, required (options: 'view', 'share', 'download', 'endorse')
- metadata: JSONB (additional data like share_platform, referrer, etc.)
- ip_address: INET (for analytics, anonymized)
- user_agent: TEXT
- created_at: TIMESTAMP WITH TIME ZONE, default now()

Add indexes on:
- passport_id
- user_id
- event_type
- created_at

Add foreign key constraints with cascade delete.
```

---

## 4. Endorsements Table
**Table Name:** endorsements

**Purpose:** Store skill endorsements between users.

**Prompt for Schema Generator:**
```
Create a table called "endorsements" with the following structure:
- id: UUID, primary key
- endorser_id: UUID, foreign key to users table (who is endorsing)
- endorsee_id: UUID, foreign key to users table (who is being endorsed)
- passport_id: UUID, foreign key to skill_passports table (which passport is endorsed)
- skill_name: TEXT, required
- endorsement_text: TEXT
- endorsement_level: INTEGER (1-5 stars)
- is_verified: BOOLEAN, default false (for future verification features)
- created_at: TIMESTAMP WITH TIME ZONE, default now()
- updated_at: TIMESTAMP WITH TIME ZONE, default now()

Add unique constraint on (endorser_id, endorsee_id, skill_name) to prevent duplicate endorsements.
Add indexes on:
- endorser_id
- endorsee_id
- passport_id
- skill_name

Add trigger to update updated_at on row changes.
Add foreign key constraints with cascade delete.
```

---

## 5. Portfolio Links Table
**Table Name:** portfolio_links

**Purpose:** Store external links like GitHub, LinkedIn, personal websites.

**Prompt for Schema Generator:**
```
Create a table called "portfolio_links" with the following structure:
- id: UUID, primary key
- user_id: UUID, foreign key to users table (required, unique per user per type)
- link_type: TEXT, required (options: 'github', 'linkedin', 'website', 'behance', 'dribbble', 'twitter')
- url: TEXT, required (must be valid URL)
- is_verified: BOOLEAN, default false
- last_synced_at: TIMESTAMP WITH TIME ZONE
- metadata: JSONB (sync status, repo count, etc.)
- created_at: TIMESTAMP WITH TIME ZONE, default now()
- updated_at: TIMESTAMP WITH TIME ZONE, default now()

Add unique constraint on (user_id, link_type).
Add indexes on:
- user_id
- link_type
- is_verified

Add trigger to update updated_at on row changes.
Add foreign key constraints with cascade delete.
```

---

## Additional Tables (Future Features)

## 6. Endorsement Requests Table
**Table Name:** endorsement_requests

**Purpose:** Track pending endorsement requests.

**Prompt for Schema Generator:**
```
Create a table called "endorsement_requests" with the following structure:
- id: UUID, primary key
- requester_id: UUID, foreign key to users table (who is requesting)
- requestee_id: UUID, foreign key to users table (who is being asked)
- skill_name: TEXT, required
- message: TEXT
- status: TEXT, default 'pending' (options: 'pending', 'accepted', 'declined', 'expired')
- expires_at: TIMESTAMP WITH TIME ZONE, default (now() + interval '7 days')
- created_at: TIMESTAMP WITH TIME ZONE, default now()
- updated_at: TIMESTAMP WITH TIME ZONE, default now()

Add indexes on:
- requester_id
- requestee_id
- status
- expires_at

Add trigger to update updated_at on row changes.
Add foreign key constraints with cascade delete.
```

---

## Instructions for User:
1. Go to your pipilot.dev dashboard
2. Navigate to Database > Schema Generator
3. Copy and paste each prompt above to create the tables
4. Note down the table IDs for use in your app
5. Update your environment variables with the new table IDs