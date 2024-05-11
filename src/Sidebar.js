import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';
import { useHistory } from 'react-router-dom';
import { signOut} from "firebase/auth";
import {auth} from "./firebase.js";

  export const Sidebar = () => {

    const history = useHistory();

    const logout = async () => {
      await signOut(auth);
      history.push("/login");
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
        <div onClick={logout} className="logoutButton"><img src="./logout.png"></img>
        </div>
      </Menu>
    );
  }

  export default Sidebar;