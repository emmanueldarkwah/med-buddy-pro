import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, User, Loader2, Trash2, Pill, Calculator, AlertTriangle, Stethoscope, BookOpen, Sparkles, Bookmark, BookmarkCheck, History, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BottomNav } from '@/components/BottomNav';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

type Message = { 
  id?: string;
  role: 'user' | 'assistant'; 
  content: string;
  is_bookmarked?: boolean;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/pharmabot`;

const questionCategories = [
  {
    id: 'interactions',
    label: 'Drug Interactions',
    icon: AlertTriangle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
    questions: [
      "What happens if I take warfarin with aspirin?",
      "Can metformin be taken with alcohol?",
      "What are the interactions between SSRIs and MAOIs?",
      "Is it safe to combine ACE inhibitors with potassium supplements?",
    ]
  },
  {
    id: 'dosage',
    label: 'Dosage Calculations',
    icon: Calculator,
    color: 'text-info',
    bgColor: 'bg-info/10',
    questions: [
      "How do I calculate creatinine clearance using Cockcroft-Gault?",
      "What is the pediatric dose calculation formula?",
      "How do I convert IV to oral dosing for antibiotics?",
      "Calculate the infusion rate for dopamine at 5 mcg/kg/min",
    ]
  },
  {
    id: 'mechanisms',
    label: 'Drug Mechanisms',
    icon: Pill,
    color: 'text-drugs',
    bgColor: 'bg-drugs/10',
    questions: [
      "Explain how beta-blockers work",
      "What is the mechanism of action of statins?",
      "How do proton pump inhibitors reduce acid secretion?",
      "Explain the difference between ACE inhibitors and ARBs",
    ]
  },
  {
    id: 'clinical',
    label: 'Clinical Pearls',
    icon: Stethoscope,
    color: 'text-success',
    bgColor: 'bg-success/10',
    questions: [
      "What are the key counseling points for metformin?",
      "When should I recommend taking levothyroxine?",
      "What are the signs of digoxin toxicity?",
      "How do I counsel patients on warfarin therapy?",
    ]
  },
  {
    id: 'study',
    label: 'Study Help',
    icon: BookOpen,
    color: 'text-quizzes',
    bgColor: 'bg-quizzes/10',
    questions: [
      "List the classes of antihypertensive drugs",
      "What are the generations of cephalosporins and their coverage?",
      "Explain the differences between bactericidal and bacteriostatic antibiotics",
      "What are the key drug classes for diabetes management?",
    ]
  },
];

const quickPrompts = [
  { label: "Side effects", prompt: "What are the common side effects of" },
  { label: "Mechanism", prompt: "Explain the mechanism of action of" },
  { label: "Interactions", prompt: "What are the drug interactions with" },
  { label: "Dosing", prompt: "What is the standard dosing for" },
  { label: "Counseling", prompt: "Key counseling points for" },
];

export default function PharmaBotPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load chat history on mount
  useEffect(() => {
    if (user) {
      loadChatHistory();
    }
  }, [user]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const loadChatHistory = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading chat history:', error);
      return;
    }

    if (data) {
      setMessages(data.map(m => ({
        id: m.id,
        role: m.role as 'user' | 'assistant',
        content: m.content,
        is_bookmarked: m.is_bookmarked || false,
      })));
    }
  };

  const saveMessage = async (message: Message) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        user_id: user.id,
        role: message.role,
        content: message.content,
        is_bookmarked: message.is_bookmarked || false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving message:', error);
      return null;
    }

    return data;
  };

  const toggleBookmark = async (messageId: string, currentState: boolean) => {
    if (!user) {
      toast.error('Sign in to bookmark responses');
      return;
    }

    const { error } = await supabase
      .from('chat_messages')
      .update({ is_bookmarked: !currentState })
      .eq('id', messageId);

    if (error) {
      toast.error('Failed to update bookmark');
      return;
    }

    setMessages(prev => prev.map(m => 
      m.id === messageId ? { ...m, is_bookmarked: !currentState } : m
    ));

    toast.success(currentState ? 'Bookmark removed' : 'Response bookmarked');
  };

  const streamChat = async (allMessages: Message[]) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: allMessages.map(m => ({ role: m.role, content: m.content })) }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      if (resp.status === 429) {
        throw new Error("Rate limited. Please wait a moment and try again.");
      }
      if (resp.status === 402) {
        throw new Error("Service temporarily unavailable.");
      }
      throw new Error(errorData.error || "Failed to get response");
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant" && !last.id) {
                return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantContent } : m));
              }
              return [...prev, { role: "assistant", content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    return assistantContent;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Save user message
    if (user) {
      const savedUserMsg = await saveMessage(userMsg);
      if (savedUserMsg) {
        setMessages(prev => prev.map((m, i) => 
          i === prev.length - 1 && m.role === 'user' ? { ...m, id: savedUserMsg.id } : m
        ));
      }
    }

    try {
      const assistantContent = await streamChat(newMessages);
      
      // Save assistant message
      if (user && assistantContent) {
        const savedAssistantMsg = await saveMessage({ role: 'assistant', content: assistantContent });
        if (savedAssistantMsg) {
          setMessages(prev => prev.map((m, i) => 
            i === prev.length - 1 && m.role === 'assistant' ? { ...m, id: savedAssistantMsg.id } : m
          ));
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to get response');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt + " ");
  };

  const clearChat = async () => {
    if (user) {
      const { error } = await supabase
        .from('chat_messages')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        toast.error('Failed to clear chat history');
        return;
      }
    }
    setMessages([]);
    toast.success('Chat cleared');
  };

  const activeQuestions = activeCategory 
    ? questionCategories.find(c => c.id === activeCategory)?.questions || []
    : [];

  const bookmarkedMessages = messages.filter(m => m.is_bookmarked);

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl gradient-bot animate-pulse-soft">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">PharmaBot</h1>
                <p className="text-xs text-muted-foreground">AI Pharmacy Assistant</p>
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            {user && (
              <Button 
                variant={showHistory ? "default" : "ghost"} 
                size="icon" 
                onClick={() => setShowHistory(!showHistory)}
                className={showHistory ? "gradient-bot" : ""}
              >
                <History className="w-5 h-5" />
              </Button>
            )}
            {messages.length > 0 && (
              <Button variant="ghost" size="icon" onClick={clearChat}>
                <Trash2 className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Bookmarked Responses Sidebar */}
      {showHistory && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setShowHistory(false)}>
          <div 
            className="absolute right-0 top-0 bottom-0 w-80 bg-card border-l border-border shadow-lg animate-slide-in-right"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold flex items-center gap-2">
                <BookmarkCheck className="w-5 h-5 text-bot" />
                Saved Responses
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setShowHistory(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-80px)]">
              <div className="p-4 space-y-3">
                {bookmarkedMessages.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No saved responses yet. Tap the bookmark icon on any response to save it.
                  </p>
                ) : (
                  bookmarkedMessages.map((msg) => (
                    <div key={msg.id} className="p-3 rounded-xl bg-muted/50 border border-border/50">
                      <p className="text-sm line-clamp-4">{msg.content}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2 text-xs"
                        onClick={() => msg.id && toggleBookmark(msg.id, true)}
                      >
                        <Bookmark className="w-3 h-3 mr-1 fill-current" /> Remove
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}

      {/* Chat Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center px-4 animate-fade-in">
            {/* Hero Section */}
            <div className="text-center mb-6 mt-4">
              <div className="p-4 rounded-2xl gradient-bot mb-4 inline-block">
                <Bot className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-xl font-bold mb-2">Welcome to PharmaBot</h2>
              <p className="text-muted-foreground text-sm max-w-sm">
                Your AI pharmacy assistant. Ask about drugs, dosages, interactions, or any pharmacy-related questions.
              </p>
              {!user && (
                <p className="text-xs text-muted-foreground mt-2">
                  Sign in to save your chat history and bookmark responses.
                </p>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="w-full max-w-lg mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-bot" />
                <span className="text-sm font-medium">Quick prompts</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleQuickPrompt(item.prompt)}
                    className="px-3 py-1.5 rounded-full bg-bot/10 text-bot text-xs font-medium hover:bg-bot/20 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Tabs */}
            <div className="w-full max-w-lg mb-4">
              <p className="text-sm font-medium mb-3">Or explore by topic</p>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {questionCategories.map((category) => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(isActive ? null : category.id)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                        isActive
                          ? `${category.bgColor} ${category.color}`
                          : "bg-muted/50 text-muted-foreground hover:bg-muted"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Questions Grid */}
            <div className="w-full max-w-lg">
              {activeCategory ? (
                <div className="grid gap-2 animate-slide-up">
                  {activeQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => handleQuestionClick(question)}
                      className="text-left p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-sm border border-border/50"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid gap-2">
                  <p className="text-xs text-muted-foreground mb-1">Popular questions</p>
                  {[
                    "What are the common side effects of metformin?",
                    "Can I take ibuprofen with blood pressure medication?",
                    "How do I calculate pediatric doses?",
                    "Explain the mechanism of action of antibiotics",
                  ].map((question) => (
                    <button
                      key={question}
                      onClick={() => handleQuestionClick(question)}
                      className="text-left p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-sm border border-border/50"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-2xl mx-auto">
            {messages.map((msg, i) => (
              <div
                key={msg.id || i}
                className={cn(
                  "flex gap-3 animate-slide-up",
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {msg.role === 'assistant' && (
                  <div className="p-2 rounded-xl gradient-bot h-fit shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl",
                    msg.role === 'user'
                      ? 'gradient-primary text-white p-3'
                      : 'bg-muted'
                  )}
                >
                  <p className={cn(
                    "text-sm whitespace-pre-wrap leading-relaxed",
                    msg.role === 'assistant' && "p-3 pb-1"
                  )}>{msg.content}</p>
                  {msg.role === 'assistant' && msg.id && (
                    <div className="px-2 pb-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => toggleBookmark(msg.id!, msg.is_bookmarked || false)}
                      >
                        <Bookmark className={cn(
                          "w-3 h-3 mr-1",
                          msg.is_bookmarked && "fill-current text-bot"
                        )} />
                        {msg.is_bookmarked ? 'Saved' : 'Save'}
                      </Button>
                    </div>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="p-2 rounded-xl bg-muted h-fit shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex gap-3 justify-start animate-slide-up">
                <div className="p-2 rounded-xl gradient-bot h-fit">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="p-3 rounded-2xl bg-muted flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-xs text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input Area */}
      <div className="fixed bottom-20 left-0 right-0 p-4 glass border-t border-border/50">
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-2xl mx-auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask PharmaBot anything..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()} className="gradient-bot">
            <Send className="w-4 h-4" />
          </Button>
        </form>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          For educational purposes only. Always verify with official sources.
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
