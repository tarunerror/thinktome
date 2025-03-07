export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  icon: React.ReactNode;
  color: string;
}

// ... rest of the existing types