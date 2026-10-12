import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
 plugins:[react()],
 base:'./', // Funciona en /atlas/ y en cualquier subdirectorio de hosting
 server:{port:5173,proxy:{'/api':{target:'http://localhost:3001',changeOrigin:true}}},
 build:{outDir:'dist'}
});
