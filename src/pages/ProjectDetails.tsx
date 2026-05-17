import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import './ProjectDetails.css';

const ProjectDetails = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('s1');

  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace('#', '');
      if (hash.startsWith('s') && parseInt(hash.substring(1)) >= 1 && parseInt(hash.substring(1)) <= 8) {
        setActiveTab(hash);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    window.location.hash = tabId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="project-details-page flex-grow pt-20">
        {/* The content */}
        
{/* PROJECT TABS */}
<div className="tabnav">
  <div className={`tab ${activeTab === 's1' ? 'active' : ''}`} onClick={() => handleTabClick('s1')}>Email-to-Task Routing</div>
  <div className={`tab ${activeTab === 's2' ? 'active' : ''}`} onClick={() => handleTabClick('s2')}>24/7 AI Receptionist</div>
  <div className={`tab ${activeTab === 's3' ? 'active' : ''}`} onClick={() => handleTabClick('s3')}>24/7 Call Logging &amp; CRM</div>
  <div className={`tab ${activeTab === 's4' ? 'active' : ''}`} onClick={() => handleTabClick('s4')}>Self-Serve Data Chatbot</div>
  <div className={`tab ${activeTab === 's5' ? 'active' : ''}`} onClick={() => handleTabClick('s5')}>One-Click Content Engine</div>
  <div className={`tab ${activeTab === 's6' ? 'active' : ''}`} onClick={() => handleTabClick('s6')}>Instant Contract Review</div>
  <div className={`tab ${activeTab === 's7' ? 'active' : ''}`} onClick={() => handleTabClick('s7')}>Lost Lead Recovery</div>
  <div className={`tab ${activeTab === 's8' ? 'active' : ''}`} onClick={() => handleTabClick('s8')}>Zero-Shoot E-Commerce</div>
</div>


{/* ═══════════════════════════════════════════════════════════
     PROJECT 1 — FrontApp → Asana
═══════════════════════════════════════════════════════════ */}
<section id="s1" className={activeTab === 's1' ? 'visible' : ''}>
<div className="hero" data-accent="teal">
  <div className="hero-tag ac-teal">Operations Automation</div>
  <h1>Stop Losing Tasks in<br /><strong>Messy Email Threads</strong></h1>
  <p>Turn internal email comments into fully categorized, prioritized, and assigned Asana tasks instantly.</p>
  <p className="hook">"Tired of client requests falling through the cracks because your team is overwhelmed by their inbox?"</p>
  <div className="pills">
    <span className="pill ac-teal">FrontApp</span><span className="pill">n8n</span><span className="pill">Asana</span><span className="pill ac-teal">Claude AI</span>
  </div>
</div>
<div className="content">

  <div className="divider"><span>The Problem</span><div className="line"></div></div>
  <div className="prob-grid">
    <div className="prob-card"><div className="prob-icon">🧊</div><h3>Leads go cold</h3><p>Tasks created too late because no one saw the email comment in time. Follow-ups were missed entirely.</p></div>
    <div className="prob-card"><div className="prob-icon">📋</div><h3>Manual overhead</h3><p>Team members copy-pasted task details from FrontApp into Asana by hand — slow, error-prone, and draining.</p></div>
    <div className="prob-card"><div className="prob-icon">🔀</div><h3>No prioritization</h3><p>Urgent items sat in the same queue as routine tasks with no way to automatically flag what needed to go out today.</p></div>
  </div>

  <div className="divider"><span>How It Works</span><div className="line"></div></div>
  <div className="flow">
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--teal)' }}>01</div><h3>Comment Added</h3><p>Team member leaves an internal comment in a FrontApp shared email thread.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--teal)' }}>02</div><h3>Parsed & Classified</h3><p>n8n webhook fires; Claude AI reads the emoji prefix and extracts the task details.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--teal)' }}>03</div><h3>Member Looked Up</h3><p>The @mention is matched to an Asana email and GID via a lookup table in n8n.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--teal)' }}>04</div><h3>Task Created</h3><p>Asana task created in the right list — To Do or Urgent — and assigned instantly.</p></div>
  </div>

  <div className="divider"><span>Tech Stack</span><div className="line"></div></div>
  <div className="tech-grid">
    <div className="tech-card">
      <span className="tech-badge ac-blue">FrontApp</span>
      <h3>Communication Layer</h3>
      <p>Monitors internal comments on emails and shared workspace discussions. Serves as the human-facing trigger point for every task.</p>
      <ul className="feat-list"><li>Internal comments</li><li>Email threads</li><li>Shared discussions</li></ul>
    </div>
    <div className="tech-card">
      <span className="tech-badge ac-teal">n8n</span>
      <h3>Automation Backbone</h3>
      <p>Orchestrates the entire workflow — receives the webhook, calls Claude AI, resolves the user, and creates the Asana task.</p>
      <ul className="feat-list"><li>Webhook triggers</li><li>Claude AI parsing</li><li>Logic & routing</li></ul>
    </div>
    <div className="tech-card">
      <span className="tech-badge ac-purple">Asana</span>
      <h3>Task Management Layer</h3>
      <p>Receives structured task data and creates cards in the correct list with proper assignments and due-date flags.</p>
      <ul className="feat-list"><li>To Do list</li><li>Urgent — due today</li><li>Auto-assignment</li></ul>
    </div>
  </div>

  <div className="divider"><span>Live Example</span><div className="line"></div></div>
  <div className="demo-block">
    <div className="demo-bar"><div className="dot" style={{ background: '#ff5f57' }}></div><div className="dot" style={{ background: '#ffbd2e' }}></div><div className="dot" style={{ background: '#28ca41' }}></div><label>FrontApp — Shared Workspace Discussion</label></div>
    <div className="demo-body">
      <div className="cmt-row">
        <div className="cmt-box">
          <div className="cmt-code">■ @bruce follow up with the client regarding the invoice.</div>
          <div className="cmt-meta"><span className="bdg bdg-green">✓ Task Created</span><span className="bdg bdg-blue">To Do — Tasks</span><span className="bdg bdg-blue">Assigned: Bruce</span></div>
        </div>
        <div className="arr">→</div>
        <div className="cmt-box" style={{ borderColor: 'var(--teal-b)', background: 'rgba(0,212,168,.04)' }}>
          <div className="cmt-code" style={{ color: 'var(--teal)' }}>"Follow up with the client regarding the invoice"</div>
          <div className="cmt-meta"><span className="bdg bdg-green">To Do — Tasks</span></div>
        </div>
      </div>
      <div className="cmt-row">
        <div className="cmt-box">
          <div className="cmt-code">■■ @bruce This needs to go out today — urgent!</div>
          <div className="cmt-meta"><span className="bdg bdg-red">⚡ Urgent Task</span><span className="bdg bdg-red">Due Today</span><span className="bdg bdg-blue">Assigned: Bruce</span></div>
        </div>
        <div className="arr">→</div>
        <div className="cmt-box" style={{ borderColor: 'var(--ora-b)', background: 'var(--ora-d)' }}>
          <div className="cmt-code" style={{ color: 'var(--ora)' }}>"This needs to go out today"</div>
          <div className="cmt-meta"><span className="bdg bdg-red">Urgent — Due Today</span></div>
        </div>
      </div>
    </div>
  </div>

  <div className="divider"><span>Key Features</span><div className="line"></div></div>
  <div className="feat-grid">
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--teal-d)', border: '1px solid var(--teal-b)' }}>■</div><div><h4>Emoji Syntax</h4><p>Simple ■ and ■■ prefixes let anyone trigger tasks without training or a new tool.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--teal-d)', border: '1px solid var(--teal-b)' }}>⚡</div><div><h4>Instant Routing</h4><p>Urgent vs. standard tasks automatically land in the correct Asana list — no manual sorting.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--teal-d)', border: '1px solid var(--teal-b)' }}>@</div><div><h4>Mention Mapping</h4><p>@ mentions resolve to real Asana users via a lookup table maintained in n8n.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--teal-d)', border: '1px solid var(--teal-b)' }}>🤖</div><div><h4>AI-Powered Parsing</h4><p>Claude AI extracts clean task descriptions from messy, natural-language comments.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--teal-d)', border: '1px solid var(--teal-b)' }}>✓</div><div><h4>Auto-Assignment</h4><p>Every task is assigned to the right person with zero manual steps.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--teal-d)', border: '1px solid var(--teal-b)' }}>🔒</div><div><h4>Scope Control</h4><p>Only triggers on shared workspace discussions — private threads are excluded for safety.</p></div></div>
  </div>

  <div className="cta">
    <div><h2>Ready to <strong>scale?</strong></h2><p>Built for a high-volume operations team. Custom emoji syntax, any project management tool, live in days.</p></div>
    <ul className="cta-checks"><li>Custom emoji syntax &amp; routing</li><li>Any project management tool</li><li>Live in days, not months</li></ul>
  </div>
