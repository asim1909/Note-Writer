import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import SearchBar from '../SearchBar/SearchBar'
import { useNavigate } from 'react-router-dom'



const Navbar = ({ userInfo, onSearchNotes, handleClearSearch }) => {

  const [searchQuery, setSearchQuery] = useState("");
  const  navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/")
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNotes(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className='bg-white flex items-center justify-between px-4 py-2 rounded-lg shadow-md '>
      <h2 className='text-lg font-semibold text-purple-600'>NotesWriter</h2>

        <SearchBar value={searchQuery}
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />

        <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
    </div>
  )
}

export default Navbar