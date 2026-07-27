import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Phone, PhoneCall, Shield, Zap, Mail, Mic, MicOff } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Vapi from '@vapi-ai/web';

export default function DemoForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'vapi_active'>('idle');
  const [activeTab, setActiveTab] = useState('usa');
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    property_interest: '',
    budget_range: ''
  });

  // Vapi State
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isVapiSpeaking, setIsVapiSpeaking] = useState(false);
  const [vapiTranscript, setVapiTranscript] = useState<Array<{role: string, text: string}>>([]);

  useEffect(() => {
    // Initialize Vapi only once
    const vapiInstance = new Vapi('545a9cd7-3499-4141-b2fd-7401ae384a07');
    setVapi(vapiInstance);

    vapiInstance.on('call-start', () => {
      setStatus('vapi_active');
    });

    vapiInstance.on('call-end', () => {
      setStatus('idle');
      setIsVapiSpeaking(false);
    });

    vapiInstance.on('speech-start', () => {
      setIsVapiSpeaking(true);
    });

    vapiInstance.on('speech-end', () => {
      setIsVapiSpeaking(false);
    });

    vapiInstance.on('message', (message: any) => {
      if (message.type === 'transcript') {
        setVapiTranscript(prev => [...prev, {
          role: message.role,
          text: message.transcript
        }]);
      }
    });

    return () => {
      vapiInstance?.stop();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const callType = activeTab === 'usa' ? 'outbound' : 'inbound';
    
    // Webhook logic
    try {
      const response = await fetch('https://n8n.saadrasheed.life/webhook/lead-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          call_type: callType,
          submitted_at: new Date().toISOString()
        })
      });

      if (callType === 'outbound') {
        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } else {
        // Start Vapi Call for inbound
        if (vapi) {
          setVapiTranscript([]);
          vapi.start('903253e3-c5ac-42bf-baf1-c3f96d6e6145');
        }
      }
    } catch (err) {
      if (callType === 'outbound') {
        setStatus('error');
      } else {
        // Even if webhook fails, try to start the demo for inbound
        if (vapi) {
          setVapiTranscript([]);
          vapi.start('903253e3-c5ac-42bf-baf1-c3f96d6e6145');
        }
      }
    }
  };

  const endVapiCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

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
            LIVE DEMO: Calls are real
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Talk to the AI Agent.
          </h1>
          
          <p className="text-base sm:text-lg text-muted-foreground">
            Test out the AI calling system exactly how your leads would experience it.
          </p>
        </div>

        {status === 'success' ? (
          <div className="space-y-6 bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-6 sm:p-8 text-center animate-in fade-in zoom-in duration-500">
            <div className="relative mx-auto w-24 h-24 flex items-center justify-center mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
              <div className="absolute inset-2 rounded-full border-2 border-primary/40 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
              <div className="relative z-10 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <PhoneCall className="w-8 h-8 text-primary-glow animate-pulse" />
              </div>
            </div>
            
            <h2 className="text-3xl font-extrabold tracking-tight">Your phone is ringing.</h2>
            
            <p className="text-base text-foreground/90 mx-auto">
              Pick up the phone when the AI agent calls. Talk to it like you would a real estate agent calling about a property.
            </p>

            <p className="text-sm text-muted-foreground mt-4">
              Call not coming? Check you entered the right number.<br/>
              Calls may take up to 90 seconds on first run.
            </p>
          </div>
        ) : status === 'vapi_active' ? (
          <div className="space-y-6 bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-6 sm:p-8 flex flex-col animate-in fade-in zoom-in duration-500 h-[500px]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  {isVapiSpeaking && (
                     <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping"></div>
                  )}
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${isVapiSpeaking ? 'bg-primary' : 'bg-muted'}`}>
                     <Mic className={`w-6 h-6 ${isVapiSpeaking ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground">AI Assistant</h3>
                  <p className="text-sm text-primary-glow font-medium">
                    {isVapiSpeaking ? 'Speaking...' : 'Listening...'}
                  </p>
                </div>
              </div>
              <Button variant="destructive" size="sm" onClick={endVapiCall} className="rounded-full px-4">
                End Call
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-background/50 rounded-xl border border-border/50 flex flex-col-reverse">
              {vapiTranscript.length === 0 ? (
                <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                  Say something to start the conversation...
                </div>
              ) : (
                <div className="space-y-3">
                  {vapiTranscript.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                        msg.role === 'user' 
                          ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                          : 'bg-muted text-foreground rounded-tl-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-6 sm:p-8">
            <Tabs defaultValue="usa" onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-background/50 p-1 rounded-lg">
                <TabsTrigger value="usa" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">USA Number</TabsTrigger>
                <TabsTrigger value="intl" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Non-USA Number</TabsTrigger>
              </TabsList>
              
              <form onSubmit={handleSubmit} className="space-y-5">
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

                <TabsContent value="usa" className="mt-0 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="space-y-2 text-left">
                    <label htmlFor="phone" className="text-sm font-medium text-muted-foreground">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <div className="flex items-center justify-center px-3 border border-input bg-muted/50 rounded-md text-sm text-muted-foreground cursor-not-allowed whitespace-nowrap">
                        🇺🇸 US (+1)
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required={activeTab === 'usa'}
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 000-0000"
                        className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-destructive/80" />
                      <span className="text-destructive/80 font-medium">Outbound calling can only be tested if you have a USA number.</span>
                    </p>
                    <p className="text-xs text-primary-glow font-medium flex items-center gap-1.5 mt-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      This number will ring within 60 seconds.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="intl" className="mt-0 space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="space-y-2 text-left">
                    <label htmlFor="email" className="text-sm font-medium text-muted-foreground">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required={activeTab === 'intl'}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="flex h-11 w-full rounded-md border border-input bg-background/50 pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                      />
                    </div>
                    <p className="text-xs text-primary-glow font-medium flex items-center gap-1.5 mt-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      We will start a web-based audio call right in your browser.
                    </p>
                  </div>
                </TabsContent>

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
                    {status === 'loading' 
                      ? 'Initializing...' 
                      : activeTab === 'usa' 
                        ? 'Call Me Now →' 
                        : 'Start Web Call →'}
                  </Button>
                  
                  {status === 'error' && activeTab === 'usa' && (
                    <p className="text-sm text-destructive text-center mt-3 font-medium">
                      The demo system is currently busy. Please email saad@saadrasheed.life and I will trigger it manually for you.
                    </p>
                  )}
                </div>
              </form>
            </Tabs>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-primary-glow/70" />
            <span>Fast response times</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-primary-glow/70" />
            <span>Your information is never shared or spammed</span>
          </div>
        </div>

      </div>
    </section>
  );
}
