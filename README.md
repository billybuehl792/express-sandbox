# Express App

A small Express + TypeScript API backed by PostgreSQL and ready to run with Docker.

## Overview

- Built with Express and TypeScript
- Stores items in PostgreSQL
- Includes Docker and Docker Compose support for local development

## Prerequisites

- Node.js 22+
- npm
- Docker and Docker Compose

## Environment variables

Create a `.env` file with the following variables:

```env
PORT=3000
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_DB=express_app
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

## Run locally

```bash
npm install
npm run dev
```

The API will start on `http://localhost:3000`.

## Run with Docker Compose

```bash
docker compose up --build
```

This starts both the API service and a PostgreSQL database. The database schema is initialized from `postgres/init.sql`.

## API endpoints

### `GET /`

Returns all items from the `items` table, ordered by `id`.

Example response:

```json
{
  "results": [
    {
      "id": 1,
      "label": "Example",
      "description": "A sample item"
    }
  ]
}
```

### `POST /`

Creates a new item and returns the inserted row.

Request body:

```json
{
  "label": "Example",
  "description": "A sample item"
}
```

Example response:

```json
{
  "id": 1,
  "label": "Example",
  "description": "A sample item"
}
```

## Database schema

The `items` table is created automatically from `postgres/init.sql`:

```sql
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    label TEXT NOT NULL,
    description TEXT
);
```

## Scripts

- `npm run dev` — start the development server with live reload
- `npm run build` — compile TypeScript to `dist`
- `npm run start` — run the built server
