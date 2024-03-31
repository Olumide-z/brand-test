import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import ToggleSwitch from './ToggleSwitch';

interface OptionsInputProps {
    label: string;
    optionValue: string;
    state?: any;
    handleSwitch?: () => void;
    toggle?: boolean;
    options?:  string[];
    selectedValue?: string | number;
    handleSelectChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const OptionsInput = ({ 
    label, optionValue, state, 
    handleSwitch, toggle, selectedValue,
    handleSelectChange, options
} : OptionsInputProps) => {
  

  return (
    <div className='flex flex-col gap-2 mt-4 font-open'>
      <div className='flex gap-3 items-center'>
        <label htmlFor="dropdown" className='font-[700] text-[14.41px]'>{label}</label>
        {/* toggle switch */}
        {toggle && <ToggleSwitch 
            state={state}
            handleSwitch={handleSwitch}
        />}
      </div>
      <div className='flex justify-between items-center relative w-[220px] min-[360px]:w-[260px] md:w-[450px]'>
        <select disabled={!state && toggle} id="dropdown" value={selectedValue} onChange={handleSelectChange} className={`w-[100%] h-[55px] rounded-lg  text-[14.41px] bg-[#FAFAFA] px-4 outline-none appearance-none ${selectedValue ? 'text-black' : 'text-gray-500'}`}>
            <option value="" className='text-[14.41px]' >{optionValue}</option>
            {options?.map((option, index) => (
                <option key={index} value={option} >{option}</option>
            ))}
        </select>
        <IoIosArrowDown 
            className='pointer-events-none absolute right-0 mr-4 cursor-pointer text-[#B3B3B3]'
            size={20}
        />
      </div>
    </div>
  );
};

export default OptionsInput;
