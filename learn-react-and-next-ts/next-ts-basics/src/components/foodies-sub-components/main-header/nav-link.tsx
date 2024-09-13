'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import styles from "./nav-link.module.css";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const path = usePathname();
  return (
    <Link
      href={`/foodies${href}`}
      className={path.startsWith(`/foodies${href}`) ? `${styles.link} ${styles.active}` : styles.link}
    >
      {children}
    </Link>
  );
}
