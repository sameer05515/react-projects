import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "MONTH";

const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

// Helper function to shuffle the months
const shuffleArray = (array) => {
    return array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
};

const MonthItem = ({ month, index, moveMonth }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: ItemType,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, dropRef] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveMonth(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    return (
        <div
            ref={(node) => dragRef(dropRef(node))}
            style={{
                padding: "8px",
                margin: "4px",
                backgroundColor: isDragging ? "#f0f0f0" : "#fff",
                border: "1px solid #ccc",
                cursor: "move",
            }}
        >
            {month}
        </div>
    );
};

const MonthList = () => {
    const [monthOrder, setMonthOrder] = useState(shuffleArray(months));

    const moveMonth = (dragIndex, hoverIndex) => {
        const updatedMonths = [...monthOrder];
        const [draggedMonth] = updatedMonths.splice(dragIndex, 1);
        updatedMonths.splice(hoverIndex, 0, draggedMonth);
        setMonthOrder(updatedMonths);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ width: "200px", margin: "0 auto" }}>
                {monthOrder.map((month, index) => (
                    <MonthItem
                        key={month}
                        month={month}
                        index={index}
                        moveMonth={moveMonth}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

export default MonthList;
