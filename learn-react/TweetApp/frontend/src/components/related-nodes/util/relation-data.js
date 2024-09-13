const RelationMap = [
    {
        id: "REL_BEFORE_AFTER",
        title: "Before-After-Relation",
        name: "should come after",
        reverseName: "should come before",
        example:
            "If 'B' 'should come after' 'A', then 'A' 'should come before' 'B'",
    },
    {
        id: "REL_NEXT_PREVIOUS",
        title: "next-previous-relation",
        name: "should come next to",
        reverseName: "should come previous to",
        example:
            "If 'B' 'should come next to' 'A', then 'A' 'should come previous to' 'B'",
    },
    {
        id: "REL_PARENT_CHILD",
        title: "Parent-Child-Relation",
        name: "is parent of",
        reverseName: "is child of",
        example: "If 'B' 'is parent of' 'A', then 'A' 'is child of' 'B'",
    },
    {
        id: "REL_PREREQUISITE_DEPENDENT",
        title: "Prerequisite-Dependent-Relation",
        name: "is Prerequisite of",
        reverseName: "is Dependent of",
        example: "If 'B' 'is Prerequisite of' 'A', then 'A' 'is Dependent of' 'B'",
    },
    {
        id: "REL_FOLLOW_UP_PRECEDING",
        title: "follow-up-preceding-Relation",
        name: "is follow-up of",
        reverseName: "is preceding of",
        example: "If 'B' 'is follow-up of' 'A', then 'A' 'is preceding of' 'B'",
    },
    {
        id: "REL_CAUSE_EFFECT",
        title: "cause-effect-Relation",
        name: "is cause of",
        reverseName: "is effect of",
        example: "If 'B' 'is cause of' 'A', then 'A' 'is effect of' 'B'",
    },
    {
        id: "REL_CLARIFICATION_ELABORATION",
        title: "clarification-elaboration-Relation",
        name: "is clarification of",
        reverseName: "is elaboration of",
        example:
            "If 'B' 'is clarification of' 'A', then 'A' 'is elaboration of' 'B'",
    },
    {
        id: "REL_ASSUMPTION_JUSTIFICATION",
        title: "assumption-justification-Relation",
        name: "is assumption of",
        reverseName: "is justification of",
        example:
            "If 'B' 'is assumption of' 'A', then 'A' 'is justification of' 'B'",
    },
    {
        id: "REL_EXAMPLE_GENERALIZATION",
        title: "example-generalization-Relation",
        name: "is example of",
        reverseName: "is generalization of",
        example: "If 'B' 'is example of' 'A', then 'A' 'is generalization of' 'B'",
    },
    {
        id: "REL_VERSION_VARIANT",
        title: "version-variant-Relation",
        name: "is version of",
        reverseName: "is variant of",
        example: "If 'B' 'is version of' 'A', then 'A' 'is variant of' 'B'",
    },
    {
        id: "REL_BASE_EXTENSION",
        title: "base-extension-Relation",
        name: "is base of",
        reverseName: "is extension of",
        example: "If 'B' 'is base of' 'A', then 'A' 'is extension of' 'B'",
    },
];

export const relationOptions = RelationMap.map(({ title, id }) => ({ label: title, value: id }));

export const getRelationObjectForId = (id) => id ? RelationMap.find(rel => rel.id === id) || null : null;
export const getRelationNameForId = (id,showReverseRelationName) => {
    const rel= getRelationObjectForId(id);
    if(rel){
        return showReverseRelationName? rel.reverseName:rel.name;
    }else{
        return '';
    }
};

export const getRelationStringForId = (id, first, second, showReverseString = false) => {
    console.log(`id: ${id}, first: ${first}, second: ${second}, showReverseString: ${showReverseString}, `)
    const rel = getRelationObjectForId(id);
    if (!rel) return null;

    const [f, s] = showReverseString ? [second, first] : [first, second];
    const [rs, rev] = showReverseString ? [rel.reverseName, rel.name] : [rel.name, rel.reverseName];

    // return `If '<b>${f}</b>' '<b>${rs}</b>' '<b>${s}</b>', then '<b>${s}</b>' '<b>${rev}</b>' '<b>${f}</b>'.`;
    return (<>If '<b>{f}</b>' '<b style={{color:'red'}}>{rs}</b>' '<b>{s}</b>', then '<b>{s}</b>' '<b style={{color:'red'}}>{rev}</b>' '<b>{f}</b></>)
};