</div>
</section>


{/* ═══════════════════════════════════════════════════════════
     PROJECT 2 — AI Voice Agent
═══════════════════════════════════════════════════════════ */}
<section id="s2" className={activeTab === 's2' ? 'visible' : ''}>
<div className="hero" data-accent="blue">
  <div className="hero-tag ac-blue">Lead Conversion</div>
  <h1>A Voice Agent That<br /><strong>Never Misses a Call</strong></h1>
  <p>Answers inbound calls, qualifies leads with custom questions, and books confirmed meetings onto your calendar without any human input.</p>
  <p className="hook">"How many high-value clients are you losing simply because no one picked up the phone after hours?"</p>
  <div className="pills">
    <span className="pill ac-blue">VAPI</span><span className="pill">n8n</span><span className="pill ac-blue">Calendly</span>
  </div>
</div>
<div className="content">

  <div className="divider"><span>The Problem</span><div className="line"></div></div>
  <div className="prob-grid">
    <div className="prob-card"><div className="prob-icon">🧊</div><h3>Leads go cold</h3><p>No one picks up after hours or on weekends. Inbound interest dies before it reaches the sales team.</p></div>
    <div className="prob-card"><div className="prob-icon">🔁</div><h3>Repetitive calls</h3><p>Sales reps spent hours repeating the same qualifying questions for every new lead — high cost, low leverage.</p></div>
    <div className="prob-card"><div className="prob-icon">📅</div><h3>Missed bookings</h3><p>Manual scheduling introduced delays and drop-offs between the first conversation and a confirmed meeting.</p></div>
  </div>

  <div className="divider"><span>How It Works</span><div className="line"></div></div>
  <div className="flow">
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--blue)' }}>01</div><h3>Call Received</h3><p>Customer calls in; the AI agent picks up immediately — any time, any day.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--blue)' }}>02</div><h3>Lead Qualified</h3><p>Agent asks targeted questions to understand the customer's need before booking.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--blue)' }}>03</div><h3>Slot Selected</h3><p>n8n checks live Calendly availability and offers real time-slots to the caller.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--blue)' }}>04</div><h3>Meeting Booked</h3><p>Booking confirmed; calendar invite and meeting notes sent automatically.</p></div>
  </div>

  <div className="divider"><span>Tech Stack</span><div className="line"></div></div>
  <div className="tech-grid">
    <div className="tech-card">
      <span className="tech-badge ac-blue">VAPI</span>
      <h3>Voice AI Engine</h3>
      <p>Powers the real-time voice conversation. Handles speech recognition, natural language understanding, and tool execution mid-call.</p>
      <ul className="feat-list"><li>Real-time voice calls</li><li>Tool calling</li><li>Natural conversation</li></ul>
    </div>
    <div className="tech-card">
      <span className="tech-badge ac-teal">n8n</span>
      <h3>Automation Backbone</h3>
      <p>Orchestrates the workflow. Receives triggers from VAPI, checks Calendly availability, and schedules confirmed meetings.</p>
      <ul className="feat-list"><li>Webhook triggers</li><li>API integrations</li><li>Logic &amp; routing</li></ul>
    </div>
    <div className="tech-card">
      <span className="tech-badge ac-purple">Calendly</span>
      <h3>Scheduling Layer</h3>
      <p>Provides live availability slots and creates confirmed bookings with automatic calendar invites for both parties.</p>
      <ul className="feat-list"><li>Live availability</li><li>Auto booking</li><li>Calendar invites</li></ul>
    </div>
  </div>

  <div className="divider"><span>Live Demo</span><div className="line"></div></div>
  <div className="demo-block">
    <div className="demo-bar"><div className="dot" style={{ background: '#ff5f57' }}></div><div className="dot" style={{ background: '#ffbd2e' }}></div><div className="dot" style={{ background: '#28ca41' }}></div><label>Live call — AI Receptionist</label></div>
    <div className="demo-body">
      <div className="chat-wrap">
        <div className="chat-win">
          <div className="chat-hdr"><div className="live-dot"></div><span>AI Receptionist</span><small>LIVE</small></div>
          <div className="chat-body">
            <div className="msg-wrap agent-wrap">
              <div className="msg-lbl">Agent</div>
              <div className="msg agent">Hi! Good morning. What brings you here today?</div>
            </div>
            <div className="msg-wrap user-wrap">
              <div className="msg-lbl">User</div>
              <div className="msg user">I want to build an AI-powered app for my business.</div>
            </div>
            <div className="msg-wrap agent-wrap">
              <div className="msg-lbl">Agent</div>
              <div className="msg agent">That's great! May I have your full name to personalize the booking?</div>
            </div>
            <div className="msg-wrap user-wrap">
              <div className="msg-lbl">User</div>
              <div className="msg user">Sure, I'm Alex.</div>
            </div>
            <div className="msg-wrap agent-wrap">
              <div className="msg-lbl">Agent</div>
              <div className="msg agent">And your email address?</div>
            </div>
            <div className="msg-wrap user-wrap">
              <div className="msg-lbl">User</div>
              <div className="msg user">alex@company.com</div>
            </div>
            <div className="msg-wrap agent-wrap">
              <div className="msg-lbl">Agent</div>
              <div className="msg confirm">✅ Meeting booked for Tuesday at 2:00 PM Eastern Time. Check your email for the invite!</div>
            </div>
          </div>
        </div>
        <div className="steps-box">
          <h4>What just happened?</h4>
          <div className="step-row"><div className="sdot"></div>Greeted &amp; understood the need</div>
          <div className="step-row"><div className="sdot"></div>Asked qualifying questions</div>
          <div className="step-row"><div className="sdot"></div>Collected name &amp; email</div>
          <div className="step-row"><div className="sdot"></div>Fetched live calendar slots</div>
          <div className="step-row"><div className="sdot"></div>Booked meeting via Calendly</div>
          <div className="step-row"><div className="sdot"></div>Sent calendar invite automatically</div>
          <div className="step-row"><div className="sdot"></div>Generated &amp; attached meeting notes</div>
        </div>
      </div>
    </div>
  </div>

  <div className="divider"><span>Key Features</span><div className="line"></div></div>
  <div className="feat-grid">
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--blue-d)', border: '1px solid var(--blue-b)' }}>🎙️</div><div><h4>Natural Voice</h4><p>Sounds human, responds with warmth and confidence — callers can't tell it's automated.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--blue-d)', border: '1px solid var(--blue-b)' }}>🧠</div><div><h4>Smart Qualifying</h4><p>Asks the right questions before booking so every meeting comes with context.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--blue-d)', border: '1px solid var(--blue-b)' }}>📋</div><div><h4>Strict Booking Flow</h4><p>Collects name and email before checking availability — no incomplete bookings.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--blue-d)', border: '1px solid var(--blue-b)' }}>📅</div><div><h4>Live Availability</h4><p>Checks real calendar slots in real time via n8n — no double bookings, no guessing.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--blue-d)', border: '1px solid var(--blue-b)' }}>📝</div><div><h4>Auto Meeting Notes</h4><p>Summarizes the call and attaches notes directly to the Calendly booking.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--blue-d)', border: '1px solid var(--blue-b)' }}>⚡</div><div><h4>Zero Human Input</h4><p>Fully automated from first word to confirmed invite. No one needs to be available.</p></div></div>
  </div>

  <div className="cta">
    <div><h2>Your business deserves an AI that <strong>never sleeps.</strong></h2><p>Built for a leading agency. Custom voice, any industry, any language — live in weeks.</p></div>
    <ul className="cta-checks"><li>Custom voice &amp; personality</li><li>Any industry, any language</li><li>Live in weeks, not months</li></ul>
  </div>
