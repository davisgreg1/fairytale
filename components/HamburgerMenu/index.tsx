"use client";
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { localStorage } from "@/utils/localStorage";
import { stack as Menu } from "react-burger-menu";

const HamburgerMenu = () => {
  const styles = {
    bmBurgerButton: {
      position: "fixed",
      width: "36px",
      height: "30px",
      left: "36px",
      top: "36px",
    },
    bmBurgerBars: {
      background: "#373a47",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
      opacity: "0.9",
    },
    bmMenu: {
      background: "#373a47",
      padding: "2.5em 1.5em 0",
      fontSize: "1.15em",
      display: "flex",
      flexDirection: "column",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0.8em",
      display: "flex",
      flexDirection: "column",
    },
    bmItem: {
      display: "inline-block",
      padding: "16px 0",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
    },
  };

  const handleOnSignOut = () => {
    localStorage.clear();
    signOut();
  };

  return (
    <Menu
      styles={styles}
      pageWrapId={"page-wrap"}
      outerContainerId={"outer-container"}>
      <Link id="home" className="menu-item" href="/">
        Home
      </Link>
      {/* <Link id="about" className="menu-item" href="/about">
        About
      </Link>
      <Link id="contact" className="menu-item" href="/contact">
        Contact
      </Link>
      <Link className="menu-item--small" href="">
        Settings
      </Link> */}
      <button type="button" onClick={handleOnSignOut}>
        Sign Out
      </button>
    </Menu>
  );
};

export default HamburgerMenu;
