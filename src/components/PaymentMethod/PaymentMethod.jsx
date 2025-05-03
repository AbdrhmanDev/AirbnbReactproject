import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./PaymentMethod.module.css"; // Import custom CSS

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("Credit or debit card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("Canada");

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="text-muted">Pay with</h4>
        {/* Payment logos */}
        <div className="d-flex align-items-center">
          <img
            src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_visa.0adea522bb26bd90821a8fade4911913.svg"
            alt="Visa"
            className="payment-logo me-2"
          />
          <img
            src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_mastercard.f18379cf1f27d22abd9e9cf44085d149.svg"
            alt="Mastercard"
            className="payment-logo me-2"
          />
          <img
            src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_amex.84088b520ca1b3384cb71398095627da.svg"
            alt="American Express"
            className="payment-logo me-2"
          />
          <img
            src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_paypal.faa3042fa2daf6b4a9822cc4b43e8609.svg"
            alt="PayPal"
            className="payment-logo me-2"
          />
          <img
            src="//a0.muscache.com/airbnb/static/packages/assets/frontend/legacy-shared/svgs/payments/logo_googlepay.3f786bc031b59575d24f504dfb859da0.svg"
            alt="Google Pay"
            className="payment-logo"
          />
        </div>
      </div>

      {/* Payment Method Dropdown */}
      <div className="mb-3">
        <select
          className="form-select custom-select"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option>Credit or debit card</option>
          <option>PayPal</option>
          <option>Google Pay</option>
        </select>
      </div>

      {/* Card Number Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control custom-input"
          placeholder="Card number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
      </div>

      {/* Expiration and CVV Inputs (Split into two columns) */}
      <div className="row g-3 mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control custom-input"
            placeholder="Expiration (MM/YY)"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control custom-input"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </div>
      </div>

      {/* Postal Code Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control custom-input"
          placeholder="Postal code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </div>

      {/* Country/Region Dropdown */}
      <div className="mb-3">
        <select
          className="form-select custom-select"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option>Canada</option>
          <option>United States</option>
          <option>United Kingdom</option>
          <option>Australia</option>
        </select>
      </div>

      {/* Submit Button */}
      <button className="btn btn-primary w-100 custom-button">
        Continue to payment
      </button>
    </div>
  );
};

export default PaymentMethod;
