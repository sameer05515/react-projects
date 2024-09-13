import React, { useEffect, useState } from "react";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [showBookForm, setShowBookForm] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchAllBooks();
    }, []);

    const fetchAllBooks = () => {
        fetch("http://localhost:3009/books")
            .then((response) => {
                if (!response.ok) {
                    console.log('Something bad happened');
                    throw new Error(`Failed to fetch data : Response Status: ${response.status}`);
                    // return;
                }
                return response.json();
            })
            .then((data) => setBooks(data))
            .catch(err => {
                setErrorMessage(prev=>err.message);
                console.log(err);
            });
    };

    const saveBook = (book) => {

    }

    const updateBook = (book) => {

    }

    const handleSelection = (book) => {
        setShowBookForm(false);
        setSelectedBook(prev => book);
    }

    const showEditForm = (book) => {
        setShowBookForm(true);
        setSelectedBook(prev => book);
    };

    const showSaveForm = () => {
        setShowBookForm(true);
        setSelectedBook(prev => null);
    }

    const styles = {
        containerStyle: { border: '1px solid #000', padding: '10px', width: '80%', margin: '0 auto' },
        headerStyle: { backgroundColor: '#f8f8f8', padding: '10px', textAlign: 'center', fontWeight: 'bold' },
        bodySectionStyle: { display: 'flex', marginTop: '10px' },
        leftSectionStyle: { backgroundColor: '#e0e0e0', padding: '10px', width: '20%' },
        rightSectionStyle: { backgroundColor: '#d0d0d0', padding: '10px', marginLeft: '10px', width: '80%' },
        footerStyle: { backgroundColor: '#f8f8f8', padding: '10px', textAlign: 'center', fontWeight: 'bold', marginTop: '10px' }
    }

    return (
        <div style={styles.containerStyle}>
            <div style={styles.headerStyle}>
                <h1>Book List</h1>
               Error: '{JSON.stringify(errorMessage,null,2)}' <br />
               Books: '{JSON.stringify(books,null,2)}' <br />
                {errorMessage && <div>
                    <p style={{ color: 'red' }}>{errorMessage}</p>
                </div>}
            </div>
            <div style={styles.bodySectionStyle}>
                <div style={styles.leftSectionStyle}>
                    <button onClick={showSaveForm}>Create Book</button>
                    {/* {Array.isArray(books) ? 'books is an array' : 'books is not array'} */}
                    {
                        books.map((book) => (
                            <BookCard book={book} onSelection={handleSelection} onEdit={showEditForm} />
                        ))
                    }
                </div>
                <div style={styles.rightSectionStyle}>
                    {showBookForm && <BookForm book={selectedBook} onCancel={() => {
                        setShowBookForm(false);
                    }} />}
                    {
                        !showBookForm && selectedBook && selectedBook.id &&
                        <BookCard summarizedView={false} book={selectedBook} onSelection={handleSelection} onEdit={showEditForm} />
                    }
                </div>
            </div>
            <div style={styles.footerStyle}>
                <h2>Thank you!!</h2>
            </div>

        </div>
    );
};

const BookCard = ({ book, summarizedView = true, onSelection = () => { }, onEdit = () => { } }) => {
    return (
        <div style={{ border: "1px solid black", padding: "10px", margin: "5px" }} key={book.id}>
            <h2>{book.title}</h2>
            {!summarizedView && <p>{book.author}</p>}
            {summarizedView && <button onClick={() => onSelection(book)}>Show Details</button>}
            {!summarizedView && <button onClick={() => onEdit(book)}>Edit Details</button>}
        </div>
    );
};

const BookForm = ({ book, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        id: book?.id || null,
        title: book?.title || '',
        author: book?.author || '',

    });
    const [formErrors, setFormErrors] = useState([]);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }))

    }
    const validForm = () => {
        setFormErrors(prev => []);
        if (!formData.title) {
            setFormErrors(prev => [...prev, 'Title should not be empty!']);

        }
        if (!formData.author) {
            setFormErrors(prev => [...prev, 'Author should not be empty!']);
        }

        if (formErrors && formErrors.length > 0) {
            return false
        } else {
            return true;
        }
    }
    const handleSubmit = () => {
        if (!validForm()) {
            return;
        }
        onSubmit(formData);
    }
    return (
        <div>
            <h2>{book?.id ? 'Edit' : 'Save'} Book</h2>
            <div>
                <label htmlFor="title"></label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} />
            </div>
            <div>
                <label htmlFor="author"></label>
                <input type="text" id="author" name="author" value={formData.author} onChange={handleInputChange} />
            </div>
            {formErrors && formErrors.length > 0 && <div>
                {
                    formErrors.map(fe => {
                        return <div style={{ color: 'red' }}>{fe}</div>
                    }
                    )
                }
            </div>}
            <div>
                <pre>{JSON.stringify(formData, null, 2)}</pre>
            </div>
            <div>
                <button onClick={handleSubmit}>{book?.id ? 'Edit' : 'Save'}</button>
                <button onClick={() => onCancel()}>Cancel</button>
            </div>
        </div>
    )
}

export default BookList;
