import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
import { signOut} from "firebase/auth";
import {auth} from "./firebase.js";

export const Sidebar = () => {

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <Menu>
      <a className="menu-item" href="/">
          Notifications
        </a>
        <a className="menu-item" href="/salads">
          Notes
        </a>
        <a className="menu-item" href="/pizzas">
          Appointments
        </a>
        <a className="menu-item" href="/desserts">
          Location
        </a>
        <a className="menu-item" href="/desserts">
          Location
        </a>
        <a className="menu-item-bottom" href="/desserts">
          Settings
        </a>
        <div>
        <a className="logoutButton" onClick={logout} href="/login">Logout</a>
        </div>
      </Menu>
    );
  }

  export default Sidebar;