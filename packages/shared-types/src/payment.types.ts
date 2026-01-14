// Payment-related types

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  CANCELED = 'CANCELED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentType {
  ONE_TIME = 'ONE_TIME',
  SUBSCRIPTION = 'SUBSCRIPTION',
}

export interface Payment {
  id: string;
  userId: string;
  stripePaymentIntentId: string | null;
  stripeCheckoutSessionId: string | null;
  type: PaymentType;
  status: PaymentStatus;
  amount: number;
  currency: string;
  description: string;
  metadata: PaymentMetadata | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentMetadata {
  tokenPackageId?: string;
  tokens?: number;
  subscriptionTier?: string;
  invoiceId?: string;
}

export interface CreateCheckoutSessionInput {
  tokenPackageId?: string;
  subscriptionTier?: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CreateCheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: SubscriptionTier;
  monthlyTokens: number;
  price: number;
  features: string[];
  stripePriceId: string;
}

export enum SubscriptionTier {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PRO = 'PRO',
  UNLIMITED = 'UNLIMITED',
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan_free',
    name: 'Free',
    tier: SubscriptionTier.FREE,
    monthlyTokens: 0,
    price: 0,
    features: [
      'Free initial resume scan',
      'Basic ATS score',
      'Limited suggestions preview',
    ],
    stripePriceId: '',
  },
  {
    id: 'plan_basic',
    name: 'Basic',
    tier: SubscriptionTier.BASIC,
    monthlyTokens: 100,
    price: 999, // in cents
    features: [
      '100 tokens/month',
      'Full resume analysis',
      'AI-powered suggestions',
      'Ask questions about your resume',
      'Apply improvements',
    ],
    stripePriceId: 'price_plan_basic',
  },
  {
    id: 'plan_pro',
    name: 'Pro',
    tier: SubscriptionTier.PRO,
    monthlyTokens: 300,
    price: 2499, // in cents
    features: [
      '300 tokens/month',
      'Everything in Basic',
      'Priority support',
      'Advanced formatting suggestions',
      'Industry-specific recommendations',
    ],
    stripePriceId: 'price_plan_pro',
  },
  {
    id: 'plan_unlimited',
    name: 'Unlimited',
    tier: SubscriptionTier.UNLIMITED,
    monthlyTokens: -1, // unlimited
    price: 4999, // in cents
    features: [
      'Unlimited tokens',
      'Everything in Pro',
      'Unlimited resume analyses',
      'Unlimited revisions',
      'Dedicated support',
    ],
    stripePriceId: 'price_plan_unlimited',
  },
];

export interface StripeWebhookEvent {
  type: string;
  data: {
    object: unknown;
  };
}

export interface SubscriptionInfo {
  status: string;
  tier: SubscriptionTier;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  tokensRemaining: number;
}

export interface CancelSubscriptionInput {
  cancelImmediately?: boolean;
}

export interface UpdateSubscriptionInput {
  newTier: SubscriptionTier;
}

export interface PaymentHistory {
  payments: Payment[];
  totalCount: number;
  totalAmount: number;
}
