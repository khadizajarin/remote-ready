
# ☕ Remote Ready – Find Your Perfect Workspace

**Remote Ready** is a premium cafe-discovery platform designed for remote workers, digital nomads, and students. Built with **Next.js**, **Firebase**, and **Tailwind CSS**, it helps users find independent cafes with reliable Wi-Fi, manageable noise levels, and available power outlets.

---

## 🔗 Live Demo & Links

- **Live Website:** [https://remote-ready-qxsx.vercel.app/](https://remote-ready-qxsx.vercel.app/) 
- **GitHub Repository:** [https://github.com/khadizajarin/remote-ready](https://github.com/khadizajarin/remote-ready)

---

## ✨ Key Features

- **📍 Smart Discovery:** Browse curated cafes filtered by city (Dhaka, Chattogram, Sylhet) and vibe.
- **🔍 Real-time Search:** Instantly search by cafe name, area, or vibe.
- **📊 Advanced Filtering:** Filter spots by **City** and **Price Range** (Multiple field filtering) to find the perfect workspace match.
- **🔐 Secure Authentication:** Email/Password & Google Login using **Firebase Auth**.
- **✍️ Community Contributions:** Users can contribute new cafe finds via a protected form featuring **Inline Form Validation**.
- **❤️ Personal Favorites:** Logged-in users can bookmark spots to their personal collection.
- **🛠️ Management Dashboard:** Manage your added listings and favorites in one place.
- **📱 Fully Responsive:** Seamless experience across Mobile, Tablet, and Desktop.
- **⚡ Real-time Updates:** Powered by **Firestore onSnapshot** for live data synchronization without page refresh.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/) |
| **Database** | [Cloud Firestore](https://firebase.google.com/products/firestore) |
| **Authentication** | [Firebase Auth](https://firebase.google.com/products/auth) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **State/Context** | [Context API](https://react.dev/learn/passing-data-deeply-with-context) |

---

## 🗺️ Route Summary

| Route | Access | Description |
| :--- | :--- | :--- |
| `/` | Public | Landing page with featured sections and how-it-works. |
| `/items` | Public | Explore all cafes with Search, City, and Price filtering. |
| `/items/[id]` | Public | Dynamic route showing detailed info and related spots. |
| `/items/add` | **Private** | Protected form to contribute a new cafe spot. |
| `/items/manage` | **Private** | Dashboard to view and delete your own listings. |

---

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/khadizajarin/remote-ready](https://github.com/khadizajarin/remote-ready)
   cd remote-ready
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your Firebase credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## 🛡️ Firestore Security Rules

To ensure data security, use the following rules in your Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /spots/{spotId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    match /users/{userId}/favorites/{favId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 🤝 Contact
- **Developer:** Khadiza Jarin Roza
- **Email:** khadiza131310@gmail.com
- **LinkedIn:** [Khadiza Jarin Roza](https://www.linkedin.com/in/khadiza-jarin-roza/)

