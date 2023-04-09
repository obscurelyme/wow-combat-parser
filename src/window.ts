export {};

declare global {
  interface Window {
    api: {
      ping: () => Promise<string>;
      readFile: (filePath: string) => Promise<string>;
    };
  }
}

declare global {
  interface File {
    path: string;
  }
}
