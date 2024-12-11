import React, { useEffect, useState } from "react";
import HoverableSpan from "../hoverable-span/HoverableSpan";

export const BreadcrumbItemType={
    TOPIC:{name:'TOPICS', basePageURL:'/topic-mgmt'},
    TASK:{name:'TASKS', basePageURL:'/task-mgmt'},
    TAG:{name:'TAGS', basePageURL:'/tags'},
    InterviewManagement:{name:'Interview Management', basePageURL:'/interview-mgmt'}
}


const Breadcrumbs = ({
    parentId = "",
    providedItem = null,
    providedItemType= null,
    ancestors: providedAncestors = [],
    onAncestorClick = () => { },
    onBaseSpanClick=()=>{}
}) => {
    const [ancestors, setAncestors] = useState([]);
    const [baseSpanText, setbaseSpanText]= useState('UNKNOWN-BASE');

    useEffect(() => {
        setAncestors(() => [...providedAncestors]);
        if(providedItemType && providedItemType.name){
            setbaseSpanText(()=> providedItemType.name);
        }
    }, [providedAncestors, providedItemType]);

    return (
        <div>
            <div style={breadcrumbStyle.breadcrumbsContainer}>
                <HoverableSpan
                    style={breadcrumbStyle.breadcrumbItem}
                    isHoverable={false}
                >
                    <i>Home / </i>
                </HoverableSpan>
                <HoverableSpan
                    style={{ ...breadcrumbStyle.breadcrumbItem, cursor: "pointer" }}
                    onClick={() => onBaseSpanClick()}
                >
                    <i>{baseSpanText} / </i>
                </HoverableSpan>
                {ancestors.map((ancestor, index) => (
                    <HoverableSpan
                        style={{ ...breadcrumbStyle.breadcrumbItem, cursor: "pointer" }}
                        key={index}
                        onClick={() => onAncestorClick(ancestor)}
                    >
                        <i>{ancestor.name} / </i>
                    </HoverableSpan>
                ))}
                <HoverableSpan
                    style={breadcrumbStyle.breadcrumbItem}
                    isSelected
                    isHoverable={false}
                >
                    <>{providedItem?.name}</>
                </HoverableSpan>
            </div>
        </div>
    );
};

const breadcrumbStyle = {
    breadcrumbsContainer: {
        marginBottom: "20px",
        padding: "0 .5rem",
    },
    breadcrumbList: {
        listStyleType: "none",
        padding: "0",
        margin: "0",
    },
    breadcrumbItem: {
        display: "inline-block",
        marginRight: "5px",
        fontSize: "12px"
    },
    breadcrumbLink: {
        color: "#007bff",
        textDecoration: "none",
    },
    breadcrumbLinkHover: {
        textDecoration: "underline",
    },
};

export default Breadcrumbs;