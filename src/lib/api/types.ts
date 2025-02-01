// src/lib/api/types.ts
export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      settings: {
        notifications: boolean;
        darkMode: boolean;
        language: "en" | "ar";
      };
    };
    token: string;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
}

// User related types
export interface User {
  _id: string;
  name: string;
  email: string;
  settings: UserSettings;
  createdAt: string;
}

export interface UserSettings {
  notifications: boolean;
  darkMode: boolean;
  language: "en" | "ar";
}

// Auth related types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Removed AuthResponse interface as it is equivalent to ApiResponse<{ user: User; token: string; }>

// Ibadah related types
export interface Ibadah {
  _id: string;
  user: string;
  name: string;
  description: string;
  time: string;
  frequency: "daily" | "weekly" | "monthly";
  completionStatus: CompletionStatus[];
  createdAt: string;
}

export interface CompletionStatus {
  date: string;
  completed: boolean;
}

export interface CreateIbadahData {
  name: string;
  description: string;
  time: string;
  frequency: "daily" | "weekly" | "monthly";
}

// Removed UpdateIbadahData interface as it is equivalent to Partial<CreateIbadahData>

export interface IbadahStats {
  total: number;
  completed: number;
  completion_rate: number;
}

// Settings related types
export interface UpdateSettingsData {
  notifications?: boolean;
  darkMode?: boolean;
  language?: "en" | "ar";
}

// Error types
export interface ApiError {
  success: false;
  message: string;
  errors?: {
    [key: string]: string[];
  };
}