</div>
</section>


{/* ═══════════════════════════════════════════════════════════
     PROJECT 3 — Computer Store Inbound Call System
═══════════════════════════════════════════════════════════ */}
<section id="s3" className={activeTab === 's3' ? 'visible' : ''}>
<div className="hero" data-accent="orange">
  <div className="hero-tag ac-orange">Customer Database Builder</div>
  <h1>Log Every Caller &amp; Build<br /><strong>Your Marketing Database</strong></h1>
  <p>A 24/7 AI phone system that answers inbound calls, logs every customer's details directly into your CRM, and creates a database for future marketing campaigns.</p>
  <p className="hook">"What if every single person who called your store was automatically saved to a database, ready for your next marketing campaign?"</p>
  <div className="pills">
    <span className="pill ac-orange">VAPI</span><span className="pill">n8n</span><span className="pill">Vtiger CRM</span><span className="pill ac-orange">Telegram</span>
  </div>
</div>
<div className="content">

  <div className="divider"><span>The Problem</span><div className="line"></div></div>
  <div className="prob-grid">
    <div className="prob-card"><div className="prob-icon">📵</div><h3>Zero Caller Capture</h3><p>Dozens of customers called daily, but their details were never captured. Every hang-up was a lost marketing opportunity.</p></div>
    <div className="prob-card"><div className="prob-icon">🗂️</div><h3>No CRM data</h3><p>Every inbound enquiry was handled verbally with nothing recorded. The team had no history of who called, what they needed, or when.</p></div>
    <div className="prob-card"><div className="prob-icon">💬</div><h3>Manual follow-up</h3><p>SMS follow-ups were done by hand. There was no central place to see calls, manage customer messages, or track who had been contacted.</p></div>
  </div>

  <div className="divider"><span>How It Works</span><div className="line"></div></div>
  <div className="flow">
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--ora)' }}>01</div><h3>Call Received</h3><p>AI agent answers every inbound call — whether the store is open or closed.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--ora)' }}>02</div><h3>Data Collected</h3><p>Agent gathers customer name, query, and consent for SMS follow-up.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--ora)' }}>03</div><h3>CRM + SMS + Log</h3><p>Customer is written to Vtiger CRM, SMS sent if consented, call logged to Telegram.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--ora)' }}>04</div><h3>Database Built</h3><p>Caller details are saved into a central database for future marketing campaigns and outreach.</p></div>
  </div>

  <div className="divider"><span>Tech Stack</span><div className="line"></div></div>
  <div className="tech-grid">
    <div className="tech-card">
      <span className="tech-badge ac-orange">VAPI</span>
      <h3>Voice AI Engine</h3>
      <p>Powers the real-time phone conversation. Handles natural speech, collects structured data from callers, and executes business logic mid-call.</p>
      <ul className="feat-list"><li>Inbound call handling</li><li>Natural conversation</li><li>Hours-aware behaviour</li></ul>
    </div>
    <div className="tech-card">
      <span className="tech-badge ac-teal">n8n</span>
      <h3>Automation Backbone</h3>
      <p>Orchestrates everything after the call — CRM writes, SMS dispatch, Telegram logging, and call forwarding logic based on store hours.</p>
      <ul className="feat-list"><li>Vtiger CRM writes</li><li>SMS trigger</li><li>Telegram log dispatch</li></ul>
    </div>
    <div className="tech-card">
      <span className="tech-badge ac-orange">Vtiger + Telegram</span>
      <h3>CRM &amp; Comms Layer</h3>
      <p>Vtiger stores every customer record. Telegram serves as the team's unified inbox — call summaries arrive here, and two-way SMS replies are managed from the same thread.</p>
      <ul className="feat-list"><li>Full customer records</li><li>Call summaries logged</li><li>Two-way SMS from Telegram</li></ul>
    </div>
  </div>

  <div className="divider"><span>Live Example</span><div className="line"></div></div>
  <div className="demo-block">
    <div className="demo-bar"><div className="dot" style={{ background: '#ff5f57' }}></div><div className="dot" style={{ background: '#ffbd2e' }}></div><div className="dot" style={{ background: '#28ca41' }}></div><label>Inbound call — Computer Store Florida</label></div>
    <div className="demo-body">
      <div className="chat-wrap">
        <div className="chat-win">
          <div className="chat-hdr"><div className="live-dot" style={{ background: 'var(--ora)', boxShadow: '0 0 7px rgba(255,107,61,.5)' }}></div><span>AI Phone Agent</span><small>AFTER HOURS</small></div>
          <div className="chat-body">
            <div className="msg-wrap agent-wrap">
              <div className="msg-lbl">Agent</div>
              <div className="msg agent" style={{ borderColor: 'var(--ora-b)' }}>Thank you for calling. Our store is currently closed. May I take your name and what you're looking for today?</div>
            </div>
            <div className="msg-wrap user-wrap">
              <div className="msg-lbl">User</div>
              <div className="msg user">I'm James, I need a RAM upgrade for my laptop.</div>
            </div>
            <div className="msg-wrap agent-wrap">
              <div className="msg-lbl">Agent</div>
              <div className="msg agent" style={{ borderColor: 'var(--ora-b)' }}>Got it James. Can I get your phone number so we can follow up when we open?</div>
            </div>
            <div className="msg-wrap user-wrap">
              <div className="msg-lbl">User</div>
              <div className="msg user">Sure — 786-555-0192. And yes, you can text me.</div>
            </div>
            <div className="msg-wrap agent-wrap">
              <div className="msg-lbl">Agent</div>
              <div className="msg confirm" style={{ background: 'var(--ora-d)', borderColor: 'var(--ora-b)', color: 'var(--ora)' }}>Perfect, James. I've logged your enquiry and you'll get a text from us. We open tomorrow at 9 AM — speak soon!</div>
            </div>
          </div>
        </div>
        <div className="steps-box">
          <h4>What just happened?</h4>
          <div className="step-row"><div className="sdot" style={{ background: 'var(--ora)', boxShadow: '0 0 5px rgba(255,107,61,.4)' }}></div>AI agent answered the call</div>
          <div className="step-row"><div className="sdot" style={{ background: 'var(--ora)', boxShadow: '0 0 5px rgba(255,107,61,.4)' }}></div>Collected name, query &amp; number</div>
          <div className="step-row"><div className="sdot" style={{ background: 'var(--ora)', boxShadow: '0 0 5px rgba(255,107,61,.4)' }}></div>Got SMS consent from customer</div>
          <div className="step-row"><div className="sdot" style={{ background: 'var(--ora)', boxShadow: '0 0 5px rgba(255,107,61,.4)' }}></div>Record written to Vtiger CRM</div>
          <div className="step-row"><div className="sdot" style={{ background: 'var(--ora)', boxShadow: '0 0 5px rgba(255,107,61,.4)' }}></div>Follow-up SMS sent automatically</div>
          <div className="step-row"><div className="sdot" style={{ background: 'var(--ora)', boxShadow: '0 0 5px rgba(255,107,61,.4)' }}></div>Call summary logged to Telegram</div>
          <div className="step-row"><div className="sdot" style={{ background: 'var(--ora)', boxShadow: '0 0 5px rgba(255,107,61,.4)' }}></div>Team can reply via Telegram thread</div>
        </div>
      </div>
    </div>
  </div>

  <div className="divider"><span>Key Features</span><div className="line"></div></div>
  <div className="feat-grid">
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--ora-d)', border: '1px solid var(--ora-b)' }}>🕐</div><div><h4>24/7 Lead Capture</h4><p>Never miss a caller. The AI agent handles calls around the clock and consistently logs their information.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--ora-d)', border: '1px solid var(--ora-b)' }}>🗂️</div><div><h4>Auto CRM Logging</h4><p>Every caller's name, query, and contact details are written directly to Vtiger CRM — no data entry needed.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--ora-d)', border: '1px solid var(--ora-b)' }}>💬</div><div><h4>Consent-Based SMS</h4><p>If the customer agrees to receive a text, an automated follow-up SMS is sent immediately after the call ends.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--ora-d)', border: '1px solid var(--ora-b)' }}>📲</div><div><h4>Two-Way SMS via Telegram</h4><p>All call summaries land in a Telegram channel. The team can reply to any customer's SMS directly from that same Telegram thread.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--ora-d)', border: '1px solid var(--ora-b)' }}>📋</div><div><h4>Full Call Logging</h4><p>Every call — open or closed, answered or missed — is summarized and posted to Telegram for the team's records.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--ora-d)', border: '1px solid var(--ora-b)' }}>🔁</div><div><h4>Zero Manual Follow-Up</h4><p>From call answered to CRM record to SMS sent — the entire post-call workflow runs without anyone on the team lifting a finger.</p></div></div>
  </div>

  <div className="cta">
    <div><h2>Never miss a customer<br /><strong>call again.</strong></h2><p>Works for any retail store, service business, or clinic. Custom hours logic, any CRM, live in days.</p></div>
    <ul className="cta-checks"><li>Custom hours &amp; routing logic</li><li>Any CRM integration</li><li>Live in days, not months</li></ul>
  </div>
