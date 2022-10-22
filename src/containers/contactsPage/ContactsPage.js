import React, { useState, useEffect } from "react";
import { ContactForm } from '../../components/contactForm/ContactForm';
import { TileList } from '../../components/tileList/TileList';

export const ContactsPage = ({ contacts, addContact }) => {
  /*
  Define state variables for 
  contact info and duplicate check
  */
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [isDuplicate, setIsDuplicate] = useState(false);

  //addContact({ name: 'iz', phone: 3123 , email: 'iz@dsddwe'});

  const handleSubmit = (e) => {
    e.preventDefault();
    /*
    Add contact info and clear data
    if the contact name is not a duplicate
    */
    if (!isDuplicate) {
      addContact({ name: name, phone: phone, email: email});
      setName('');
      setPhone('');
      setEmail('');
    }   
  };

  /*
  Using hooks, check for contact name in the 
  contacts array variable in props
  */
  useEffect(() => {
    contacts.some(item => item.name === name) ? setIsDuplicate(true) : setIsDuplicate(false);
  }, [name]);
  //console.log('test3', contacts);

  return (
    <div>
      <section>
        <h2>Add Contact</h2>
        <ContactForm name={name}
                     setName={setName}
                     phone={phone}
                     setPhone={setPhone}
                     email={email}
                     setEmail={setEmail}
                     handleSubmit={handleSubmit} />
      </section>
      <hr />
      <section>
        <h2>Contacts</h2>
        <TileList arr={contacts} dataType="contacts"/>
      </section>
    </div>
  );
};
