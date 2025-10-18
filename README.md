# 🧠 Sentiment Analysis AI

## 🌟 Project Summary
**Sentiment Analysis AI** is a web application that uses artificial intelligence to analyze the emotional tone of any text input. Powered by the **Google Gemini API**, it classifies text as **Positive**, **Negative**, or **Neutral** in real time.  

Built with **React** and **TypeScript**, the app offers a sleek, responsive, and intuitive single-page interface where users can input text, visualize results dynamically, and track sentiment trends over time.

---

## ✨ Key Features

- **Real-time Sentiment Analysis:** Instantly analyze text typed into the input box.  
- **Detailed Results:**  
  - Sentiment classification (Positive/Negative/Neutral) with a corresponding icon.  
  - Color-coded confidence score bar displaying model certainty.  
  - Original text shown for context.  
- **Batch Processing:** Upload a `.txt` file with multiple lines (e.g., customer reviews) to analyze in bulk.  
- **Dynamic Progress Indicators:**  
  - Progress bar for batch uploads.  
  - Pulsing dots loader for single-text analysis.  
- **Interactive Data Visualization:** Real-time pie chart updates showing sentiment distribution.  
- **Analysis History:** Scroll through past analyses with persistent results.  
- **Robust Error Handling:** Dismissible error alerts for issues like API errors or empty input.  
- **Responsive Design:** Works seamlessly across desktop, tablet, and mobile devices.

---

## ⚙️ How It Works

### 1. Frontend Interface (React & TypeScript)
- The user interacts through `App.tsx`, typing text or uploading a `.txt` file.  
- UI components such as `SentimentResultDisplay`, `SentimentChart`, and `ErrorAlert` are modular and reusable.

### 2. API Service Layer (`geminiService.ts`)
- Text submissions trigger the `analyzeSentiment()` function, which bridges the app and the Google Gemini API.

### 3. Calling the Gemini API
- Uses the `@google/genai` library and the **gemini-2.5-flash** model.  
- Sends structured prompts for sentiment classification and confidence scoring.  
- Leverages the **responseSchema** feature to enforce reliable JSON output:

---

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1nzFiTnQN6VsFUa6gwrJS8S_UjpYBwnfu

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
