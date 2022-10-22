import React from "react";

export const Tile = ({ obj, dataType }) => {
  return (
    dataType === 'contacts' 
    ? <div className="tile-container">
        <p className="tile-title" 
           key={ obj.name }>{ obj.name }</p>
        <p className="tile"
           key={ obj.phone }>{ obj.phone }</p>
        <p className="tile"
           key={ obj.email }>{ obj.email }</p>
    </div>
    : <div className="tile-container">
        <p className="tile-title" 
           key={ obj.title }>{ obj.title }</p>
        <p className="tile"
           key={ obj.contact }>{ obj.contact }</p>
        <p className="tile"
           key={ obj.date }>{ obj.date }</p>
        <p className="tile"
           key={ obj.time }>{ obj.time }</p>
    </div>
  );
};
