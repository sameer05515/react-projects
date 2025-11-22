
import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import FormDataClassComponent from './components/save-form/form-data-comp';

import ContactForm from './components/save-form/ContactForm.jsx';
import ContactList from './components/save-form/ContactList.jsx';

// import MouseContainer from './components/useeffect-ex/MouseContainer';
// import ClassCounter from './components/usestate-ex/ClassCounter';
// import ClassCounterTwo from './components/ClassCounterTwo';
// import HookCounter from './components/HookCounter';
// import HookCounterTwo from './components/HookCounterTwo';
// import HookCounterThree from './components/HookCounterThree'
// import HookCounterFour from './components/usestate-ex/HookCounterFour';

import ComponentC from './components/context-hook-ex/ComponentC'

export const UserContext = React.createContext()
export const ChannelContext = React.createContext()

function App() {

    // here we create an array state to store the contact form data
  const [contacts, updateContacts] = useState([]);

  const addContact = (contact) => {
    updateContacts([...contacts, contact]);
  };

    return (
        <div className="App" >
            {/* <HookCounterTwo> </HookCounterTwo> */}
            {/* <ClassCounter></ClassCounter> */}
            {/* <ClassCounterTwo></ClassCounterTwo> */}
            {/* <HookCounter></HookCounter> */}
            {/* <HookCounterThree></HookCounterThree> */}
            {/* <HookCounterFour></HookCounterFour> */}

            {/* <MouseContainer/> */}

            {/* <FormDataClassComponent/> */}

            <ContactForm addContact={addContact} />


            <div className="App">
			<UserContext.Provider value={'Vishwas'}>
        <ChannelContext.Provider value={'Codevolution'}>
					<ComponentC />
				</ChannelContext.Provider>
			</UserContext.Provider>
		</div>
      <ContactList contacts={contacts} />
        </div>
    );
}

export default App;