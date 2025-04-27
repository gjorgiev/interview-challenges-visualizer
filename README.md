# Interview Challenges Visualizer

An open-source fullstack application to visualize and interactively learn algorithm problems such as Fibonacci sequence, Pointer Jump problems, and more.

Built with **React + Express + Prisma** and fully **Dockerized** for easy deployment and scalability.

---

## 🚀 Features

- Dynamic exercise descriptions and solutions fetched from a database
- Step-by-step visualizations for algorithm problems
- TailwindCSS for clean UI and fast prototyping
- Express API + Prisma ORM for backend
- SQLite for local development (PostgreSQL-ready for production)
- Docker Compose to orchestrate frontend and backend

---

## 🛠️ Tech Stack

- Frontend: **React** + **TailwindCSS**
- Backend: **Express.js** + **Prisma ORM**
- Database: **SQLite** (local) / **PostgreSQL** (production-ready)
- Containerization: **Docker** + **Docker Compose**

---

## 📦 Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/interview-challenges-visualizer.git
cd interview-challenges-visualizer
```

### 2. Install Docker and Docker Compose

- [Install Docker Desktop](https://www.docker.com/products/docker-desktop)

### 3. Run the project

```bash
docker compose up --build
```

- Frontend runs at: [http://localhost:3000](http://localhost:3000)
- Backend API runs at: [http://localhost:4000/api/exercises/1](http://localhost:4000/api/exercises/1)

✅ Live reload supported with Docker volumes!

---

## 🎯 Usage

- Visit the frontend in your browser.
- Choose an algorithm problem to visualize (e.g., Fibonacci Sequence).
- Step through each move and understand the solution dynamically.

---

## ✨ Future Improvements

- Add more algorithm visualizations
- Admin panel to create/update exercises from the UI
- User authentication
- Deploy to cloud (AWS, GCP, Vercel, Render)
- Switch to PostgreSQL for production database

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> Built with ❤️ by Georgi (and ChatGPT as your pair programmer 🤖)
