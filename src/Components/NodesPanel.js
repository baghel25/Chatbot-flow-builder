import React from 'react';
import msgImage from "../Images/msg.png"

const NodesPanel = ({ addNode }) => {
  return (
      <div className="nodes-panel">
          <div className="wf-add-msg" onClick={() => addNode('text')}>
              <img src={msgImage} />
              <label > Message</label>
            </div>
      </div>
      

      
  );
};

export default NodesPanel;
