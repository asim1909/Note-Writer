import React from 'react'
import { getInitials } from '../../utils/helper'


const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    userInfo && (

      <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg shadow-md ">
    {/* <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-800 font-semibold bg-gray-200"> */}
    <div className="w-10 h-10 flex items-center justify-center rounded-full text-gray-800 font-semibold bg-gray-200 transform hover:rotate-3 hover:scale-105 hover:shadow-md transition-transform duration-300 ease-in-out">
        {getInitials(userInfo?.fullName)}
    </div>

    <div className="flex flex-col">
        <p className="text-sm font-semibold text-gray-800">{userInfo.fullName}</p>
        <button className="text-sm text-blue-600 hover:underline" onClick={onLogout}>
            Logout
        </button>
    </div>
</div>

    )
  );
};

export default ProfileInfo;