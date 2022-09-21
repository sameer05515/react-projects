export default function UserList({contacts,openEditPage}) {

    const handleEdit = (event,contact) => {
        // setContactInfo({ ...contactInfo, [event.target.name]: event.target.value });
        openEditPage(contact);        
      };

    return (
      <div>
        {contacts.map((contact) => (
          <div className="card" key={contact.phonenumber}>
            <p className="card-name">{contact.name}</p>
            <p>{contact.email}</p>
            <p>{contact.phonenumber}</p>
            <p>{contact.details}</p>
            <p>{contact.selectedStage}</p>
            <button onClick={(event)=>handleEdit(event, contact)}>Edit</button>
          </div>
        ))}
      </div>
    );
  }