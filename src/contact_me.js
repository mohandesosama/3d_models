// firebase_init.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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
export function sendMessage(message,uname, email) {
    const msgContainer = document.getElementById("messageContainer");

    const flashMessage = document.getElementById("flashMessage");
    const charCount = document.getElementById("char-count");
    

    msgContainer.disabled=true;
    msgContainer.opacity=0.5;

    addDoc(collection(db, 'messages'), {
        text: message,
        sender_name: uname,
        email: email
    })
        .then(function (docRef) {
            console.log("Message added with ID: ", docRef.id);
            document.getElementById("message").value = "";
            document.getElementById("email").value = "";
            document.getElementById("uname").value = "";
            //reset the char counter
            const text = charCount.textContent;
            var index = text.indexOf('/');
            if (index != -1)
                charCount.textContent = '0 ' + text.substring(index);
            //this part for flash message
            flashMessage.style.display = 'block';
            setTimeout(function () {
                //after 3 seconds, return everything to its previous state.
                //hide the success message
                flashMessage.style.display = 'none';
                //deblurr the controls again.
                msgContainer.disabled=false;
                msgContainer.opacity=1;
            }, 3000);

        })
        .catch(function (error) {
            console.error("Error adding message: ", error);
        });



}

// Function to display messages
export function displayMessages() {
    onSnapshot(collection(db, 'messages'), function (snapshot) {
        var messagesContainer = document.getElementById('messages-container');
        messagesContainer.innerHTML = '';
        snapshot.forEach(function (doc) {
            var messageID = doc.id;
            var message = doc.data().text;
            var email = doc.data().email;
            var messageElement = document.createElement('div');
            messageElement.innerHTML = 'Email: ' + email + '<br><br>' + 'Message Body: ' + message + '<br><br>';
            messageElement.classList.add("messages");

            //delete button
            var delButton = document.createElement('button');
            delButton.textContent = 'Delete';
            delButton.classList.add('del-button');
            delButton.addEventListener('click', function () {
                deleteMessage(messageID, messageElement);
            });
            messageElement.appendChild(delButton);
            messagesContainer.appendChild(messageElement);
        });
    });
}
function deleteMessage(messageID, messageElement) {

    deleteDoc(doc(db, 'messages', messageID))
        .then(() => {
            console.log("message deleted successfully");
            messageElement.remove;
        })
        .catch((error) => {
            console.error("Error deleting message ", error);
        });

}

//this part for character count
const textarea = document.getElementById("message");
const charcount = document.getElementById("char-count");
textarea.addEventListener('input', function () {
    const maxLength = parseInt(textarea.getAttribute("maxlength"));
    const currentLength = textarea.value.length;
    charcount.textContent = currentLength + " / " + maxLength;

    if (currentLength >= maxLength) {
        charcount.style.color = "red";
        textarea.value = textarea.value.substring(0, maxLength);
    }
    else {
        charcount.style.color = "gray";
    }
});



