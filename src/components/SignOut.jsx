import { signOut} from "firebase/auth";
import {} from "firebase/auth";
import {auth} from "../firebase.js";
import '../App.css';
import { useHistory } from 'react-router-dom';

export const SignOut = () => {
  const history = useHistory();


  const logout = async () => {
    await signOut(auth);
    history.push("/login");
  };

  return (
    <div className="App">
      <br></br>
      <button className="homeButton" onClick={logout}> Sign Out </button>
    </div>
  );
}
