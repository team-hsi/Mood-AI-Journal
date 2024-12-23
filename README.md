# Mood AI Journal 📓🧠

Mood AI Journal is an innovative AI-powered web application designed to help users analyze and track their moods over time through journal entries. By leveraging advanced AI for sentiment analysis and emotional insights, the app allows users to gain a deeper understanding of their mental health trends.

## 🌟 Features

### Version 2.0 (Latest)

- **80+ Language Support** 🌍: Express yourself in your native language! Mood AI Journal now detects and responds in over 80 languages.
- **Powerful Search** 🔍: Easily find past entries by mood, emotion, sentiment score, and subject.
- **AI-Powered Chat** 🤖: Interact with a personal journal assistant that knows your entries and offers personalized insights.
- **Revamped Design** 🎨: Experience our new fancy landing page with animations for a visually stunning first impression.
- **Dynamic Language Interaction** 🗣️: Type in any supported language, and Mood AI Journal responds seamlessly in your preferred language.
- **Actionable Insights** 💡: Receive tailored recommendations based on your mood to help guide your day.
- **Next.js Upgrade** ⚡: Enjoy faster, more secure performance with Next.js v14.2.21.

### Core Features

- **Journal Entry Management**: Create, update, and delete journal entries with auto-save functionality.
- **AI-Powered Analysis**: Mood detection, sentiment scoring, emotion classification, subject identification, emoji suggestions, summarization, and color assignment.
- **Multilingual Support**: Detect and respond in over 80 languages, allowing users to express themselves in their native language.
- **Action Recommendations**: Provide personalized, actionable insights based on mood analysis to guide users' daily activities and improve well-being.
- **Data Visualization**: Analytics and doughnut charts derived from sentiment scores.
- **Authentication**: Secure user authentication through Clerk integration.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- A Clerk account for authentication
- A Neon Database account
- A Google Generative AI API key

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/mood-ai-journal.git
   cd mood-ai-journal
   ```

2. Install dependencies:

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

3. Set up Prisma:

```
npx prisma generate
npx prisma migrate dev --name init
```

4. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:

   ```
   # Clerk key's

   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/journal
   NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/new-user

   # Neon db url
   DATABASE_URL=your_neon_database_url

   # Google
   GOOGLE_GENERATIVE_AI_API_KEY = your_gemini_api_key

   ```

5. Run the development server:

   ```
   npm run dev
   ```

   or

   ```
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - The React framework for production
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Clerk](https://clerk.dev/) - Authentication and user management
- [Neon Database](https://neon.tech/) - Serverless Postgres database
- [AI SDK](https://sdk.vercel.ai/) - Building applications with vercel ai skd through composability
- [Google Generative AI](https://cloud.google.com/ai-platform) - Advanced AI models for natural language processing
- [Prisma](https://www.prisma.io/): ORM tool for type-safe database interactions and migrations.

## 🤝 Contributing

We welcome contributions to Mood AI Journal! Please see our [Contributing Guide](CONTRIBUTING.md) for more details on how to get started.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape Mood AI Journal
- Special thanks to the open-source community for the amazing tools and libraries that made this project possible

## 📞 Support

If you encounter any issues or have questions, please file an issue on our [GitHub issue tracker](https://github.com/team-hsi/Mood-AI-Journal/issues).

---

Made with ❤️ by the Mood AI Journal Team
