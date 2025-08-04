import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});
