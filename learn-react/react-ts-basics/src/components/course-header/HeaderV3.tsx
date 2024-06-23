import {type FC, type PropsWithChildren } from "react";

type HeaderProps = PropsWithChildren<{
  image: { src: string; alt: string };
}>;

const HeaderV3: FC<HeaderProps> = ({ image, children }) => {
  return (
    <header>
      <img {...image} />
      {children}
    </header>
  );
};

export default HeaderV3;
