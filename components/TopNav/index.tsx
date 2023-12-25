"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AccountMenu from "@/components/AccountMenu";
import SwipeDrawer from "@/components/SwipeDrawer";
import styles from "./styles.module.css";

const linkVariants = {
  hover: {
    scale: 1.5,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

function TopNav() {
  let pathname = usePathname();

  if (pathname?.includes("/blog/")) {
    pathname = "/blog";
  }

  const isActive = (route: string) => {
    return route === pathname;
  };

  return (
    <>
      <div className={`w-[400px]`}>
        <nav
          id="topNav"
          className="z-[3] absolute opacity-50 flex-row hidden tablet:flex w-screen bg-white h-12">
          <ul className="flex pr-1 ml-4 w-full justify-between">
            <motion.li
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
              className="relative w-14 ml-4">
              <Link
                className={`text-shadow text-xl ${styles.menuLink} ${
                  isActive("/") ? "underline underline-offset-4" : ""
                }`}
                href="/">
                <Image
                  alt="logo to home page"
                  src="/images/fairyTaleLogo.png"
                  fill={true}
                  className="object-cover"
                />
              </Link>
            </motion.li>
          </ul>
          <div className="mr-4 flex justify-center items-center">
            <AccountMenu />
          </div>
        </nav>
      </div>
      <div className="z-[3] flex fixed tablet:hidden w-14">
        <SwipeDrawer />
      </div>
    </>
  );
}

export default TopNav;
