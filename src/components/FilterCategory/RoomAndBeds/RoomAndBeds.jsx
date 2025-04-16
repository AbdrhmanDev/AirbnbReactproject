import React, { useState } from 'react';
import './RoomAndBeds.css'; 

const Counter = ({ label, value, setValue }) => {
  const handleDecrement = () => {
    if (value > 0) setValue(value - 1);
  };

  const handleIncrement = () => {
    setValue(value + 1);
  };

  return (
    <div className="counter-row">
      <div className="label">{label}</div>
      <div className="controls">
        <button onClick={handleDecrement} className="btn-circle" disabled={value === 0}>−</button>
        <div className="value-text">{value === 0 ? 'Any' : `${value}+`}</div>
        <button onClick={handleIncrement} className="btn-circle">+</button>
      </div>
    </div>
  );
};

const RoomAndBeds = () => {
  const [bedrooms, setBedrooms] = useState(0);
  const [beds, setBeds] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);

  return (
    <div className="room-and-beds">
      <h5>Rooms and beds</h5>
      <Counter label="Bedrooms" value={bedrooms} setValue={setBedrooms} />
      <Counter label="Beds" value={beds} setValue={setBeds} />
      <Counter label="Bathrooms" value={bathrooms} setValue={setBathrooms} />
    </div>
  );
};

export default RoomAndBeds;