</div>
</section>


{/* ═══════════════════════════════════════════════════════════
     PROJECT 4 — Multi-Platform SQL Chatbot
═══════════════════════════════════════════════════════════ */}
<section id="s4" className={activeTab === 's4' ? 'visible' : ''}>
<div className="hero" data-accent="purple">
  <div className="hero-tag ac-purple">Business Intelligence</div>
  <h1>Talk to Your Database<br /><strong>in Plain English</strong></h1>
  <p>Ask questions on Telegram or Slack and get formatted answers, charts, and downloadable Excel reports instantly. No SQL required.</p>
  <p className="hook">"Are you tired of waiting days for a developer just to run a simple data report?"</p>
  <div className="pills">
    <span className="pill ac-purple">Supabase</span><span className="pill">PostgreSQL</span><span className="pill">LLM</span><span className="pill ac-purple">Telegram</span>
  </div>
</div>
<div className="content">

  <div className="divider"><span>The Problem</span><div className="line"></div></div>
  <div className="prob-grid">
    <div className="prob-card"><div className="prob-icon">🧱</div><h3>SQL barrier</h3><p>Non-technical team members couldn't query their own data without involving a developer — every simple question caused a delay.</p></div>
    <div className="prob-card"><div className="prob-icon">⏳</div><h3>Slow turnaround</h3><p>Waiting for a developer to run a report meant decisions were made on stale data or gut feel rather than real numbers.</p></div>
    <div className="prob-card"><div className="prob-icon">📊</div><h3>No self-serve reporting</h3><p>There was no way for the team to pull formatted reports or charts without custom dashboard work — and those took weeks to build.</p></div>
  </div>

  <div className="divider"><span>How It Works</span><div className="line"></div></div>
  <div className="flow">
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--pur)' }}>01</div><h3>User Asks</h3><p>Team member sends a plain-English question on Telegram, email, or the web interface.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--pur)' }}>02</div><h3>LLM Converts</h3><p>Multiple LLM calls convert the question into a safe, executable SQL query.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--pur)' }}>03</div><h3>Query Runs</h3><p>SQL executes against Supabase. On error, it's retried automatically with error context.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--pur)' }}>04</div><h3>Answer Returned</h3><p>Formatted answer with data visualizations and downloadable Excel report sent back.</p></div>
  </div>

  <div className="divider"><span>Tech Stack</span><div className="line"></div></div>
  <div className="tech-grid">
    <div className="tech-card">
      <span className="tech-badge ac-purple">Supabase</span>
      <h3>Database Layer</h3>
      <p>Hosts the PostgreSQL database. Provides a secure API for querying live business data on demand with user-level access control.</p>
      <ul className="feat-list"><li>PostgreSQL database</li><li>Row-level security</li><li>Real-time data</li></ul>
    </div>
    <div className="tech-card">
      <span className="tech-badge ac-teal">LLM Pipeline</span>
      <h3>NL → SQL Engine</h3>
      <p>Multiple LLM calls handle intent extraction, schema matching, SQL generation, and error recovery — producing reliable queries from free-form questions.</p>
      <ul className="feat-list"><li>Multi-step LLM calls</li><li>Error retry logic</li><li>Schema-aware generation</li></ul>
    </div>
    <div className="tech-card">
      <span className="tech-badge ac-purple">Telegram / Email / Web</span>
      <h3>Multi-Platform Interface</h3>
      <p>The same pipeline runs across Telegram, email, and a web interface. Users pick whichever channel fits their workflow — the backend is shared.</p>
      <ul className="feat-list"><li>Telegram bot</li><li>Email interface</li><li>Web chatbot</li></ul>
    </div>
  </div>

  <div className="divider"><span>Live Example</span><div className="line"></div></div>
  <div className="demo-block">
    <div className="demo-bar"><div className="dot" style={{ background: '#ff5f57' }}></div><div className="dot" style={{ background: '#ffbd2e' }}></div><div className="dot" style={{ background: '#28ca41' }}></div><label>Telegram — Data Chatbot</label></div>
    <div className="demo-body">
      <div className="chat-wrap">
        <div className="chat-win">
          <div className="chat-hdr"><div className="live-dot" style={{ background: 'var(--pur)', boxShadow: '0 0 7px rgba(167,139,250,.5)' }}></div><span>Data Bot</span><small>ONLINE</small></div>
          <div className="chat-body">
            <div className="msg-wrap user-wrap">
              <div className="msg-lbl">User</div>
              <div className="msg user">Which products had the most returns last month?</div>
            </div>
            <div className="msg-wrap agent-wrap">
              <div className="msg-lbl">Bot</div>
              <div className="msg agent" style={{ borderColor: 'var(--pur-b)' }}>Got it — pulling from the orders table…</div>
            </div>
            <div className="msg-wrap agent-wrap">
              <div className="msg-lbl">Bot</div>
              <div className="msg confirm" style={{ background: 'var(--pur-d)', borderColor: 'var(--pur-b)', color: 'var(--pur)' }}>✅ Top 3 by returns: 1. USB-C Hub (42) 2. Laptop Stand (31) 3. Webcam Pro (27). Full report attached as Excel.</div>
            </div>
            <div className="msg-wrap user-wrap">
              <div className="msg-lbl">User</div>
              <div className="msg user">Why did the USB-C Hub have so many?</div>
            </div>
            <div className="msg-wrap agent-wrap">
              <div className="msg-lbl">Bot</div>
              <div className="msg agent" style={{ borderColor: 'var(--pur-b)' }}>Checking return reason codes… Most cited: "incompatible with MacBook" (29 of 42).</div>
            </div>
          </div>
        </div>
        <div className="steps-box">
          <h4>What just happened?</h4>
          <div className="step-row"><div className="sdot" style={{ background: 'var(--pur)', boxShadow: '0 0 5px rgba(167,139,250,.4)' }}></div>Natural language question received</div>
          <div className="step-row"><div className="sdot" style={{ background: 'var(--pur)', boxShadow: '0 0 5px rgba(167,139,250,.4)' }}></div>LLM converted to SQL query</div>
          <div className="step-row"><div className="sdot" style={{ background: 'var(--pur)', boxShadow: '0 0 5px rgba(167,139,250,.4)' }}></div>Executed against Supabase</div>
          <div className="step-row"><div className="sdot" style={{ background: 'var(--pur)', boxShadow: '0 0 5px rgba(167,139,250,.4)' }}></div>Formatted answer returned</div>
          <div className="step-row"><div className="sdot" style={{ background: 'var(--pur)', boxShadow: '0 0 5px rgba(167,139,250,.4)' }}></div>Excel report generated &amp; attached</div>
          <div className="step-row"><div className="sdot" style={{ background: 'var(--pur)', boxShadow: '0 0 5px rgba(167,139,250,.4)' }}></div>Follow-up question handled in context</div>
        </div>
      </div>
    </div>
  </div>

  <div className="divider"><span>Key Features</span><div className="line"></div></div>
  <div className="feat-grid">
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--pur-d)', border: '1px solid var(--pur-b)' }}>💬</div><div><h4>Plain English Queries</h4><p>Anyone on the team can ask data questions in natural language — no SQL knowledge required.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--pur-d)', border: '1px solid var(--pur-b)' }}>📊</div><div><h4>Excel Report Output</h4><p>Every successful query generates a downloadable, formatted Excel report alongside the text answer.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--pur-d)', border: '1px solid var(--pur-b)' }}>🔁</div><div><h4>Auto Error Recovery</h4><p>On a SQL error, the query is retried with error context. If still unresolved, the user is prompted to clarify.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--pur-d)', border: '1px solid var(--pur-b)' }}>📱</div><div><h4>Multi-Platform</h4><p>Works on Telegram, email, and the web — same intelligence, whichever channel the team prefers.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--pur-d)', border: '1px solid var(--pur-b)' }}>🗄️</div><div><h4>Stored Query History</h4><p>Every query and its result is stored, creating a searchable history of what was asked and when.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--pur-d)', border: '1px solid var(--pur-b)' }}>🔒</div><div><h4>Secure by Design</h4><p>Queries run through Supabase row-level security — users only see data they're permitted to access.</p></div></div>
  </div>

  <div className="cta">
    <div><h2>Your team deserves<br /><strong>self-serve data.</strong></h2><p>Works with any PostgreSQL or Supabase database. Custom to your schema, live in days.</p></div>
    <ul className="cta-checks"><li>Any SQL database</li><li>Custom to your schema</li><li>Live in days, not months</li></ul>
  </div>
