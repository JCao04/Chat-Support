// Resume-related types

export enum ResumeStatus {
  UPLOADING = 'UPLOADING',
  UPLOADED = 'UPLOADED',
  PROCESSING = 'PROCESSING',
  ANALYZING = 'ANALYZING',
  READY = 'READY',
  FAILED = 'FAILED',
}

export interface Resume {
  id: string;
  userId: string;
  filename: string;
  originalFilename: string;
  s3Key: string;
  s3KeyEdited: string | null;
  mimeType: string;
  fileSize: number;
  status: ResumeStatus;
  metadata: ResumeMetadata | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResumeMetadata {
  pageCount: number;
  wordCount: number;
  hasContactInfo: boolean;
  sections: ResumeSection[];
}

export interface ResumeSection {
  name: string;
  startPage: number;
  startPosition: number;
  endPosition: number;
  content: string;
}

export interface ResumeStructuredData {
  contactInfo: ContactInfo | null;
  summary: string | null;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  certifications: string[];
  languages: string[];
  rawText: string;
}

export interface ContactInfo {
  name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedin: string | null;
  website: string | null;
}

export interface ExperienceEntry {
  company: string;
  title: string;
  location: string | null;
  startDate: string | null;
  endDate: string | null;
  isCurrent: boolean;
  description: string[];
}

export interface EducationEntry {
  institution: string;
  degree: string;
  field: string | null;
  graduationDate: string | null;
  gpa: string | null;
}

export interface UploadResumeInput {
  file: File;
}

export interface ResumeListItem {
  id: string;
  filename: string;
  status: ResumeStatus;
  createdAt: Date;
  suggestionsCount: number;
  appliedSuggestionsCount: number;
}

export interface ResumeWithAnalysis {
  resume: Resume;
  structuredData: ResumeStructuredData | null;
  analysisResult: AnalysisResult | null;
}

export interface AnalysisResult {
  id: string;
  resumeId: string;
  overallScore: number;
  atsScore: number;
  contentScore: number;
  formattingScore: number;
  findings: AnalysisFinding[];
  createdAt: Date;
}

export interface AnalysisFinding {
  category: FindingCategory;
  severity: FindingSeverity;
  message: string;
  details: string | null;
  location: DocumentLocation | null;
}

export enum FindingCategory {
  ATS = 'ATS',
  FORMATTING = 'FORMATTING',
  CONTENT = 'CONTENT',
  GRAMMAR = 'GRAMMAR',
  KEYWORDS = 'KEYWORDS',
  STRUCTURE = 'STRUCTURE',
}

export enum FindingSeverity {
  INFO = 'INFO',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface DocumentLocation {
  page: number;
  startPosition: number;
  endPosition: number;
  text: string;
}
