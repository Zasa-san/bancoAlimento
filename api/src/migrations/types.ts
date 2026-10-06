interface Migration {
  name: string;
  up: () => Promise<void>;
}

export type { Migration };
