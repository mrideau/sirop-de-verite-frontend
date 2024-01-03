import { defineConfig } from 'cypress';
import * as path from 'path';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
  },

  component: {
    devServer: {
      framework: 'angular',

      bundler: 'webpack',
      // webpackConfig: {
      //   resolve: {
      //     alias: {
      //       '@': path.resolve(__dirname, 'src'),
      //     },
      //   },
      // },
    },
    specPattern: '**/*.cy.ts',
  },
});
