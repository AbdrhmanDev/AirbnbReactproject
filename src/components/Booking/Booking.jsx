import React, { useState } from "react";
import PaymentMethod from "../PaymentMethod/PaymentMethod";
import "./Booking.css";

const Booking = () => {
  const [selectedOption, setSelectedOption] = useState("option2");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Left Column */}
        <div className="col-md-8 p-4 bg-light">
          <h2>Confirm and pay</h2>

          {/* Rare find card */}
          <div className="card mb-4">
            <div className="card-body">
              <p>This is a rare find.</p>
              <p>Adel's place is usually booked.</p>
            </div>
          </div>

          {/* Your Trip Section */}
          <div className="mb-4">
            <h5>Your trip</h5>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <p>
                  <strong>Dates</strong>
                </p>
                <p>May 4 – 9</p>
              </div>
              <button className="btn btn-primary">Edit</button>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <p>
                  <strong>Guests</strong>
                </p>
                <p>1 guest</p>
              </div>
              <button className="btn btn-primary">Edit</button>
            </div>
          </div>

          {/* Payment Options */}
          <div className="mb-4">
            <h5>Choose how to pay</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentOption"
                id="payNow"
                value="payNow"
                checked={selectedOption === "payNow"}
                onChange={handleOptionChange}
              />
              <label className="form-check-label" htmlFor="payNow">
                Pay $747.11 CAD now
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentOption"
                id="payLater"
                value="payLater"
                checked={selectedOption === "payLater"}
                onChange={handleOptionChange}
              />
              <label className="form-check-label" htmlFor="payLater">
                Pay part now, part later
                <small>
                  $149.43 CAD due today, $597.68 CAD on May 31, 2025. No extra
                  fees.
                  <a href="#">More info</a>
                </small>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <PaymentMethod />

          {/* Required for your trip */}
          <div className="mb-4">
            <h5>Required for your trip</h5>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <p>
                  <strong>Phone number</strong>
                </p>
                <p>Add and confirm your phone number to get trip updates.</p>
              </div>
              <button className="btn btn-primary">Add</button>
            </div>
          </div>

          {/* Cancellation policy */}
          <div className="mb-4">
            <h5>Cancellation policy</h5>
            <p>
              Free cancellation before Jun 8. Cancel before check-in on Jun 9
              for a partial refund.
              <a href="#">Learn more</a>
            </p>
          </div>

          {/* Ground rules */}
          <div className="mb-4">
            <h5>Ground rules</h5>
            <p>
              We ask every guest to remember a few simple things about what
              makes a great guest.
            </p>
            <ul>
              <li>Follow the house rules</li>
              <li>Treat your Host’s home like your own</li>
            </ul>
          </div>

          {/* Agreement terms */}
          <div className="mb-4">
            <p>
              By selecting the button below, I agree to the
              <a href="#">Host's House Rules</a>,
              <a href="#">Ground rules for guests</a>,
              <a href="#">Airbnb's Rebooking and Refund Policy</a>,
              <a href="#">Pay Less Upfront Terms</a>, and that Airbnb can charge
              my payment method if I'm responsible for damage.
            </p>
            <p>
              I also agree to the
              <a href="#">updated Terms of Service</a>,
              <a href="#">Payments Terms of Service</a>, and I acknowledge the
              <a href="#">Privacy Policy</a>.
            </p>
          </div>

          {/* Confirm and pay button */}
          <button className="btn btn-danger w-100">Confirm and pay</button>
        </div>

        {/* Right Column (Sticky) */}
        <div
          className="col-md-4 p-4 bg-white sticky-top"
          style={{ top: "60px" }}
        >
          <div className="card mb-4">
            <div className="card-body d-flex flex-column">
              <img
                src="https://via.placeholder.com/150x100?text=Property+Image"
                alt="Property Image"
                className="mb-2"
              />
              <h5>Khufu's Heaven Pyramids View</h5>
              <p>Entire rental unit</p>
              <p>★ 4.92 (87 reviews) • ✅ Superhost</p>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5>Your total</h5>
              <p>$149.42 CAD x 5 nights</p>
              <p>
                Total (CAD): <strong>$747.11 CAD</strong>
              </p>
              <a href="#">Price breakdown</a>
              <hr />
              <p>Due now</p>
              <p>Charge on May 31</p>
              <p>
                <strong>$149.43 CAD</strong>
              </p>
              <p>
                <strong>$597.68 CAD</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
