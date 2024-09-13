import Link from "next/link";
import React from "react";
import LogoImg from "@/assets/logo.png";
import styles from "./main-header.module.css";
import Image from "next/image";
import MainHeaderBackground from "../main-header-background/v1";

import NavLink from "./nav-link";

const MainHeader = () => {
  // const path = usePathname();
  return (
    <>
      <MainHeaderBackground />
      <header className={styles.header}>
        <Link className={styles.logo} href={"/foodies"}>
          <Image src={LogoImg} alt="A plate with food on it" priority />
          Next Level Food
        </Link>

        <nav className={styles.nav}>
          <ul>
            <li>
              {/* <Link
                href={"/foodies/meals"}
                className={
                  path.startsWith("/foodies/meals") ? styles.active : ""
                }
              >
                Browse Meals
              </Link> */}
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              {/* <Link
                href={"/foodies/community"}
                className={
                  path.startsWith("/foodies/community") ? styles.active : ""
                }
              >
                Foodies Community
              </Link> */}
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
