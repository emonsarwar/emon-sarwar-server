### Portfolio Backend – Contact Form API

This is a simple Node.js + Express backend for handling a portfolio contact form.
It sends contact messages via email (Gmail SMTP using Nodemailer) and temporarily stores messages in memory for an admin view.

### 🚀 Features

- Express REST API

- Contact form endpoint

- Email sending via Nodemailer (Gmail SMTP)

- CORS configuration

- Environment variable support with dotenv

- In-memory message storage

- Admin endpoint to view received messages


### 🛠️ Tech Stack

- Node.js

- Express

- Nodemailer

- dotenv

- CORS

### 📁 Project Structure

.
├── server.js          # Main server file
├── .env               # Environment variables
├── package.json
└── README.md


### ⚙️ Installation

- Clone the repository

git clone https://github.com/emonsarwar/emon-sarwar-server
cd <project-folder>

# Install dependencies

npm install


### Create a .env file
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
ALLOWED_ORIGIN=*

### Running the Server
npm run dev

http://localhost:5000

