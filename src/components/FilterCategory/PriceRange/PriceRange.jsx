import React, { useState } from 'react';
import { BarChart, Bar, XAxis, Tooltip } from 'recharts';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './PriceRange.css';

const mockData = [
  { price: 10, count: 5 },
  { price: 20, count: 12 },
  { price: 30, count: 18 },
  { price: 40, count: 22 },
  { price: 50, count: 19 },
  { price: 60, count: 10 },
  { price: 70, count: 8 },
  { price: 80, count: 4 },
  { price: 90, count: 2 },
  { price: 100, count: 1 },
  { price: 110, count: 0 },
  { price: 120, count: 0 },
  { price: 130, count: 1 },
  { price: 140, count: 0 },
  { price: 150, count: 1 },
  { price: 160, count: 0 },
  { price: 170, count: 0 },
  { price: 180, count: 1 },
  { price: 190, count: 1 },
  { price: 200, count: 1 },
];

const PriceRange = () => {
  const [range, setRange] = useState([10, 530]);

  const handleSliderChange = (value) => {
    setRange(value);
  };

  // 🔍 فلترة البيانات بناءً على الرينج الحالي
  const filteredData = mockData.filter(
    (item) => item.price >= range[0] && item.price <= range[1]
  );

  return (
    <div className="price-range-container">
      <BarChart width={400} height={60} data={filteredData}>
        <XAxis dataKey="price" hide />
        <Tooltip />
        <Bar dataKey="count" fill="#e91e63" />
      </BarChart>

      <div className="slider-wrapper">
        <Slider
          range
          min={10}
          max={530}
          value={range}
          onChange={handleSliderChange}
          trackStyle={[{ backgroundColor: '#e91e63' }]}
          handleStyle={[
            { borderColor: '#e91e63' },
            { borderColor: '#e91e63' },
          ]}
        />
      </div>

      <div className="d-flex justify-content-between mt-2 px-1">
        <div className="price-box">${range[0]}</div>
        <div className="price-box">${range[1]}+</div>
      </div>
    </div>
  );
};

export default PriceRange;
