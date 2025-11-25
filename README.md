# blog-express-prisma-backend

> **Robust, scalable, and secure.**
>
> This project forms the backend of a modern full-stack blog platform—combining a RESTful API built with Express.js and Prisma ORM with best practices for structure, validation, and security.
>
> Every endpoint, middleware, and data model is designed for clarity, maintainability, and seamless integration with the Vue 3 SPA frontend.
>
> _Check out both repositories for the complete stack in action._ 🚀

[![Backend – Express/Prisma/MySQL](https://img.shields.io/badge/backend-express%2Fprisma%2Fmysql-green?style=flat-square)]()
[![Frontend – Vue3/Vite/Tailwind](https://img.shields.io/badge/frontend-vue3%2Fvite-blue?style=flat-square)](https://github.com/StefaniaSgreva/blog-vue-vite-frontend)
![No License – Private Portfolio Project](https://img.shields.io/badge/license-unlicensed-blue?style=flat-square)
...

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

## Project Structure Preview

```text
src/
  controllers/
    postController.js
    categoryController.js
    tagController.js
    userController.js
  routes/
    postRoutes.js
    categoryRoutes.js
    tagRoutes.js
    authRoutes.js
  middlewares/
    errorsHandler.js
    routeNotFound.js
    authenticateJWT.js
    authRoleHandler.js
    authorizePostOwner.js
  validations/
    postCreate.js
  scripts/
    seed_admin.js
  prisma/
    schema.prisma
  app.js
.env
.gitignore
package.json
README.md
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
- Designed to power a modern SPA frontend (see `blog-vue-vite-frontend`)

## Example `.env`

```
DATABASE_URL="mysql://user:password@localhost:3306/blogdb"
JWT_SECRET=your-very-secret-key
PORT=3000
```

## Usage Modes

- Frontend Development (with Vue/Vite):

      - CORS is fully open to allow requests from your local frontend
      - Authentication and advanced validation are disabled for faster prototyping
      - API endpoints can be used without tokens

- Production Backend:

      - CORS restricted to your official domain(s)
      - JWT authentication, role checks and validation middleware activated
      - Data integrity and security enforced on all endpoints

## License

This repository is provided exclusively for portfolio and learning purposes.  
Please do not use, copy, or redistribute this code or any part of it without explicit permission.

## Looking for the frontend?

See: [blog-vue-vite-frontend](https://github.com/StefaniaSgreva/blog-vue-vite-frontend)

Thank you for checking out my work!
