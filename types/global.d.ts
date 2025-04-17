export {};

declare global {
  interface Window {
    adsbygoogle?: {
      push: (params: Record<string, unknown>) => void;
    }[];
  }
}