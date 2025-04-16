import React, { useState } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './PriceRange.css';
import { useDispatch, useSelector } from 'react-redux';
import { FilterThank } from '../../../services/Slice/Filter/FilterPrice';
import debounce from 'lodash.debounce';

const PriceRange = () => {
  const dispatch = useDispatch();
  const Filter = useSelector((state) => state.FilterByPrice.Filter);
  const [range, setRange] = useState([10, 530]);

  // Debounced دي عامله زي settimeout بتاخر ريسبونس بتاع الداتا علشان مش كله ما يغير في الشارت يطلب ريسبونس جديد علشان ما يحملش علي البااكاند كل ش،يه طلب


  const updateFilter = debounce((value) => {
    dispatch(FilterThank({ min: value[0], max: value[1] }));
    dispatch(FilterThank({ min: range[0], max: range[1] }));
  }, 500); 
  const handleSliderChange = (value) => {
    
    setRange(value);
    updateFilter(value);
  };


  const priceCounts = {};
  if (Array.isArray(Filter)) {
    Filter.forEach(hotel => {
      const price = Math.floor(hotel.pricePerNight / 10) * 10;
      priceCounts[price] = (priceCounts[price] || 0) + 1;
    });
  }

  const chartData = Object.keys(priceCounts).map(price => ({
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
          value={range}
          onChange={handleSliderChange}
          trackStyle={[{ backgroundColor: '#e91e63' }]}
          handleStyle={[
            { borderColor: '#e91e63' },
            { borderColor: '#e91e63' },
          ]}
        />
      </div>

      <div className="d-flex justify-content-between mt-2 px-1 price-labels">
        <div className="price-box">${range[0]}</div>
        <div className="price-box">${range[1]}+</div>
      </div>
    </div>
  );
};

export default PriceRange;
