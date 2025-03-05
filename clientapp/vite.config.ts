import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../clientapp'),
            '@interface': path.resolve(__dirname, '../clientapp/src/interface'),
            '@helper': path.resolve(__dirname, '../clientapp/src/helper'),
        },
    },
});
