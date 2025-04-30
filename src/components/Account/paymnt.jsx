import { useState } from 'react';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Payment = () => {
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [coupon, setCoupon] = useState("");

  const paymentOptions = [
    "Manage Payment",
    "Add a payment method",
    "Add Gift credit",
    "Add Your coupons"
  ];

  return (
    <div className="container mb-3" style={{ marginTop: "100px", margin: "auto" }}>
      <nav aria-label="breadcrumb" className="text-start">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/Account" style={{ color: "black", textDecoration: "none", fontWeight: "bold" }}>
              Account
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            payment & payout
          </li>
        </ol>
      </nav>

      <div className="row gx-5">
        {/* العمود الأيسر */}
        <div className="col-md-6">
          <h1 className="text-start mb-5">Payments & payouts</h1>
          <Link 
  to="#" 
  className="ms-2 px-2 py-1 rounded"
  style={{ 
    fontSize: "16px", 
    color: "black", 
    cursor: "pointer", 
    textDecoration: "none",
    transition: "all 0.2s ease-in-out"
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = "#f0f0f0"; 
    e.target.style.textDecoration = "underline";
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "transparent";
    e.target.style.textDecoration = "none";
  }}>          
  
    Payment
   </Link>
    <Link 
  to="/payout" 
  className="ms-2 px-2 py-1 rounded"
  style={{ 
    fontSize: "16px", 
    color: "black", 
    cursor: "pointer", 
    textDecoration: "none",
    transition: "all 0.2s ease-in-out"
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = "#f0f0f0"; 
    e.target.style.textDecoration = "underline";
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "transparent";
    e.target.style.textDecoration = "none";
  }}
>
  Payout
</Link>
          <hr></hr>
          <h2 className="text-start mb-4">Your payment</h2>
          <hr />

          {paymentOptions.map((label, index) => (
            <div key={index} className="mb-4">
              {/* نص إضافي قبل أول وتاني زر */}
              {(index === 0 || index === 1) && (
                <p className="text-muted fst-italic">
                  {index === 0 ? "You can manage your current payment methods here." : "Add a new method to receive payments."}
                </p>
              )}

              <p className="text-start fw-bold mb-2">{label}</p>

              {/* زر خاص بالكوبون */}
              {index === 3 ? (
                <>
                  <button className="btn btn-dark w-20" onClick={() => setShowCouponInput(true)}>
                    {label}
                  </button>

                  {/* عرض حقل الكوبون إذا تم الضغط */}
                  {showCouponInput && (
                    <div className="mt-3">
                      <input
                        type="text"
                        placeholder="Enter your coupon code"
                        className="form-control mb-3 w-50"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                      />
                      <div className="d-flex gap-2">
                        <button className="btn btn-outline-secondary w-20" onClick={() => setShowCouponInput(false)}>
                          Cancel
                        </button>
                        <button className="btn btn-dark w-20" onClick={() => alert(`Coupon "${coupon}" added!`)}>
                         Reedeem coupon 
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <button className="btn btn-dark w-20 mb-5">{label}</button>
               
              )}
            </div>
          ))}
        </div>

        {/* العمود الأيمن */}
        <div className="col-md-6 d-flex justify-content-center align-items-start" style={{ marginTop: "100px" }}>
          <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px', borderRadius: "10px" }}>
            <div className="card-body">
              <FaMoneyCheckAlt size={30} style={{ color: 'red' }} />
              <h5 className="card-title mt-3">Make all payments through Airbnb</h5>
              <p className="card-text" style={{ fontSize: '14px' }}>
                Always pay and communicate through Airbnb to ensure you're protected under our Terms of Service, Payments Terms of Service, cancellation, and other safeguards.
              </p>
              <a href="#" className="btn btn-link p-0" style={{ color: "#008489", textDecoration: "underline" }}>
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
