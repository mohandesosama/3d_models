// firebase_init.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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

export function sendMessage() {
    const message = document.getElementById('message').value;
    addDoc(collection(db, 'messages'), {
        text: message
    }).then(function (docRef) {
        console.log("Message added with ID: ", docRef.id);
    }).catch(function (error) {
        console.error("Error adding message: ", error);
    });
}

export function displayMessages() {
    onSnapshot(collection(db, 'messages'), function (snapshot) {
        var messagesContainer = document.getElementById('messages');
        messagesContainer.innerHTML = '';
        snapshot.forEach(function (doc) {
            var message = doc.data().text;
            var messageElement = document.createElement('div');
            messageElement.textContent = message;
            messagesContainer.appendChild(messageElement);
        });
    });
}