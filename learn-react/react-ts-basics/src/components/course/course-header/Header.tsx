import { type FC, type PropsWithChildren } from "react";

type HeaderProps = PropsWithChildren<{
  image: { src: string; alt: string };
}>;

const Header: FC<HeaderProps> = ({ image: { src, alt } }) => {
  return (
    <div>
      <img src={src} alt={alt} />
    </div>
  );
};

export default Header;
