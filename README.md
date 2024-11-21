# Pro Market API

A RESTful API for an E-commerce platform built with Hono.js, Postgres, Prisma, and Bun.

## Features

- 🔐 JWT Authentication
- 👤 User Management
- 🛍️ Product Management
- 🛒 Shopping Cart Operations
- 📦 PostgreSQL Database with Prisma ORM

## Getting Started

### Prerequisites

- Bun
- PostgreSQL Database

### Installation & Usage

1. Clone the repository
2. Copy `.env.example` to `.env` and configure your environment variables:
3. Install dependencies
   ```sh
   npm install
   ```
4. Run database migrations
   ```sh
   bunx prisma migrate dev
   ```
5. Seed the database:
   ```sh
   bunx prisma db seed
   ```
6. Start the development server
   ```sh
   npm run dev
   ```

## API Documentation

### Authentication Endpoints

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/auth/register` | Register new user |
| POST   | `/auth/login`    | User login        |
| GET    | `/auth/me`       | Get current user  |
| POST   | `/auth/logout`   | Logout user       |

### User Endpoints

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| GET    | `/users`     | Get all users  |
| GET    | `/users/:id` | Get user by ID |

### Product Endpoints

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| GET    | `/products`     | Get all products  |
| GET    | `/products/:id` | Get product by ID |

### Cart Endpoints

| Method | Endpoint          | Description           |
| ------ | ----------------- | --------------------- |
| GET    | `/cart`           | Get user's cart       |
| POST   | `/cart/items`     | Add item to cart      |
| PATCH  | `/cart/items/:id` | Update item quantity  |
| DELETE | `/cart/items/:id` | Remove item from cart |
