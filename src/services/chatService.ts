import { ChatMessage, ChatConfig } from "@/types/chat";

const STORAGE_KEYS = {
  SESSION_ID: "nhs_chat_session_id",
  HISTORY: "nhs_chat_history",
  CONFIG: "nhs_chat_config",
};

export const DEFAULT_CONFIG: ChatConfig = {
  webhookUrl: "",
  isCustomWebhook: false,
  soundEnabled: true,
  autoScroll: true,
  language: "np",
};

export function getSessionId(): string {
  if (typeof window === "undefined") return "server_session";
  let sessionId = localStorage.getItem(STORAGE_KEYS.SESSION_ID);
  if (!sessionId) {
    sessionId = "nhs_sess_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now();
    localStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
  }
  return sessionId;
}

export function resetSessionId(): string {
  if (typeof window === "undefined") return "server_session";
  const newSessionId = "nhs_sess_" + Math.random().toString(36).substring(2, 9) + "_" + Date.now();
  localStorage.setItem(STORAGE_KEYS.SESSION_ID, newSessionId);
  return newSessionId;
}

export function getSavedChatHistory(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveChatHistory(history: ChatMessage[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history.slice(-30))); // Keep last 30
  } catch (e) {
    console.error("Failed to save chat history", e);
  }
}

export function clearChatHistory(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.HISTORY);
}

export function getChatConfig(): ChatConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONFIG);
    return raw ? { ...DEFAULT_CONFIG, ...JSON.parse(raw) } : DEFAULT_CONFIG;
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveChatConfig(config: Partial<ChatConfig>): ChatConfig {
  const current = getChatConfig();
  const updated = { ...current, ...config };
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(updated));
  }
  return updated;
}

// Web Audio API Chime synthesizer (no external audio files required)
export function playChime(type: "send" | "receive" | "error" = "receive"): void {
  if (typeof window === "undefined") return;
  const config = getChatConfig();
  if (!config.soundEnabled) return;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === "send") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now); // A4
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1); // A5
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === "receive") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(150, now + 0.15);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    }
  } catch {
    // Ignore audio context errors if browser blocked auto-play
  }
}

// Send message to API route or direct n8n endpoint
export async function sendChatMessage(params: {
  message: string;
  language: "en" | "np";
  history: ChatMessage[];
  customWebhookUrl?: string;
}): Promise<{
  text: string;
  quickReplies?: string[];
  isEmergency?: boolean;
  source?: string;
}> {
  const sessionId = getSessionId();

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: params.message,
      sessionId,
      language: params.language,
      history: params.history.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      customWebhookUrl: params.customWebhookUrl || undefined,
    }),
  });

  if (!res.ok) {
    throw new Error(`Server returned HTTP ${res.status}`);
  }

  const data = await res.json();
  return {
    text: data.text || "माफ गर्नुहोस्, कुनै प्रतिक्रिया प्राप्त हुन सकेन।",
    quickReplies: data.quickReplies,
    isEmergency: data.isEmergency,
    source: data.source,
  };
}

// Download transcript as markdown
export function downloadTranscript(messages: ChatMessage[]): void {
  if (typeof window === "undefined" || messages.length === 0) return;

  let text = `# Nepal Hemophilia Society (NHS) - Chat Transcript\n`;
  text += `Generated on: ${new Date().toLocaleString()}\n`;
  text += `Session ID: ${getSessionId()}\n\n---\n\n`;

  messages.forEach((m) => {
    const sender = m.role === "user" ? "👤 You / प्रयोगकर्ता" : "🤖 NHS AI Assistant";
    text += `### ${sender} (${new Date(m.timestamp).toLocaleTimeString()})\n\n${m.content}\n\n`;
  });

  const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `NHS_Chat_${new Date().toISOString().slice(0, 10)}.md`;
  a.click();
  URL.revokeObjectURL(url);
}
