import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/toast';
import EmptyCard from '../../components/EmptyCard/EmptyCard';
import AddNotesImg from '../../assets/images/add-note.svg';
import NoNoteImg from '../../assets/images/no-notes.svg';


const Home = () => {
   
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    note: null
  });

  const [showToast, setShowToastMsg] = useState({
    isShown: false,
    message: '',
    type: 'add'
  });

  const [isSearch, setIsSearch] = useState(false);  //  search functionality
  

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  // edit note
  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
     isShown: true, data: noteDetails, type: 'edit'
    });
  }

  // toast message
  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  // close toast message
  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: '',
    });
  };

  
  // Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  // Get all notes
  const getAllNotes = async () => {
     try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Error while fetching notes")
    }
  }

  // delete note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      if (response.data && !response.data.error) {
          showToastMessage('Note deleted successfully', 'delete');
          getAllNotes();
      }
    } catch (error) {
      if (
          error.response && 
          error.response.data &&
          error.response.data.message
      ) {
        console.log("Error while fetching notes")
      }
    }
  }

  // Search for notes
  const onSearchNotes = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes/", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Update Ispinned
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
        const response = await axiosInstance.put(
          "/update-note-pinned/" + noteId, 
          {
            isPinned: !noteData.isPinned,
          }
        );

        if (response.data && response.data.note) {
          if (!noteData.isPinned) {
            showToastMessage('Note pinned', 'success');
          } else {
            showToastMessage('Note unpinned successfully', 'success');
          }
          getAllNotes();
      }
    } catch (error) {
        console.log(error);
    }
  }


  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };
    

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {}
  }, [])

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNotes={onSearchNotes} handleClearSearch={handleClearSearch} />

      <div className='container mx-auto'>
    {allNotes.length > 0 ? (
        <div className='grid grid-cols-3 gap-6 mt-8'>
            {allNotes.map((item, index) => (
                <NoteCard 
                    key={item._id}
                    title={item.title}
                    date={item.createdOn} 
                    content={item.content}
                    tags={item.tags}
                    isPinned={item.isPinned}
                    onEdit={() => handleEdit(item)}
                    onDelete={() => deleteNote(item)}
                    onPinNote={() => updateIsPinned(item)}
                />
            ))}
        </div>
    ) : (
        <EmptyCard 
            imgSrc={isSearch ? NoNoteImg : AddNotesImg} 
            message={isSearch 
                ? `Oops! No notes found matching your search query.` 
                : `Start creating your very first note! To record your thoughts, ideas, or reminders, click the 'Add' button. Let's get going!`}
        />
    )}

    <button 
        className='w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-xl absolute right-10 bottom-10'
        onClick={() => {
            setOpenAddEditModal({
                isShown: true,
                type: 'add', 
                note: null
            });
        }}
    >
        <MdAdd className='text-3xl'/>
    </button>

    <Modal 
        isOpen={openAddEditModal.isShown} 
        onRequestClose={() => {
            setOpenAddEditModal({ isShown: false, type: 'add', note: null });
        }}
        style={{
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                zIndex: 1000
            },
            content: {
                width: '40%',
                maxHeight: '80vh',
                top: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }
        }}
    >
        <AddEditNotes
            type={openAddEditModal.type}
            noteData={openAddEditModal.data}
            onClose={() => {
                setOpenAddEditModal({ isShown: false, type: 'add', note: null });
            }}
            getAllNotes={getAllNotes}
            showToastMessage={showToastMessage}
        />
    </Modal>
</div>


      <Toast
        isShown={showToast.isShown}
        message={showToast.message}
        type={showToast.type}
        onClose={handleCloseToast}
      />
      

    </>
  );
};

export default Home;