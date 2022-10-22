import React from "react";
import { ContactPicker } from '../contactPicker/ContactPicker';

export const AppointmentForm = ({
  title,
  setTitle,
  contacts,
  setContact,
  contact,
  date,
  setDate,
  time,
  setTime,
  handleSubmit
}) => {
  const getTodayString = () => {
    const [month, day, year] = new Date()
      .toLocaleDateString("en-UK")
      .split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title
        <input type="text"
              name="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}/>
      </label>
      <label>Date
        <input type="date" 
              name="date"
              value={date} 
              min={getTodayString()} 
              onChange={(e) => setDate(e.target.value)}
              required/>
      </label>
      <label>Time
        <input type="time"
              name="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)}/>
      </label>
      <label>Contact
        <ContactPicker name="contact"
                      value={contact}
                      contacts={contacts} 
                      onChange={(e) => setContact(e.target.value)}
                      required/>
      </label>     
      <input type="submit" />
    </form>
  );
};
