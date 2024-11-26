# **Hobbiverse**  
Explore and manage your interests across video games, music, and anime/manga.

Hobbiverse is a platform designed for hobby enthusiasts to seamlessly interact with their favorite services like Spotify, Steam, and MyAnimeList. Phase 1 focuses on music integration using Spotify, providing features such as user authentication, playlist management, and track exploration.

---

## **Features (Phase 1 - Music)**  
- **Spotify Login**: Secure OAuth 2.0 authentication.  
- **Dashboard**: View user profile details and playlists.  
- **Playlist Details**: Explore tracks within playlists, including metadata like track name, artists, and duration.  

---

## **Technologies Used**  
- **Frontend**:  
  - Next.js (React framework for server-side rendering and routing)  
  - Tailwind CSS (Utility-first CSS framework for responsive design)  
  - TypeScript (Static typing for better maintainability)  

- **Backend**:  
  - Node.js (Runtime environment for scalable backend services)  
  - Apollo Server (GraphQL API to interact with Spotify)  

- **Authentication**:  
  - NextAuth.js (For Spotify OAuth 2.0 authentication)  

- **Other Libraries**:  
  - `spotify-web-api-node` (Spotify API wrapper)  

---

## **Getting Started**  

### **1. Prerequisites**
- **Node.js**: Ensure you have Node.js installed. Download it [here](https://nodejs.org/).  
- **Spotify Developer Account**: Create an app on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).  

---

### **2. Installation**  

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/<your-username>/hobbiverse.git
   cd hobbiverse
   ```

2. **Install dependencies**:  
   ```bash
   npm install
   ```

3. **Configure environment variables**:  
   Create a `.env.local` file in the root directory and add the following:  
   ```env
   SPOTIFY_CLIENT_ID=<your-spotify-client-id>
   SPOTIFY_CLIENT_SECRET=<your-spotify-client-secret>
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Start the development server**:  
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

---

### **3. File Structure**  
```plaintext
hobbiverse/
├── components/          # Reusable UI components
├── pages/               # Next.js pages for routing
│   ├── _app.tsx         # Global layout and providers
│   ├── login.tsx        # Login page
│   ├── dashboard.tsx    # User dashboard
│   └── playlist/        # Dynamic playlist details page
├── styles/              # Global styles (configured for Tailwind)
├── utils/               # Helper functions
├── public/              # Static assets
├── .env.local           # Environment variables
├── package.json         # Project metadata and dependencies
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

---

## **Roadmap**  
This is Phase 1 of the Hobbiverse project. Future phases include:  
1. **Phase 2: Video Games**  
   - Integrate Steam for game library, stats, and achievements.  

2. **Phase 3: Anime/Manga**  
   - Use MyAnimeList API for anime/manga tracking and recommendations.  

3. **Phase 4: Social Layer**  
   - User profiles, social interactions, and sharing.  

4. **Phase 5: AI-Powered Insights**  
   - Advanced recommendations and analytics across all themes.  

---

## **Contributing**  
Contributions are welcome! If you’d like to add a feature or fix a bug, please:  
1. Fork the repository.  
2. Create a new branch.  
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and test them locally.  
4. Submit a pull request with a clear description of your changes.

---

## **License**  
This project is licensed under the [MIT License](LICENSE).  

---

## **Acknowledgments**  
- **Spotify API** for enabling music integration.  
- The open-source community for providing great tools like Next.js, Tailwind CSS, and more.  

---

Let me know if you’d like adjustments or additional sections!
