import { signOut} from "firebase/auth";
import {} from "firebase/auth";
import {auth} from "../firebase.js";
import '../App.css';
import { Navigate, useNavigate } from 'react-router-dom';

export const SignOut = () => {
  const navigate = useNavigate();


  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
      <a onClick={logout}></a>
  );
}
