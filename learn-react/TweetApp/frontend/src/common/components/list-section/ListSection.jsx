// import { isNonEmptyArray } from '../../util/utils';
import classes from "./Card.module.css";

const isNonEmptyArray = (input /**: unknown*/) => {
  return input !== null && Array.isArray(input) && input.length > 0;
};

const ListSection = /**<T,>*/ (
  { title = "", items, renderItem, errorMessage } /**: ListSectionProps<T>*/
) => (
  <div className="border border-gray-300 p-2.5 mb-2.5 rounded">
    {title && title.trim().length > 0 && (
      <div className={classes["card-header"]}>
        <span className="font-bold">{title}</span>
      </div>
    )}

    <div className={classes["card-body"]}>
      <div className={classes["card-field"]}>
        {items && isNonEmptyArray(items) ? (
          items.map(renderItem)
        ) : (
          <span className="text-red-600">{errorMessage}</span>
        )}
      </div>
    </div>
  </div>
);

const renderListSection = /**<T>*/ (
  title /**: string*/,
  items /**: T[] | null | undefined*/,
  renderItem /**: (item: T, index: number) => ReactNode*/,
  errorMessage /**: string*/
) => (
  <ListSection
    title={title}
    items={items}
    renderItem={renderItem}
    errorMessage={errorMessage}
  />
);

export default ListSection;
export { renderListSection };
