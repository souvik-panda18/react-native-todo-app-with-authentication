# 📝 React Native To‑Do App with Firebase Authentication

A simple mobile application built using **Expo (React Native)** and **Firebase** that allows users to:

- Register and log in securely (Email/Password)
- Add, complete, and delete personal tasks
- See their profile info and update their username
- Persist login sessions using AsyncStorage
- Store tasks per user using Firestore

---

## 🚀 Features

✅ Firebase Authentication  
✅ Firestore Database (per-user task storage)  
✅ Persistent Auth State (using `@react-native-async-storage/async-storage`)  
✅ Bottom Tab Navigation (`To-Do` and `Profile`)  
✅ Realtime task updates  
✅ Clean, responsive UI (based on the Figma mockup)  
✅ Logout & username edit from profile

---

## 🛠️ Tech Stack

| Feature       | Tech                     |
|---------------|--------------------------|
| Framework     | React Native + Expo SDK 50 |
| Auth          | Firebase Authentication  |
| Database      | Firebase Firestore       |
| State         | useState, useEffect      |
| Navigation    | React Navigation (Stack & Tabs) |
| Storage       | AsyncStorage (for auth persistence) |
| Icons         | Ionicons via `@expo/vector-icons` |

---

## 📂 Folder Structure
├── App.js
├── firebase.js
├── Navigation/
│ └── BottomTabs.js
├── screens/
│ ├── LoginScreen.js
│ ├── RegisterScreen.js
│ ├── TodoScreen.js
│ └── ProfileScreen.js
├── .gitignore
└── README.md

less
Copy
Edit

---

## 🔧 Firebase Setup Instructions

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Email/Password Auth** under Authentication > Sign-in method
4. Enable **Cloud Firestore** (start in test mode for development)
5. Create the **composite index** when prompted by Firestore (e.g., `userId` + `createdAt`)
6. Copy your web config and paste it into `firebase.js`
7. Install dependencies:

```bash
npx expo install firebase @react-native-async-storage/async-storage
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
🧪 How to Run the Project
1. Clone the repo
bash
Copy
Edit
git clone https://github.com/souvik-panda18/react-native-todo-app-with-authentication.git
cd react-native-todo-app-with-authentication
2. Install dependencies
bash
Copy
Edit
npm install
3. Run the app
bash
Copy
Edit
npx expo start
Scan the QR code in Expo Go app or run on an emulator.

🎬 Demo Video
📹 Watch the walkthrough here
(Demonstrates login → task creation → complete/delete → profile update → logout)

✅ Firebase Rules (for production)
js
Copy
Edit
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
🙌 Author
Souvik Panda
GitHub: souvik-panda18
Email: souvik1583panda@gmail.com

📄 License
This project is licensed under the MIT License.

yaml
Copy
Edit

---

### ✅ After pasting:

```bash
git add README.md
git commit -m "Add project README"
git push
⚠️ Note: This project includes Firebase Web API key, which is safe to expose as per Firebase security guidelines. All access is protected using strict Firestore rules to prevent unauthorized access.
### ⚠️ Known Limitation

Due to Firebase Storage requiring a paid Blaze plan, the profile image upload feature is not implemented.

However:
- The app includes profile details (name, email)
- A default avatar is displayed in the profile tab
- The image picker integration and Firebase Storage code is ready for upgrade, and commented for future use

