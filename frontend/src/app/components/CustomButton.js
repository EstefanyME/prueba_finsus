import React from 'react';

const CustomButton = ({ label, onClick, icon, iconOnly = false }) => {
  return (
    <button
      onClick={onClick}
      className="bg-pink-300 text-white font-semibold text-sm p-[2px] cursor-pointer rounded-full hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 flex items-center justify-center space-x-2"
    >
      {iconOnly ? (
        <span className="material-symbols-outlined">{icon}</span>
      ) : (
        <>
          {icon && <span className="material-symbols-outlined mr-2">{icon}</span>}
          <span>{label}</span>
        </>
      )}
    </button>
  );
};

export default CustomButton;
