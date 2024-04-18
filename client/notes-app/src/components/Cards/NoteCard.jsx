import moment from 'moment';
import React from 'react';
import { MdOutlinePushPin } from 'react-icons/md';
import { MdCreate, MdDelete } from 'react-icons/md';

const NoteCard = ({
    title, 
    date, 
    content, 
    tags, 
    isPinned, 
    onEdit, 
    onDelete, 
    onPinNote
}) => {
  return (
    <div className='border-none rounded-lg p-4 bg-gradient-to-r from-blue-200 to-green-200 hover:shadow-xl transition-all ease-in-out transform hover:scale-105'>
    <div className='flex items-center justify-between mb-3'>
        <div className="flex flex-col">
            <h6 className='text-sm font-semibold text-blue-700'>{title}</h6>
            <span className='text-xs text-gray-600 mt-1'>{moment(date).format('Do MMM YYYY')}</span>
        </div>

        <MdOutlinePushPin className={`text-lg icon-btn ${isPinned ? 'text-blue-500' : 'text-gray-400'} transition-colors duration-300 ease-in-out`} onClick={onPinNote} />
    </div>
    
    <p className='text-xs text-gray-700 line-clamp-2'>{content?.slice(0, 60)}</p>
    
    <div className='flex items-center justify-between mt-3'>
        <div className='text-xs flex space-x-2'>
            {tags.map((item, index) => (
                <span 
                    key={index} 
                    className={`bg-${index % 2 === 0 ? 'blue' : 'green'}-${index % 2 === 0 ? '300' : '300'} text-${index % 2 === 0 ? 'blue' : 'green'}-700 px-2 py-1 rounded-full`}
                >
                    #{item}
                </span>
            ))}
        </div>
        
        <div className='flex items-center gap-4'>
            <MdCreate className='text-lg icon-btn hover:text-yellow-500 transition-colors duration-300 ease-in-out' onClick={onEdit} />
            <MdDelete className='text-lg icon-btn hover:text-red-500 transition-colors duration-300 ease-in-out' onClick={onDelete} />
        </div>
    </div>
</div>

  )
}

export default NoteCard;