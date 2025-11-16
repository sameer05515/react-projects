import React, { useState } from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';

const LanguageSelectorV3 = () => {
    const languages = [
        { name: 'Hindi', countries: ['India', 'Fiji', 'Mauritius'], idioms: ['Naach na jaane aangan tedha', 'Bandar kya jaane adrak ka swaad'] },
        { name: 'English', countries: ['USA', 'UK', 'Australia'], idioms: ['Bite the bullet', 'Break the ice'] },
        { name: 'Spanish', countries: ['Spain', 'Mexico', 'Argentina'], idioms: ['El mundo es un pañuelo', 'Estar en las nubes'] }
    ];

    const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

    const handleLanguageChange = (event) => {
        const selectedLang = languages.find(lang => lang.name === event.target.value);
        setSelectedLanguage(selectedLang);
    };

    return (
        <div style={styles.container}>
            <div style={styles.columnDiv}>
                <select onChange={handleLanguageChange} value={selectedLanguage.name} style={styles.select}>
                    {languages.map((language) => (
                        <option key={language.name} value={language.name}>
                            {language.name}
                        </option>
                    ))}
                </select>
            </div>
            <ArcherContainer strokeColor="black">
                <div style={styles.rowDiv}>
                    <div style={styles.countriesContainer}>
                        {selectedLanguage.countries.map((country, index) => (
                            <ArcherElement key={index} id={`country-${index}`} style={styles.node}>
                                {country}
                            </ArcherElement>
                        ))}
                    </div>
                    <ArcherElement
                        id="language"
                        relations={[
                            ...selectedLanguage.countries.map((_, index) => ({
                                targetId: `country-${index}`,
                                targetAnchor: 'right',
                                sourceAnchor: 'left',
                            })),
                            ...selectedLanguage.idioms.map((_, index) => ({
                                targetId: `idiom-${index}`,
                                targetAnchor: 'left',
                                sourceAnchor: 'right',
                            }))
                        ]}
                    >
                        <div style={styles.languageNode}>
                            <strong>{selectedLanguage.name}</strong>
                        </div>
                    </ArcherElement>
                    <div style={styles.idiomsContainer}>
                        {selectedLanguage.idioms.map((idiom, index) => (
                            <ArcherElement key={index} id={`idiom-${index}`} style={styles.node}>
                                {idiom}
                            </ArcherElement>
                        ))}
                    </div>
                </div>
            </ArcherContainer>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        margin: '0 auto',
        maxWidth: '800px',
    },
    columnDiv: {
        marginBottom: '20px',
    },
    select: {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    rowDiv: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid #ccc',
        padding: '10px',
        position: 'relative',
    },
    countriesContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    languageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    idiomsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    node: {
        margin: '5px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
    },
    languageNode: {
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#e0e0e0',
        textAlign: 'center',
    }
};

export default LanguageSelectorV3;
