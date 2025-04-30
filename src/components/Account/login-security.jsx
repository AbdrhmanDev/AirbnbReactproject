import React, { useState } from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 

const LoginSecurity = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container mb-3" style={{ marginTop: "100px", margin:"auto" }}>
        <nav aria-label="breadcrumb" className="text-start">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/Account" style={{ color: "black", textDecoration: "none", fontWeight:"bold" }}>Account</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">Login & Security</li>
        </ol>
      </nav>
      <div className="row gx-5"> 
        
        {/* العمود الأيسر: الفورم */}
        <div className="col-md-6">
          <h1 className='text-start mb-5'>Login & security</h1>
          <h2 className="text-start mb-5">Login</h2>
          <hr />

          <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
            <div>
              <strong className="d-block text-start">Password</strong>
              <br />
              <strong className="text-start">Last updated 3 months ago</strong>
            </div>

            <span 
              style={{ color: "#008489", fontWeight: "bold" }} 
              role="button" 
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : 'Update'}
            </span>
          </div>

          {showForm && (
            <form className="ps-2">
              <div className="text-start mb-3">
                <label className="form-label">Current Password</label>
                <input type="password" className="form-control" placeholder="Enter current password" />
              </div>

              <div className="mb-3 text-start">
                <label className="form-label">New Password</label>
                <input type="password" className="form-control" placeholder="Enter new password" />
              </div>

              <div className="mb-3 text-start">
                <label className="form-label">Confirm New Password</label>
                <input type="password" className="form-control" placeholder="Confirm new password" />
              </div>

              <div className='d-flex flex-column justify-content-start align-items-start'>
                <p style={{ color: "#008489", fontSize: "14px" }}>
                  Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols.
                </p>
                <button 
                  type="submit" 
                  style={{
                    backgroundColor: "#008489",
                    color: "white",
                    border: "0",
                    padding: "10px",
                    borderRadius: "3px"
                  }}
                >
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="col-md-6 d-flex justify-content-center align-items-start" style={{ marginTop:"100px" }}>
          <div className="card shadow-sm p-3" style={{ width: '60%', borderRadius: "10px", height: "350px" }}>
            <div className="card-body">
              <FaShieldAlt size={30} style={{ color: '#ffb400' }} />
              <h5 className="card-title mt-3">Keeping your account secure</h5>
              <p className="card-text" style={{ fontSize: '14px' }}>
                We regularly review accounts to make sure they’re as secure as possible.
                We’ll also let you know if there’s more we can do to increase the security of your account.
              </p>
              <a href="#" className="btn btn-link p-0" style={{ color: "#008489", textDecoration: "underline" }}>
                Learn about safety tips for guests and hosts.
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginSecurity;
