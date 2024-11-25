import React, { useState } from 'react';
import { Box, Slider, Button, Typography } from '@mui/material';

const PriceFilter = () => {
  const [priceRange, setPriceRange] = useState([16290000, 119990000]);

  const handleChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const formatValue = (value) => {
    return `${value.toLocaleString('en-US')}₫`;
  };

  return (
    <Box width={300} padding={2}>
      <Typography id="range-slider" gutterBottom>
        Price range
      </Typography>
      <Slider
        value={priceRange}
        onChange={handleChange}
        valueLabelDisplay="on"
        min={0}
        max={120000000}
        step={100000}
        valueLabelFormat={formatValue}
        aria-labelledby="range-slider"
        getAriaValueText={formatValue}
      />
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="outlined" color="error">Bỏ chọn</Button>
        <Button variant="contained" color="primary">Xem kết quả</Button>
      </Box>
    </Box>
  );
};

export default PriceFilter;
