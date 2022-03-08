import React, { useState, useEffect } from "react";
import FormElements from "./FormElements";

const EditFormElements = ({ name, text, type, placeholder, children, childRef, ...props }) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  const handlePressedKey = (event, type) => {
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const allKeys = [...keys, enterKey];
    if (
      (type === "TextField" && keys.indexOf(key) > -1) ||
      (type === "TextField" && allKeys.indexOf(key) > -1)
    ) {
      setIsEditing(false);
    }
  };

  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setIsEditing(false)}
          onKeyDown={e => handlePressedKey(e, type)}
        >
          {children}
        </div>
      ) : (
        <div className={`editable-${type}`}
          onClick={() => setIsEditing(true)}
          >
            <span className={`${text ? "text-back" : "text-gray-500"}`}>
              {text || placeholder}
            </span>
        </div>  
      )}
    </section>
  )
}

export default EditFormElements;