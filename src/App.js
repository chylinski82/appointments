import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";

import { AppointmentsPage } from "./containers/appointmentsPage/AppointmentsPage";
import { ContactsPage } from "./containers/contactsPage/ContactsPage";

import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc
} from 'firebase/firestore'


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

  // collection ref
  const contactsRef = collection(db, 'contacts');
  const appointmentsRef = collection(db, 'appointments'); 

  const [contacts, setContacts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loader, setLoader] = useState(true);

  let items = [];

  const getData = (ref, arr, f) => {
    onSnapshot(ref, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        //console.log('data',doc.data());
        if(ref === contactsRef) {
          !items.some(item => item.name === doc.data().name) && items.push(doc.data());
          //console.log('items', items, items.some(item => item.name === doc.data().name));
        } else if(ref === appointmentsRef) {
          !items.some(item => item.date === doc.data().date && item.time === doc.data().time) && items.push(doc.data());
        }       
      });
      let updatedArray = arr.concat(items);
      f(updatedArray);
      items = [];
      setLoader(false);
    })
  }

  const addData = (ref, item) => {
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

  /*
  Implement functions to add data to
  contacts and appointments
  */
  const addContact = contact => {
    (contact.name && contact.phone && contact.email) && setContacts((prev) => [...prev, contact]);
    addData(contactsRef, contact);
  };

  const addAppointment = appointment => {
    console.log(appointments, appointment);
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
                          addContact={addContact} />
          </Route>
          <Route path={ROUTES.APPOINTMENTS}>
            <AppointmentsPage appointments={appointments}
                              contacts={contacts}
                              addAppointment={addAppointment} />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
