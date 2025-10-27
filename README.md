# Elastic Canvas: AI-Powered Design Studio

Welcome to Elastic Canvas, a web application that brings creative ideas to life with the help of AI. This project, built with Next.js and Firebase, serves as a portfolio for a creative agency specializing in 3D modeling and custom product manufacturing (like keychains and patches). It also features an AI-powered tool to help users brainstorm new product ideas.

![Elastic Canvas Screenshot](https://storage.googleapis.com/studiopintegration/elastic-canvas-screenshot.png)

---

## ✨ Features

- **Interactive 3D Animations:** A captivating hero section with scroll-driven 3D animations using Three.js.
- **Bilingual Support:** Easily switch between English and Arabic (LTR/RTL supported).
- **AI Idea Generator:** Describe a concept, and an AI will flesh out a product idea for you, powered by OpenRouter and Genkit.
- **AI Sentiment Analysis:** The contact form uses AI to analyze the sentiment of user messages, allowing for prioritization of inquiries.
- **Dynamic Portfolio:** A clean, modern portfolio to showcase creative work.
- **Responsive Design:** A beautiful and functional user experience across all devices, from mobile to desktop.
- **Built with ShadCN UI:** Utilizes a modern, accessible, and customizable component library.

---

## 🚀 Tech Stack

This project is built with a modern, robust, and scalable tech stack:

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn/UI](https://ui.shadcn.com/)
- **Generative AI:** [Genkit (by Firebase)](https://firebase.google.com/docs/genkit)
- **AI Model API:** [OpenRouter.ai](https://openrouter.ai/)
- **Database & Backend:** [Firebase](https://firebase.google.com/) (Firestore for submissions)
- **3D Graphics:** [Three.js](https://threejs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your API keys. You can get a free key from OpenRouter.

    ```env
    # Firebase Configuration (replace with your project's config)
    NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

    # OpenRouter API Key for the Idea Generator
    OPENROUTER_API_KEY=your_openrouter_api_key
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

---

This project was bootstrapped and developed with the help of **Firebase Studio**.