</div>
</section>


{/* ═══════════════════════════════════════════════════════════
     PROJECT 5 — Media Manager
═══════════════════════════════════════════════════════════ */}
<section id="s5" className={activeTab === 's5' ? 'visible' : ''}>
<div className="hero" data-accent="amber">
  <div className="hero-tag ac-amber">Content Automation</div>
  <h1>Scale Your Content Without<br /><strong>Scaling Your Team</strong></h1>
  <p>Enter a topic in Google Sheets and instantly generate a full video script, aligned voiceover, and YouTube description in your Drive.</p>
  <p className="hook">"How much time are you wasting formatting scripts instead of actually recording content?"</p>
  <div className="pills">
    <span className="pill ac-amber">Google Sheets</span><span className="pill">Apps Script</span><span className="pill ac-amber">LLM</span><span className="pill">Google Drive</span>
  </div>
</div>
<div className="content">

  <div className="divider"><span>The Problem</span><div className="line"></div></div>
  <div className="prob-grid">
    <div className="prob-card"><div className="prob-icon">⏳</div><h3>Slow pre-production</h3><p>Content creators spent hours writing scripts, voiceovers, and descriptions manually for every video — before a single frame was recorded.</p></div>
    <div className="prob-card"><div className="prob-icon">🔁</div><h3>Repetitive formatting</h3><p>The same structure was written from scratch each time. There was no template, no consistency, and no way to speed it up without hiring writers.</p></div>
    <div className="prob-card"><div className="prob-icon">📂</div><h3>Disorganized outputs</h3><p>Drafts lived in random docs, were hard to find, and never aligned — script timing didn't match the voiceover, and thumbnails were an afterthought.</p></div>
  </div>

  <div className="divider"><span>How It Works</span><div className="line"></div></div>
  <div className="flow">
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--amb)' }}>01</div><h3>Topic Entered</h3><p>Creator fills in video topic, target keywords, and key information in Google Sheets.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--amb)' }}>02</div><h3>Button Clicked</h3><p>"Create Documents" is clicked — Apps Script triggers the LLM pipeline immediately.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--amb)' }}>03</div><h3>Content Generated</h3><p>LLM generates all three documents in parallel — script, voiceover, and thumbnail brief.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--amb)' }}>04</div><h3>Docs Saved</h3><p>All three files are saved directly to Google Drive — organized and ready to use.</p></div>
  </div>

  <div className="divider"><span>Tech Stack</span><div className="line"></div></div>
  <div className="tech-grid">
    <div className="tech-card">
      <span className="tech-badge ac-amber">Google Sheets</span>
      <h3>Input Interface</h3>
      <p>The creator's familiar workspace. Input fields for topic, keywords, and notes sit alongside a single button that kicks off the entire pipeline.</p>
      <ul className="feat-list"><li>Topic &amp; keyword input</li><li>One-click trigger</li><li>No new tools to learn</li></ul>
    </div>
    <div className="tech-card">
      <span className="tech-badge ac-amber">Apps Script + LLM</span>
      <h3>Generation Engine</h3>
      <p>Google Apps Script handles the trigger and file creation. An LLM generates each document type with its own prompt tailored to the output format.</p>
      <ul className="feat-list"><li>Parallel document generation</li><li>Format-specific prompts</li><li>Timestamp alignment</li></ul>
    </div>
    <div className="tech-card">
      <span className="tech-badge ac-amber">Google Drive</span>
      <h3>Output Layer</h3>
      <p>All generated documents are saved directly to the creator's Drive — named, organized by video topic, and immediately shareable with the production team.</p>
      <ul className="feat-list"><li>Auto-organized folders</li><li>Named by topic</li><li>Instantly shareable</li></ul>
    </div>
  </div>

  <div className="divider"><span>Live Example</span><div className="line"></div></div>
  <div className="demo-block">
    <div className="demo-bar"><div className="dot" style={{ background: '#ff5f57' }}></div><div className="dot" style={{ background: '#ffbd2e' }}></div><div className="dot" style={{ background: '#28ca41' }}></div><label>Google Sheets — Media Manager</label></div>
    <div className="demo-body">
      <div className="cmt-row">
        <div className="cmt-box">
          <div className="cmt-code" style={{ color: 'var(--amb)' }}>Topic: "5 AI Tools That Save 10 Hours a Week"<br />Keywords: AI productivity, automation tools, 2025<br />Key info: Focus on free tools, beginner-friendly</div>
          <div className="cmt-meta"><span className="bdg bdg-amb" style={{ background: 'var(--amb-d)', color: 'var(--amb)', border: '1px solid var(--amb-b)' }}>▶ Create Documents clicked</span></div>
        </div>
        <div className="arr">→</div>
        <div className="cmt-box" style={{ borderColor: 'var(--amb-b)', background: 'var(--amb-d)' }}>
          <div className="cmt-code" style={{ color: 'var(--amb)' }}>✓ Video Script — visual scenes with timestamps<br />✓ Voiceover Doc — aligned spoken text per scene<br />✓ Thumbnail &amp; Description — brief + YouTube copy</div>
          <div className="cmt-meta"><span className="bdg bdg-green">Saved to Drive</span></div>
        </div>
      </div>
    </div>
  </div>

  <div className="divider"><span>Documents Generated</span><div className="line"></div></div>
  <div className="feat-grid">
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--amb-d)', border: '1px solid var(--amb-b)' }}>🎬</div><div><h4>Video Script Document</h4><p>Scene-by-scene breakdown with visual descriptions, camera directions, and timestamps aligned to the full video length.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--amb-d)', border: '1px solid var(--amb-b)' }}>🎙️</div><div><h4>Voiceover Document</h4><p>Spoken text aligned to each scene's timeframe — ready to record directly or send to a voice actor.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--amb-d)', border: '1px solid var(--amb-b)' }}>🖼️</div><div><h4>Thumbnail Brief</h4><p>Design direction for the thumbnail — headline, visual concept, and color guidance — alongside the full YouTube description and tags.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--amb-d)', border: '1px solid var(--amb-b)' }}>⚡</div><div><h4>One-Click Trigger</h4><p>No new tools, no new tabs. The entire pipeline runs from a button inside the Google Sheet the creator already uses.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--amb-d)', border: '1px solid var(--amb-b)' }}>📁</div><div><h4>Auto-Organized Drive</h4><p>All three documents land in a named folder in Google Drive — no manual saving, renaming, or filing.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--amb-d)', border: '1px solid var(--amb-b)' }}>🔄</div><div><h4>Reusable for Any Topic</h4><p>Same system, any video topic. The LLM adapts the structure and tone to the subject matter automatically.</p></div></div>
  </div>

  <div className="cta">
    <div><h2>Ship content<br /><strong>faster than ever.</strong></h2><p>Works for any content creator, YouTube channel, or agency. Custom to your brand voice, live in days.</p></div>
    <ul className="cta-checks"><li>Custom brand voice &amp; format</li><li>Any content type or niche</li><li>Live in days, not months</li></ul>
  </div>
