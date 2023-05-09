// import { defineConfig, loadEnv } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), "");
//   return {
//     plugins: [react()],
//     define: {
//       "__APP__": env,
//     },
//   };
// });


import dotenv from 'dotenv';
const env = dotenv.config().parsed;

export default {
  env
}