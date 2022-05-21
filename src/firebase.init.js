import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBHEscOLPxZi0gH-kJzDmx73OXev5W7FtA",
    authDomain: "manufacturer-website-7fd18.firebaseapp.com",
    projectId: "manufacturer-website-7fd18",
    storageBucket: "manufacturer-website-7fd18.appspot.com",
    messagingSenderId: "411700818497",
    appId: "1:411700818497:web:9c6b7bf7517c06fd9e4cc0"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;