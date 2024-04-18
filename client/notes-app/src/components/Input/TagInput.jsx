import React, { useState } from 'react'
import { MdAdd, MdClose } from 'react-icons/md'

const TagInput = ({ tags, setTags }) => {

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const addNewTag = () => {
        if (inputValue.trim() !== '') {
            setTags([...tags, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addNewTag();
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

  return (
    <div> 
    {tags?.length > 0 && (
        <div className='flex flex-wrap mt-2'>
            {tags.map((tag, index) => (
                <span key={index} className='inline-flex items-center text-sm text-gray-800 bg-gray-200 px-3 py-1 rounded-full mr-2 mb-2'>
                    #{tag}
                    <button onClick={() => {handleRemoveTag(tag)}} className='ml-2 text-red-500 hover:text-red-700'>
                        <MdClose className='text-lg'/>
                    </button>
                </span>
            ))}
        </div>
    )}

    <div className='flex items-center gap-4 mt-3'>
        <input 
            type="text" 
            value={inputValue}
            className='text-sm bg-gray-100 border px-3 py-2 rounded-full w-36 outline-none focus:border-blue-500' 
            placeholder='Add tags'
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
        />

        <button 
            className='w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white'
            onClick={() => {addNewTag()}}
        >
            <MdAdd className='text-2xl'/>
        </button>
    </div>
</div>

  )
}

export default TagInput;