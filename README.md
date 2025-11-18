# blog-express-prisma-backend

REST API backend for a modern blog platform built with Express.js and Prisma ORM.  
Provides endpoints for posts, categories, users, and tags.  
Designed to be consumed by a Single Page Application (SPA) frontend (see the "blog-vue-vite-frontend" repository for the connected client).  
Technologies: Node.js, Express.js, Prisma, MySQL.

![No License – Private Portfolio Project](https://img.shields.io/badge/license-unlicensed-blue?style=flat-square)

## Getting Started

1. **Clone the repository**

   ```
   git clone https://github.com/StefaniaSgreva/express-api-crud-relationship.git
   cd express-api-crud-relationship
   ```

2. **Install dependencies**

   ```
   npm install
   ```

3. **Create and configure your database**
   Set your connection string in `.env` (created by Prisma) in the project root:

   ```
   DATABASE_URL="mysql://user:password@localhost:3306/mydatabase"
   ```

   (Change with your actual DB credentials)

4. **Initialize Prisma and the database schema**

   ```
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Run the development server**

   ```
   npm run dev
   ```

   or

   ```
   nodemon app.js
   ```

   The API will be available at http://localhost:3000

## Optional extras

- Environment variables: Create a `.env` for secrets/DB connection.
- `.gitignore`: Make sure `node_modules/` and `.env` are ignored.
- Seed data: (if present) Run any seed scripts for demo/test data:
  ```
  node scripts/seed_admin.js
  ```

## Usage Modes

- **Frontend Development (with Vue/Vite):**

  - CORS is fully open to allow requests from your local frontend
  - Authentication and advanced validation are disabled for faster prototyping
  - API endpoints can be used without tokens

- **Production Backend:**

  - CORS restricted to your official domain(s)
  - JWT authentication, role checks and validation middleware activated
  - Data integrity and security enforced on all endpoints

  ## Example `.env`

  ```
   DATABASE_URL="mysql://user:password@localhost:3306/blogdb"
   JWT_SECRET=your-very-secret-key
   PORT=3000
  ```

## Core API Endpoints

| Endpoint        | Method | Description         |
| --------------- | ------ | ------------------- |
| /posts          | GET    | Get all blog posts  |
| /posts/:slug    | GET    | Get single post     |
| /posts          | POST   | Create new post     |
| /posts/:slug    | PUT    | Update post         |
| /posts/:slug    | DELETE | Delete post         |
| /categories     | GET    | List all categories |
| /categories/:id | GET    | Get category by id  |
| /categories     | POST   | Create new category |
| /categories/:id | PUT    | Update category     |
| /categories/:id | DELETE | Delete category     |
| /tags           | GET    | List all tags       |
| /tags/:id       | GET    | Get tag by id       |
| /tags           | POST   | Create new tag      |
| /tags/:id       | PUT    | Update tag          |
| /tags/:id       | DELETE | Delete tag          |
| /login          | POST   | Login user          |
| /register       | POST   | Register new user   |

## Features

- Full CRUD API for Posts, Categories, and Tags
- Optional authentication and role-based authorization (production mode)
- Relational data: posts can belong to categories and have multiple tags
- Pagination, search, and filtering for posts
- Designed to power a modern SPA frontend

## License

This repository is provided exclusively for portfolio and learning purposes.  
Please do not use, copy, or redistribute this code or any part of it without explicit permission.

Thank you for respecting my work!
