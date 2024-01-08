import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const ToggleDarkMode = () => {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div>
      <button
        className="p-2 bg-gray-200 dark:bg-gray-800 rounded-md"
        onClick={toggleDarkMode}
      >
        Toggle Dark Mode
      </button>
    </div>
  )
}

export default ToggleDarkMode