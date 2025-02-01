import React, { useState } from "react";
import { ArcherContainer } from "react-archer";
import { languages, styles, getArcherBoxesForLanguage, getAllArcherBoxes } from "./common/utils";
import { Select, InfoBoxV1, JSONPreview } from "./common/sub-components";

const LanguageSelectorV2_1_2_1 = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
    const { languageBoxes, countryBoxes, idiomBoxes } = getArcherBoxesForLanguage(
        selectedLanguage?.name || ""
    );
    // const { languageBoxes, countryBoxes, idiomBoxes } = getAllArcherBoxes();

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
                    <InfoBoxV1 boxes={countryBoxes} />
                    <InfoBoxV1 boxes={languageBoxes} />
                    <InfoBoxV1 boxes={idiomBoxes} />
                </div>
            </ArcherContainer>
            <div style={styles.rowDiv}>
                <JSONPreview data={selectedLanguage} title={"selectedLanguage"} />
            </div>
        </div>
    );
};

export default LanguageSelectorV2_1_2_1;
