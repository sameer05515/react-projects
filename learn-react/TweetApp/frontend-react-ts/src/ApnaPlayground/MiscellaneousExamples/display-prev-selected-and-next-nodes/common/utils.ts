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

type AnchorPosition = "left" | "right" | "top" | "bottom";

export interface RelationType {
    targetId: string;
    targetAnchor: AnchorPosition;
    sourceAnchor: AnchorPosition;
    style: typeof strokeStyle;
    label: string;
}

export interface ArcherNode {
    id: string;
    label: string;
    style: typeof boxStyle;
    type: string;
    relations: RelationType[];
}

interface LanguageItem {
    name: string;
    countries: string[];
    idioms: string[];
}

export const languages: LanguageItem[] = [
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

export const getAllArcherBoxes = (langu: LanguageItem[] = languages) => {
    let archerBoxes: ArcherNode[] = [];
    archerBoxes = langu.reduce<ArcherNode[]>((acc, lang) => {
        const ac: ArcherNode = {
            id: lang.name.toLowerCase(),
            label: lang.name,
            style: boxStyle,
            type: NodeType.selectedNode,
            relations: [],
        };
        acc.push(ac);
        lang.countries.forEach((country: string) => {
            const c: ArcherNode = {
                id: country.toLowerCase(),
                label: country,
                style: boxStyle,
                type: NodeType.previousNode,
                relations: [],
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
        lang.idioms.forEach((idiom: string) => {
            const i: ArcherNode = {
                id: idiom.toLowerCase(),
                label: idiom,
                style: boxStyle,
                type: NodeType.nextNode,
                relations: [],
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

    const languageBoxes: ArcherNode[] = archerBoxes.filter(
        (box: ArcherNode) => box.type === NodeType.selectedNode
    );
    const countryBoxes: ArcherNode[] = archerBoxes.filter(
        (box: ArcherNode) => box.type === NodeType.previousNode
    );
    const idiomBoxes: ArcherNode[] = archerBoxes.filter(
        (box: ArcherNode) => box.type === NodeType.nextNode
    );

    return {languageBoxes, countryBoxes, idiomBoxes};

}

export const getArcherBoxesForLanguage = (language: string = '') => {
    if(!language) return { languageBoxes: [] as ArcherNode[], countryBoxes: [] as ArcherNode[], idiomBoxes: [] as ArcherNode[] };

    let archerBoxes: ArcherNode[] = [];
    const langu = languages.find(l=>l.name===language);
    if(!langu) return { languageBoxes: [] as ArcherNode[], countryBoxes: [] as ArcherNode[], idiomBoxes: [] as ArcherNode[] };
    archerBoxes = [langu].reduce<ArcherNode[]>((acc, lang) => {
        const ac: ArcherNode = {
            id: lang.name.toLowerCase(),
            label: lang.name,
            style: boxStyle,
            type: NodeType.selectedNode,
            relations: [],
        };
        acc.push(ac);
        lang.countries.forEach((country: string) => {
            const c: ArcherNode = {
                id: country.toLowerCase(),
                label: country,
                style: boxStyle,
                type: NodeType.previousNode,
                relations: [],
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
        lang.idioms.forEach((idiom: string) => {
            const i: ArcherNode = {
                id: idiom.toLowerCase(),
                label: idiom,
                style: boxStyle,
                type: NodeType.nextNode,
                relations: [],
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

    const languageBoxes: ArcherNode[] = archerBoxes.filter(
        (box: ArcherNode) => box.type === NodeType.selectedNode
    );
    const countryBoxes: ArcherNode[] = archerBoxes.filter(
        (box: ArcherNode) => box.type === NodeType.previousNode
    );
    const idiomBoxes: ArcherNode[] = archerBoxes.filter(
        (box: ArcherNode) => box.type === NodeType.nextNode
    );

    return {languageBoxes, countryBoxes, idiomBoxes};
}
