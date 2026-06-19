import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Phone, PhoneCall, Shield, Zap } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DemoForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    property_interest: '',
    budget_range: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://n8n.saadrasheed.life/webhook/lead-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          submitted_at: new Date().toISOString()
        })
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 min-h-[70vh] flex flex-col items-center justify-center fade-in-up">
        <div className="container max-w-[520px] text-center space-y-6">
          <div className="relative mx-auto w-24 h-24 flex items-center justify-center mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
            <div className="absolute inset-2 rounded-full border-2 border-primary/40 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
            <div className="relative z-10 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <PhoneCall className="w-8 h-8 text-primary-glow animate-pulse" />
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Your phone is ringing.</h2>
          
          <p className="text-lg text-foreground/90 max-w-sm mx-auto">
            Pick up — it's the AI agent. Talk to it like you would a real estate agent calling about a property.
          </p>

          <p className="text-sm text-muted-foreground mt-8">
            Call not coming? Check you entered the right number.<br/>
            Calls may take up to 90 seconds on first run.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 fade-in-up">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="container relative z-10 max-w-[520px]">
        
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
            </span>
            LIVE DEMO — calls are real
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Your Phone Will Ring in 60 Seconds.
          </h1>
          
          <p className="text-base sm:text-lg text-muted-foreground">
            Enter your details below. A real AI calling agent will call you — the same system your leads would experience. No pitch. Just the tech.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-6 sm:p-8">
          <div className="space-y-2 text-left">
            <label htmlFor="full_name" className="text-sm font-medium text-muted-foreground">
              Your Name
            </label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              required
              value={formData.full_name}
              onChange={handleChange}
              placeholder="What should the agent call you?"
              className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            />
          </div>

          <div className="space-y-2 text-left">
            <label htmlFor="phone" className="text-sm font-medium text-muted-foreground">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            />
            <p className="text-xs text-primary-glow font-medium flex items-center gap-1 mt-1.5">
              <Zap className="w-3 h-3" />
              This number will ring within 60 seconds.
            </p>
          </div>

          <div className="space-y-2 text-left">
            <label htmlFor="property_interest" className="text-sm font-medium text-muted-foreground">
              What are you looking for?
            </label>
            <Select 
              value={formData.property_interest} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, property_interest: value }))}
              required
            >
              <SelectTrigger className="flex h-11 w-full bg-background/50">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Buying a home">Buying a home</SelectItem>
                <SelectItem value="Selling my property">Selling my property</SelectItem>
                <SelectItem value="Renting / looking for a rental">Renting / looking for a rental</SelectItem>
                <SelectItem value="I'm a real estate agent / agency">I'm a real estate agent / agency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 text-left">
            <label htmlFor="budget_range" className="text-sm font-medium text-muted-foreground">
              What's your budget?
            </label>
            <Select 
              value={formData.budget_range} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, budget_range: value }))}
              required
            >
              <SelectTrigger className="flex h-11 w-full bg-background/50">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Under $200,000">Under $200,000</SelectItem>
                <SelectItem value="$200,000 – $500,000">$200,000 – $500,000</SelectItem>
                <SelectItem value="$500,000 – $1,000,000">$500,000 – $1,000,000</SelectItem>
                <SelectItem value="$1M – $3M">$1M – $3M</SelectItem>
                <SelectItem value="$3M+">$3M+</SelectItem>
                <SelectItem value="I'm just testing the demo">I'm just testing the demo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-2">
            <Button 
              type="submit" 
              variant="hero" 
              size="xl" 
              className="w-full text-lg h-14"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Calling you now...' : 'Call Me Now →'}
            </Button>
            
            {status === 'error' && (
              <p className="text-sm text-destructive text-center mt-3 font-medium">
                The demo system is busy — email saad@saadrasheed.life and I'll trigger it manually for you.
              </p>
            )}
          </div>
        </form>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-primary-glow/70" />
            <span>⚡ Calls in under 60 seconds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-primary-glow/70" />
            <span>🔒 Your number is never shared or spammed</span>
          </div>
        </div>

      </div>
    </section>
  );
}
