import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './PriceRange.css';

import { useSelector } from 'react-redux';

const PriceRange = ({ priceRange, setPriceRange }) => {
  const filter = useSelector((state) => state.GetAllFilter.AllFilter);

  const handleSliderChange = (value) => {
    setPriceRange({ minPrice: value[0], maxPrice: value[1] });
  };

  const priceCounts = {};
  if (Array.isArray(filter)) {
    filter.forEach((hotel) => {
      const price = Math.floor(hotel.pricePerNight / 10) * 10;
      priceCounts[price] = (priceCounts[price] || 0) + 1;
    });
  }

  const chartData = Object.keys(priceCounts).map((price) => ({
    price: Number(price),
    count: priceCounts[price],
  }));

  return (
    <div className="price-range-container">
      <div className="chart-wrapper" style={{ height: 100 }}>
        {chartData.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="price" />
              <Tooltip />
              <Bar dataKey="count" fill="#e91e63" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="slider-wrapper">
        <Slider
          range
          min={10}
          max={530}
          value={[priceRange.minPrice || 10, priceRange.maxPrice || 530]}
          onChange={handleSliderChange}
          trackStyle={[{ backgroundColor: '#e91e63' }]}
          handleStyle={[
            { borderColor: '#e91e63' },
            { borderColor: '#e91e63' },
          ]}
        />
      </div>

      <div className="d-flex justify-content-between mt-2 px-1 price-labels">
        <div className="price-box">${priceRange.minPrice}</div>
        <div className="price-box">${priceRange.maxPrice}+</div>
      </div>
    </div>
  );
};

export default PriceRange;
