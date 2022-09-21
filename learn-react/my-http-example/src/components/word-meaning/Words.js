import React from "react";

const Words = (props) => {

    return (
        <>
            <h1>My Words List</h1>
            <ol>
                {props.words.map(item => <li key={item.id}>
                    <div className="card" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">
                                {item.word}
                            </h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {item.word}
                            </h6>
                            <p className="card-text">
                                Some quick example text to build on the card title and make up the bulk of the card's content.
                            </p>
                        </div>
                    </div>
                </li>)}
            </ol>
        </>
    )
}

export default Words;