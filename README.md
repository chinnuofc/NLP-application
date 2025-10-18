Project Summary: Sentiment Analysis AI
🧠 What This Project Is About
This is an AI-powered web application designed to analyze the emotional tone of any given text. It leverages the power of the Google Gemini API to classify text as Positive, Negative, or Neutral in real-time. The application provides a clean, interactive, and responsive interface for users to input text, view the analysis, and track the overall sentiment distribution of their entries.
It's built as a modern single-page application using React and TypeScript, focusing on a polished user experience with clear, immediate feedback.
✨ Key Features
Real-time Sentiment Analysis: Instantly analyze any text you type into the input box.
Detailed Results: For each analysis, you get:
A sentiment classification (Positive, Negative, Neutral) with a corresponding icon.
A color-coded confidence score bar showing the model's certainty.
The original text for context.
Batch Processing: Upload a .txt file containing multiple lines of text (e.g., a list of reviews) to analyze them all at once.
Dynamic Progress Indicators:
A progress bar provides real-time feedback during batch uploads, showing how many lines have been processed.
A sleek pulsing dots loader appears for single-text analysis, creating a smooth user experience.
Interactive Data Visualization: A dynamic pie chart visualizes the distribution of all analyzed sentiments, updating in real-time with each new result.
Analysis History: The application keeps a history of all your analyses, allowing you to scroll through past results.
Robust Error Handling: A prominent, dismissible error alert notifies you if something goes wrong (e.g., an API issue or empty input), ensuring you're never left in the dark.
Responsive Design: The interface is fully responsive and works beautifully on desktops, tablets, and mobile devices.
⚙️ How It Works: The Technical Flow
Frontend Interface (React & TypeScript): The user interacts with a UI built in App.tsx. They can either type text into the textarea or use the "Batch Upload" button to select a .txt file. All UI components (SentimentResultDisplay, SentimentChart, ErrorAlert) are modular and reusable.
API Service Layer (geminiService.ts): When the user submits text, the application calls the analyzeSentiment function. This service acts as a bridge to the Google Gemini API.
Calling the Gemini API:
The service uses the @google/genai library to communicate with the gemini-2.5-flash model.
It sends a carefully crafted prompt asking the model to classify the sentiment and provide a confidence score.
Crucially, it uses the responseSchema feature. This instructs the Gemini API to return its answer in a predictable, structured JSON format, which looks like this: { "sentiment": "Positive", "confidence": 0.95 }. This eliminates unreliable string parsing and makes the application much more stable.
State Management: The main App.tsx component manages the application's state using React hooks (useState). When the API response is received, the results array is updated, which triggers a re-render of the UI.
Displaying Results: The new result is immediately displayed in the SentimentResultDisplay component, the SentimentChart is updated with the new data, and the result is added to the top of the history list.
🚀 Summary of Our Improvements (What We've Done)
Throughout our session, we've made several key improvements to enhance the application's user experience and professionalism:
Enhanced Loading Indicators: We moved beyond simple "Loading..." text.
We implemented a visual progress bar for batch file analysis, giving users clear and precise feedback on long-running tasks.
We created and integrated a custom PulsingDotsLoader component for single text submissions, replacing the basic text indicator with a more modern and engaging animation.
Refined Error Display: We replaced the simple text-based error message with a dedicated ErrorAlert component.
This new component is visually distinct (red, with an icon) to immediately catch the user's attention.
It is dismissible, featuring a close button (X) so users can clear the error from the screen, improving the overall user experience.
Modular Icon System: We built a centralized components/icons.tsx file to house all SVG icons. This keeps the code organized and makes it easy to manage and reuse icons like ThumbsUpIcon, ErrorIcon, and the PulsingDotsLoader across the application.
This project is a perfect example of how to build a smart, modern web application by combining a powerful AI backend (Google Gemini) with a polished, user-centric frontend (React).

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
