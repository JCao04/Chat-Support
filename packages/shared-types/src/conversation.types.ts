// Conversation-related types

export enum ConversationState {
  INITIAL_REVIEW = 'INITIAL_REVIEW',
  PRESENTING_SUGGESTIONS = 'PRESENTING_SUGGESTIONS',
  DISCUSSING_SUGGESTION = 'DISCUSSING_SUGGESTION',
  APPLYING_CHANGES = 'APPLYING_CHANGES',
  COMPLETED = 'COMPLETED',
}

export enum MessageRole {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
  SYSTEM = 'SYSTEM',
}

export enum MessageType {
  TEXT = 'TEXT',
  SUGGESTION_PRESENTATION = 'SUGGESTION_PRESENTATION',
  SUGGESTION_APPROVAL = 'SUGGESTION_APPROVAL',
  SUGGESTION_DENIAL = 'SUGGESTION_DENIAL',
  ANALYSIS_PROGRESS = 'ANALYSIS_PROGRESS',
  ERROR = 'ERROR',
}

export interface Conversation {
  id: string;
  resumeId: string;
  userId: string;
  state: ConversationState;
  currentSuggestionId: string | null;
  metadata: ConversationMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversationMetadata {
  totalMessages: number;
  userMessages: number;
  assistantMessages: number;
  suggestionsPresented: number;
  suggestionsApproved: number;
  suggestionsDenied: number;
  tokensUsed: number;
}

export interface Message {
  id: string;
  conversationId: string;
  role: MessageRole;
  type: MessageType;
  content: string;
  metadata: MessageMetadata | null;
  tokenCost: number;
  createdAt: Date;
}

export interface MessageMetadata {
  suggestionId?: string;
  suggestionIds?: string[];
  analysisProgress?: number;
  errorCode?: string;
}

export interface CreateMessageInput {
  conversationId: string;
  role: MessageRole;
  type: MessageType;
  content: string;
  metadata?: MessageMetadata;
  tokenCost?: number;
}

export interface SendUserMessageInput {
  conversationId: string;
  content: string;
}

export interface ConversationWithMessages {
  conversation: Conversation;
  messages: Message[];
}

export interface StartConversationInput {
  resumeId: string;
}

export interface StartConversationResponse {
  conversation: Conversation;
  initialMessage: Message;
}

// WebSocket event types
export interface ConversationEvent {
  type: ConversationEventType;
  conversationId: string;
  data: unknown;
}

export enum ConversationEventType {
  MESSAGE_RECEIVED = 'MESSAGE_RECEIVED',
  MESSAGE_STREAMING = 'MESSAGE_STREAMING',
  STATE_CHANGED = 'STATE_CHANGED',
  SUGGESTION_PRESENTED = 'SUGGESTION_PRESENTED',
  SUGGESTION_UPDATED = 'SUGGESTION_UPDATED',
  ANALYSIS_PROGRESS = 'ANALYSIS_PROGRESS',
  ERROR = 'ERROR',
}

export interface MessageStreamingEvent {
  messageId: string;
  content: string;
  isComplete: boolean;
}

export interface StateChangedEvent {
  previousState: ConversationState;
  newState: ConversationState;
}

// Token costs for conversation actions
export const CONVERSATION_TOKEN_COSTS = {
  SIMPLE_QUESTION: 1,
  DETAILED_QUESTION: 3,
  COMPLEX_QUESTION: 5,
  FOLLOW_UP_SCAN: 20,
} as const;
