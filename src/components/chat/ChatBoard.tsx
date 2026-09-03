"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Bot,
  User,
  Sparkles,
  PhoneCall,
  Volume2,
  VolumeX,
  Trash2,
  Download,
  Settings,
  Maximize2,
  Minimize2,
  X,
  Mic,
  MicOff,
  Copy,
  Check,
  AlertTriangle,
  RefreshCw,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { ChatMessage, ChatConfig } from "@/types/chat";
import {
  getSavedChatHistory,
  saveChatHistory,
  clearChatHistory,
  getChatConfig,
  saveChatConfig,
  sendChatMessage,
  playChime,
  downloadTranscript,
} from "@/services/chatService";
import { useLanguage } from "@/context/LanguageContext";
import { WebhookConfigModal } from "./WebhookConfigModal";

interface ChatBoardProps {
  isFloating?: boolean;
  onClose?: () => void;
  className?: string;
}

export function ChatBoard({ isFloating = false, onClose, className = "" }: ChatBoardProps) {
  const { lang, isNepali } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<ChatConfig>(getChatConfig());
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const speechRecognitionRef = useRef<any>(null);

  // Initialize Welcome Message or Loaded History
  useEffect(() => {
    const history = getSavedChatHistory();
    const currentConfig = getChatConfig();
    setConfig(currentConfig);

    if (history.length > 0) {
      setMessages(history);
    } else {
      const welcomeMessage: ChatMessage = {
        id: "msg_welcome",
        role: "assistant",
        content: isNepali
          ? "नमस्ते! म **नेपाल हेमोफिलिया सोसाइटी (NHS) को AI सहायक** हुँ।\n\nम तपाईंलाई रक्तस्राव आपतकालीन सल्लाह, **Factor VIII / IX** उपलब्धता, नजिकको उपचार केन्द्र र बिरामी दर्ता सम्बन्धी जानकारी दिन सक्छु। मलाई केही सोध्न तलका मुख्य विकल्पहरू थिच्नुहोस् वा आफ्नो प्रश्न लेख्नुहोस्।"
          : "Hello! I am the **Nepal Hemophilia Society (NHS) AI Assistant** connected to our backend intelligent workflows.\n\nI can assist you with acute bleeding protocols, **Factor VIII / IX** availability, HTC treatment centers, and patient registry. Ask me a question or pick an option below.",
        timestamp: new Date().toISOString(),
        quickReplies: isNepali
          ? [
              "🚨 आपतकालीन रक्तस्राव सल्लाह",
              "🩸 फ्याक्टर उपलब्धता कहाँ छ?",
              "🏥 नजिकैको उपचार केन्द्र",
              "📋 बिरामी दर्ता कसरी गर्ने?"
            ]
          : [
              "🚨 Emergency Bleeding Protocol",
              "🩸 Factor VIII/IX Availability",
              "🏥 Nearest Treatment Center",
              "📋 Patient Registration"
            ],
      };
      setMessages([welcomeMessage]);
    }
  }, [isNepali]);

  // Auto-scroll on new message
  useEffect(() => {
    if (config.autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, config.autoScroll]);

  // Handle Speech Recognition (Web Speech API)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = isNepali ? "ne-NP" : "en-US";

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputMessage((prev) => (prev ? prev + " " + transcript : transcript));
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        speechRecognitionRef.current = recognition;
      }
    }
  }, [isNepali]);

  const toggleVoiceInput = () => {
    if (!speechRecognitionRef.current) {
      alert(
        isNepali
          ? "तपाईंको ब्राउजरले आवाज पहिचान (Speech Recognition) समर्थन गर्दैन।"
          : "Speech Recognition is not supported by your browser."
      );
      return;
    }

    if (isListening) {
      speechRecognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        speechRecognitionRef.current.lang = isNepali ? "ne-NP" : "en-US";
        speechRecognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  // Text-to-Speech (Read aloud)
  const speakMessage = (id: string, text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown before speaking
    const cleanText = text.replace(/[*#_`\[\]()]/g, "").replace(/tel:\S+/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = isNepali ? "ne-NP" : "en-US";
    utterance.rate = 1.0;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isLoading) return;

    const userMessageId = "msg_user_" + Date.now();
    const newUserMessage: ChatMessage = {
      id: userMessageId,
      role: "user",
      content: query,
      timestamp: new Date().toISOString(),
      status: "sent",
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    saveChatHistory(updatedMessages);
    setInputMessage("");
    setIsLoading(true);
    playChime("send");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const response = await sendChatMessage({
        message: query,
        language: lang === "np" ? "np" : "en",
        history: updatedMessages,
        customWebhookUrl: config.webhookUrl || undefined,
      });

      const botMessageId = "msg_bot_" + Date.now();
      const newBotMessage: ChatMessage = {
        id: botMessageId,
        role: "assistant",
        content: response.text,
        timestamp: new Date().toISOString(),
        quickReplies: response.quickReplies,
        isEmergency: response.isEmergency,
        status: "sent",
      };

      const finalMessages = [...updatedMessages, newBotMessage];
      setMessages(finalMessages);
      saveChatHistory(finalMessages);
      playChime(response.isEmergency ? "error" : "receive");
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: "msg_err_" + Date.now(),
        role: "assistant",
        content: isNepali
          ? "⚠️ सन्देश पठाउन सकिएन। आपतकालीन अवस्थाका लागि वीर अस्पताल [०१-४२२१११९](tel:014221119) मा सम्पर्क गर्नुहोस्।"
          : "⚠️ Could not connect to chat server. For emergency call [+977-1-4221119](tel:+97714221119).",
        timestamp: new Date().toISOString(),
        status: "error",
      };
      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
      saveChatHistory(finalMessages);
      playChime("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    if (confirm(isNepali ? "के तपाईं च्याट मेटाउन चाहनुहुन्छ?" : "Clear all chat messages?")) {
      clearChatHistory();
      setMessages([
        {
          id: "msg_reset_" + Date.now(),
          role: "assistant",
          content: isNepali
            ? "च्याट इतिहास मेटाइयो। नयाँ प्रश्न सोध्नुहोस्।"
            : "Chat history cleared. How can I assist you?",
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  };

  const copyMessageText = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleSound = () => {
    const updated = saveChatConfig({ soundEnabled: !config.soundEnabled });
    setConfig(updated);
  };

  // Render text with Markdown formatting support
  const renderFormattedText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // Bold rendering
      let parsedLine: React.ReactNode = line;

      // Check if line is header or bullet
      const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
      const isNumbered = /^\d+\.\s/.test(line.trim());

      // Simple markdown parser for bold, links, tel
      const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
      const elements = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} className="font-semibold text-slate-900 dark:text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
          const match = part.match(/\[(.*?)\]\((.*?)\)/);
          if (match) {
            const label = match[1];
            const href = match[2];
            const isTel = href.startsWith("tel:");
            return (
              <a
                key={pIdx}
                href={href}
                target={isTel ? undefined : "_blank"}
                rel="noreferrer"
                className={`inline-flex items-center gap-1 font-semibold underline underline-offset-2 ${
                  isTel
                    ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-1.5 py-0.5 rounded-md hover:bg-red-100"
                    : "text-primary dark:text-blue-400 hover:text-primary-light"
                }`}
              >
                {isTel && <PhoneCall className="w-3 h-3 inline shrink-0" />}
                {label}
                {!isTel && <ExternalLink className="w-2.5 h-2.5 inline opacity-70" />}
              </a>
            );
          }
        }
        return part;
      });

      return (
        <p
          key={idx}
          className={`${
            isBullet || isNumbered ? "ml-2.5 my-1 flex items-start gap-1.5" : "my-1"
          } leading-relaxed`}
        >
          {elements}
        </p>
      );
    });
  };

  return (
    <div
      className={`flex flex-col bg-white dark:bg-slate-900 overflow-hidden transition-all duration-300 ${
        isFloating
          ? isExpanded
            ? "fixed inset-2 sm:inset-6 z-50 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800"
            : "fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[82vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800"
          : `rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl ${
              isExpanded ? "fixed inset-4 z-50" : "h-[650px] w-full"
            }`
      } ${className}`}
    >
      {/* Top Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-primary to-primary-light text-white flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-primary ${
                config.webhookUrl ? "bg-emerald-400 animate-pulse" : "bg-sky-400"
              }`}
              title={config.webhookUrl ? "n8n Webhook Live" : "NHS Knowledge Mode"}
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-bold text-sm sm:text-base leading-tight">
                {isNepali ? "NHS AI सहयात्री" : "NHS AI Assistant"}
              </h2>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 text-white font-medium">
                {config.webhookUrl ? "n8n Webhook" : "NHS Engine"}
              </span>
            </div>
            <p className="text-[11px] text-white/80 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              {isNepali ? "२४/७ हेमोफिलिया सहयोग" : "24/7 Hemophilia Support"}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 text-white/90">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={config.soundEnabled ? "Mute Sound" : "Enable Sound"}
            className="p-1.5 rounded-lg hover:bg-white/15 transition-colors"
          >
            {config.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Webhook Config Modal Button */}
          <button
            onClick={() => setIsConfigOpen(true)}
            title="n8n Webhook Settings"
            className="p-1.5 rounded-lg hover:bg-white/15 transition-colors relative"
          >
            <Settings className="w-4 h-4" />
            {config.webhookUrl && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            )}
          </button>

          {/* Export Transcript */}
          <button
            onClick={() => downloadTranscript(messages)}
            title="Download Chat Transcript"
            className="p-1.5 rounded-lg hover:bg-white/15 transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Clear Chat */}
          <button
            onClick={handleClearChat}
            title="Clear Chat History"
            className="p-1.5 rounded-lg hover:bg-white/15 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {/* Expand / Minimize */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Collapse" : "Expand"}
            className="p-1.5 rounded-lg hover:bg-white/15 transition-colors hidden sm:block"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close button (if floating) */}
          {onClose && (
            <button
              onClick={onClose}
              title="Close Chat"
              className="p-1.5 rounded-lg hover:bg-white/15 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Emergency Quick Helpline Bar */}
      <div className="bg-red-50 dark:bg-red-950/40 border-b border-red-100 dark:border-red-900/50 px-4 py-1.5 flex items-center justify-between text-[11px] text-red-700 dark:text-red-300">
        <span className="flex items-center gap-1.5 font-medium">
          <AlertTriangle className="w-3.5 h-3.5 text-red-600 animate-pulse shrink-0" />
          {isNepali ? "आपतकालीन रक्तस्राव हटलाइन:" : "Emergency Bleed Hotline:"}
        </span>
        <a
          href="tel:014221119"
          className="font-bold underline hover:text-red-900 dark:hover:text-red-100 flex items-center gap-1"
        >
          <PhoneCall className="w-3 h-3" />
          01-4221119 (वीर अस्पताल)
        </a>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm bg-slate-50/60 dark:bg-slate-950/40">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"} group`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  isUser
                    ? "bg-slate-800 text-white dark:bg-slate-700"
                    : msg.isEmergency
                    ? "bg-red-600 text-white"
                    : "bg-primary text-white"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-3 shadow-sm relative ${
                  isUser
                    ? "bg-primary text-white rounded-tr-sm"
                    : msg.isEmergency
                    ? "bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-slate-900 dark:text-slate-100 rounded-tl-sm"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-tl-sm"
                }`}
              >
                {/* Emergency banner badge */}
                {msg.isEmergency && !isUser && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-400 mb-2 pb-1.5 border-b border-red-200 dark:border-red-800">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {isNepali ? "आपतकालीन स्वास्थ्य सूचना" : "Emergency Clinical Alert"}
                  </div>
                )}

                {/* Content */}
                <div className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                  {isUser ? msg.content : renderFormattedText(msg.content)}
                </div>

                {/* Quick replies pill buttons (if attached) */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-wrap gap-1.5">
                    {msg.quickReplies.map((reply, rIdx) => (
                      <button
                        key={rIdx}
                        onClick={() => handleSendMessage(reply)}
                        disabled={isLoading}
                        className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-primary hover:text-white dark:bg-slate-700 dark:hover:bg-primary text-slate-700 dark:text-slate-200 text-[11px] font-medium transition-all flex items-center gap-1 border border-slate-200 dark:border-slate-600 disabled:opacity-50"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                        {reply}
                      </button>
                    ))}
                  </div>
                )}

                {/* Message Meta & Action Toolbar */}
                <div
                  className={`mt-1.5 flex items-center justify-between gap-2 text-[10px] ${
                    isUser ? "text-blue-100" : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  <span>
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  {!isUser && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      {/* Copy message */}
                      <button
                        onClick={() => copyMessageText(msg.id, msg.content)}
                        title="Copy text"
                        className="p-1 hover:text-slate-700 dark:hover:text-slate-200 rounded"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>

                      {/* Text to Speech */}
                      <button
                        onClick={() => speakMessage(msg.id, msg.content)}
                        title="Listen to message"
                        className="p-1 hover:text-slate-700 dark:hover:text-slate-200 rounded"
                      >
                        {speakingId === msg.id ? (
                          <VolumeX className="w-3 h-3 text-red-500 animate-pulse" />
                        ) : (
                          <Volume2 className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {config.webhookUrl
                    ? isNepali
                      ? "n8n Webhook AI ले विश्लेषण गर्दैछ..."
                      : "n8n AI Workflow is processing..."
                    : isNepali
                    ? "NHS AI जवाफ तयार गर्दैछ..."
                    : "NHS AI is typing..."}
                </span>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Fast Actions Bar (Always visible above input) */}
      <div className="px-3 py-1.5 bg-slate-100/70 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-xs">
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <HelpCircle className="w-3 h-3" />
          {isNepali ? "द्रुत प्रश्न:" : "Suggested:"}
        </span>
        <button
          onClick={() => handleSendMessage(isNepali ? "रक्तस्राव प्राथमिक उपचार R.I.C.E. के हो?" : "Emergency R.I.C.E. Protocol")}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-primary hover:border-primary text-[11px] font-medium border border-slate-200 dark:border-slate-600 shrink-0 transition-colors"
        >
          🩸 {isNepali ? "R.I.C.E. उपचार विधि" : "R.I.C.E. Protocol"}
        </button>
        <button
          onClick={() => handleSendMessage(isNepali ? "फ्याक्टर ८ र ९ कहाँ पाइन्छ?" : "Where to get Factor VIII/IX stocks?")}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-primary hover:border-primary text-[11px] font-medium border border-slate-200 dark:border-slate-600 shrink-0 transition-colors"
        >
          🏥 {isNepali ? "फ्याक्टर कहाँ पाइन्छ?" : "Factor Stocks"}
        </button>
        <button
          onClick={() => handleSendMessage(isNepali ? "वीर अस्पताल र अन्य उपचार केन्द्रहरूको सूची" : "Hemophilia Treatment Centers list")}
          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-primary hover:border-primary text-[11px] font-medium border border-slate-200 dark:border-slate-600 shrink-0 transition-colors"
        >
          📍 {isNepali ? "उपचार केन्द्रहरू" : "Treatment Centers"}
        </button>
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-end gap-2"
        >
          {/* Voice input button */}
          <button
            type="button"
            onClick={toggleVoiceInput}
            title={isListening ? "Listening... Click to stop" : "Speak to type"}
            className={`p-2.5 rounded-xl border transition-all shrink-0 ${
              isListening
                ? "bg-red-500 text-white border-red-600 animate-pulse ring-2 ring-red-400"
                : "border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Area */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder={
                isNepali
                  ? "हेमोफिलिया, फ्याक्टर वा आकस्मिक सल्लाह सम्बन्धी सोध्नुहोस्..."
                  : "Ask about hemophilia, factor stocks, or emergency guidance..."
              }
              className="w-full px-3.5 py-2.5 max-h-28 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          {/* Send button */}
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="p-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shrink-0 flex items-center justify-center"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>

        {/* Footer Status & Settings Link */}
        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 px-1">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            {config.webhookUrl ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                Live n8n Webhook Connected
              </span>
            ) : (
              <span>NHS Medical Knowledge Base</span>
            )}
          </span>
          <button
            onClick={() => setIsConfigOpen(true)}
            className="hover:underline flex items-center gap-0.5 text-primary dark:text-blue-400 font-medium"
          >
            <Settings className="w-2.5 h-2.5" />
            {isNepali ? "n8n Webhook जोड्नुहोस्" : "Configure n8n Webhook"}
          </button>
        </div>
      </div>

      {/* Webhook Settings Modal */}
      <WebhookConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onConfigSaved={(newCfg) => setConfig(newCfg)}
      />
    </div>
  );
}
