# Interview Challenges Visualizer

An open-source fullstack application to visualize and interactively learn algorithm problems such as Fibonacci sequence, Pointer Jump problems, and more.

Built with **React + Express + Type ORM** and fully **Dockerized** for easy deployment and scalability.

🔗 **Live Demo:** [https://interview-challenges-visualizer-frontend.onrender.com/](https://interview-challenges-visualizer-frontend.onrender.com/)

---

## 🚀 Features

- Dynamic exercise descriptions and solutions fetched from a database
- Step-by-step visualizations for algorithm problems
- TailwindCSS for clean UI and fast prototyping
- Express API + Type ORM for backend
- PostgreSQL database
- Docker Compose to orchestrate frontend and backend
- Continuous Integration/Continuous Deployment (CI/CD) with GitHub Actions

---

## 🛠️ Tech Stack

- Frontend: **React** + **TailwindCSS**
- Backend: **Express.js** + **Type ORM**
- Database: **PostgreSQL**
- Containerization: **Docker** + **Docker Compose**
- CI/CD: **GitHub Actions** + **Render**

---

## 📦 Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/gjorgiev/interview-challenges-visualizer.git
cd interview-challenges-visualizer
```

### 2. Install Docker and Docker Compose

- [Install Docker Desktop](https://www.docker.com/products/docker-desktop)

### 3. Run the project

```bash
docker-compose up --build
```

- Frontend runs at: [http://localhost:3000](http://localhost:3000)
- Backend API runs at: [http://localhost:4000/api/exercises/1](http://localhost:4000/api/exercises/1)

✅ Live reload supported with Docker volumes!

---

## 🔄 CI/CD Pipeline

The project uses GitHub Actions for CI/CD with separate workflows for backend and frontend:

- **Backend workflow**: Triggered when changes are made to backend code or workflow file

  - Runs on push to main branch
  - Deploys automatically to Render using deploy hooks

- **Frontend workflow**: Triggered when changes are made to frontend code or workflow file
  - Runs on push to main branch
  - Deploys automatically to Render using deploy hooks

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
- Implement testing for both frontend and backend

---

## 📄 License

This project is licensed under the [GNU General Public License v3.0](LICENSE).

---

> Built with ❤️ by Georgi (ChatGPT and Claude as the assistant programmers 🤖)
