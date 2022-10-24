import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";

import { AppointmentsPage } from "./containers/appointmentsPage/AppointmentsPage";
import { ContactsPage } from "./containers/contactsPage/ContactsPage";

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, onSnapshot, addDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD9zYDMDaUHUhLi7iRreE0WjyPGocxFRY8",
  authDomain: "appointment-wizard-326c6.firebaseapp.com",
  projectId: "appointment-wizard-326c6",
  storageBucket: "appointment-wizard-326c6.appspot.com",
  messagingSenderId: "383826918074",
  appId: "1:383826918074:web:d4bcaaaeb3984385f42083"
};

function App() {
  
  // init firebase
  initializeApp(firebaseConfig)

  // init services
  const db = getFirestore()

  // collections ref
  const contactsRef = collection(db, 'contacts');
  const appointmentsRef = collection(db, 'appointments'); 

  const [contacts, setContacts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [itemId, setItemId] = useState([]); // nested array of firestore document IDs coupled with unique name or data/time set.
  
  let items = []; // array of objects from firestore

  const getData = (ref, arr, f) => {  // reusable function to add data to either contacts or appointments components
    onSnapshot(ref, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if(ref === contactsRef) {
          !items.some(item => item.name === doc.data().name) && items.push(doc.data())
                                      && setItemId((prev) => [...prev, [doc.data().name, doc.id]]);
        } else if (ref === appointmentsRef) {
          !items.some(item => item.date === doc.data().date && item.time === doc.data().time)
                                      && items.push(doc.data()) 
                                      && setItemId((prev) => [...prev, [doc.data().date, doc.data().time, doc.id]]);
                                    }       
      });
      let updatedArray = arr.concat(items);
      
      f(updatedArray);
      items = [];
      //setLoader(false);
    })
  }

  const addData = (ref, item) => {    // reusable function to add data from app to firestore
    addDoc(ref, item);
  }

  useEffect(() => {
    getData(contactsRef, contacts, setContacts);
  }, []);

  useEffect(() => {
    getData(appointmentsRef, appointments, setAppointments);
  }, []);

  const ROUTES = {
    CONTACTS: "/contacts",
    APPOINTMENTS: "/appointments",
  };

  // functions to add data by user to contacts and appointments components and to firestore
  const addContact = contact => {
    (contact.name && contact.phone && contact.email) && setContacts((prev) => [...prev, contact]);
    addData(contactsRef, contact);
  };

  const addAppointment = appointment => {
    setAppointments((prev) => [...prev, appointment]);
    addData(appointmentsRef, appointment);
  };

  return (
    <>
      <nav>
        <NavLink to={ROUTES.CONTACTS} activeClassName="active">
          Contacts
        </NavLink>
        <NavLink to={ROUTES.APPOINTMENTS} activeClassName="active">
          Appointments
        </NavLink>
      </nav>
      <main>
        <Switch>
          <Route exact path="/">
            <Redirect to={ROUTES.CONTACTS} />
          </Route>
          <Route path={ROUTES.CONTACTS}>
            <ContactsPage contacts={contacts}
                          addContact={addContact}
                          itemId={itemId}db={db} />
          </Route>
          <Route path={ROUTES.APPOINTMENTS}>
            <AppointmentsPage appointments={appointments}
                              contacts={contacts}
                              addAppointment={addAppointment}
                              itemId={itemId}
                              db={db} />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
