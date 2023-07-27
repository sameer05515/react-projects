import { useEffect, useReducer, useState } from "react";
import ContactForm from "./components/ContactForm.jsx";
import ContactList from "./components/ContactList.jsx";
import "./App.css";
import EditContactForm from "./components/EditContactForm.jsx";
import randomstring from 'randomstring';
// import { fromFetch } from 'rxjs/fetch';
import { ajax } from 'rxjs/ajax';
import { map, catchError, of } from 'rxjs';
import Container from "./components/Container.js";
import BehaviorSubjectTest from "./components/BehaviorSubjectTest.js";

function App() {
  // here we create an array state to store the contact form data
  const [contacts, updateContacts] = useState([]);
  const [contactToEdit, setContactToEdit] = useState({});

  const initialAction = "newEntry";
  const actionReducer = (state, action) => {
    switch (action) {
      case 'list':
        return 'list';
      case 'newEntry':
        return 'newEntry';
      case 'edit':
        return 'edit';
      default:
        return initialAction;
    }
  }
  const [currentAction, dispatchAction] = useReducer(actionReducer, initialAction);

  const addContact = (contact) => {
    updateContacts([...contacts, { ...contact, id: generateId() }]);
    dispatchAction('list')
  };

  const editContact = (contact) => {
    console.log('Going to edit');
    console.log(contact);
    const index = contacts.findIndex(x => x.id === contact.id);
    if (index >= 0) {
      contacts[index] = contact;
    }
    updateContacts([...contacts]);
    dispatchAction('list');
  }

  const generateId = () => {
    return randomstring.generate({
      length: 25,
      charset: 'alphabetic'
    });
  }

  // useEffect(() => {
  //   fromFetch('http://localhost:8081/RestServices/rest/topics/find')
  //     .subscribe(response =>
  //       response.json().then(data => {
  //         console.log(data)
  //       })
  //     );
  // }, []);

  const obs$ = ajax('http://localhost:8081/RestServices/rest/topics/find').pipe(
    map(userResponse => console.log('users: ', userResponse)),
    catchError(error => {
      console.log('error: ', error);
      return of(error);
    })
  );

  useEffect(() => {
    obs$.subscribe({
      next: value => console.log(value),
      error: err => console.log(err)
    });
  }, [obs$])

  const openEditPage = (contact) => {
    // console.log('App :- '+contact);
    dispatchAction('edit');
    setContactToEdit(contact);

  };

  return (
    <div className="App">
      <div>Current Action:- {currentAction}</div>
      {(currentAction === 'newEntry') && (<ContactForm addContact={addContact} />)}
      {(currentAction === 'edit') && (<EditContactForm initialInfo={contactToEdit} editContact={editContact} />)}
      {(currentAction === 'list') && (<ContactList contacts={contacts} openEditPage={openEditPage} />)}
      {/* <Container/> */}
      <BehaviorSubjectTest />
    </div>
  );
}

export default App;