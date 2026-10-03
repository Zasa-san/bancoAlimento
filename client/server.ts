import path from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = __dirname;
const port = process.env.PORT ?? 3000;

const app = express();

app.use(express.static(dist));

// SPA fallback: cualquier ruta desconocida devuelve index.html
app.use((_req, res) => res.sendFile(path.join(dist, "index.html")));

app.listen(port, () => {
  console.log(`Cliente en http://localhost:${port}`);
});
