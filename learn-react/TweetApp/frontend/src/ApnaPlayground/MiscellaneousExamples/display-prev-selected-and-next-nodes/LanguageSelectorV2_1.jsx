import React, { useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";

const boxStyle = { margin: "3px", padding: "10px", border: "1px solid black" };
const strokeStyle = {
    strokeColor: "blue",
    strokeWidth: 1,
};
const rowStyle = {
    margin: "200px 0",
    display: "flex",
    justifyContent: "space-between",
};
// Common components
const Select = ({ options, value, onChange }) => (
    <select onChange={onChange} value={value} style={styles.select}>
        {options.map((option) => (
            <option key={option.name} value={option.name}>
                {option.name}
            </option>
        ))}
    </select>
);

const Node = ({ item }) => {
    return <div style={boxStyle}>{item}</div>;
};

// Component to render ArcherBox
export const ArcherBox = ({ id, relations = [], label, style = {} }) => (
    <ArcherElement id={id} relations={relations}>
        <div style={style}>{label}</div>
    </ArcherElement>
);

const InfoBox = ({ title, items, styles = {} }) => (
    <div style={{ ...styles }}>
        <strong>{title}</strong>
        <div>
            {items.map((item, index) => (
                <Node key={index} item={item} />
            ))}
        </div>
    </div>
);

const InfoBoxV1 = ({ boxes }) => {
    return (
        <>
            <div style={{ ...rowStyle, flexDirection:'column' }}>
                {boxes.map((box) => (
                    <ArcherBox
                        key={box.id}
                        id={box.id}
                        relations={box.relations}
                        label={box.label}
                        style={box.style}
                    />
                ))}
            </div>
        </>
    );
};

const JSONPreview = ({ data, title }) => (
    <div style={{ flex: 1, margin: "10px" }}>
        {title && <b>{title}</b>}
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
);

const LanguageSelectorV2_1 = () => {
    const languages = [
        {
            name: "Hindi",
            countries: ["India", "Fiji", "Mauritius"],
            idioms: [
                "Naach na jaane aangan tedha",
                "Bandar kya jaane adrak ka swaad",
            ],
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

    const NodeType = {
        selectedNode: "selectedNode",
        previousNode: "previousNode",
        nextNode: "nextNode",
    };

    let archerBoxes = [];
    archerBoxes = languages.reduce((acc, lang) => {
        const ac = {
            id: lang.name.toLowerCase(),
            label: lang.name,
            style: boxStyle,
            type: NodeType.selectedNode,
            relations: [],
        };
        acc.push(ac);
        // let relations = [];
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

    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

    const handleLanguageChange = (event) => {
        const selectedLang = languages.find(
            (lang) => lang.name === event.target.value
        );
        setSelectedLanguage(selectedLang);
    };

    return (
        <div style={styles.container}>
            <div style={styles.columnDiv}>
                <Select
                    options={languages}
                    value={selectedLanguage.name}
                    onChange={handleLanguageChange}
                />
            </div>
            <ArcherContainer strokeColor="black">
                <div style={styles.rowDiv}>
                    {/* <InfoBox
                        title="Countries"
                        items={selectedLanguage.countries}
                        styles={styles.infoBox}
                    />
                    <InfoBox
                        title={selectedLanguage.name}
                        items={[]}
                        styles={styles.infoBox}
                    />
                    <InfoBox
                        title="Idioms"
                        items={selectedLanguage.idioms}
                        styles={styles.infoBox}
                    /> */}
                    <InfoBoxV1 boxes={countryBoxes} />
                    <InfoBoxV1 boxes={languageBoxes} />
                    <InfoBoxV1 boxes={idiomBoxes} />
                </div>
            </ArcherContainer>
            <div style={{ ...styles.rowDiv }}>
                <JSONPreview data={languages} title={"languages"} />
                <JSONPreview data={archerBoxes} title={"archerBoxes"} />
                <JSONPreview data={countryBoxes} title={"countryBoxes"} />
                <JSONPreview data={languageBoxes} title={"languageBoxes"} />
                <JSONPreview data={idiomBoxes} title={"idiomBoxes"} />
            </div>
        </div>
    );
};

const styles = {
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
        // justifyContent: 'space-between',
        border: "1px solid yellow",
        padding: "10px",
    },
    infoBox: {
        flex: 1,
        marginRight: "10px",
        // textAlign: 'center',
        border: "1px solid red",
        // padding: '10px',
    },
};

export default LanguageSelectorV2_1;
