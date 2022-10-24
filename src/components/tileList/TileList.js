import React from "react";
import { Tile } from '../tile/Tile';

export const TileList = ({ arr, dataType, itemId, db }) => {
  return (
    <div>
      {arr.map((item, index) => <Tile obj={item}
                                      key={index}
                                      dataType={dataType}
                                      itemId={itemId}
                                      db={db}/>)}
    </div>
  );
};
