# CredLo 🚀

**AI-Powered Fintech Platform** for personalized loan recommendations, credit score tracking, and automated financial insights. Built with the MERN stack and Google Gemini AI.

![CredLo Banner](https://via.placeholder.com/1200x400/060D0C/49BFBE?text=CredLo+AI+Fintech)

## ✨ Features

- **🤖 AI Financial Advisor**: Chat with a Gemini-powered expert for real-time financial advice.
- **📄 Document AI**: Instant income verification by uploading bank statements (Vision API).
- **📊 CIBIL Score Tracker**: Interactive visualizations of your credit health.
- **🔍 Smart Loan Finder**: Get personalized loan offers based on your profile and eligibility.
- **🛡️ Secure & Optimized**: GZIP compression, Helmet security, and optimized MongoDB architecture.

## 🛠️ Tech Stack

- **Frontend**: React.js, TailwindCSS, Framer Motion, Recharts
- **Backend**: Node.js, Express, MongoDB
- **AI**: Google Gemini (gemini-2.5-flash & gemini-1.5-flash)
- **Security**: JWT Auth, Helmet, Data Sanitization

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Atlas or Local)
- Google Gemini API Key

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/credlo.git
    cd credlo
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    # Create .env file based on provided example
    cp .env.example .env
    # Update .env with your credentials
    npm run dev
    ```

3.  **Frontend Setup**
    ```bash
    cd ../frontend
    npm install
    npm run dev
    ```

4.  **Local Access**
    Open `http://localhost:5173` to view the app.

## 🔑 Environment Variables

See `backend/.env.example` for required keys:
- `MONGO_URI`: Database connection
- `JWT_SECRET`: Authentication secret
- `GEMINI_API_KEY`: AI Model access

## 🤝 Contributing

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Built with ❤️ by CredLo Team*