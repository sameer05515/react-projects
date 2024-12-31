import React, { useState } from 'react';

const LanguageSelectorV1 = () => {
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
            <div style={styles.rowDiv}>

                <div style={styles.countriesDiv}>
                    <ul>
                        {selectedLanguage.countries.map((country, index) => (
                            <li key={index}>{country}</li>
                        ))}
                    </ul>
                </div>
                <div style={styles.nameDiv}>
                    <strong>{selectedLanguage.name}</strong>
                </div>
                <div style={styles.idiomsDiv}>
                    <ul>
                        {selectedLanguage.idioms.map((idiom, index) => (
                            <li key={index}>{idiom}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        // maxWidth: '400px',
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
    },
    nameDiv: {
        flex: 1,
        marginRight: '10px',
        textAlign: 'center',
        border: '1px solid #ccc',
    },
    countriesDiv: {
        flex: 1,
        marginRight: '10px',
        textAlign: 'center',
        border: '1px solid #ccc',
    },
    idiomsDiv: {
        flex: 1,
        textAlign: 'center',
        border: '1px solid #ccc',
    }
};

export default LanguageSelectorV1;
