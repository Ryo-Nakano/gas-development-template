import { defineConfig } from "vite";
import typescript from "@rollup/plugin-typescript";
import rollupPluginGas from "rollup-plugin-google-apps-script";
import path from "path";
import fs from "fs";

export default defineConfig({
  plugins: [
    rollupPluginGas(),
    typescript(),
    {
      name: 'copy-appsscript-json', // カスタムプラグインの名前
      writeBundle() {
        const srcFile = path.resolve(__dirname, 'appsscript.json'); // コピー元のパス
        const destDir = path.resolve(__dirname, 'dist'); // コピー先のディレクトリ
        const destFile = path.join(destDir, 'appsscript.json'); // コピー先のファイルパス

        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir);
        fs.copyFileSync(srcFile, destFile);
        console.log('appsscript.json has been copied to dist folder');
      }
    }
  ],
  build: {
    rollupOptions: {
      input: "src/index.ts",
      output: {
        dir: "dist",
        entryFileNames: "main.js",
      },
    },
    minify: false, // trueにすると関数名が消えるのでfalse必須
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
