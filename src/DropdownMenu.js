import React, { useState } from "react";

const DropdownMenu = ({ onDropdownChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Python");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    setSelectedLanguage(value);
    onDropdownChange(value); // Call the callback function with the selected value
    toggleDropdown(); // Close the dropdown after selection
  };

  return (
    <div className="border-2 bg-blue-500 ">
      <button onClick={toggleDropdown}>Language {selectedLanguage}  </button>
      {isOpen && (
        <ul className="bg-white text-gray-800">
          <li
            className="dropdown-item"
            onClick={() => handleOptionClick("Common Lisp")}
          >
            Common Lisp
          </li>
          <li
            className="dropdown-item"
            onClick={() => handleOptionClick("Rust")}
          >
            Rust
          </li>
          <li
            className="dropdown-item"
            onClick={() => handleOptionClick("Python")}
          >
            Python
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;