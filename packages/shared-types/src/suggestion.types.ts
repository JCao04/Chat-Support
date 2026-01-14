// Suggestion-related types

export enum SuggestionCategory {
  ATS_OPTIMIZATION = 'ATS_OPTIMIZATION',
  FORMATTING = 'FORMATTING',
  CONTENT_IMPROVEMENT = 'CONTENT_IMPROVEMENT',
  GRAMMAR_SPELLING = 'GRAMMAR_SPELLING',
  KEYWORD_ADDITION = 'KEYWORD_ADDITION',
  STRUCTURE = 'STRUCTURE',
  CONTACT_INFO = 'CONTACT_INFO',
  QUANTIFICATION = 'QUANTIFICATION',
}

export enum SuggestionSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum SuggestionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  APPLIED = 'APPLIED',
  FAILED = 'FAILED',
}

export interface Suggestion {
  id: string;
  resumeId: string;
  conversationId: string | null;
  category: SuggestionCategory;
  severity: SuggestionSeverity;
  status: SuggestionStatus;
  title: string;
  description: string;
  explanation: string;
  originalText: string | null;
  suggestedText: string | null;
  location: SuggestionLocation | null;
  tokenCost: number;
  appliedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SuggestionLocation {
  page: number;
  section: string | null;
  startPosition: number;
  endPosition: number;
}

export interface CreateSuggestionInput {
  resumeId: string;
  conversationId?: string;
  category: SuggestionCategory;
  severity: SuggestionSeverity;
  title: string;
  description: string;
  explanation: string;
  originalText?: string;
  suggestedText?: string;
  location?: SuggestionLocation;
  tokenCost: number;
}

export interface SuggestionApprovalInput {
  suggestionId: string;
}

export interface SuggestionDenialInput {
  suggestionId: string;
  reason?: string;
}

export interface SuggestionGroup {
  category: SuggestionCategory;
  suggestions: Suggestion[];
  totalTokenCost: number;
}

export interface SuggestionSummary {
  totalCount: number;
  pendingCount: number;
  approvedCount: number;
  deniedCount: number;
  appliedCount: number;
  bySeverity: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  byCategory: Record<SuggestionCategory, number>;
  totalTokenCost: number;
}

// Token costs for different suggestion types
export const SUGGESTION_TOKEN_COSTS: Record<SuggestionCategory, { min: number; max: number }> = {
  [SuggestionCategory.ATS_OPTIMIZATION]: { min: 15, max: 30 },
  [SuggestionCategory.FORMATTING]: { min: 10, max: 20 },
  [SuggestionCategory.CONTENT_IMPROVEMENT]: { min: 20, max: 50 },
  [SuggestionCategory.GRAMMAR_SPELLING]: { min: 5, max: 15 },
  [SuggestionCategory.KEYWORD_ADDITION]: { min: 10, max: 25 },
  [SuggestionCategory.STRUCTURE]: { min: 15, max: 35 },
  [SuggestionCategory.CONTACT_INFO]: { min: 5, max: 10 },
  [SuggestionCategory.QUANTIFICATION]: { min: 15, max: 30 },
};
