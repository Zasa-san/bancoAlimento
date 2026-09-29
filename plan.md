# Plan — Sistema de Gestión de un Banco de Alimentación

## Carpetas principales

| Carpeta | Funcion |
|-|-|
| API/ | Backend |
| CLIENT/ | Frontend |
| SHARED/ | Tipos, schemas de validación y constantes compartidos|


## Tecnologías por módulo

### API
- Node.js + Express 5 + TypeScript
- MongoDB + Mongoose
- JWT en cookie httpOnly (jsonwebtoken + bcrypt)
- zod (validación, schemas importados de `shared`)
- Winston (logging a archivo)
- Transactions de Mongo para stock/entregas
- Swagger/OpenAPI
- Vitest + supertest + mongodb-memory-server

### CLIENT
- React 19 + Vite + React Router 7 (data router: loaders/actions)
- Ant Design 6
- axios + interceptor de errores
- formularios con AntD y reutilizando schemas zod de `shared`
- Vitest + React Testing Library

### SHARED
- `@bancoalimento/shared`: schemas zod, tipos inferidos y constantes/enums
- Consumido por API y CLIENT con `file:../shared`