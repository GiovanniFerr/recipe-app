# Recipe App

Recipe App is an Angular training project built to practice and improve my skills in both Angular and Git workflows.

The goal of this project is to simulate a real-world application while experimenting with core Angular concepts, best practices in code organization and Git workflows.

---

## 🚀 Features

- 🔐 Fake login system
- 🍽️ Full CRUD for recipes:
  - View all recipes
  - View recipe details
  - Create a new recipe
  - Edit existing recipes
  - Delete recipes
- ✨ "Get Inspired" section on the homepage:
  - Displays 5 random recipes fetched from the **TheMealDB API** (https://www.themealdb.com/)
  - Includes a dedicated detail page for each external recipe
---

## 🧠 Angular Concepts Used

- Angular Material
- Property Binding
- Directives
- Pipes
- Services
- Component lifecycle (ngOnInit)
- Parent–Child component communication
- Routing (including child routes and route parameters)
- Auth service and route guards
- Reactive forms
- HttpClient module (API integration)
- LocalStorage data persistence
- Async Pipe with Observables
- Firebase Realtime Database for storing data and performing CRUD operations (not a feature merged into master but a temporary test branch)
- Firebase Authentication using REST API tokens to simulate registration/login (not a feature merged into master but a temporary test branch)

---

## 🧱 Project Structure

The project is organized into clearly separated folders to maintain clean architecture.

---

## ▶️ How to Run the Project

- To run this project locally:
  ```bash
  npm install
  ng serve
- Then open:
  - http://localhost:4200
# Requirements
Tested with:
- Node.js 24.14.0
- Angular CLI 21.2.7
- Angular 21.2.8

Recommended:
- Node.js >= 20.x (LTS)
- Angular CLI >= 21.2.x
- Angular >= 21.2.x
- Install Angular CLI if needed:
  ```bash
  npm install -g @angular/cli

---
  
# Firebase setup
- To run this project with Firebase, you must create a local configuration file.
- Create the config file "config.local.ts" in src/app
- Add your Firebase credentials
  Copy the structure from config.ts and create your own config.local.ts:
  ```ts
  export const CONFIG = {
  apiKey: 'YourAPIkey',
  dbUrl: 'YourDBurl'
  };
# Important
- config.local.ts is required to run the Firebase version of the app
- Do NOT use the values in config.ts (they are placeholders)
- Never commit config.local.ts to GitHub

---

## 🎯 Purpose

This project was created as a learning exercise to:

- Practice Angular development in a realistic scenario
- Improve understanding of frontend architecture
- Learn Git workflow with feature branches and structured commits

---

## 📌 Notes

This is a training project and does not include a real authentication system or backend.  
All authentication and stored data are simulated using frontend logic and localStorage.

This project was built using Angular official documentation and additional learning resources to support development and problem-solving.