</div>
</section>


{/* ═══════════════════════════════════════════════════════════
     PROJECT 6 — NDA Compliance
═══════════════════════════════════════════════════════════ */}
<section id="s6" className={activeTab === 's6' ? 'visible' : ''}>
<div className="hero" data-accent="green">
  <div className="hero-tag ac-green">Legal Risk Mitigation</div>
  <h1>Detect Contract Risks in<br /><strong>Seconds, Not Days</strong></h1>
  <p>Upload any NDA to find missing clauses, ambiguous language, and risky terms — complete with suggested rewrites inserted directly as Word comments.</p>
  <p className="hook">"Are you signing agreements blindly because professional legal review takes too long and costs too much?"</p>
  <div className="pills">
    <span className="pill ac-green">Google Forms</span><span className="pill">Apps Script</span><span className="pill ac-green">LLM</span><span className="pill">Word API</span>
  </div>
</div>
<div className="content">

  <div className="divider"><span>The Problem</span><div className="line"></div></div>
  <div className="prob-grid">
    <div className="prob-card"><div className="prob-icon">⚖️</div><h3>No legal resource</h3><p>Businesses were signing NDAs without a lawyer reviewing them — missing clauses that left them exposed or locked into unfair terms.</p></div>
    <div className="prob-card"><div className="prob-icon">⏳</div><h3>Slow turnaround</h3><p>When legal review did happen, it took days to get feedback. Deals stalled and momentum was lost waiting for a document to come back.</p></div>
    <div className="prob-card"><div className="prob-icon">🔍</div><h3>Missed gaps</h3><p>Non-lawyers couldn't spot what was missing — vague termination clauses, absent jurisdiction terms, or undefined confidentiality scope went unnoticed.</p></div>
  </div>

  <div className="divider"><span>How It Works</span><div className="line"></div></div>
  <div className="flow">
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--grn)' }}>01</div><h3>NDA Uploaded</h3><p>User submits their NDA through a simple Google Form — no account needed.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--grn)' }}>02</div><h3>Text Extracted</h3><p>Apps Script parses the document and passes the full content to the LLM pipeline.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--grn)' }}>03</div><h3>Clauses Analyzed</h3><p>LLM identifies gaps, ambiguities, and risky language — with specific suggested fixes.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--grn)' }}>04</div><h3>Word Doc Returned</h3><p>Revised document delivered with highlights and all suggestions inserted as tracked Word comments.</p></div>
  </div>

  <div className="divider"><span>Tech Stack</span><div className="line"></div></div>
  <div className="tech-grid">
    <div className="tech-card">
      <span className="tech-badge ac-green">Google Forms</span>
      <h3>Submission Interface</h3>
      <p>A clean upload form — no login, no complexity. The user attaches their NDA and submits. Apps Script handles everything from there.</p>
      <ul className="feat-list"><li>Simple upload flow</li><li>No account required</li><li>Instant processing trigger</li></ul>
    </div>
    <div className="tech-card">
      <span className="tech-badge ac-green">Apps Script + LLM</span>
      <h3>Analysis Engine</h3>
      <p>Apps Script extracts the document content and runs it through the LLM. The model identifies clause issues and generates specific, actionable suggestions for each one.</p>
      <ul className="feat-list"><li>Full NDA text extraction</li><li>Clause-level analysis</li><li>Insert / replace / delete suggestions</li></ul>
    </div>
    <div className="tech-card">
      <span className="tech-badge ac-green">Word API</span>
      <h3>Output Layer</h3>
      <p>The improved document is built as a proper Word file — with highlighted text, inline comments, and all suggested edits in a format any lawyer or business owner can work with directly.</p>
      <ul className="feat-list"><li>Tracked Word comments</li><li>Highlighted problem areas</li><li>Ready to review &amp; sign</li></ul>
    </div>
  </div>

  <div className="divider"><span>Live Example</span><div className="line"></div></div>
  <div className="demo-block">
    <div className="demo-bar"><div className="dot" style={{ background: '#ff5f57' }}></div><div className="dot" style={{ background: '#ffbd2e' }}></div><div className="dot" style={{ background: '#28ca41' }}></div><label>NDA Compliance — Analysis Output</label></div>
    <div className="demo-body">
      <div className="cmt-row">
        <div className="cmt-box">
          <div className="cmt-code" style={{ color: 'var(--muted)' }}>📄 mutual_nda_acme_corp.docx uploaded via Google Form</div>
          <div className="cmt-meta"><span className="bdg bdg-blue">Processing…</span></div>
        </div>
        <div className="arr">→</div>
        <div className="cmt-box" style={{ borderColor: 'var(--grn-b)', background: 'var(--grn-d)' }}>
          <div className="cmt-code" style={{ color: 'var(--grn)' }}>⚠ Missing: Jurisdiction clause (insert suggested)<br />⚠ Vague: "reasonable efforts" — recommend defined standard<br />✓ Termination clause: acceptable<br />⚠ Confidentiality scope: too broad — suggest narrowing</div>
          <div className="cmt-meta"><span className="bdg bdg-green">Word doc + comments returned</span></div>
        </div>
      </div>
    </div>
  </div>

  <div className="divider"><span>Key Features</span><div className="line"></div></div>
  <div className="feat-grid">
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--grn-d)', border: '1px solid var(--grn-b)' }}>🔍</div><div><h4>Clause Gap Detection</h4><p>The LLM checks for missing clauses — jurisdiction, termination, scope, remedies — and flags each one specifically.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--grn-d)', border: '1px solid var(--grn-b)' }}>📝</div><div><h4>Tracked Word Comments</h4><p>Every suggestion is inserted as a Word comment on the relevant text — ready to accept, reject, or discuss with a lawyer.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--grn-d)', border: '1px solid var(--grn-b)' }}>✏️</div><div><h4>Specific Rewrites</h4><p>For vague or risky language, the system suggests exact replacement text — not just a flag, but a fix.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--grn-d)', border: '1px solid var(--grn-b)' }}>⚡</div><div><h4>Seconds, Not Days</h4><p>Upload to revised Word doc in under a minute — no waiting for legal review to start the conversation.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--grn-d)', border: '1px solid var(--grn-b)' }}>🎯</div><div><h4>Insert / Replace / Delete</h4><p>Each suggestion is categorized — what to add, what to rewrite, and what to remove — making review straightforward.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--grn-d)', border: '1px solid var(--grn-b)' }}>📤</div><div><h4>No Login Required</h4><p>Upload via Google Form, receive the output by email. No account, no dashboard, no friction.</p></div></div>
  </div>

  <div className="cta">
    <div><h2>Review NDAs in<br /><strong>seconds, not days.</strong></h2><p>Works for any contract type. Custom clause library for your industry, live in days.</p></div>
    <ul className="cta-checks"><li>Custom clause library</li><li>Any contract type</li><li>Live in days, not months</li></ul>
  </div>
