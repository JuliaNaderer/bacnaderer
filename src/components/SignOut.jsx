import { signOut} from "firebase/auth";
import {} from "firebase/auth";
import {auth} from "../firebase.js";
import '../App.css';

export const SignOut = () => {

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="App">
      <br></br>
      <button class='homeButton' onClick={logout}> Sign Out </button>
    </div>
  );
}
