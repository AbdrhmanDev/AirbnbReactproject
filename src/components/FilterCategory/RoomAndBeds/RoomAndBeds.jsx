import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RoomAndBeds.css'; 
import { GetAllFilterThunk } from '../../../services/Slice/Filter/AllFillter';

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
  const filter=useSelector((state)=>state.AllFilter.AllFilter);
  const dispatch= useDispatch();
  console.log(filter);
  
  useEffect(() => {
    if (bedrooms > 0 || beds > 0 || bathrooms > 0) {
      console.log('Dispatching filter:', { rooms: bedrooms, path: bathrooms, pets: beds });
      dispatch(GetAllFilterThunk({ rooms: bedrooms, path: bathrooms, pets: beds }));
    }
  }, [bedrooms, beds, bathrooms, dispatch]);
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
