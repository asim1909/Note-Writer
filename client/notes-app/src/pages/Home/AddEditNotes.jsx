import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
    const [title, setTitle] = useState(noteData?.title || '');
    const [content, setContent] = useState(noteData?.content ||'');
    const [tags, setTags] = useState(noteData?.tags || []);

    const [error, setError] = useState('')

    // Add Note
    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-note", {
                title,
                content,
                tags
            });
            if (response.data && response.data.note) {
                showToastMessage('Note added successfully');
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if (
                error.response && 
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            }
        }
    };

    // Edit Note
    const editNote = async () => {
        const noteId = noteData._id;
        try {
            const response = await axiosInstance.put("/edit-note/" + noteId, {
                title,
                content,
                tags
            });
            if (response.data && response.data.note) {
                showToastMessage('Note Updated successfully');
                getAllNotes();
                onClose();
            }
        } catch (error) {
            if (
                error.response && 
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            }
        }
    };

    const handleAddNote = () => {
        if (!title) {
            setError('Please fill the title');
            return;
        }
        if (!content) {
            setError('Please fill the content');
            return;
        }

        setError('');

        if(type === 'edit'){
            editNote();
        } else {
            addNewNote();
        }

    };


  return (
    <div className='relative'>
        
        <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50' onClick={onClose}>
            <MdClose className="text-xl text-slate-400"/>
        </button>

        <div className='flex flex-col gap-3 mt-4'>
            <label className='text-sm font-semibold text-blue-600'>TITLE</label>
            <input 
                type='text' 
                className='text-lg text-gray-800 bg-blue-100 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Go To Gym At 5'
                value={title}
                onChange={({target}) => setTitle(target.value)}
            />
        </div>


        <div className='flex flex-col gap-3 mt-4'>
    <label className='text-sm font-semibold text-green-600'>CONTENT</label>
    <textarea
        type='text' 
        className='text-sm text-gray-800 bg-green-100 py-2 px-3 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
        placeholder='Content'
        rows={10}
        value={content}
        onChange={({target}) => setContent(target.value)}
    />
</div>

<div className='mt-4'>
    <label className='text-sm font-semibold text-yellow-600'>TAGS</label>
    <TagInput  
        tags={tags} 
        setTags={setTags}
        className='mt-2'
        tagStyle='bg-purple-200 text-purple-800 hover:bg-purple-300 hover:text-white'
    />
</div>


        {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

        <button 
    className='btn-primary font-medium mt-5 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
    onClick={handleAddNote}
>
    {type === "edit" ? "UPDATE" : "ADD"}
</button>

    </div>
  )
}

export default AddEditNotes;