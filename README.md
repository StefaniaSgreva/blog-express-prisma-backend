# blog-express-prisma-backend

REST API backend for a modern blog platform built with Express.js and Prisma ORM.  
Provides endpoints for posts, categories, users, and tags.  
Designed to be consumed by a Single Page Application (SPA) frontend (see the "blog-vue-vite-frontend" repository for the connected client).  
Technologies: Node.js, Express.js, Prisma, MySQL.

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
