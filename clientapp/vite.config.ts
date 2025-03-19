import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@interface': path.resolve(__dirname, './src/interface'),
            '@helper': path.resolve(__dirname, './src/helper'),
            '@component': path.resolve(__dirname, './src/component'),
            '@context': path.resolve(__dirname, './src/context'),
        },
    },
    plugins: [react(), tailwindcss()],
});
