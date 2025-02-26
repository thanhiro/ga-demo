/// <reference types="@solidjs/start/env" />

declare global {
  interface Window {
    gtag: (a: string, b: string, o: Record<string, string>) => void;
  }
}

export {};
