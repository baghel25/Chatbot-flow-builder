import React from "react";
import { Handle } from "react-flow-renderer";
import "../Node.css"; // Assuming the styles are in Node.css
import msg from "../Images/msg.png";
import whatsApp from "../Images/msgFilled.png";
function Node({ text_msg }) {
  return (
    <div className="custom-node">
      <Handle type="target" position="left" style={{ background: "#555" }} />
      <div className="custom-node-header">
        <div className="custom-node-header-left">
          <img src={msg}></img>
          <label>Send Message</label>
        </div>

        <img src={whatsApp}></img>
      </div>
      <div className="custom-node-body">
        <label>{text_msg}</label>
      </div>
      <Handle type="source" position="right" style={{ background: "#555" }} />
    </div>
  );
}

export default Node;
