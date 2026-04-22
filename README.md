# NestJS Sequelize Auth Starter – Backend Prototype

[![NestJS](https://img.shields.io/badge/NestJS-8-red.svg)](https://nestjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6-blue.svg)](https://sequelize.org/)
[![JWT](https://img.shields.io/badge/JWT-Auth-orange.svg)](https://jwt.io/)
[![Status: Archived](https://img.shields.io/badge/status-archived-lightgrey.svg)](https://github.com/yourusername/nestjs-sequelize-auth)

> **⚠️ PROTOTYPE – NOT PRODUCTION READY**  
> This repository contains an **early‑stage backend** built with **NestJS** and **Sequelize**. It implements basic authentication, user management, and role‑based access control. It is preserved **for educational and portfolio reference only**.

## 📖 Overview

This project was created to explore **NestJS** fundamentals and best practices:

- Modular architecture with dependency injection.
- Database integration via **Sequelize‑Typescript**.
- JWT‑based authentication (login, registration).
- Role‑based guards (`RolesGuard`) for endpoint protection.
- Custom param decorators (`@AuthUser()`).
- Environment configuration with `@nestjs/config`.

The API provides endpoints for:

- User registration and login (`/auth/registration`, `/auth/login`).
- Fetching current user data (`/user`).
- Listing all users (admin‑only, via roles guard).
- Role management (`/roles`).

## 🛠️ Technology Stack

- **Framework**: NestJS 8
- **Language**: TypeScript
- **Database**: MySQL (via Sequelize)
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **Validation**: Class‑validator (via DTOs)
- **Testing**: Jest (pre‑configured)
- **Tooling**: ESLint, Prettier

## 📁 Project Structure
```bash
src/
├── auth/ # Authentication module (login/registration)
├── user/ # Current user operations
├── users/ # User management (admin)
├── roles/ # Role entity, service, controller
├── database/ # Sequelize providers
├── guards/ # RolesGuard (JWT + roles)
├── app.module.ts
└── main.ts
```

## ✅ Implemented Features

- Sequelize models with `sequelize-typescript` decorators.
- Many‑to‑many association between `User` and `Role`.
- Password hashing with bcrypt.
- JWT token generation and verification in guard.
- Role‑based access control (`@SetMetadata('roles', [...])`).
- CORS enabled for `http://localhost:4200` (Angular frontend).

## 🚫 Limitations / Missing Pieces

- **No email verification** or password reset flows.
- **No refresh token** mechanism.
- **No input validation** DTOs are defined but validation pipe is not applied.
- **No error handling** for database unique constraints (e.g., duplicate email).
- **Testing** – Jest config exists but no actual tests written.
- **Hardcoded CORS origin** – should use environment variable.
- **Sequelize sync with `alter: true`** – risky for production.

## 📚 Educational Value

This codebase is an excellent reference for:

- Setting up **NestJS** with Sequelize and JWT.
- Implementing **custom guards** and **decorators**.
- Using **Sequelize‑Typescript** for model definitions and associations.
- Organising code by **feature modules**.

It complements my other backend projects ([construction_cp_back](https://github.com/yourusername/construction_cp_back), [delivery_rest_server](https://github.com/yourusername/delivery_rest_server)) by demonstrating a more **structured and modern** approach with NestJS.

## 🔧 How to Run

```bash
npm install
# Create a .development.env file with MySQL credentials
npm run start:dev
```
The server will run on http://localhost:5000.

📄 License
UNLICENSED – for portfolio use only.

👤 Author & EB‑1A Context
GitHub: @yourusername
This repository is part of a curated portfolio documenting 15+ years of software development, supporting an EB‑1A extraordinary ability visa petition under the original contributions criterion.

“The best way to predict the future is to implement it.” – Alan Kay