import React, { useEffect, useState } from 'react'
import darkLogo from '../../assets/dark-logo.svg'; 
import lightLogo from '../../assets/light-logo.svg'; 
const Header = () => {

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
    <div className='w-full flex justify-center items-center mt-6 mb-12'>
        <button
        className="p-2 bg-gray-200 dark:bg-gray-800 rounded-md"
        onClick={toggleDarkMode}
      >
        <img src={darkMode ? lightLogo : darkLogo} className='cursor-pointer' alt='logo' width={50} height={50} />
      </button>
        
    </div>
  )
}

export default Header