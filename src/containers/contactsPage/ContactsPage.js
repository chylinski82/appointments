import React, { useState, useEffect } from "react";
import { ContactForm } from '../../components/contactForm/ContactForm';
import { TileList } from '../../components/tileList/TileList';

export const ContactsPage = ({ contacts, addContact, itemId, db }) => {
 
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [isDuplicate, setIsDuplicate] = useState(false); // variable to prevent user from creating contact with the same name

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isDuplicate) { // contact is added to both app and firestore collection only if name isn't a duplicate
      addContact({ name: name, phone: phone, email: email});
      setName('');
      setPhone('');
      setEmail('');
    }   
  };

  useEffect(() => {
    contacts.some(item => item.name === name) ? setIsDuplicate(true) : setIsDuplicate(false);
  }, [name]);

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
                     handleSubmit={handleSubmit}
                      />
      </section>
      <hr />
      <section>
        <h2>Contacts</h2>
        <TileList arr={contacts} dataType="contacts" itemId={itemId} db={db}/>
      </section>
    </div>
  );
};
