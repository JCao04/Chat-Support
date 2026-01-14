// Token-related types

export enum TokenTransactionType {
  PURCHASE = 'PURCHASE',
  SUBSCRIPTION_CREDIT = 'SUBSCRIPTION_CREDIT',
  QUESTION_DEDUCTION = 'QUESTION_DEDUCTION',
  SUGGESTION_APPROVAL = 'SUGGESTION_APPROVAL',
  REFUND = 'REFUND',
  ADJUSTMENT = 'ADJUSTMENT',
  BONUS = 'BONUS',
}

export interface TokenTransaction {
  id: string;
  userId: string;
  type: TokenTransactionType;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  referenceId: string | null;
  referenceType: string | null;
  metadata: TokenTransactionMetadata | null;
  createdAt: Date;
}

export interface TokenTransactionMetadata {
  paymentId?: string;
  suggestionId?: string;
  conversationId?: string;
  questionComplexity?: string;
}

export interface CreateTokenTransactionInput {
  userId: string;
  type: TokenTransactionType;
  amount: number;
  description: string;
  referenceId?: string;
  referenceType?: string;
  metadata?: TokenTransactionMetadata;
}

export interface TokenBalance {
  current: number;
  pending: number;
  lastUpdated: Date;
}

export interface TokenPackage {
  id: string;
  name: string;
  tokens: number;
  price: number;
  pricePerToken: number;
  popular: boolean;
  stripePriceId: string;
}

export const TOKEN_PACKAGES: TokenPackage[] = [
  {
    id: 'tokens_100',
    name: '100 Tokens',
    tokens: 100,
    price: 999, // in cents
    pricePerToken: 9.99,
    popular: false,
    stripePriceId: 'price_tokens_100',
  },
  {
    id: 'tokens_300',
    name: '300 Tokens',
    tokens: 300,
    price: 2499, // in cents
    pricePerToken: 8.33,
    popular: true,
    stripePriceId: 'price_tokens_300',
  },
  {
    id: 'tokens_500',
    name: '500 Tokens',
    tokens: 500,
    price: 3999, // in cents
    pricePerToken: 7.99,
    popular: false,
    stripePriceId: 'price_tokens_500',
  },
  {
    id: 'tokens_1000',
    name: '1000 Tokens',
    tokens: 1000,
    price: 6999, // in cents
    pricePerToken: 6.99,
    popular: false,
    stripePriceId: 'price_tokens_1000',
  },
];

export interface TokenUsageSummary {
  totalPurchased: number;
  totalFromSubscription: number;
  totalUsed: number;
  totalRefunded: number;
  currentBalance: number;
  usageByType: Record<TokenTransactionType, number>;
}

export interface DeductTokensInput {
  userId: string;
  amount: number;
  type: TokenTransactionType;
  description: string;
  referenceId?: string;
  referenceType?: string;
  metadata?: TokenTransactionMetadata;
}

export interface AddTokensInput {
  userId: string;
  amount: number;
  type: TokenTransactionType;
  description: string;
  referenceId?: string;
  referenceType?: string;
  metadata?: TokenTransactionMetadata;
}

export interface CheckBalanceResult {
  hasEnough: boolean;
  currentBalance: number;
  requiredAmount: number;
  shortfall: number;
}
