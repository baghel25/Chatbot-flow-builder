import React, { useState, useEffect } from "react";

const SettingsPanel = ({ node, updateNodeText }) => {
  const [text, setText] = useState(node.data.label);

  useEffect(() => {
    setText(node.data.label);
  }, [node]);

  const onChange = (e) => {
    setText(e.target.value);
    updateNodeText(node.id, e.target.value);
  };

  return (
    // <div classNameName="settings-panel">
    //   <h3>Settings Panel</h3>
    //   <label>
    //     Text:
    //     <input type="text" value={text} onChange={onChange} />
    //   </label>
    // </div>
    <div className="settings-panel">
      <div className="title-header">
        <img src="" />
        <div>Settings Panel</div>
      </div>
      <div className="title-body">
        <div className="label">Text</div>
        <textarea
          value={text}
          onChange={onChange}
          type="text"
          rows="4"
          cols="50"
        ></textarea>
      </div>
      
    </div>
  );
};

export default SettingsPanel;
