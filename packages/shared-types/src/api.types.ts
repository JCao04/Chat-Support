// API-related types

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ApiMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  validationErrors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Common API error codes
export enum ApiErrorCode {
  // General errors
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  BAD_REQUEST = 'BAD_REQUEST',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  
  // Auth errors
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  
  // Rate limiting
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  
  // Token errors
  INSUFFICIENT_TOKENS = 'INSUFFICIENT_TOKENS',
  TOKEN_TRANSACTION_FAILED = 'TOKEN_TRANSACTION_FAILED',
  
  // Payment errors
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  SUBSCRIPTION_NOT_FOUND = 'SUBSCRIPTION_NOT_FOUND',
  INVALID_PAYMENT_METHOD = 'INVALID_PAYMENT_METHOD',
  
  // Resume errors
  RESUME_NOT_FOUND = 'RESUME_NOT_FOUND',
  RESUME_PROCESSING_FAILED = 'RESUME_PROCESSING_FAILED',
  INVALID_FILE_TYPE = 'INVALID_FILE_TYPE',
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  
  // Suggestion errors
  SUGGESTION_NOT_FOUND = 'SUGGESTION_NOT_FOUND',
  SUGGESTION_ALREADY_APPLIED = 'SUGGESTION_ALREADY_APPLIED',
  
  // Conversation errors
  CONVERSATION_NOT_FOUND = 'CONVERSATION_NOT_FOUND',
  CONVERSATION_COMPLETED = 'CONVERSATION_COMPLETED',
  
  // AI errors
  AI_SERVICE_ERROR = 'AI_SERVICE_ERROR',
  AI_RATE_LIMIT = 'AI_RATE_LIMIT',
}

// HTTP status codes
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

// Request/Response types for specific endpoints
export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: Date;
  version: string;
  services: {
    database: boolean;
    redis: boolean;
    storage: boolean;
  };
}

export interface FileUploadResponse {
  fileId: string;
  filename: string;
  size: number;
  mimeType: string;
  url: string;
}

// WebSocket types
export interface SocketAuthPayload {
  token: string;
}

export interface SocketJoinRoomPayload {
  roomId: string;
}

export enum SocketEvent {
  // Connection events
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  ERROR = 'error',
  
  // Auth events
  AUTHENTICATE = 'authenticate',
  AUTHENTICATED = 'authenticated',
  AUTH_ERROR = 'auth_error',
  
  // Room events
  JOIN_ROOM = 'join_room',
  LEAVE_ROOM = 'leave_room',
  
  // Conversation events
  SEND_MESSAGE = 'send_message',
  MESSAGE_RECEIVED = 'message_received',
  MESSAGE_STREAMING = 'message_streaming',
  TYPING_START = 'typing_start',
  TYPING_STOP = 'typing_stop',
  
  // Analysis events
  ANALYSIS_STARTED = 'analysis_started',
  ANALYSIS_PROGRESS = 'analysis_progress',
  ANALYSIS_COMPLETED = 'analysis_completed',
  ANALYSIS_FAILED = 'analysis_failed',
  
  // Token events
  TOKEN_BALANCE_UPDATED = 'token_balance_updated',
  
  // Suggestion events
  SUGGESTION_PRESENTED = 'suggestion_presented',
  SUGGESTION_APPROVED = 'suggestion_approved',
  SUGGESTION_DENIED = 'suggestion_denied',
  SUGGESTION_APPLIED = 'suggestion_applied',
}
