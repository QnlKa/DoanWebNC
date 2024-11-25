import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import "./Menu.css";
import biahoso from "../../assets/images/biahoso.png";
import but from "../../assets/images/but.png";
import butchi from "../../assets/images/butchi.png";
import dungcuhoctap from "../../assets/images/dungcuhoctap.png";
import vo from "../../assets/images/vo.png";
import bangten from "../../assets/images/bangten.png";
import bamkim from "../../assets/images/bamkim.png";
import giay from "../../assets/images/giay.png";
import maytinh from "../../assets/images/maytinh.png";
import kepgiay from "../../assets/images/kepgiay.png";
import bangkeo from "../../assets/images/bangkeo.png";
import dungcukhac from "../../assets/images/dungcukhac.png";


const categories = [
    {
        label: 'Bia hồ sơ',
        img: biahoso
    },
    {
        label: 'Bút',
        img: but
    },
    {
        label: 'Bút chì gỗ',
        img: butchi
    },
    {
        label: 'Dụng cụ học tập',
        img: dungcuhoctap
    },
    {
        label: 'Sổ, tập vở',
        img: vo
    },
    {
        label: 'Bảng tên, dây đeo',
        img: bangten
    },
    {
        label: 'Bấm ki',
        img: bamkim
    },
    {
        label: 'Giấy các loại',
        img: giay
    },
    {
        label: 'Máy tính',
        img: maytinh
    },
    {
        label: 'Kẹp giấy',
        img: kepgiay
    },
    {
        label: 'Băng keo',
        img: bangkeo
    },
    {
        label: 'Dụng cụ khác',
        img: dungcukhac
    },

];
  
const Menu = () => {

  return (
    <Box className="grid-container" sx={{ flexGrow: 1, width: '70%', margin: 'auto' }}>
      <Grid container spacing={2}>
        {categories.map((category, index) => (
          <Grid item xs={6} sm={4} md={2} key={index}>
            <Paper className="category-card">
              <Box className="icon-container">
                <img src={category.img} alt={category.label} className="category-icon" />
              </Box>
              <Typography
                sx={{ fontSize: '18px', fontWeight: 500 }}
                className="category-label"
                >
                    {category.label}
                </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Menu;