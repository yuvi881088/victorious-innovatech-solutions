import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Bot,
  RotateCcw,
  User,
  ArrowRight
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { COMPANY_INFO, SERVICES_DATA, PORTFOLIO_DATA } from '../data/mockData';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionLink?: {
    label: string;
    sectionId?: string;
    externalUrl?: string;
  };
}

interface ChatAssistantProps {
  onNavigateToSection: (sectionId: string) => void;
}

const DEFAULT_SUGGESTIONS = [
  'What services do you offer?',
  'How do I request a quote?',
  'Tell me about the CEO & Team',
  'Where are you located & contact info?',
  'Show portfolio & recent work'
];

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ onNavigateToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMsgId, setStreamingMsgId] = useState<string | null>(null);
  const [unreadPrompt, setUnreadPrompt] = useState(true);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Hello! 👋 Welcome to Victorious Innovatech Solutions. I'm your digital assistant. How can I help you elevate your web, mobile, or digital project today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: DEFAULT_SUGGESTIONS
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadPrompt(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, messages, isTyping]);

  const generateSystemPrompt = () => {
    const services = SERVICES_DATA.map(s => `- ${s.title}: ${s.shortDescription}`).join('\n');
    const portfolio = PORTFOLIO_DATA.map(p => `- ${p.title} (${p.categoryLabel})`).join('\n');
    return `You are Victorious Assistant, an AI representative for Victorious Innovatech Solutions.
Company Info:
${COMPANY_INFO.name} - ${COMPANY_INFO.tagline}
Address: ${COMPANY_INFO.address}
Email: ${COMPANY_INFO.email}
Phone: ${COMPANY_INFO.phone}

Our Core Services:
${services}

Our Portfolio Highlights:
${portfolio}

Guidelines:
- Keep answers concise (max 3-4 sentences), professional, and friendly.
- Use emojis occasionally.
- Do not make up services or projects we don't offer.
- If asked about pricing, mention we offer custom quotes based on requirements.
- Suggest contacting us via WhatsApp or Contact Form for detailed inquiries.`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputQuery('');
    setIsTyping(true);

    try {
      const apiMessages = [
        { role: 'system', content: generateSystemPrompt() },
        ...newMessages.map(m => ({
          role: m.sender === 'bot' ? 'assistant' : 'user',
          content: m.text
        }))
      ];

      const response = await fetch('/api/chat.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: apiMessages
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const botResponseText = data.message?.content || data.reply || data.text || '';

      setIsTyping(false);

      const botMsgId = `bot-${Date.now()}`;
      const botMessage: Message = {
        id: botMsgId,
        sender: 'bot',
        text: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);
      setStreamingMsgId(botMsgId);

      // Stream word-by-word and line-by-line typewriter effect
      const tokens = botResponseText.split(/(\s+)/);
      let currentText = '';
      for (let i = 0; i < tokens.length; i++) {
        currentText += tokens[i];
        const snapshot = currentText;
        setMessages((prev) =>
          prev.map((m) => (m.id === botMsgId ? { ...m, text: snapshot } : m))
        );
        if (tokens[i].includes('\n')) {
          await new Promise((r) => setTimeout(r, 65));
        } else if (tokens[i].trim().length > 0) {
          await new Promise((r) => setTimeout(r, 18));
        }
      }
      setStreamingMsgId(null);
    } catch (error) {
      console.error('Error calling AI API:', error);
      setIsTyping(false);

      const botMsgId = `bot-${Date.now()}`;
      const fallbackText = `Hello! 👋 At **${COMPANY_INFO.name}**, we specialize in **Web & Mobile App Development, UI/UX Design, and E-Commerce Solutions**.\n\nPlease feel free to reach out to our engineers directly on [WhatsApp at ${COMPANY_INFO.phoneFormatted}](${COMPANY_INFO.whatsappUrl}) or via our [Contact Form](/contact) for instant project estimates!`;

      const fallbackMessage: Message = {
        id: botMsgId,
        sender: 'bot',
        text: '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMessage]);
      setStreamingMsgId(botMsgId);

      const tokens = fallbackText.split(/(\s+)/);
      let currentText = '';
      for (let i = 0; i < tokens.length; i++) {
        currentText += tokens[i];
        const snapshot = currentText;
        setMessages((prev) =>
          prev.map((m) => (m.id === botMsgId ? { ...m, text: snapshot } : m))
        );
        if (tokens[i].includes('\n')) {
          await new Promise((r) => setTimeout(r, 65));
        } else if (tokens[i].trim().length > 0) {
          await new Promise((r) => setTimeout(r, 18));
        }
      }
      setStreamingMsgId(null);
    } finally {
      setIsTyping(false);
      setStreamingMsgId(null);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: `Hello! 👋 How can I help you with your web or mobile development project today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: DEFAULT_SUGGESTIONS
      }
    ]);
  };

  return (
    <>
      {/* Floating Toggle Button & Unread Bubble */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
        <AnimatePresence>
          {!isOpen && unreadPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.85 }}
              animate={{ 
                opacity: 1, 
                y: [0, -4, 0], 
                scale: 1 
              }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              transition={{ 
                y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
                duration: 0.35 
              }}
              whileHover={{ scale: 1.04 }}
              className="mb-3 bg-white/95 backdrop-blur-md border border-slate-200/90 text-slate-800 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 cursor-pointer hover:border-orange-400 transition-colors"
              onClick={() => setIsOpen(true)}
            >
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </div>
              <div className="text-xs">
                <span className="font-bold text-slate-900">Need help?</span> Ask our AI Assistant
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setUnreadPrompt(false);
                }}
                className="text-slate-400 hover:text-slate-600 p-0.5 transition-colors"
                aria-label="Dismiss message"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ambient Glowing Aura around button */}
        <div className="relative">
          {!isOpen && (
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.35, 0.7, 0.35]
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 blur-md pointer-events-none"
            />
          )}

          <motion.button
            id="chatbot-toggle-button"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.92 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 cursor-pointer ${
              isOpen
                ? 'bg-slate-900 text-white shadow-slate-900/40 border border-slate-700'
                : 'bg-gradient-to-tr from-[#EA580C] via-orange-500 to-amber-500 text-white shadow-orange-500/50'
            }`}
            aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
          >
            {isOpen ? (
              <motion.div
                key="close-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat-icon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageCircle className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-xs" />
              </motion.div>
            )}
          </motion.button>
        </div>
      </div>

      {/* Chat Window with Rich Framer Motion animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-assistant-window"
            initial={{ opacity: 0, y: 40, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.88 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[82vh] bg-white rounded-3xl shadow-2xl shadow-slate-950/20 border border-slate-200/80 flex flex-col overflow-hidden font-['Outfit',sans-serif]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-700/50 relative overflow-hidden">
              {/* Subtle orange accent glow in header */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500/20 rounded-full blur-xl pointer-events-none" />

              <div className="flex items-center gap-3 relative z-10">
                <motion.div 
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-md shadow-orange-500/25"
                >
                  <Bot className="w-5 h-5 text-white" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white tracking-wide">
                      Victorious Assistant
                    </h3>
                    <span className="bg-orange-500/20 text-orange-400 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border border-orange-500/30 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>AI Live</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Online • Quick Answers & Solutions
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 relative z-10">
                <motion.button
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.35 }}
                  onClick={handleResetChat}
                  title="Restart conversation"
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
                  aria-label="Restart chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </motion.button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors cursor-pointer"
                  aria-label="Close assistant"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Contact Bar */}
            <div className="bg-slate-50/90 px-4 py-2 border-b border-slate-200/80 flex items-center justify-between text-xs text-slate-600 backdrop-blur-xs">
              <span className="flex items-center gap-1.5 font-medium text-[11px]">
                <MapPin className="w-3 h-3 text-[#EA580C]" /> Indore, India
              </span>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  const isMobile = typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                  const text = encodeURIComponent("Hello Victorious Innovatech Solutions, I would like to inquire about your services.");
                  const targetUrl = isMobile
                    ? `https://api.whatsapp.com/send?phone=917970292029&text=${text}`
                    : `https://web.whatsapp.com/send?phone=917970292029&text=${text}`;
                  window.open(targetUrl, '_blank', 'noopener,noreferrer');
                }}
                className="text-[#25D366] hover:text-[#20bd5a] font-bold flex items-center gap-1.5 text-[11px] transition-colors cursor-pointer"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-slate-50/80 to-slate-100/40">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[88%]">
                    {msg.sender === 'bot' && (
                      <div className="w-7 h-7 rounded-xl bg-orange-500/10 text-[#EA580C] flex items-center justify-center flex-shrink-0 mb-1 border border-orange-200 shadow-2xs">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-[#EA580C] to-orange-500 text-white rounded-br-none shadow-md shadow-orange-500/20 font-medium'
                          : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <div className="whitespace-pre-line">
                        {msg.text}
                        {streamingMsgId === msg.id && (
                          <span className="inline-block w-1.5 h-3.5 ml-1 bg-orange-500 animate-pulse align-middle" />
                        )}
                      </div>

                      {/* Action Link Button if available */}
                      {msg.actionLink && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center">
                          {msg.actionLink.sectionId ? (
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => {
                                onNavigateToSection(msg.actionLink!.sectionId!);
                                setIsOpen(false);
                              }}
                              className="inline-flex items-center gap-1.5 bg-orange-50 hover:bg-orange-100 text-[#EA580C] font-bold text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs"
                            >
                              <span>{msg.actionLink.label}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </motion.button>
                          ) : msg.actionLink.externalUrl ? (
                            <motion.a
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              href={msg.actionLink.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs"
                            >
                              <span>{msg.actionLink.label}</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </motion.a>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-400 mt-1 px-1 font-medium">
                    {msg.timestamp}
                  </span>

                  {/* Dynamic Suggestions Chips with Motion */}
                  {msg.sender === 'bot' && streamingMsgId !== msg.id && msg.suggestions && msg.suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.25 }}
                      className="mt-2.5 flex flex-wrap gap-1.5 max-w-[92%]"
                    >
                      {msg.suggestions.map((sug, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.04, y: -1 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => handleSendMessage(sug)}
                          className="bg-white hover:bg-orange-50 hover:border-orange-300 text-slate-700 hover:text-[#EA580C] border border-slate-200 text-[11px] font-semibold px-2.5 py-1 rounded-full transition-all duration-200 text-left shadow-2xs cursor-pointer"
                        >
                          {sug}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator with Framer Motion wave */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded-xl bg-orange-500/10 text-[#EA580C] flex items-center justify-center flex-shrink-0 border border-orange-200 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-slate-200/80 rounded-2xl rounded-bl-none px-3.5 py-2.5 shadow-xs flex items-center gap-1.5">
                    <motion.span
                      animate={{ y: [0, -4, 0], scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                    />
                    <motion.span
                      animate={{ y: [0, -4, 0], scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.18 }}
                      className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                    />
                    <motion.span
                      animate={{ y: [0, -4, 0], scale: [1, 1.3, 1] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.36 }}
                      className="w-1.5 h-1.5 bg-orange-500 rounded-full"
                    />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about services, pricing, team..."
                className="flex-1 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:bg-white transition-colors"
                id="chatbot-input-field"
              />
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                type="submit"
                disabled={!inputQuery.trim()}
                className="bg-gradient-to-r from-[#EA580C] to-orange-500 hover:from-[#C2410C] hover:to-orange-600 disabled:opacity-40 disabled:hover:from-[#EA580C] text-white p-2.5 rounded-xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
