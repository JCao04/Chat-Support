// User-related types

export enum SubscriptionStatus {
  NONE = 'NONE',
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  PAST_DUE = 'PAST_DUE',
  TRIALING = 'TRIALING',
}

export enum SubscriptionTier {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PRO = 'PRO',
  UNLIMITED = 'UNLIMITED',
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  emailVerified: boolean;
  tokenBalance: number;
  subscriptionStatus: SubscriptionStatus;
  subscriptionTier: SubscriptionTier;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name?: string;
}

export interface UpdateUserInput {
  name?: string;
  avatarUrl?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  tokenBalance: number;
  subscriptionStatus: SubscriptionStatus;
  subscriptionTier: SubscriptionTier;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
}
