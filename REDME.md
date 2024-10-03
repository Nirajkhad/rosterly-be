# Project Name

## Description

A brief description of the project, what it does, and its key features.

## Prerequisites

Before you begin, make sure you have the following software installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js (version 16 or later)](https://nodejs.org/en/download/)

## Getting Started

Follow the steps below to set up and run the project.

### 1. Clone the Repository

Run the following commands to clone the repository and navigate into the project folder:

```bash
git clone https://github.com/your-username/your-repository.git
cd  /rosterly-be
docker-compose up --build -d
npm install
docker exec -it app sh
npx sequelize-cli db:migrate



