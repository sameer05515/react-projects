import React, { useCallback, useEffect, useState } from "react";
import FileSearchList from "./FileSearchList";
import FileViewerModal from "./FileViewerModal";
import {
    SPRING_BOOT_CURD_MONGO_SERVER_BASE_URL as BASE_URL
} from "../../constants/GlobalConstants";
import './FileSearchView.css';


const FileSearchView = () => {

    const [choices, setChoices] = useState([
        { "id": "choice1", "name": "D:/Prem/tutorials" },
        { "id": "choice2", "name": "/home/premendra/Desktop" },
        { "id": "choice3", "name": "/home/premendra/git" },
        { "name": "C:/Prem/data/others/self/comics", "id": "choice4" }
    ]);

    const [showFileItemViewerModel, setShowFileItemViewerModel] = useState(false);

    const onTextInputChange = (e, index) => {
        const val = e.target.value;
        console.log(`${val}, ${index}`);
        choices[index].name = val;
        setChoices(prev => {
            return [...prev];
        });
    };

    const [selectedExtensions, setSelectedExtensions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [selectedFileItem, setSelectedFileItem] = useState({
        name: '',
        filePath: '',
        parentFile: ''
    });

    const extensions = [".pdf", ".mp3", ".mp4", ".exe",
        ".zip", ".png", ".jpeg", ".jpg", ".jar", ".war",
        ".ear", ".rar", ".epub", ".txt", ".sql", ".db", ".sys"
    ];

    const addNewChoice = () => {
        var newItemNo = choices.length + 1;
        setChoices(prev => {
            return [...prev, {
                id: "choice" + newItemNo
            }];
        })
    };

    const removeChoice = () => {
        var lastItem = choices.length - 1;
        choices.splice(lastItem);
        setChoices(prev => {
            return [...prev];
        })
    };

    const handleChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setSelectedExtensions((prev) => [...prev, value])
        } else {
            let filtered = selectedExtensions.filter((el) => el !== value)
            setSelectedExtensions([...filtered])
        }
        console.log(selectedExtensions);
    };

    const fetchMoviesHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        const params = {
            fileName: choices[3].name,
            extensions: selectedExtensions
        }
        const url = `${BASE_URL}/file-search/?${(new URLSearchParams(params)).toString()}`;
        try {
            const response = await fetch(url, {
                method: "GET"
            });
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();
            console.log(data);
            const transformedData = data.map(d => d);
            console.log(transformedData);
            setFileList(transformedData);
        } catch (exception) {
            setError(exception.message);
        }
        setIsLoading(false);
    }, [choices, selectedExtensions]);

    useEffect(() => {
        fetchMoviesHandler();
    }, [fetchMoviesHandler]);

    const itemSelectionHandler = selectedItem => {
        setShowFileItemViewerModel(true);
        setSelectedFileItem((_prev) => { return selectedItem; });
    }

    let content = <p>Found no movies.</p>;

    if (fileList.length > 0) {
        content = <FileSearchList fileList={fileList} onItemSelected={itemSelectionHandler} />;
    }

    if (error) {
        content = <p>{error}</p>;
    }

    if (isLoading) {
        content = <p>Loading...</p>;
    }

    const hideCartHandler = () => {
        setShowFileItemViewerModel(false);
    };



    return (
        <div className="container jumbotron">
            {showFileItemViewerModel &&
                <FileViewerModal
                    item={selectedFileItem}
                    onClose={hideCartHandler}
                    styleList={{ width: 800, height: 400 }}
                    documentUrl={`${BASE_URL}/stream/getFile?documentId=${selectedFileItem.filePath}`} />
            }
            {choices.map((choice, index) => {
                return (
                    <fieldset key={index}>
                        <label >Enter Folder Name:</label>
                        <input
                            type="text"
                            placeholder="Enter Folder Name: "
                            defaultValue={choice.name}
                            onChange={(e) => onTextInputChange(e, index)} />
                        {(index === choices.length - 1) &&
                            <>
                                <button
                                    className="lalChaukor"
                                    onClick={addNewChoice} >
                                    +
                                </button>
                                {choices.length > 1 && <button className="lalChaukor" onClick={removeChoice} >-</button>}
                            </>
                        }
                    </fieldset>
                );
            })}
            Select Extensions :-
            <div className="row">
                <div className="col-md-12">
                    {
                        extensions.map((extention, index) => {
                            return (
                                <span key={index}>
                                    <input
                                        type="checkbox"
                                        name="selectedExtensions"
                                        value={extention}
                                        id="flexCheckDefault"
                                        onChange={handleChange}
                                    />
                                    <label
                                        htmlFor="flexCheckDefault"
                                    >
                                        {extention}
                                    </label> | &nbsp;&nbsp;
                                </span>
                            );
                        })
                    }
                </div>
            </div>

            <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            <section>{content}</section>
        </div>

    );

}

export default FileSearchView;