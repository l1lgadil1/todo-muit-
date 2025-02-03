export const COLORS = {
  primary: {
    main: '#3b82f6',
    light: '#60a5fa',
    dark: '#2563eb',
  },
  secondary: {
    main: '#6b7280',
    light: '#9ca3af',
    dark: '#4b5563',
  },
  success: {
    main: '#22c55e',
    light: '#4ade80',
    dark: '#16a34a',
  },
  error: {
    main: '#ef4444',
    light: '#f87171',
    dark: '#dc2626',
  },
  background: {
    light: '#ffffff',
    dark: '#1f2937',
  },
  text: {
    light: '#1f2937',
    dark: '#f9fafb',
  },
} as const;

export const FONTS = {
  primary: 'Inter, system-ui, sans-serif',
  secondary: 'system-ui, sans-serif',
} as const;

export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const;

export const TRANSITIONS = {
  fast: '150ms',
  normal: '250ms',
  slow: '350ms',
} as const; 