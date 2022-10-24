import React, { useState, useEffect } from "react";
import { AppointmentForm } from "../../components/appointmentForm/AppointmentForm";
import { TileList } from "../../components/tileList/TileList";

export const AppointmentsPage = ({ contacts, appointments, addAppointment, itemId, db}) => {

  const [title, setTitle] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [isDuplicate, setIsDuplicate] = useState(false); // variable to prevent user from creating appointment with the same date and time

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isDuplicate) { // appointment is added to both app and firestore collection only if date and time set isn't a duplicate
      addAppointment({ title: title, contact: contact, date: date, time: time });
      setTitle('');
      setContact('');
      setDate('');
      setTime('');
    }
    
  };

  useEffect(() => {
    appointments.some(item => item.date === date && item.time === time) ? setIsDuplicate(true) : setIsDuplicate(false);
  }, [date, time]);

  return (
    <div>
      <section>
        <h2>Add Appointment</h2>
        <AppointmentForm title={title}
                         setTitle={setTitle}
                         contact={contact}
                         contacts={contacts}
                         setContact={setContact}
                         date={date}
                         setDate={setDate}
                         time={time}
                         setTime={setTime}
                         handleSubmit={handleSubmit} />
      </section>
      <hr />
      <section>
        <h2>Appointments</h2>
        <TileList arr={appointments} dataType="appointments" itemId={itemId} db={db}/>
      </section>
    </div>
  );
};
