import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "./firebase";
import { provider } from "./authGoogleProvider";

export async function handleGoogleLogin() {
    try {
        return await signInWithPopup(auth, provider);
    } catch (e) {
        console.warn("Popup失敗。Redirectに切り替えます");
        return await signInWithRedirect(auth, provider);
    }
}