</div>
</section>


{/* ═══════════════════════════════════════════════════════════
     PROJECT 7 — Wedding Photography Lead Automation
═══════════════════════════════════════════════════════════ */}
<section id="s7" className={activeTab === 's7' ? 'visible' : ''}>
<div className="hero" data-accent="pink">
  <div className="hero-tag ac-pink">Revenue Recovery</div>
  <h1>Recover Visitors Who<br /><strong>Leave Without Booking</strong></h1>
  <p>Capture visitor emails before they bounce, automatically detect if they didn't complete a booking, and trigger a personalized follow-up sequence.</p>
  <p className="hook">"How many potential clients browse your portfolio, love your work, but leave the site without ever saying hello?"</p>
  <div className="pills">
    <span className="pill ac-pink">Zapier</span><span className="pill">System.io</span><span className="pill ac-pink">Calendly</span>
  </div>
</div>
<div className="content">

  <div className="divider"><span>The Problem</span><div className="line"></div></div>
  <div className="prob-grid">
    <div className="prob-card"><div className="prob-icon">👋</div><h3>Visitors leaving silently</h3><p>Interested couples were browsing the photography website and leaving without any contact — no name, no email, no way to follow up.</p></div>
    <div className="prob-card"><div className="prob-icon">📉</div><h3>Drop-offs between email and booking</h3><p>Some visitors gave their email but never made it to Calendly. There was no visibility into this gap and no way to recover those leads.</p></div>
    <div className="prob-card"><div className="prob-icon">📧</div><h3>Manual follow-up</h3><p>When follow-up did happen, it was done by hand — inconsistent, slow, and dependent on someone remembering to send the email.</p></div>
  </div>

  <div className="divider"><span>How It Works</span><div className="line"></div></div>
  <div className="flow">
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--pink)' }}>01</div><h3>Email Captured</h3><p>A website pop-up collects the visitor's email before they are redirected to Calendly.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--pink)' }}>02</div><h3>Booking Checked</h3><p>Zapier checks whether a booking was made on Calendly after the email was submitted.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--pink)' }}>03</div><h3>Gap Detected</h3><p>If email was given but no booking followed, the lead is flagged automatically.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--pink)' }}>04</div><h3>Sequence Triggered</h3><p>System.io sends a targeted follow-up email campaign to recover the unbooked lead.</p></div>
  </div>

  <div className="divider"><span>Tech Stack</span><div className="line"></div></div>
  <div className="tech-grid">
    <div className="tech-card">
      <span className="tech-badge ac-pink">Website Pop-Up</span>
      <h3>Lead Capture Layer</h3>
      <p>An email capture pop-up appears on key pages of the photography website — collecting contact details before the visitor is sent to Calendly.</p>
      <ul className="feat-list"><li>Timed trigger</li><li>Exit intent option</li><li>Email capture before Calendly</li></ul>
    </div>
    <div className="tech-card">
      <span className="tech-badge ac-pink">Zapier</span>
      <h3>Automation Backbone</h3>
      <p>Connects the pop-up, Calendly, and System.io. Checks booking status after each email capture and routes accordingly — booked leads are tagged, unbooked leads enter the recovery flow.</p>
      <ul className="feat-list"><li>Booking status check</li><li>Conditional routing</li><li>Lead tagging</li></ul>
    </div>
    <div className="tech-card">
      <span className="tech-badge ac-pink">System.io</span>
      <h3>Email Marketing Layer</h3>
      <p>Runs the follow-up sequence for unbooked leads — a series of warm, personalized emails designed to bring them back and complete the booking.</p>
      <ul className="feat-list"><li>Automated sequences</li><li>Personalized follow-ups</li><li>Booking link re-engagement</li></ul>
    </div>
  </div>

  <div className="divider"><span>Live Example</span><div className="line"></div></div>
  <div className="demo-block">
    <div className="demo-bar"><div className="dot" style={{ background: '#ff5f57' }}></div><div className="dot" style={{ background: '#ffbd2e' }}></div><div className="dot" style={{ background: '#28ca41' }}></div><label>Lead Recovery Flow</label></div>
    <div className="demo-body">
      <div className="cmt-row">
        <div className="cmt-box">
          <div className="cmt-code" style={{ color: 'var(--pink)' }}>✉ sarah@gmail.com submitted pop-up form<br />⏳ Waited 30 mins — no Calendly booking detected</div>
          <div className="cmt-meta"><span className="bdg" style={{ background: 'var(--pink-d)', color: 'var(--pink)', border: '1px solid var(--pink-b)' }}>Lead flagged as unbooked</span></div>
        </div>
        <div className="arr">→</div>
        <div className="cmt-box" style={{ borderColor: 'var(--pink-b)', background: 'var(--pink-d)' }}>
          <div className="cmt-code" style={{ color: 'var(--pink)' }}>Day 0: "Still thinking? Here's what couples say…"<br />Day 2: "Only 3 dates left for your season"<br />Day 5: "Book a free 15-min call — no commitment"</div>
          <div className="cmt-meta"><span className="bdg bdg-green">Sequence triggered automatically</span></div>
        </div>
      </div>
    </div>
  </div>

  <div className="divider"><span>Key Features</span><div className="line"></div></div>
  <div className="feat-grid">
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--pink-d)', border: '1px solid var(--pink-b)' }}>📬</div><div><h4>Pre-Calendly Email Capture</h4><p>Email is collected before the visitor reaches Calendly — ensuring no lead is lost even if they don't book.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--pink-d)', border: '1px solid var(--pink-b)' }}>🔍</div><div><h4>Booking Gap Detection</h4><p>The system automatically identifies who submitted their email but didn't complete a booking — and acts on it.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--pink-d)', border: '1px solid var(--pink-b)' }}>📩</div><div><h4>Automated Follow-Up Sequence</h4><p>A warm, personalized multi-email sequence is sent to unbooked leads — no manual sending required.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--pink-d)', border: '1px solid var(--pink-b)' }}>🏷️</div><div><h4>Lead Tagging</h4><p>Every lead is tagged as booked or unbooked in the system — giving the photographer full visibility of their pipeline.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--pink-d)', border: '1px solid var(--pink-b)' }}>⚡</div><div><h4>Zero Manual Effort</h4><p>Once live, the entire capture-check-follow-up loop runs automatically — no one needs to monitor or send anything.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--pink-d)', border: '1px solid var(--pink-b)' }}>📈</div><div><h4>Recovers Lost Revenue</h4><p>Converts visitors who showed intent but didn't commit — turning a previously invisible gap into booked sessions.</p></div></div>
  </div>

  <div className="cta">
    <div><h2>Stop losing leads<br /><strong>that were already interested.</strong></h2><p>Works for any service business with a booking flow. Custom sequences, live in days.</p></div>
    <ul className="cta-checks"><li>Custom follow-up sequences</li><li>Any booking platform</li><li>Live in days, not months</li></ul>
  </div>
