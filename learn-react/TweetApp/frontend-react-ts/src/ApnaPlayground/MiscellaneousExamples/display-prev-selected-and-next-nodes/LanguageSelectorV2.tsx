import React, { useState } from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';

const LanguageSelectorV2 = () => {
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
                    <ArcherElement
                        id="language"
                        relations={[
                            {
                                targetId: 'countries',
                                targetAnchor: 'top',
                                sourceAnchor: 'bottom',
                            },
                            {
                                targetId: 'idioms',
                                targetAnchor: 'top',
                                sourceAnchor: 'bottom',
                            },
                        ]}
                    >
                        <div style={styles.nameDiv}>
                            <strong>{selectedLanguage.name}</strong>
                        </div>
                    </ArcherElement>
                    <ArcherElement id="countries">
                        <div style={styles.countriesDiv}>
                            <ul>
                                {selectedLanguage.countries.map((country, index) => (
                                    <li key={index}>{country}</li>
                                ))}
                            </ul>
                        </div>
                    </ArcherElement>
                    <ArcherElement id="idioms">
                        <div style={styles.idiomsDiv}>
                            <ul>
                                {selectedLanguage.idioms.map((idiom, index) => (
                                    <li key={index}>{idiom}</li>
                                ))}
                            </ul>
                        </div>
                    </ArcherElement>
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
        margin: '0 auto'
    },
    columnDiv: {
        marginBottom: '20px',
        border: '1px solid #ccc',
    },
    select: {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    rowDiv: {
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid #ccc',
        padding: '10px',
    },
    nameDiv: {
        flex: 1,
        marginRight: '10px',
        textAlign: 'center',
        border: '1px solid #ccc',
        padding: '10px',
    },
    countriesDiv: {
        flex: 1,
        marginRight: '10px',
        textAlign: 'center',
        border: '1px solid #ccc',
        padding: '10px',
    },
    idiomsDiv: {
        flex: 1,
        textAlign: 'center',
        border: '1px solid #ccc',
        padding: '10px',
    }
};

export default LanguageSelectorV2;
