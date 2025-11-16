// import { isNonEmptyArray } from '../../util/utils';

const isNonEmptyArray = (input /**: unknown*/) => {
  return input !== null && Array.isArray(input) && input.length > 0;
};

const ListSection = /**<T,>*/ (
  { title = "", items, renderItem, errorMessage } /**: ListSectionProps<T>*/
) => (
  <div className="mb-2.5 rounded border border-gray-300 p-2.5">
    {title && title.trim().length > 0 && (
      <div className="rounded-t bg-green-600 pl-5 font-bold text-white">
        <span className="inline-block py-2">{title}</span>
      </div>
    )}

    <div className="p-1.5 text-black">
      <div className="mb-1.5">
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
