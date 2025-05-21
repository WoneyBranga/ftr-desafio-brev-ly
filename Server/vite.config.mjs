import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()], 
  test: {
    environment: 'node',
    setupFiles: ['./test/setup.ts'],    
    sequence: {
      sequential: true,
      hooks: 'list', 
    },
    poolOptions: {
      threads: {
        singleThread: true,
      },
      forks: {
        singleFork: true,
      },
    },
    maxThreads: 1,
    minThreads: 1,
    fileParallelism: false,
    isolate: false,

    testTimeout: 10000,
    hookTimeout: 10000,
  },
});