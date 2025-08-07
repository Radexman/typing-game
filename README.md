# Next.js Real-Time Typing Competition Challenge

## Overview

This project is a real-time typing competition web app inspired by platforms like TypeRacer, built using Next.js and TypeScript. The core idea is to allow multiple users to compete by typing sentences accurately and quickly within fixed-time rounds, tracking live progress, words per minute, and accuracy.

The app focuses on delivering a solid MVP demonstrating core gameplay mechanics, with an architecture designed to be easily extended for full real-time multiplayer interaction.

---

## Features Implemented in MVP

- **Full stack Next.js app** with frontend and backend (API routes).
- Written in **TypeScript** for type safety and maintainability.
- Emphasis on **real-time updates**, **state management**, and **clean coding style**.
- Implemented **timer-based rounds**, **live input feedback**, and a **leaderboard UI**.
- Attempted **WebSocket integration** for real-time multiplayer syncing but faced time and technical constraints.
- Prioritized **readable commits** and **best practices**.
- No formal UI/UX designs provided, used simple styling and popular UI libraries for quick development.

---

---

## Tech Stack

This project uses the following main technologies and libraries:

### Frameworks & Runtime

- **Next.js v15.4.6** — React framework for server-side rendering and API routes
- **React v19.1.0** — Frontend UI library
- **TypeScript v5** — Typed JavaScript for safer, maintainable code

### Authentication

- **@kinde-oss/kinde-auth-nextjs v2.8.6** — Authentication SDK for Next.js with Kinde identity provider integration

### Styling

- **Tailwind CSS v4** — Utility-first CSS framework for styling
- **@tailwindcss/postcss** — Tailwind integration with PostCSS

### Development Tools

- **ESLint v9** & **eslint-config-next v15.4.6** — Linting and code quality tools
- **Prettier v3.6.2** & **prettier-plugin-tailwindcss v0.6.14** — Code formatter with Tailwind CSS sorting
- **TypeScript types**:
  - `@types/node v20`
  - `@types/react v19`
  - `@types/react-dom v19`

---

## Technical Notes & Choices

- **Next.js with App Router & API Routes:**  
  The frontend and backend are combined using Next.js’s API routes to serve sentence data and manage round timing.

- **State Management:**  
  Local React state and hooks manage the user’s typing input, timer countdown, and current sentence.

- **No real-time backend yet:**  
  Initially, I attempted to implement real-time synchronization using WebSockets (Socket.IO), but due to time constraints and technical challenges, this approach was paused.

- **Fallback to mocked data for competitors:**  
  As a result, the live leaderboard currently only shows the logged-in user’s real progress, with other competitors represented by static mock data.

---

## What Could Be Improved / Next Steps

- **Full WebSocket integration:**  
  The key missing piece is a live real-time backend connection that updates all players’ progress dynamically. Integrating a WebSocket server would allow:
  - Live syncing of each player’s typed text, WPM, and accuracy to all connected clients
  - Real-time updates of player joins and leaves
  - More competitive gameplay with instant feedback on rivals’ performance

- **Persistence of player stats:**  
  Storing player results between sessions to allow returning users to continue their stats and rankings.

- **Better sentence management:**  
  Using a larger, dynamic sentence source or even generating sentences on the fly via an API or AI to keep content fresh and varied.

- **Improved UI/UX:**  
  Adding polished styling, animations, sound effects, and responsiveness for better user engagement.

- **Testing:**  
  Adding unit tests, integration tests, and potentially end-to-end tests to ensure reliability and prevent regressions.

- **Security:**  
  Implementing authentication and sanitizing inputs to secure the app for multi-user environments.

---

## How to Run

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn package manager

### Usage

```bash
git clone git@github.com:Radexman/typing-game.git
cd typing-game
npm install
code .
```

### Add Env Variables

add file .env.local
add following variables

```bash
KINDE_CLIENT_ID=8371c17a1beb4c838010d1ed5db011ae
KINDE_CLIENT_SECRET=U2q3lteTQBA6RRqo10htuZwWvV0MQk1NwizSg7IfGRW38QT19Ai
KINDE_ISSUER_URL=https://typinggame.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard
```

### Open App

```bash
npm run dev
```
