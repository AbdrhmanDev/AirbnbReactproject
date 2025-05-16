// src/components/Message/MessagesPage.jsx
import React from "react";
import { IoSettingsOutline, IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";

const MessagesPage = () => {
  
  



  return (
    <div className="container-fluid overflow-hidden">
      <div className="row vh-100">
        {/* Sidebar */}
        <div className="col-12 col-md-4 col-lg-3 border-end bg-light d-flex flex-column">
          <div className="d-flex  justify-content-between m-4">
            <span className="fs-5">Messages</span>
            <div>
              <IoSearchOutline size={30} className="rounded-circle bg-body-secondary me-2 p-1" />
              <IoSettingsOutline size={30} className="rounded-circle bg-body-secondary p-1" />
            </div>
          </div>

          <div className="ps-3 mb-3">
            <Link className="btn btn-dark rounded-5 px-3 me-2" style={{ textDecoration: 'none' }}>
              All <RiArrowDropDownLine size={19} />
            </Link>
            <Link className="btn rounded-5 text-dark border">Unread</Link>
          </div>

          <div className="d-flex flex-column align-items-center mt-5 px-2 text-center">
            <TiMessages size={28} />
            <span className="mt-2">You don’t have any messages</span>
            <p className="mt-2 small">When you receive a new message, it will appear here.</p>
          </div>
        </div>


        <div className="col-12 col-md-8 col-lg-9 d-flex flex-column">
          {/* Header */}
          <div className="d-flex align-items-center p-3 border-bottom">
            <img src="https://cdn-icons-png.flaticon.com/512/6858/6858504.png" width="45" alt="User" />
            <span className="ms-3">abdelrhman Mohamed</span>
          </div>


          <div className="flex-grow-1 overflow-auto px-3 py-2">
            {/*  الرسائل */}
            <div className="d-flex align-items-start mb-3">
              <img src="https://www.svgrepo.com/show/382109/male-avatar-boy-face-man-user-7.svg" width="40" alt="avatar" />
              <p className="bg-body-secondary ms-2 p-2 rounded-3">Welcome to my hotel, how can I help?</p>
            </div>

            <div className="d-flex justify-content-end mb-3">
              <p className="bg-body-secondary me-2 p-2 rounded-3">I need help with my booking</p>
              <img src="https://www.svgrepo.com/show/382109/male-avatar-boy-face-man-user-7.svg" width="40" alt="avatar" />
            </div>

            <div className="d-flex align-items-start mb-3">
              <img src="https://www.svgrepo.com/show/382109/male-avatar-boy-face-man-user-7.svg" width="40" alt="avatar" />
              <p className="bg-body-secondary ms-2 p-2 rounded-3">Welcome to my hotel, how can I help?</p>
            </div>

            <div className="d-flex justify-content-end mb-3">
              <p className="bg-body-secondary me-2 p-2 rounded-3">I need help with my booking</p>
              <img src="https://www.svgrepo.com/show/382109/male-avatar-boy-face-man-user-7.svg" width="40" alt="avatar" />
            </div>
            {/* ضيف رسائل تانية هنا */}
          </div>

          {/* Input Footer */}
          <div className="p-3 mb-5 pb-5 border-top bg-white d-flex  justify-content-between align-items-center gap-2">
            <input
              type="text"
              className="form-control w-100 w-md-75"
              placeholder="Write to send message to Host"
            />
            <button className="btn btn-dark px-4">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
