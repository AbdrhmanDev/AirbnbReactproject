import React from 'react';
import './RoomAndBeds.css';

const Counter = ({ label, value, setValue }) => {
  const handleDecrement = () => {
    if (value > 0) setValue(value - 1);
  };

  const handleIncrement = () => {
    setValue(+value + 1);
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

const RoomAndBeds = ({ roomAndBed, setRoomAndBed }) => {
  const handleSet = (field, newValue) => {
    setRoomAndBed((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  return (
    <div className="room-and-beds">
      <h5>Rooms and beds</h5>
      <Counter
        label="Bedrooms"
        value={roomAndBed.rooms}
        setValue={(val) => handleSet('rooms', val)}
      />
      <Counter
        label="Beds"
        value={roomAndBed.beds}
        setValue={(val) => handleSet('beds', val)}
      />
      <Counter
        label="Bathrooms"
        value={roomAndBed.bathrooms}
        setValue={(val) => handleSet('bathrooms', val)}
      />
    </div>
  );
};

export default RoomAndBeds;
