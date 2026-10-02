import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, Plugin } from 'vite';

function apiDevMiddleware(): Plugin {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';
        if (url === '/api/contact') {
          if (req.method === 'POST') {
            const chunks: Buffer[] = [];
            req.on('data', (chunk) => chunks.push(chunk));
            req.on('end', async () => {
              try {
                const bodyStr = Buffer.concat(chunks).toString('utf-8');
                (req as any).body = bodyStr ? JSON.parse(bodyStr) : {};
              } catch {
                (req as any).body = {};
              }

              // Adaptateur pour émuler le format Vercel (res.status().json())
              (res as any).status = function (statusCode: number) {
                this.statusCode = statusCode;
                return this;
              };
              (res as any).json = function (data: any) {
                this.setHeader('Content-Type', 'application/json');
                this.end(JSON.stringify(data));
                return this;
              };

              try {
                const { default: contactHandler } = await import('./api/contact.ts');
                await contactHandler(req as any, res as any);
              } catch (err: any) {
                console.error('[API Dev Server Error]:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err?.message || 'Erreur serveur' }));
              }
            });
            return;
          } else {
            res.statusCode = 405;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Méthode non autorisée' }));
            return;
          }
        }
        next();
      });
    },
  };
}

// `base: './'` génère des URLs relatives : le build fonctionne tel quel
// sur GitHub Pages (sous-dossier), Vercel, Netlify ou un domaine dédié.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), apiDevMiddleware()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        // Cache-busting long terme pour les assets nommés par hash
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
});
