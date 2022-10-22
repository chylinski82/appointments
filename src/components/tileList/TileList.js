import React from "react";
import { Tile } from '../tile/Tile';

export const TileList = ({ arr, dataType }) => {
  return (
    <div>
      {arr.map((item, index) => <Tile obj={item}
                                      key={index}
                                      dataType={dataType}/>)}
    </div>
  );
};
