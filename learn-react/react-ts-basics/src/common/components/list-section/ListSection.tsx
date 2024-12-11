import { ReactNode } from 'react';
import { isNonEmptyArray } from '../../util/utils'; 
import classes from '../custom-card/Card.module.css';

const styles = {
    container: {
        border: "1px solid #ddd",
        padding: "10px",
        marginBottom: "10px",
    },
    errorText: {
        color: "red",
    },
    boldText: {
        fontWeight: "bold",
    },
};

interface ListSectionProps<T> {
    title?: string;
    items: T[] | null | undefined;
    renderItem: (item: T, index: number) => ReactNode;
    errorMessage: string;
}

const ListSection = <T,>({
    title = '',
    items,
    renderItem,
    errorMessage,
}: ListSectionProps<T>) => (
    <div className="card">
        {title && title.trim().length > 0 && (
            <div className={classes["card-header"]}>
                <span style={styles.boldText}>{title}</span>
            </div>
        )}

        <div className={classes["card-body"]}>
            <div className={classes["card-field"]}>
                {isNonEmptyArray(items) ? (
                    items!.map(renderItem)
                ) : (
                    <span style={styles.errorText}>{errorMessage}</span>
                )}
            </div>
        </div>
    </div>
);

const renderListSection = <T,>(
    title: string,
    items: T[] | null | undefined,
    renderItem: (item: T, index: number) => ReactNode,
    errorMessage: string
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
