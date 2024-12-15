# Real time chat application
![Screenshot (114)](https://github.com/user-attachments/assets/ff800db3-91ef-4cda-ae54-afd27b56182a)
## Overview

This is a real-time chat application that allows users to create accounts, search for other users, and exchange messages in real time. The application is built using modern web technologies and integrates both frontend and backend to deliver a seamless chatting experience.

## Features

- User Authentication: Users can register, log in, and manage their accounts.

- Profile management: Users can update their data such as username, fullname, profile picture.

- Search Functionality: Search for other users by username.

- Real-Time Messaging: Exchange messages instantly using WebSocket technology.

- User Status: Shows if a user is online or offline and displays their last seen.

## Tech Stack

### Frontend:

- React.js

- Tailwind css 

### Backend:

- Express.js

- MongoDB (Mongoose ODM for database management)

- JWT for authentication



## Installation and Setup

### Prerequisites

- Node.js and npm installed.

- MongoDB instance running locally or remotely.

### Steps
1. Clone the repository
```bash
  git clone https://github.com/sofyanBoukir/ChatMate-App.git
  cd ChatMate-App
```
2. Setup the backend
```bash
  cd back-end
  npm install
```
3. Setup the frontend
```bash
  cd front-end
  npm install
```

4. Create .env file in the backend directory
```bash
  PORT=3000
  MONGO_DB_URL=mongodb://localhost:27017/ChatApp
  SECRET_KEY=sss.example
```
5. Run the app
   ```bash
   backend: npx nodmone src/server.js
   frontend: npm run dev
  
