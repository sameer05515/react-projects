import { type ReactNode, type FC } from "react";

type HintBoxProps={
  mode: 'hint',
  children: ReactNode;
}

type WarningBoxProps = {
  mode: "warning";
  severity?: "low" | "medium" | "high";
  children: ReactNode;
};

type InfoBoxProps= HintBoxProps | WarningBoxProps;

const InfoBoxV2: FC<InfoBoxProps> = (props) => {
  const {children, mode} = props;
  // info, warning
  if (mode === "hint") {
    return (
      <aside className="infobox infobox-hint">
        <p>{children}</p>
      </aside>
    );
  }

  const {severity} = props;
  
  return (
    <aside className={`infobox infobox-warning warning--${severity}`}>
      <h2>Warning</h2>
      <p>{children}</p>
    </aside>
  );
};

export default InfoBoxV2;
