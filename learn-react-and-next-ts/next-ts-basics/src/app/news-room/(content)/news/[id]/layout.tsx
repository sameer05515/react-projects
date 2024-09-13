import React from "react";

const NewsDetailLayout = ({ children, modal }: { children: React.ReactNode; modal:React.ReactNode }) => {
  return <>
  {modal}
  {children}
  </>;
};

export default NewsDetailLayout;
