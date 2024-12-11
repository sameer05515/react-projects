import {type ReactNode } from "react";

type HeaderProps = {
  image: { src: string; alt: string };
  children: ReactNode;
};

const HeaderV2 = ({ image: { src, alt }, children }: HeaderProps) => {
  return (
    <header>
      <img src={src} alt={alt} />
      {children}
    </header>
  );
};

export default HeaderV2;
