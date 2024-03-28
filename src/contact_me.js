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


// Function to send a message
export function sendMessage(message) {
    const msgBtn = document.getElementById("sendMessageBtn");
    const textArea = document.getElementById("message");
    const flashMessage = document.getElementById("flashMessage");

    msgBtn.disabled = true;
    textArea.disabled = true;
    msgBtn.style.opacity = 0.5;
    textArea.style.opacity = 0.5;

    addDoc(collection(db, 'messages'), {
        text: message
    })
        .then(function (docRef) {
            console.log("Message added with ID: ", docRef.id);
            textArea.value = "";
            //this part for flash message
            flashMessage.style.display = 'block';
            setTimeout(function () {
                flashMessage.style.display = 'none';
            }, 3000);
           
        })
        .catch(function (error) {
            console.error("Error adding message: ", error);
        });

    msgBtn.disabled = false;
    textArea.disabled = false;
    msgBtn.style.opacity = 1;
    textArea.style.opacity = 1;

}

// Function to display messages
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

//this part for character count
const textarea = document.getElementById("message");
const charcount = document.getElementById("char-count");
textarea.addEventListener('input', function () {
    const maxLength = parseInt(textarea.getAttribute("maxlength"));
    const currentLength = textarea.value.length;
    charcount.textContent = currentLength + " / " + maxLength;

    if (currentLength > maxLength) {
        charcount.style.color = "red";
        textarea.value = textarea.value.substring(0, maxLength);
    }
    else {
        charcount.style.color = "gray";
    }
});