</div>
</section>


{/* ═══════════════════════════════════════════════════════════
     PROJECT 8 — AI Virtual Try-On
═══════════════════════════════════════════════════════════ */}
<section id="s8" className={activeTab === 's8' ? 'visible' : ''}>
<div className="hero" data-accent="sky">
  <div className="hero-tag ac-sky">E-Commerce AI</div>
  <h1>Studio-Quality Photos<br /><strong>Without the Photoshoot</strong></h1>
  <p>Upload clothing flats, select an AI model, and generate realistic, professional styled photos instantly — ready for your product pages.</p>
  <p className="hook">"Is expensive studio photography delaying your product launches and eating into your margins?"</p>
  <div className="pills">
    <span className="pill ac-sky">Supabase</span><span className="pill">Nano Banana AI</span><span className="pill ac-sky">Web Interface</span>
  </div>
</div>
<div className="content">

  <div className="divider"><span>The Problem</span><div className="line"></div></div>
  <div className="prob-grid">
    <div className="prob-card"><div className="prob-icon">📸</div><h3>Expensive photoshoots</h3><p>Every new garment required a model, photographer, studio, and stylist — high cost and weeks of lead time before anything could be listed online.</p></div>
    <div className="prob-card"><div className="prob-icon">⏳</div><h3>Slow time-to-market</h3><p>New inventory sat in the warehouse while waiting for shoot slots. By the time photos were ready, the trend window had often passed.</p></div>
    <div className="prob-card"><div className="prob-icon">🔄</div><h3>No flexibility</h3><p>Once shot, changing a garment on a different model or in a different style meant starting the entire process over — no easy way to iterate.</p></div>
  </div>

  <div className="divider"><span>How It Works</span><div className="line"></div></div>
  <div className="flow">
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--sky)' }}>01</div><h3>Garment Uploaded</h3><p>Brand uploads clothing items — jeans, tops, jackets, and other wearables — via the web interface.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--sky)' }}>02</div><h3>Model Selected</h3><p>User picks from pre-trained AI model profiles stored in Supabase.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--sky)' }}>03</div><h3>AI Renders</h3><p>The garment-model combination is processed through the Nano Banana AI engine.</p></div>
    <div className="flow-step"><div className="step-num" style={{ color: 'var(--sky)' }}>04</div><h3>Photo Delivered</h3><p>A professional styled model photo is returned in seconds — ready to publish.</p></div>
  </div>

  <div className="divider"><span>Tech Stack</span><div className="line"></div></div>
  <div className="tech-grid">
    <div className="tech-card">
      <span className="tech-badge ac-sky">Web Interface</span>
      <h3>Styling Interface</h3>
      <p>A clean browser-based tool for uploading garments, selecting models, and managing outfits. No software to install — works entirely in the browser.</p>
      <ul className="feat-list"><li>Garment upload</li><li>Model selection</li><li>Real-time swap &amp; preview</li></ul>
    </div>
    <div className="tech-card">
      <span className="tech-badge ac-sky">Supabase</span>
      <h3>Data Layer</h3>
      <p>Stores all uploaded garments and pre-trained AI model profiles. Manages garment state and enables dynamic layering, swapping, and outfit control.</p>
      <ul className="feat-list"><li>Garment storage</li><li>Model profile library</li><li>Dynamic outfit state</li></ul>
    </div>
    <div className="tech-card">
      <span className="tech-badge ac-sky">Nano Banana AI</span>
      <h3>AI Rendering Engine</h3>
      <p>Processes each garment-model combination and generates the final styled output photo. Handles realistic draping, lighting, and fit across a wide range of garment types.</p>
      <ul className="feat-list"><li>Realistic garment rendering</li><li>Instant output generation</li><li>Multiple garment types</li></ul>
    </div>
  </div>

  <div className="divider"><span>Live Example</span><div className="line"></div></div>
  <div className="demo-block">
    <div className="demo-bar"><div className="dot" style={{ background: '#ff5f57' }}></div><div className="dot" style={{ background: '#ffbd2e' }}></div><div className="dot" style={{ background: '#28ca41' }}></div><label>AI Virtual Try-On — Web Interface</label></div>
    <div className="demo-body">
      <div className="cmt-row">
        <div className="cmt-box">
          <div className="cmt-code" style={{ color: 'var(--sky)' }}>📤 summer_denim_jacket.jpg uploaded<br />👤 Model: Profile #3 — Female, Slim fit<br />🎨 Style: Casual outdoor</div>
          <div className="cmt-meta"><span className="bdg" style={{ background: 'var(--sky-d)', color: 'var(--sky)', border: '1px solid var(--sky-b)' }}>▶ Generate clicked</span></div>
        </div>
        <div className="arr">→</div>
        <div className="cmt-box" style={{ borderColor: 'var(--sky-b)', background: 'var(--sky-d)' }}>
          <div className="cmt-code" style={{ color: 'var(--sky)' }}>✓ Model photo generated in 4.2s<br />✓ Realistic drape &amp; fit applied<br />✓ Ready to download for product listing</div>
          <div className="cmt-meta"><span className="bdg bdg-green">No photoshoot needed</span></div>
        </div>
      </div>
    </div>
  </div>

  <div className="divider"><span>Key Features</span><div className="line"></div></div>
  <div className="feat-grid">
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--sky-d)', border: '1px solid var(--sky-b)' }}>⚡</div><div><h4>Instant Photo Generation</h4><p>Professional styled model photos generated in seconds — no scheduling, no studio, no wait.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--sky-d)', border: '1px solid var(--sky-b)' }}>👗</div><div><h4>Multiple Garment Types</h4><p>Works with jeans, tops, jackets, and other wearables — handles realistic draping and fit for each category.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--sky-d)', border: '1px solid var(--sky-b)' }}>🔄</div><div><h4>Real-Time Swapping</h4><p>Garments can be swapped, layered, or removed in real time — see the result instantly without regenerating from scratch.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--sky-d)', border: '1px solid var(--sky-b)' }}>🧍</div><div><h4>Pre-Trained AI Models</h4><p>A library of model profiles stored in Supabase — different body types, styles, and aesthetics to match any brand direction.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--sky-d)', border: '1px solid var(--sky-b)' }}>💰</div><div><h4>Dramatically Lower Cost</h4><p>Eliminates the cost of photographers, models, studios, and stylists — the same output at a fraction of the price.</p></div></div>
    <div className="feat-item"><div className="feat-ico" style={{ background: 'var(--sky-d)', border: '1px solid var(--sky-b)' }}>🚀</div><div><h4>Fast E-Commerce Updates</h4><p>New inventory can be listed with professional photos the same day it arrives — no waiting for shoot slots.</p></div></div>
  </div>

  <div className="cta">
    <div><h2>List new inventory<br /><strong>the day it arrives.</strong></h2><p>Built for fashion brands and e-commerce teams. Custom model library, any garment type, live in days.</p></div>
    <ul className="cta-checks"><li>Custom AI model library</li><li>Any garment category</li><li>Live in days, not months</li></ul>
  </div>
</div>
</section>



      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetails;
