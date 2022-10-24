import React from "react";

export const ContactPicker = ({ contacts, onChange }) => {  // iterates through contacts to choose onew for an appointment
  return (
    <select onChange={onChange}>
      <option key={-1} defaultValue={''}>Select contact</option>
      {contacts.map((item, index) => <option key={index} value={ item.name }>{ item.name }</option>)}
    </select>
  ); 
};
