import React, { ChangeEvent } from "react";
import styles from "./FormElement.module.css";

type InputElementProps = {
  as: "input";
  feTitle: string;
  onFeChange: (value: string) => void;
} & React.ComponentPropsWithoutRef<"input">;

type TextAreaElementProps = {
  as: "textarea";
  feTitle: string;
  onFeChange: (value: string) => void;
} & React.ComponentPropsWithoutRef<"textarea">;

type SelectElementProps = {
  as: "select";
  feTitle: string;
  onFeChange: (value: string) => void;
} & React.ComponentPropsWithoutRef<"select">;

type FormElementProps =
  | InputElementProps
  | TextAreaElementProps
  | SelectElementProps;

const FormElement: React.FC<FormElementProps> = ({
  as,
  feTitle,
  onFeChange,
  ...rest
}) => {
  const className =
    as === "textarea"
      ? styles.textarea
      : as === "select"
      ? styles.select
      : styles.input;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onFeChange(e.target.value);
  };

  switch (as) {
    case "textarea":
      return (
        <label className={styles.label}>
          {feTitle}:
          <textarea
            className={className}
            onChange={handleChange}
            {...(rest as React.ComponentPropsWithoutRef<"textarea">)}
          />
        </label>
      );
    case "select":
      return (
        <label className={styles.label}>
          {feTitle}:
          <select
            className={className}
            onChange={handleChange}
            {...(rest as React.ComponentPropsWithoutRef<"select">)}
          />
        </label>
      );
    case "input":
      return (
        <label className={styles.label}>
          {feTitle}:
          <input
            className={className}
            onChange={handleChange}
            {...(rest as React.ComponentPropsWithoutRef<"input">)}
          />
        </label>
      );
    default:
      return (
        <p className={styles.label} style={{ color: "red" }}>
          Invalid value for the `as` prop: {as}
        </p>
      );
  }
};

export default FormElement;
