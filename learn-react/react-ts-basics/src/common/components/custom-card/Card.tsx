import React, { ReactNode } from "react";
import classes from "./Card.module.css";
import { camelCaseToTitleCase } from "../../util/utils"; 
import { renderListSection } from "../list-section/ListSection"; 
import MarkdownComponent from "../markdown-component/MarkdownComponent";

enum FieldValueType {
  SingleValue = "single-value",
  ArrayValue = "array-value",
}

interface FieldProps<T> {
  label: string;
  value: T;
  renderItem?: (item: T extends any[] ? T[number] : T) => ReactNode;
}

interface CardProps {
  title?: string;
  fields?: Array<{
    label: string;
    value: ReactNode | ReactNode[];
    renderItem?: (item: ReactNode) => ReactNode;
  }>;
}

interface RenderCardProps {
  title?: string | null;
  objectToBeRendered: Record<string, any> | any[];
}

// Default renderer for individual items
const defaultItemRenderer = (item: any): ReactNode => {
  if (!item) return <span>N/A</span>;
  if (typeof item === "object" && !Array.isArray(item)) {
    return (
      <div title="Please provide a custom renderer">
        {renderCard({ objectToBeRendered: item })}
      </div>
    );
  }
  return <MarkdownComponent markdownText={item+''} />;
  
};

// Field component to handle both single and array values
const Field = ({
  label,
  value,
  renderItem = defaultItemRenderer,
}: FieldProps<ReactNode | ReactNode[]>): React.ReactElement => (
  <div className={classes["card-field"]}>
    <strong>{label}:</strong>{" "}
    {Array.isArray(value)
      ? renderListSection(
          "",
          value,
          (item, idx) =>
            typeof item === "object" && !Array.isArray(item) ? (
              renderItem(item)
            ) : (
              <div key={idx}>- {item}</div>
            ),
          "No items to display in the array"
        )
      : renderItem(value)}
  </div>
);

const Card = ({ title, fields = [] }: CardProps): React.ReactElement => (
  <div className={classes["card"]}>
    {title && (
      <div className={classes["card-header"]}>
        <span>{title}</span>
      </div>
    )}
    <div className={classes["card-body"]}>
      {fields.length > 0 ? (
        fields.map(({ label, value, renderItem }, idx) => (
          <Field key={idx} label={label} value={value} renderItem={renderItem} />
        ))
      ) : (
        <span>No fields provided</span>
      )}
    </div>
  </div>
);

const renderCard = ({
  title,
  objectToBeRendered,
}: RenderCardProps): ReactNode => {
  if (!objectToBeRendered || typeof objectToBeRendered !== "object") {
    return <span>Invalid object provided for rendering into a card</span>;
  }

  if (Array.isArray(objectToBeRendered)) {
    return renderListSection(
      title ?? "",
      objectToBeRendered,
      (item, idx) =>
        typeof item === "object" && !Array.isArray(item) ? (
          renderCard({ objectToBeRendered: item })
        ) : (
          <div key={idx}>- {item}</div>
        ),
      "No items to display in the array"
    );
  }

  const fields = Object.keys(objectToBeRendered).map((key) => ({
    label: camelCaseToTitleCase(key),
    value: objectToBeRendered[key],
  }));

  return <Card title={title ?? undefined} fields={fields} />;
};

export default Card;
export { FieldValueType, renderCard };
