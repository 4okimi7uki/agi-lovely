import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth, db } from "./firebase";
import { provider } from "./authGoogleProvider";
import { doc, setDoc } from "firebase/firestore";

export async function handleGoogleLogin() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        await setDoc(doc(db, "users", user.uid), {
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
            uid: user.uid,
        });
    } catch (e) {
        console.warn("Popup失敗。Redirectに切り替えます");
        await signInWithRedirect(auth, provider);
    }
}
