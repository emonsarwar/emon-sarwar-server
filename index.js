const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
// app.use(cors({
//   origin: [
//     "http://localhost:3000",
//     "http://localhost:5173",
//     "https://emon-sarwar-client.vercel.app"
//   ],
//   credentials: true,
// }));


const allowedOrigins = [
  "http://localhost:3000",       // Legacy React
  "http://localhost:5173",       // Vite (Current Local)
  "https://es-client.vercel.app" // Your Production Client
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or mobile apps)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy violation: Origin not allowed"), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Manually handle OPTIONS requests (Crucial for Vercel/Serverless)
app.options('*', cors());


app.use(express.json());

// 1. Initialize the array at the top level
let messages = []; 

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER, // Better to use your own email as 'from' for Gmail
    replyTo: email,               // This lets you reply directly to the sender
    to: process.env.EMAIL_USER,
    subject: `New Portfolio Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    // 2. Send the email
    await transporter.sendMail(mailOptions);

    // 3. Store the message in the array after successful email
    const newMessage = { 
      id: messages.length + 1, 
      name, 
      email, 
      message, 
      date: new Date().toLocaleString() 
    };
    messages.push(newMessage);

    // 4. Send the final response
    res.status(200).json({ success: true, message: 'Success' });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error' });
  }
});

// 5. Get all messages (handy for your admin view)
app.get("/api/messages", (req, res) => {
  res.json(messages);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));