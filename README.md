# 🚀 GitFlow – Lightweight CI/CD Orchestrator

**Tech Stack:** Go · React · Docker · WebSockets · Gin · TailwindCSS  

DevFlow is a **self-hosted CI/CD automation tool** that executes YAML-defined workflows inside Docker containers, streams real-time logs locally!!.  
---

## 🌟 Features

✅ **Pipeline as Code:** Define multi-stage workflows using simple YAML files  
✅ **Dockerized Execution:** Each job runs in an isolated container  
✅ **Real-Time Logs:** WebSocket streaming from Go backend to React UI  
✅ **Modern UI:** Built with React + Tailwind + Framer Motion for smooth animations  

---

## 🧠 Architecture Overview

```mermaid
flowchart LR
    A[Frontend (React)] -->|WebSocket| B[(Go API Server)]
    B -->|Executes Jobs| C[Docker Engine]
    B -->|Reads/Writes| D[(PostgreSQL)]
    A -->|REST API| B
    E[GitHub/GitLab] -->|Webhook Trigger| B
