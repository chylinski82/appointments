import React from "react";
import { deleteDoc, doc } from "firebase/firestore";

export const Tile = ({ obj, dataType, itemId, db }) => {

   // functions to identify item on the tile inside firestore contacts and appointments collections
   const handleRemoveContact = (name) => {
      const innerArr = itemId.find(innerArr => innerArr.some(item => item === name));       
      const docRef = doc(db, dataType, innerArr[1]);             
      deleteDoc(docRef);   // removes item from collection
   }

   const handleRemoveAppointment = (date, time) => {
      const innerArr = itemId.find(innerArr => innerArr.some(item => item === date) && innerArr.some(item => item === time));
      const docRef = doc(db, dataType, innerArr[2]);             
      deleteDoc(docRef);
   }

  return (
    dataType === 'contacts' 
    ? <div className="tile-container">
         <div className="tile-top">
            <p className="tile-title" 
               key={ obj.name }>{ obj.name }</p>
            <button onClick={() => handleRemoveContact( obj.name )}> Remove </button>
         </div>       
        <p className="tile"
           key={ obj.phone }>{ obj.phone }</p>
        <p className="tile"
           key={ obj.email }>{ obj.email }</p>
         
    </div>
    : <div className="tile-container">
         <div className="tile-top">
            <p className="tile-title" 
               key={ obj.title }>{ obj.title }</p>
            <button className="delete" onClick={() => handleRemoveAppointment(obj.date, obj.time)}> Cancel </button>
         </div>        
        <p className="tile"
           key={ obj.contact }>{ obj.contact }</p>
        <p className="tile"
           key={ obj.date }>{ obj.date }</p>
        <p className="tile"
           key={ obj.time }>{ obj.time }</p>
         
    </div>
  );
};
