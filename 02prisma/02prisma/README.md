# Express + Prisma + MongoDB REST API

A repeatable, practice-focused setup guide for building a **JavaScript
(ES Modules)** backend with **Express 5, Prisma ORM 6.19.3, MongoDB,
Nodemon, dotenv, and http-status-codes**.

The practice project is a Student Management REST API with CRUD
operations and a feature-based (module-based) folder structure.

> **Version note:** This guide pins Prisma ORM to `6.19.3` because this
> is the Prisma version used in the learning setup and Prisma 6 is the
> MongoDB-compatible line used here. Do not casually upgrade only
> `prisma` or only `@prisma/client`; keep their versions matched. Check
> the official Prisma MongoDB documentation before changing major
> versions.

------------------------------------------------------------------------

## 1. Prerequisites

Install Node.js (prefer an active LTS release) and npm.

Check:

``` bash
node -v
npm -v
```

You also need a MongoDB database and its connection URI. MongoDB Atlas
is one option.

## 2. Create the project

``` bash
mkdir prisma-express-api
cd prisma-express-api
npm init -y
```

`npm init -y` creates `package.json`.

Enable ES Modules:

``` bash
npm pkg set type="module"
```

This allows `import` and `export` syntax in JavaScript files.

## 3. Install packages

Install application dependencies:

``` bash
npm install express @prisma/client@6.19.3 dotenv http-status-codes zod
```

Install development tools:

``` bash
npm install -D prisma@6.19.3 nodemon
```

  Package               Purpose
  --------------------- ---------------------------------------------------
  `express`             HTTP server and routing
  `prisma`              Prisma CLI and schema tooling
  `@prisma/client`      Query the database from application code
  `dotenv`              Load environment variables
  `nodemon`             Restart the development server after file changes
  `http-status-codes`   Named HTTP status code constants
  `zod`                 Validate incoming request data

Check installed packages:

``` bash
npm ls --depth=0
npx prisma -v
```

## 4. Add npm scripts

``` bash
npm pkg set scripts.dev="nodemon src/server.js"
npm pkg set scripts.start="node src/server.js"
```

-   `npm run dev` starts the development server with Nodemon.
-   `npm start` starts the server without Nodemon.

## 5. Initialize Prisma for MongoDB

``` bash
npx prisma init --datasource-provider mongodb
```

This initializes the Prisma schema and environment configuration. The
exact generated files can vary by Prisma version.

For this Prisma 6.19.3 MongoDB setup, the datasource URL belongs in
`prisma/schema.prisma`:

``` prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

### About `prisma.config.ts`

If the initializer creates `prisma.config.ts`, keep it compatible with
Prisma 6.19.3. Make sure it loads dotenv:

``` ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
});
```

For this Prisma 6 setup, keep `url = env("DATABASE_URL")` in the
`datasource` block of `schema.prisma`. Do not copy the Prisma 7
configuration pattern that moves the URL out of the schema.

## 6. Configure MongoDB connection

Create or update the root `.env` file:

``` env
PORT=5000
NODE_ENV=development
DATABASE_URL="mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/studentDB?retryWrites=true&w=majority"
```

Replace the placeholders with your own MongoDB connection details.
URL-encode special characters in the database password if required.

**Never commit `.env` or expose database credentials in GitHub.**

Create `.env.example` for other developers:

``` env
PORT=5000
NODE_ENV=development
DATABASE_URL="your-mongodb-connection-string"
```

## 7. Define the Prisma model

Edit `prisma/schema.prisma`:

``` prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model Student {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  name       String
  email      String   @unique
  age        Int
  department String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

Field notes:

-   `@id` marks the primary identifier.
-   `@map("_id")` maps Prisma's `id` field to MongoDB's `_id`.
-   `@db.ObjectId` uses MongoDB ObjectId.
-   `@unique` creates a uniqueness constraint for email.
-   `@default(now())` sets the creation time.
-   `@updatedAt` updates the timestamp when the record changes.

## 8. Validate, sync, and generate

Run these from the project root:

``` bash
npx prisma validate
npx prisma db push
npx prisma generate
```

  Command             Purpose
  ------------------- -------------------------------------
  `prisma validate`   Check the Prisma schema
  `prisma db push`    Synchronize the schema with MongoDB
  `prisma generate`   Generate Prisma Client

MongoDB does not use Prisma Migrate in this workflow. Use `db push` when
changing the Prisma schema.

Optional database GUI:

``` bash
npx prisma studio
```

## 9. Create the module-based project structure

Create folders:

``` bash
mkdir -p src/config src/lib src/middlewares src/modules/student
```

Create files in Git Bash:

``` bash
touch src/config/env.js
touch src/lib/prisma.js
touch src/middlewares/validate.middleware.js
touch src/middlewares/error.middleware.js
touch src/middlewares/not-found.middleware.js
touch src/modules/student/student.route.js
touch src/modules/student/student.controller.js
touch src/modules/student/student.service.js
touch src/modules/student/student.validation.js
touch src/app.js
touch src/server.js
```

Final structure:

``` text
prisma-express-api/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   │   └── env.js
│   ├── lib/
│   │   └── prisma.js
│   ├── middlewares/
│   │   ├── validate.middleware.js
│   │   ├── error.middleware.js
│   │   └── not-found.middleware.js
│   ├── modules/
│   │   └── student/
│   │       ├── student.route.js
│   │       ├── student.controller.js
│   │       ├── student.service.js
│   │       └── student.validation.js
│   ├── app.js
│   └── server.js
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── prisma.config.ts   # if generated / retained
```

### What belongs where?

  Location            Responsibility
  ------------------- -----------------------------------------------------
  `config/`           Application configuration and environment variables
  `lib/`              Shared initialized clients, such as Prisma
  `middlewares/`      Reusable request/response middleware
  `modules/`          Feature-specific code
  `*.route.js`        URL endpoints and middleware/controller wiring
  `*.controller.js`   Read request data and send HTTP responses
  `*.service.js`      Business logic and database operations
  `*.validation.js`   Zod schemas for request validation
  `app.js`            Configure Express and register routes/middleware
  `server.js`         Connect to the database and start listening

## 10. Environment configuration

`src/config/env.js`:

``` js
import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL,
  nodeEnv: process.env.NODE_ENV || "development",
};
```

Import this module first in `server.js` so `.env` is loaded before the
app and Prisma modules are evaluated.

## 11. Create one shared Prisma Client

`src/lib/prisma.js`:

``` js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
```

Import this shared instance from services. Avoid creating a new
`PrismaClient` in every route or service.

## 12. Add middleware

### `src/middlewares/not-found.middleware.js`

``` js
import { StatusCodes } from "http-status-codes";

const notFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "API route not found",
  });
};

export default notFound;
```

### `src/middlewares/error.middleware.js`

``` js
import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
```

This is a learning baseline. In a production API, avoid exposing
internal error details to clients and add deliberate handling for known
Prisma errors.

### `src/middlewares/validate.middleware.js`

``` js
import { StatusCodes } from "http-status-codes";

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Validation failed",
      errors: result.error.issues,
    });
  }

  req.body = result.data;
  next();
};

export default validate;
```

## 13. Student module

### `src/modules/student/student.validation.js`

``` js
import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().int().positive(),
  department: z.string().min(2),
});

export const updateStudentSchema = createStudentSchema.partial();
```

### `src/modules/student/student.service.js`

``` js
import prisma from "../../lib/prisma.js";

export const createStudent = async (data) => {
  return prisma.student.create({ data });
};

export const getStudents = async () => {
  return prisma.student.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getStudentById = async (id) => {
  return prisma.student.findUnique({
    where: { id },
  });
};

export const updateStudent = async (id, data) => {
  return prisma.student.update({
    where: { id },
    data,
  });
};

export const deleteStudent = async (id) => {
  return prisma.student.delete({
    where: { id },
  });
};
```

### `src/modules/student/student.controller.js`

``` js
import { StatusCodes } from "http-status-codes";
import * as studentService from "./student.service.js";

export const createStudent = async (req, res) => {
  const student = await studentService.createStudent(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Student created successfully",
    data: student,
  });
};

export const getStudents = async (req, res) => {
  const students = await studentService.getStudents();

  res.status(StatusCodes.OK).json({
    success: true,
    data: students,
  });
};

export const getStudentById = async (req, res) => {
  const student = await studentService.getStudentById(req.params.id);

  if (!student) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "Student not found",
    });
  }

  res.status(StatusCodes.OK).json({
    success: true,
    data: student,
  });
};

export const updateStudent = async (req, res) => {
  const student = await studentService.updateStudent(
    req.params.id,
    req.body
  );

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Student updated successfully",
    data: student,
  });
};

export const deleteStudent = async (req, res) => {
  await studentService.deleteStudent(req.params.id);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Student deleted successfully",
  });
};
```

Express 5 forwards rejected promises from async route handlers to error
middleware automatically. This is why these controllers do not need
repetitive `try/catch` blocks.

### `src/modules/student/student.route.js`

``` js
import { Router } from "express";
import * as studentController from "./student.controller.js";
import validate from "../../middlewares/validate.middleware.js";

import {
  createStudentSchema,
  updateStudentSchema,
} from "./student.validation.js";

const router = Router();

router.post(
  "/",
  validate(createStudentSchema),
  studentController.createStudent
);

router.get("/", studentController.getStudents);
router.get("/:id", studentController.getStudentById);

router.put(
  "/:id",
  validate(updateStudentSchema),
  studentController.updateStudent
);

router.delete("/:id", studentController.deleteStudent);

export default router;
```

`PUT` is used here to match the practice endpoints, while the Zod schema
permits partial updates. For strict REST semantics, use `PATCH` for
partial updates.

## 14. Configure the Express app

`src/app.js`:

``` js
import express from "express";
import studentRoutes from "./modules/student/student.route.js";
import notFound from "./middlewares/not-found.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Student API is running",
  });
});

app.use("/api/students", studentRoutes);

// Keep these after all routes.
app.use(notFound);
app.use(errorHandler);

export default app;
```

## 15. Start the server

`src/server.js`:

``` js
import { env } from "./config/env.js";
import app from "./app.js";
import prisma from "./lib/prisma.js";

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");

    const server = app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });

    const shutdown = async () => {
      server.close(async () => {
        await prisma.$disconnect();
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Server startup failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();
```

Start development:

``` bash
npm run dev
```

Expected logs:

``` text
Database connected successfully
Server running on port 5000
```

Open `http://localhost:5000/` to test the health endpoint.

## 16. Test the CRUD API

Use Postman, Thunder Client, or another HTTP client.

  Method     Endpoint              Action
  ---------- --------------------- ------------------
  `POST`     `/api/students`       Create student
  `GET`      `/api/students`       Get all students
  `GET`      `/api/students/:id`   Get one student
  `PUT`      `/api/students/:id`   Update student
  `DELETE`   `/api/students/:id`   Delete student

### Create student body

Send JSON:

``` json
{
  "name": "Rifat Hossain",
  "email": "rifat@example.com",
  "age": 22,
  "department": "CST"
}
```

### Partial update body

``` json
{
  "name": "Rifat Ahmed"
}
```

The `:id` value must be the MongoDB ObjectId returned by the create or
get endpoint.

## 17. Git ignore

Create `.gitignore`:

``` gitignore
node_modules/
.env
.env.*
!.env.example
```

Then initialize Git if needed:

``` bash
git init
git add .
git commit -m "Initial Express Prisma MongoDB setup"
```

Never commit real database credentials.

## 18. Useful commands

  Command                 Purpose
  ----------------------- -----------------------------
  `npm run dev`           Start development server
  `npm start`             Start server normally
  `npm ls --depth=0`      List installed dependencies
  `npx prisma -v`         Show Prisma versions
  `npx prisma validate`   Validate schema
  `npx prisma db push`    Sync schema to MongoDB
  `npx prisma generate`   Generate Prisma Client
  `npx prisma studio`     Open Prisma Studio

Whenever you change `schema.prisma`, run:

``` bash
npx prisma validate
npx prisma db push
npx prisma generate
```

## 19. Common troubleshooting

### `@prisma/client did not initialize yet`

Run:

``` bash
npx prisma generate
```

Also confirm that `prisma` and `@prisma/client` are both `6.19.3`.

### Prisma cannot read `DATABASE_URL`

-   Check that `.env` is in the project root.
-   Check the variable name is exactly `DATABASE_URL`.
-   If Prisma detects `prisma.config.ts`, ensure it imports
    `dotenv/config`.
-   Restart the terminal/server after changing environment variables.

### MongoDB authentication or connection error

-   Verify the Atlas username and password.
-   Check the database user's permissions.
-   Check Atlas network access settings.
-   Confirm the connection URI and cluster hostname.
-   URL-encode special characters in the password.

### Student email already exists

The `email` field is marked `@unique`. Handle Prisma error `P2002` and
return HTTP `409 Conflict`.

### Invalid or missing Student ID

Validate MongoDB ObjectId input before querying. Handle Prisma errors
such as record-not-found (`P2025`) and return an appropriate 404
response.

------------------------------------------------------------------------

## 20. Recommended next learning steps

After the basic CRUD API works, practise these in order:

1.  Pagination, search, filtering, and sorting.
2.  Centralized Prisma error handling.
3.  Stronger request validation and reusable validation middleware.
4.  Authentication and authorization.
5.  Password hashing and secure user management.
6.  Relations between Prisma models in MongoDB.
7.  Logging, rate limiting, and security headers.
8.  Automated tests and deployment.

------------------------------------------------------------------------

## Official documentation

-   [Prisma ORM 6 --- MongoDB
    connector](https://www.prisma.io/docs/orm/v6/overview/databases/mongodb)
-   [Prisma ORM 6 --- Prisma schema
    reference](https://www.prisma.io/docs/orm/v6/prisma-schema)
-   [Prisma ORM --- CLI
    reference](https://www.prisma.io/docs/orm/reference/prisma-cli-reference)
-   [Express 5 documentation](https://expressjs.com/)
-   [Node.js documentation](https://nodejs.org/docs/latest/api/)
-   [Nodemon](https://www.npmjs.com/package/nodemon)
-   [http-status-codes](https://www.npmjs.com/package/http-status-codes)
-   [Zod documentation](https://zod.dev/)

------------------------------------------------------------------------

**Learning reminder:** Understand the responsibility of each layer
rather than putting every query in a route file:

`Route → Validation → Controller → Service → Prisma → MongoDB`

Keep each module self-contained. Add more abstraction only when the
project actually needs it.
