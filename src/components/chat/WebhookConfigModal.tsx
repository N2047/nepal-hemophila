"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Copy,
  Check,
  Server,
  Code,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { getChatConfig, saveChatConfig, resetSessionId, getSessionId } from "@/services/chatService";
import { ChatConfig } from "@/types/chat";

interface WebhookConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigSaved?: (config: ChatConfig) => void;
}

export function WebhookConfigModal({ isOpen, onClose, onConfigSaved }: WebhookConfigModalProps) {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isCustomWebhook, setIsCustomWebhook] = useState(false);
  const [testStatus, setTestStatus] = useState<"idle" | "testing" | "success" | "error">("idle");
  const [testMessage, setTestMessage] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [copiedPayload, setCopiedPayload] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const config = getChatConfig();
      setWebhookUrl(config.webhookUrl || "");
      setIsCustomWebhook(config.isCustomWebhook || false);
      setSessionId(getSessionId());
      setTestStatus("idle");
      setTestMessage("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const updated = saveChatConfig({
      webhookUrl: webhookUrl.trim(),
      isCustomWebhook: !!webhookUrl.trim(),
    });
    if (onConfigSaved) onConfigSaved(updated);
    onClose();
  };

  const handleTestConnection = async () => {
    if (!webhookUrl.trim()) {
      setTestStatus("error");
      setTestMessage("कृपया मान्य n8n Webhook URL प्रविष्ट गर्नुहोस् (Please enter a valid webhook URL).");
      return;
    }

    setTestStatus("testing");
    setTestMessage("Testing connection to n8n Webhook...");

    try {
      const testPayload = {
        action: "testConnection",
        sessionId,
        chatInput: "नमस्ते! NHS Chatbot test connection.",
        message: "नमस्ते! NHS Chatbot test connection.",
        language: "np",
        timestamp: new Date().toISOString(),
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Test connection ping from NHS Portal",
          sessionId,
          language: "np",
          customWebhookUrl: webhookUrl.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setTestStatus("success");
        if (data.source === "n8n") {
          setTestMessage("✅ n8n Webhook सँग सफलतापूर्वक सम्पर्क स्थापित भयो! (Connected directly to n8n)");
        } else {
          setTestMessage("ℹ️ n8n बाट सन्देश प्राप्त भयो तर Fallback इन्जिन सक्रिय छ।");
        }
      } else {
        setTestStatus("error");
        setTestMessage(`❌ जडान असफल भयो: ${data.error || "Response failed"}`);
      }
    } catch (e: any) {
      setTestStatus("error");
      setTestMessage(`❌ नेटवर्क त्रुटि: ${e.message || "Failed to reach endpoint"}`);
    }
  };

  const handleResetSession = () => {
    const newId = resetSessionId();
    setSessionId(newId);
  };

  const sampleN8nPayload = JSON.stringify(
    {
      action: "sendMessage",
      sessionId: "session_12345",
      chatInput: "फ्याक्टर ८ कहाँ पाइन्छ?",
      language: "np",
      timestamp: "2026-09-02T20:30:00.000Z",
    },
    null,
    2
  );

  const copySamplePayload = () => {
    navigator.clipboard.writeText(sampleN8nPayload);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-blue-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                n8n Webhook Backend सेटिङहरू
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Connect AI Agent / n8n Workflow Webhook
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Input field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              n8n Webhook URL (POST Endpoint)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <LinkIcon className="w-4 h-4" />
              </div>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-n8n.instance/webhook/nhs-ai-agent"
                className="w-full pl-9 pr-24 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testStatus === "testing" || !webhookUrl.trim()}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors disabled:opacity-50"
              >
                {testStatus === "testing" ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                )}
                Test
              </button>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              तपाईंको n8n मा बनेको Webhook node (HTTP POST method) को URL यहाँ राख्नुहोस्।
            </p>
          </div>

          {/* Test Status feedback */}
          {testStatus !== "idle" && (
            <div
              className={`p-3 rounded-xl flex items-start gap-2.5 text-xs ${
                testStatus === "success"
                  ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                  : testStatus === "error"
                  ? "bg-red-50 text-red-800 dark:bg-red-950/40 dark:text-red-300 border border-red-200 dark:border-red-800"
                  : "bg-blue-50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
              }`}
            >
              {testStatus === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              ) : testStatus === "error" ? (
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
              ) : (
                <RefreshCw className="w-4 h-4 shrink-0 text-blue-600 dark:text-blue-400 animate-spin mt-0.5" />
              )}
              <div className="flex-1 font-medium">{testMessage}</div>
            </div>
          )}

          {/* Session ID info */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Session Memory ID
              </span>
              <code className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                {sessionId}
              </code>
            </div>
            <button
              type="button"
              onClick={handleResetSession}
              title="Reset AI Memory Session"
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Memory
            </button>
          </div>

          {/* Sample JSON Payload for n8n */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-primary" />
                n8n Webhook Payload Schema
              </span>
              <button
                type="button"
                onClick={copySamplePayload}
                className="text-[11px] text-primary hover:underline font-medium flex items-center gap-1"
              >
                {copiedPayload ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy JSON
                  </>
                )}
              </button>
            </div>
            <div className="bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-[11px] overflow-x-auto border border-slate-800">
              <pre>{sampleN8nPayload}</pre>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              n8n को Webhook node ले <code>POST</code> method मा माथिको payload पाउँछ र प्रतिक्रियामा <code>{`{ "output": "तपाईंको जवाफ..." }`}</code> फर्काउनुपर्छ।
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <button
            type="button"
            onClick={() => {
              setWebhookUrl("");
              saveChatConfig({ webhookUrl: "", isCustomWebhook: false });
              setTestStatus("idle");
              setTestMessage("");
            }}
            className="text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors"
          >
            Clear / Reset to Fallback
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              रद्द गर्नुहोस् (Cancel)
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary-light shadow-md transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              सुरक्षित गर्नुहोस् (Save)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
