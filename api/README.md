# API — Banco de Alimentos

Backend: Node + Express 5 + TypeScript + MongoDB (Mongoose).

## Requisitos

- Node 24+
- Yarn 4 (Corepack)
- Docker + Docker Compose

## Puesta en marcha

### 1. Dependencias

```bash
yarn install
```

### 2. Variables de entorno

```bash
cp .env.example .env
```

### 3. Levantar MongoDB

```bash
docker compose up -d
```

Mongo queda en `mongodb://localhost:27017` con el **replica set `rs0`** (necesario para usar transacciones).

Verificar que el nodo sea primario:

```bash
docker compose exec mongo mongosh --eval "db.hello().isWritablePrimary"   # true
```

Bajar / resetear:

```bash
docker compose down        # baja Mongo (conserva datos)
docker compose down -v     # baja y borra el volumen de datos
```

### 4. Correr la API

```bash
yarn dev
# GET http://localhost:4000/health → { "status": "ok" }
```

### 4. Logs

Los logs se guardan en `{apiFolder}/logs`. Los logs son rotativos de 14 días, o si superan los 20mb de tamaño.

## Scripts

| Comando              | Qué hace                        |
| -------------------- | ------------------------------- |
| `yarn dev`           | API en desarrollo (`tsx watch`) |
| `yarn build`         | Compila a `dist/`               |
| `yarn test`          | Tests con Vitest                |
| `yarn test:watch`    | Tests con Vitest en modo watch  |
| `yarn test:coverage` | Tests + coverage                |
