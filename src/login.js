// firebase_init.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBfHmWpkUUZC5VOWzFUSMp7I-K09Vs720U",
    authDomain: "displaying-3d-models.firebaseapp.com",
    projectId: "displaying-3d-models",
    storageBucket: "displaying-3d-models.appspot.com",
    messagingSenderId: "242792375903",
    appId: "1:242792375903:web:806d9ac58d9e4f3abfddea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const firebaseAuth = getAuth();

// Function to check if user is authenticated
export function isUserAuthenticated() {
    return new Promise((resolve, reject) => {
        firebaseAuth.onAuthStateChanged((user) => {
            resolve(!!user);
        });
    });
}

// Function to check if user is an admin
export function isUserAdmin(userId) {
    return new Promise((resolve, reject) => {
        const userDocRef = doc(db, "users", userId);
        getDoc(userDocRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    const isAdmin = userData.isAdmin;
                    resolve(!!isAdmin);
                } else {
                    resolve(false);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}
