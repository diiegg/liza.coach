// server.js — Next.js SSR under cPanel/Passenger
import { createServer } from 'http';
import next from 'next';

const port = process.env.PORT || 3000;
const app = next({ dev: false, conf: { distDir: '.next' } });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, '0.0.0.0', () => {
    console.log(`Next SSR running on ${port}`);
  });
});
