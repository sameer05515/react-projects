// API Types and Interfaces

// Common Types
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// User Types
export interface User {
  _id?: string;
  uniqueId?: string;
  username: string;
  email?: string;
  password?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email?: string;
}

export interface LoginResponse {
  token: string;
  user?: User;
}

// Tweet Types
export interface Tweet {
  _id?: string;
  uniqueId?: string;
  content: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

// Task Types
export interface Task {
  _id?: string;
  uniqueId?: string;
  title: string;
  description?: string;
  status?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

// Tag Types
export interface Tag {
  _id?: string;
  uniqueId?: string;
  name: string;
  title?: string;
  ancestors?: Array<{ name: string; parentId?: string; uniqueId?: string }>;
  children?: Tag[];
  [key: string]: any;
}

// Topic Types
export interface Topic {
  _id?: string;
  uniqueId?: string;
  name: string;
  description?: string;
  occurenceDate?: string;
  sections?: TopicSection[];
  children?: Topic[];
  tags?: string[];
  [key: string]: any;
}

export interface TopicSection {
  uniqueId?: string;
  name: string;
  content?: string;
  [key: string]: any;
}

// Link Types
export interface Link {
  _id?: string;
  uniqueId?: string;
  name: string;
  url?: string;
  description?: string;
  parentId?: string;
  ancestors?: Array<{ name: string; parentId?: string; uniqueId?: string }>;
  [key: string]: any;
}

// Memory Map Types
export interface MemoryMap {
  _id?: string;
  uniqueId?: string;
  name: string;
  skeleton?: string;
  details?: any[];
  references?: any[];
  [key: string]: any;
}

// Interview Management Types
export interface InterviewCategory {
  _id?: string;
  uniqueId?: string;
  name: string;
  description?: string;
  [key: string]: any;
}

export interface InterviewQuestion {
  _id?: string;
  uniqueId?: string;
  question: string;
  categoryId?: string;
  tags?: string[];
  [key: string]: any;
}

export interface InterviewAnswer {
  _id?: string;
  uniqueId?: string;
  answer: string;
  questionId?: string;
  [key: string]: any;
}

// Pinned Item Types
export interface PinnedItem {
  _id?: string;
  uniqueId?: string;
  title: string;
  linkedUniqueId?: string;
  itemType?: string;
  [key: string]: any;
}

// Word Types
export interface Word {
  _id?: string;
  uniqueId?: string;
  word: string;
  meaning?: string;
  [key: string]: any;
}

// My Resume Types
export interface MyResume {
  _id?: string;
  uniqueId?: string;
  content?: any;
  [key: string]: any;
}

// Related Node Types
export interface RelatedNode {
  _id?: string;
  uniqueId?: string;
  name: string;
  [key: string]: any;
}

// Activity Types
export interface Activity {
  _id?: string;
  uniqueId?: string;
  name?: string;
  [key: string]: any;
}

// Comparable Object Types
export interface ComparableObject {
  _id?: string;
  uniqueId?: string;
  name?: string;
  [key: string]: any;
}

// ChatGPT Conversation Types
export interface ChatGPTConversation {
  _id?: string;
  uniqueId?: string;
  messages?: any[];
  [key: string]: any;
}

// Think Tank Types
export interface ThinkTankItem {
  _id?: string;
  uniqueId?: string;
  smartContent?: any;
  status?: string;
  [key: string]: any;
}

