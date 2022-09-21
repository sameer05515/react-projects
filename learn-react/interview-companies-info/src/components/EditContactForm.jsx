import { useState } from "react";

export default function EditContactForm({initialInfo, editContact}) {

//   const [contactInfo, setContactInfo] = useState({
//     name: "",
//     email: "",
//     phonenumber: "",
//     details:"",
//     selectedStage:""
//   });

    const [contactInfo, setContactInfo] = useState(initialInfo);

  const handleChange = (event) => {
    setContactInfo({ ...contactInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editContact(contactInfo);
    setContactInfo({ id:"", name: "", email: "", phonenumber: "",details:"",stage:"" });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}> 
        <div>
          <h3>Contact Form</h3>
        </div>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={contactInfo.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={contactInfo.email}
            onChange={handleChange}

          />
        </div>
        <div>
          <textarea
            name="details"
            placeholder="Details"
            rows={4} cols={40}
            value={contactInfo.details}
            onChange={handleChange}

          />
        </div>
        <div>
        <select name="stage" onChange={handleChange}>
          <option value="discussion">Discussion</option>
          <option value="round1">Round1</option>
          <option value="round2">Round2</option>
          <option value="hr-discussion">HR discussion</option>
          <option value="selected">Selected</option>
          <option value="closed">Closed</option>
        </select>
        </div>
        <div>
          <input
            type="number"
            name="phonenumber"
            placeholder="Phone Number"
            value={contactInfo.phonenumber}
            onChange={handleChange}

          />
        </div>
        <div>
          <button>Submit Contact</button>
        </div>
      </form>
    </div>
  );
}