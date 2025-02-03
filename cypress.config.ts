import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },

  e2e: {
    baseUrl: 'http://localhost:4200', // URL вашего Angular-приложения
    supportFile: 'cypress/support/e2e.ts'
  }
});
