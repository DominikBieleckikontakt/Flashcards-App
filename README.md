# FlashcardApp

FlashcardApp is a web application that allows users to create, edit, browse, and test themselves with flashcards. You can view flashcards created by other users, mark them as favorites, and switch between regular learning mode and test mode.

The app is built using **Next.js**, **Supabase**, **PostgreSQL**, **Drizzle ORM**, **TailwindCSS**, **shadcn/ui**, **Zustand**, and integrates AI features.

👉 Live demo: [https://flashcards-5iy80fzeh-dominikbieleckis-projects.vercel.app](https://flashcards-5iy80fzeh-dominikbieleckis-projects.vercel.app)

---

## Features

✅ Create, edit, and delete your own flashcards  
✅ Browse flashcards created by other users  
✅ Add flashcards to favorites  
✅ Use regular study mode or test mode  
✅ Modern UI with TailwindCSS and shadcn/ui  
✅ Persistent state management with Zustand  
✅ AI-powered flashcard generation (optional)

---

## Tech stack

- **Next.js**
- **TailwindCSS**
- **shadcn/ui**
- **Supabase**
- **PostgreSQL**
- **Drizzle ORM**
- **Zustand**
- **AI integrations**

---

## Getting started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/FlashcardApp.git
cd FlashcardApp
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create your environment variables

Create a .env.local file in the root directory and add the following:

```bash
DATABASE_URL=""
DATABASE_PASSWORD=""
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
GITHUB_TOKEN=""
```

### 4️⃣ Run the app locally

```bash
npm run dev
```

The app will be available at http://localhost:3000.

License
This project is licensed under the MIT License.

## Notes

- You need a Supabase project and PostgreSQL database to run this app.

- The application is deployed using Vercel.
