# Full Stack URL Shortener

A modern, robust URL shortener application built with **Next.js 16** and **Node.js/Express**. It features real-time link tracking, sorting, deletion, and a clean, responsive UI.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Features

*   **Shorten URLs:** Instantly convert long URLs into shareable short links.
*   **Redirects:** Fast server-side redirection using a dedicated backend API.
*   **Analytics:** Track total clicks and creation dates for every link.
*   **Dashboard:**
    *   View all shortened links in a grid.
    *   **Sort** by Date or Popularity (Most Clicks).
    *   **Delete** unwanted links.
    *   **Copy** short links to clipboard with one click.
*   **System Health:** Dedicated `/healthz` page to monitor backend connectivity.
*   **Responsive:** Mobile-friendly UI built with Tailwind CSS.

## 🛠️ Tech Stack

### Frontend
*   **Framework:** Next.js 16 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, Lucide React (Icons)
*   **State Management:** TanStack Query (React Query) v5
*   **Deployment:** Netlify

### Backend
*   **Runtime:** Node.js
*   **Framework:** Express.js 5 (Beta)
*   **Database:** PostgreSQL (using `pg` driver)
*   **Deployment:** Render

---

## 📂 Project Structure

```text
/
├── backend/            # Express Server & Database Logic
│   ├── app.js
│   ├── routes/
│   ├── package.json
│   └── .env
│
├── frontend/           # Next.js Application
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── package.json
│   └── .env.local
│
└── README.md
```

# URL Shortener Project

## ⚡ Local Setup Guide

Follow these instructions to run the project on your local machine.

### Prerequisites
*   Node.js (v18 or higher)
*   PostgreSQL installed and running locally

---

### 1. Backend Setup

1.  **Navigate to the backend folder:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file inside the `backend` folder:
    ```env
    PORT=8000
    DATABASE_URL=postgresql://user:password@localhost:5432/urlshortener
    # Replace 'user', 'password', and 'urlshortener' with your local Postgres credentials
    ```

4.  **Database Setup:**
    Connect to your PostgreSQL database and run this SQL command to create the table:
    ```sql
    CREATE TABLE links (
      id SERIAL PRIMARY KEY,
      code VARCHAR(10) UNIQUE NOT NULL,
      target_url TEXT NOT NULL,
      total_clicks INTEGER DEFAULT 0,
      last_clicked_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

5.  **Run the Server:**
    ```bash
    npm run dev
    ```
    The backend should now be running on `http://localhost:8000`.

---

### 2. Frontend Setup

1.  **Navigate to the frontend folder:**
    (Open a new terminal window)
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Configuration:**
    Create a `.env.local` file inside the `frontend` folder:
    ```env
    # Points to your local backend
    NEXT_PUBLIC_BACKEND_API=http://localhost:8000/api/links

    # Points to your local frontend
    NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
    ```

4.  **Run the Client:**
    ```bash
    npm run dev
    ```
    The frontend should now be accessible at `http://localhost:3000`.

---

## 📡 API Endpoints

The backend exposes the following REST API endpoints:

| Method | Endpoint | Description | Body / Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/links` | Fetch all links | - |
| `POST` | `/api/links` | Create a new short link | `{ "target_url": "https://..." }` |
| `GET` | `/api/links/:code` | Get link details (Redirects 302) | - |
| `DELETE` | `/api/links/:code` | Delete a specific link | - |
| `GET` | `/healthz` | System health check | - |

---

## 🚀 Deployment

### Backend (Render)
1.  Push code to GitHub.
2.  Create a **Web Service** on Render.
3.  Set **Root Directory** to `backend`.
4.  Set **Build Command**: `npm install`.
5.  Set **Start Command**: `node app.js`.
6.  Add Environment Variables (`DATABASE_URL`).

### Frontend (Netlify)
1.  Push code to GitHub.
2.  Import project into Netlify.
3.  **Important Build Settings:**
    *   **Base Directory:** `frontend`
    *   **Publish Directory:** `.next`
    *   **Build Command:** `npm run build`
4.  **Environment Variables:**
    *   `NEXT_PUBLIC_BACKEND_API`: `https://your-render-app.onrender.com/api/links`
    *   `NEXT_PUBLIC_FRONTEND_URL`: `https://your-netlify-app.netlify.app`
5.  Ensure a `netlify.toml` file exists in the `frontend` folder for proper routing.

---

## 📝 License

This project is open source and available under the **MIT License**.
