export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'error';
  isEmergency?: boolean;
  quickReplies?: string[];
  sources?: string[];
}

export interface N8NWebhookPayload {
  action: string;
  sessionId: string;
  chatInput: string;
  message: string;
  language: 'en' | 'np';
  timestamp: string;
  history?: {
    role: string;
    content: string;
  }[];
  metadata?: {
    platform: string;
    userAgent?: string;
    url?: string;
  };
}

export interface N8NWebhookResponse {
  output?: string;
  response?: string;
  text?: string;
  message?: string;
  reply?: string;
  quickReplies?: string[];
  isEmergency?: boolean;
  sources?: string[];
}

export interface ChatConfig {
  webhookUrl: string;
  isCustomWebhook: boolean;
  soundEnabled: boolean;
  autoScroll: boolean;
  language: 'en' | 'np';
}
