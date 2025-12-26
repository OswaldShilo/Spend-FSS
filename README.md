# Spend-FSS Monorepo

This repo now has a simple split:

- Frontend: Next.js app (moved to `Frontend/`)
- Backend: Node scripts and future APIs (in `Backend/`)

## Frontend

From the `Frontend/` folder:

```bash
cd Frontend
npm install
npm run dev
```

## Backend (Faker data generator)

From the `Backend/` folder:

```bash
cd Backend
npm install
npm run generate         # prints 25 random transactions
npm run generate -- 100  # prints 100 transactions
```

Adjust and extend `Backend/src/generate.js` to shape data models as needed.
