# 🏦 Mutual Fund Diversification Nudge App

A **React-based** interactive app that helps users build a **diversified mutual fund portfolio** by showing **real-time overlap metrics** and **nudging** them toward better diversification.  
Built for the Indian mutual fund market with **popular fund data**, **overlap matrix**, and **behavioral finance nudges**.

![App Screenshot](docs/screenshot.png) <!-- Optional: Add screenshot later -->

---

## 📌 Features

- **📊 Fund Data**  
  Contains 10+ popular Indian mutual funds with category, 3Y returns, AUM, expense ratio, and top holdings.

- **🛡 Diversification Nudges**  
  Alerts the user when the chosen fund has high overlap with existing portfolio holdings.

- **✅ Simple Diversification Metric**  
  Uses portfolio **overlap percentage** to calculate a **Diversification Score**.

- **📈 Expected Returns**  
  Displays average historical 3-year returns for the selected portfolio.

- **🔄 Progressive Selection Flow**  
  Pick 3 funds step-by-step with progress indicator.

- **🚀 Export Portfolio**  
  Download your portfolio details as a JSON file.

- **📱 Responsive UI**  
  Works on desktops, tablets, and mobiles.

---

## ⚙️ Tech Stack

- **Frontend:** [React](https://reactjs.org/) (Create React App)
- **Charts:** [Chart.js](https://www.chartjs.org/) (optional — can be disabled)
- **Styling:** CSS3 (Responsive Grid & Flexbox)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 📂 Project Structure

mutual-fund-nudge-demo/
│
├── public/ # Static assets
├── src/
│ ├── App.js # Main React component & logic
│ ├── App.css # Styling
│ ├── index.js # Entry point
│ ├── index.css # Global styles
│ └── ...other files
├── package.json # Dependencies & scripts
└── README.md

text

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
git clone https://github.com/<your-username>/mutual-fund-nudge-demo.git
cd mutual-fund-nudge-demo

text

### 2️⃣ Install Dependencies
npm install

text

### 3️⃣ Run Locally
npm start

text
The app will be available at [**http://localhost:3000**](http://localhost:3000)

---

## 🌐 Deployment on Vercel

1. Push your project to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **"New Project"**.
3. Import your GitHub repository.
4. Vercel will auto-detect Create React App:
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
5. Click **Deploy**.
6. Your app will be live at:  
   `https://<your-project-name>.vercel.app`

---

## 📊 Diversification Metric

- **Overlap % Formula**:  
  For each pair of funds, overlap is pre-calculated from holdings:  
  \[
  \text{Overlap} = \sum_{i \in \text{common holdings}} \min(\text{weightA}_i, \text{weightB}_i)
  \]

- **Portfolio Diversification Score**:
  \[
  100 - (1.5 \times \text{average overlap \%})
  \]
  - **>85**: Excellent diversification  
  - **50–85**: Moderate diversification  
  - **<50**: Poor diversification  

---

## 📈 Expected Returns Calculation

The **Expected Return** is calculated as:
\[
\frac{\text{Sum of 3Y returns of selected funds}}{\text{Number of funds}}
\]
This gives an **average historical performance** of the chosen portfolio.

---

## 💡 Future Enhancements

- Live API integration for fund data.
- Advanced analytics (risk-adjusted returns, sector exposure).
- User authentication and saved portfolios.
- Multi-language support for Indian investors.

---

## 👨‍💻 Author

Developed for demonstration and academic purposes.  
You’re free to fork and adapt for your own use. 👍

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.