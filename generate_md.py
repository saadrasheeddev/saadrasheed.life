import os

projects = [
    {
        'slug': 'email-to-task-routing',
        'title': 'Stop Losing Tasks in Messy Email Threads',
        'category': 'Operations Automation',
        'description': 'Turn internal email comments into fully categorized, prioritized, and assigned Asana tasks instantly.',
        'hook': 'Tired of client requests falling through the cracks because your team is overwhelmed by their inbox?',
        'tags': ['FrontApp', 'n8n', 'Asana', 'Claude AI'],
        'gradient': 'from-emerald-500/30 via-teal-500/20 to-cyan-500/20',
        'order': 1,
        'body': '## Problem\nInternal email comments were getting lost, tasks were created too late, and urgent items weren\'t prioritized.\n\n## Solution & Flow\nTurn internal email comments into fully categorized, prioritized, and assigned Asana tasks instantly. A team member leaves a comment in a FrontApp shared thread with an emoji prefix. n8n catches the webhook, Claude AI parses the text, looks up the @mentioned user, and instantly creates an Asana task.\n\n## Tech Stack\nFrontApp, n8n, Asana, Claude AI'
    },
    {
        'slug': 'ai-receptionist',
        'title': 'A Voice Agent That Never Misses a Call',
        'category': 'Lead Conversion',
        'description': 'Answers inbound calls, qualifies leads with custom questions, and books confirmed meetings onto your calendar — no human input required.',
        'hook': 'How many high-value clients are you losing simply because no one picked up after hours?',
        'tags': ['VAPI', 'n8n', 'Calendly'],
        'gradient': 'from-blue-500/30 via-indigo-500/20 to-purple-500/20',
        'order': 2,
        'body': '## Problem\nHigh-value inbound calls went unanswered after hours, and sales reps wasted hours repeating qualifying questions.\n\n## Solution & Flow\nAnswers inbound calls, qualifies leads with custom questions, and books confirmed meetings onto your calendar — no human input required. The AI agent picks up any time, asks targeted questions, checks live Calendly availability via n8n, and books a confirmed meeting while sending an automatic calendar invite.\n\n## Tech Stack\nVAPI, n8n, Calendly'
    },
    {
        'slug': 'customer-database-builder',
        'title': 'Log Every Caller & Build Your Marketing Database',
        'category': 'Customer Database Builder',
        'description': 'A 24/7 AI phone system that answers inbound calls, logs every customer into your CRM, and builds a database ready for future marketing campaigns.',
        'hook': 'What if every person who called your store was automatically saved, ready for your next campaign?',
        'tags': ['VAPI', 'n8n', 'Vtiger CRM', 'Telegram'],
        'gradient': 'from-orange-500/30 via-amber-500/20 to-rose-500/20',
        'order': 3,
        'body': '## Problem\nDozens of missed calls daily resulting in zero caller capture, no CRM data, and manual SMS follow-up.\n\n## Solution & Flow\nA 24/7 AI phone system that answers inbound calls, logs every customer into your CRM, and builds a database ready for future marketing campaigns. n8n writes the data to Vtiger CRM, triggers a follow-up text, and logs a call summary into a dedicated Telegram channel where the team can reply.\n\n## Tech Stack\nVAPI, n8n, Vtiger CRM, Telegram'
    },
    {
        'slug': 'self-serve-data-chatbot',
        'title': 'Talk to Your Database in Plain English',
        'category': 'Business Intelligence',
        'description': 'Ask questions on Telegram or Slack and get formatted answers, charts, and downloadable Excel reports instantly. No SQL required.',
        'hook': 'Tired of waiting days for a developer just to run a simple data report?',
        'tags': ['Supabase', 'PostgreSQL', 'LLM', 'Telegram'],
        'gradient': 'from-purple-500/30 via-fuchsia-500/20 to-violet-500/20',
        'order': 4,
        'body': '## Problem\nNon-technical team members couldn\'t query data without waiting days for a developer to run SQL reports.\n\n## Solution & Flow\nAsk questions on Telegram or Slack and get formatted answers, charts, and downloadable Excel reports instantly. No SQL required. Multiple LLM calls convert natural language into a safe SQL query, run it against Supabase, and return a formatted answer along with a downloadable Excel report.\n\n## Tech Stack\nSupabase, PostgreSQL, LLM, Telegram'
    },
    {
        'slug': 'one-click-content-engine',
        'title': 'Scale Your Content Without Scaling Your Team',
        'category': 'Content Automation',
        'description': 'Enter a topic in Google Sheets and instantly generate a full video script, aligned voiceover, and YouTube description in your Drive.',
        'hook': 'How much time are you wasting formatting scripts instead of actually recording content?',
        'tags': ['Google Sheets', 'Apps Script', 'LLM', 'Google Drive'],
        'gradient': 'from-amber-500/30 via-yellow-500/20 to-orange-500/20',
        'order': 5,
        'body': '## Problem\nContent creators wasted hours manually formatting video scripts, voiceovers, and YouTube descriptions.\n\n## Solution & Flow\nEnter a topic in Google Sheets and instantly generate a full video script, aligned voiceover, and YouTube description in your Drive. Apps Script triggers an LLM to generate the documents in parallel, saving all formatted documents directly to Google Drive.\n\n## Tech Stack\nGoogle Sheets, Apps Script, LLM, Google Drive'
    },
    {
        'slug': 'instant-contract-review',
        'title': 'Detect Contract Risks in Seconds, Not Days',
        'category': 'Legal Risk Mitigation',
        'description': 'Upload any NDA to surface missing clauses, ambiguous language, and risky terms — complete with suggested rewrites inserted as Word comments.',
        'hook': 'Are you signing agreements blindly because professional legal review takes too long and costs too much?',
        'tags': ['Google Forms', 'Apps Script', 'LLM', 'Word API'],
        'gradient': 'from-emerald-500/30 via-green-500/20 to-teal-500/20',
        'order': 6,
        'body': '## Problem\nBusinesses signed NDAs blindly because professional legal review was too slow and expensive.\n\n## Solution & Flow\nUpload any NDA to surface missing clauses, ambiguous language, and risky terms — complete with suggested rewrites inserted as Word comments. Apps Script extracts the text from Google Forms, an LLM identifies gaps, and a revised Word document is returned with tracked comments.\n\n## Tech Stack\nGoogle Forms, Apps Script, LLM, Word API'
    },
    {
        'slug': 'lost-lead-recovery',
        'title': 'Recover Visitors Who Leave Without Booking',
        'category': 'Revenue Recovery',
        'description': 'Capture visitor emails before they bounce, detect incomplete bookings, and trigger a personalized follow-up sequence automatically.',
        'hook': 'How many potential clients browse your portfolio, love your work, but leave without ever saying hello?',
        'tags': ['Zapier', 'System.io', 'Calendly'],
        'gradient': 'from-pink-500/30 via-rose-500/20 to-fuchsia-500/20',
        'order': 7,
        'body': '## Problem\nInterested visitors browsed the portfolio but bounced before booking a Calendly slot, leading to lost revenue.\n\n## Solution & Flow\nCapture visitor emails before they bounce, detect incomplete bookings, and trigger a personalized follow-up sequence automatically. A pop-up captures email, Zapier checks Calendly, and System.io automatically sends a sequence to recover them.\n\n## Tech Stack\nZapier, System.io, Calendly'
    },
    {
        'slug': 'zero-shoot-e-commerce',
        'title': 'Studio-Quality Photos Without the Photoshoot',
        'category': 'E-Commerce AI',
        'description': 'Upload clothing flats, pick an AI model, and generate realistic styled product photos instantly — ready for your store.',
        'hook': 'Is expensive studio photography delaying your product launches and eating into your margins?',
        'tags': ['Supabase', 'Nano Banana AI', 'Web Interface'],
        'gradient': 'from-sky-500/30 via-cyan-500/20 to-blue-500/20',
        'order': 8,
        'body': '## Problem\nExpensive, slow studio photoshoots delayed product launches and ate into margins.\n\n## Solution & Flow\nUpload clothing flats, pick an AI model, and generate realistic styled product photos instantly — ready for your store. The Nano Banana AI engine processes the garment-model combination and instantly returns a realistic styled photo.\n\n## Tech Stack\nSupabase, Nano Banana AI, Web Interface'
    }
]

for p in projects:
    filepath = os.path.join('astro-migration/src/content/projects', p['slug'] + '.md')
    tags_str = '["' + '", "'.join(p['tags']) + '"]'
    content = f"""---
title: "{p['title']}"
category: "{p['category']}"
description: "{p['description']}"
hook: "{p['hook']}"
tags: {tags_str}
gradient: "{p['gradient']}"
order: {p['order']}
---

{p['body']}
"""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
