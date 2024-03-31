import Image from 'next/image';
import React from 'react'

interface InputProps {
    placeholder: string;
    value?: string | number;
    label?: string;
    onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    textareaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    textarea?: boolean;
    icon?: boolean;
    image?: string;
}

const Input = ({ 
  placeholder, value, onInputChange, 
  label, textarea, icon, image, textareaChange
}: InputProps) => {
  return (
    <div className='flex flex-col gap-2 mt-4 font-open min-[600px]:w-[450px] min-[500px]:w-[380px] min-[440px]:w-[320px] min-[400px]:w-[290px] w-[230px]'>
        <label className='font-[700] text-[14.41px]'>{label}</label>
        {!textarea && <div className='flex items-center gap-3 w-[100%] md:w-[450px] h-[55px] bg-[#FAFAFA] px-4 rounded-lg'>
          {icon && <Image src={`/images/${image}`} alt='' width={26} height={26}/>}
          <input
              className={`text-[14.41px] ${icon ? 'w-[90%]' : 'w-[100%]'} h-[100%] outline-none bg-transparent`} 
              placeholder={placeholder}
              value={value}
              onChange={onInputChange}
          />
        </div>}
        {textarea && <textarea
            className='w-[100%] md:w-[450px] h-[126px] rounded-lg text-[14.41px] py-4 bg-[#FAFAFA] px-4 outline-none' 
            placeholder={placeholder}
            value={value}
            onChange={textareaChange}
        />}
    </div>
  )
}

export default Input