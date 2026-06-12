import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'nestjs/index': 'src/integrations/nestjs/index.ts',
    'nodemailer/index': 'src/integrations/nodemailer/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  // Shared code (Client + APIs) lands in a common chunk so the core entry and
  // the integration subpaths reference the SAME Client class (DI tokens stay identity-equal).
  splitting: true,
  treeshake: true,
  target: 'node18',
  outDir: 'dist',
});
