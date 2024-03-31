import React, { useState } from 'react';

interface ToggleSwitchProps{
    state?: boolean ;
    handleSwitch?: () => void;
}

const ToggleSwitch = ({ handleSwitch, state }: ToggleSwitchProps) => {


  return (
    <div className="relative inline-block w-[30px] h-[18px]">
      <input
        type="checkbox"
        id="toggle"
        className="absolute block w-0 h-0 overflow-hidden"
        checked={state}
      />
      <label
        htmlFor="toggle"
        className={`absolute block w-full h-full cursor-pointer rounded-full transition-colors duration-300 ${
            state ? 'bg-[#DB9E04]' : 'bg-gray-300'
        }`}
        onClick={handleSwitch}
      >
        <div
          className={`absolute left-0 w-[15px] h-[16px] bg-white rounded-full shadow-md transform transition-transform ${
            state ? 'translate-x-full' : ''
          }`}
        ></div>
      </label>
      <span className="ml-2 hidden">{state ? 'ON' : 'OFF'}</span>
    </div>
  );
};

export default ToggleSwitch;
