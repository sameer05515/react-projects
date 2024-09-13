export const boxStyle = {
    margin: "5px",
    padding: "10px",
    border: "1px solid black",
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
};
export const strokeStyle = {
    strokeColor: "blue",
    strokeWidth: 1,
};
export const rowStyle = {
    margin: "20px 0",
    display: "flex",
    justifyContent: "space-around",
};

export const styles = {
    container: {
        padding: "20px",
        border: "1px solid red",
        borderRadius: "8px",
        margin: "0",
    },
    columnDiv: {
        marginBottom: "20px",
        border: "1px solid green",
    },
    select: {
        width: "100%",
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    rowDiv: {
        display: "flex",
        justifyContent: "space-around",
        border: "1px solid yellow",
        padding: "10px",
    },
    infoBox: {
        flex: 1,
        marginRight: "10px",
        border: "1px solid red",
        padding: "10px",
    },
};

export const NodeType = {
    selectedNode: "selectedNode",
    previousNode: "previousNode",
    nextNode: "nextNode",
};

export const languages = [
    {
        name: "Hindi",
        countries: ["India", "Fiji", "Mauritius"],
        idioms: ["Naach na jaane aangan tedha", "Bandar kya jaane adrak ka swaad"],
    },
    {
        name: "English",
        countries: ["USA", "UK", "Australia"],
        idioms: ["Bite the bullet", "Break the ice"],
    },
    {
        name: "Spanish",
        countries: ["Spain", "Mexico", "Argentina"],
        idioms: ["El mundo es un pañuelo", "Estar en las nubes"],
    },
];

export const getAllArcherBoxes=(langu=languages)=>{
    let archerBoxes = [];
    archerBoxes = langu.reduce((acc, lang) => {
        const ac = {
            id: lang.name.toLowerCase(),
            label: lang.name,
            style: boxStyle,
            type: NodeType.selectedNode,
            relations: [],
        };
        acc.push(ac);
        lang.countries.forEach((country) => {
            const c = {
                id: country.toLowerCase(),
                label: country,
                style: boxStyle,
                type: NodeType.previousNode,
            };
            acc.push(c);
            ac.relations.push({
                targetId: c.id,
                targetAnchor: "right",
                sourceAnchor: "left",
                style: strokeStyle,
                label: "bhasha wali country",
            });
        });
        lang.idioms.forEach((idiom) => {
            const i = {
                id: idiom.toLowerCase(),
                label: idiom,
                style: boxStyle,
                type: NodeType.nextNode,
            };
            acc.push(i);
            ac.relations.push({
                targetId: i.id,
                targetAnchor: "left",
                sourceAnchor: "right",
                style: strokeStyle,
                label: "bhasha ke muhaware",
            });
        });
        return acc;
    }, archerBoxes);

    const languageBoxes = archerBoxes.filter(
        (box) => box.type === NodeType.selectedNode
    );
    const countryBoxes = archerBoxes.filter(
        (box) => box.type === NodeType.previousNode
    );
    const idiomBoxes = archerBoxes.filter(
        (box) => box.type === NodeType.nextNode
    );

    return {languageBoxes, countryBoxes, idiomBoxes};

}

export const getArcherBoxesForLanguage=(language='')=>{
    if(!language) return [];

    let archerBoxes = [];
    const langu=languages.find(l=>l.name===language);
    if(!langu) return [];
    archerBoxes = [langu].reduce((acc, lang) => {
        const ac = {
            id: lang.name.toLowerCase(),
            label: lang.name,
            style: boxStyle,
            type: NodeType.selectedNode,
            relations: [],
        };
        acc.push(ac);
        lang.countries.forEach((country) => {
            const c = {
                id: country.toLowerCase(),
                label: country,
                style: boxStyle,
                type: NodeType.previousNode,
            };
            acc.push(c);
            ac.relations.push({
                targetId: c.id,
                targetAnchor: "right",
                sourceAnchor: "left",
                style: strokeStyle,
                label: "bhasha wali country",
            });
        });
        lang.idioms.forEach((idiom) => {
            const i = {
                id: idiom.toLowerCase(),
                label: idiom,
                style: boxStyle,
                type: NodeType.nextNode,
            };
            acc.push(i);
            ac.relations.push({
                targetId: i.id,
                targetAnchor: "left",
                sourceAnchor: "right",
                style: strokeStyle,
                label: "bhasha ke muhaware",
            });
        });
        return acc;
    }, archerBoxes);

    const languageBoxes = archerBoxes.filter(
        (box) => box.type === NodeType.selectedNode
    );
    const countryBoxes = archerBoxes.filter(
        (box) => box.type === NodeType.previousNode
    );
    const idiomBoxes = archerBoxes.filter(
        (box) => box.type === NodeType.nextNode
    );

    return {languageBoxes, countryBoxes, idiomBoxes};
}
