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
    const [ancestors, setAncestors] = useState<any[]>([]);
    const [baseSpanText, setbaseSpanText]= useState('UNKNOWN-BASE');

    useEffect(() => {
        setAncestors(() => [...providedAncestors]);
        if(providedItemType && (providedItemType as any).name){
            setbaseSpanText(()=> (providedItemType as any).name);
        }
    }, [providedAncestors, providedItemType]);

    return (
        <div className="mb-5 px-2">
            <div className="flex flex-wrap items-center gap-1 text-sm text-gray-700">
                <HoverableSpan className="cursor-default bg-transparent px-0 py-0 text-gray-500" isHoverable={false}>
                    <i>Home / </i>
                </HoverableSpan>
                <HoverableSpan className="bg-transparent px-0 py-0 text-blue-600 hover:text-blue-800" onClick={() => onBaseSpanClick()}>
                    <i>{baseSpanText} / </i>
                </HoverableSpan>
                {ancestors.map((ancestor: any, index) => (
                    <HoverableSpan
                        className="bg-transparent px-0 py-0 text-blue-600 hover:text-blue-800"
                        key={index}
                        onClick={() => onAncestorClick(ancestor)}
                    >
                        <i>{ancestor.name} / </i>
                    </HoverableSpan>
                ))}
                <HoverableSpan className="bg-transparent px-0 py-0 text-gray-900" isSelected isHoverable={false}>
                    <>{providedItem?.name}</>
                </HoverableSpan>
            </div>
        </div>
    );
};

export default Breadcrumbs;