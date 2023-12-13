declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    HOST: string;
    JWT_SECRET: string;
  }
}
