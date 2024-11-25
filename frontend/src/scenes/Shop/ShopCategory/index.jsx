import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Slider,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import "./ShopCategory.css"; // Import CSS
import ShopHeader from "../../../components/ShopHeader/ShopHeader";
import Footer from "../../../components/Footer/Footer";
import { BASE_URL } from "../../../config";
import { CartContext } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
const ShopCategory = () => {
  const [filters, setFilters] = useState({
    priceRange: [0, 2000000],
  });
  const [sortOption, setSortOption] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  console.log("🚀 ~ ShopCategory ~ searchQuery:", searchQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { dispatch } = useContext(CartContext);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${BASE_URL}/products/all`);
      const data = await result.json();
      setData(data.data);
    };
    fetchData();
  }, []);
  const handlePriceChange = (event, newValue) => {
    setFilters({ ...filters, priceRange: newValue });
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const formatValue = (value) => {
    return `${value.toLocaleString("vi-VN")}₫`;
  };

  const filteredProducts = data.filter((product) => {
    const matchesCategory =
      filters.category === "All" || product.category === filters.category;
    const inPriceRange =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];
    const matchesSearchQuery =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && inPriceRange && matchesSearchQuery;
  });
  const sortedAndFilteredProducts = data
    .filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1] &&
        (searchQuery === "" ||
          product.title.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return a.id - b.id;
      }
    });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleAddToCart = (item) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: item._id,
        name: item.title,
        image: item.images,
        price: item.price,
      },
    });
  };
  const handleDetail = (id) => {
    navigate(`/productDetail/${id}`);
  };
  return (
    <>
      <ShopHeader />
      <Box p={3}>
        <Box
          mb={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FormControl variant="outlined" sx={{ minWidth: 120, mr: 2 }}>
            <InputLabel id="sort-label">Xếp theo</InputLabel>
            <Select
              labelId="sort-label"
              value={sortOption}
              onChange={handleSortChange}
              label="Xếp theo"
            >
              <MenuItem value="featured">Nổi bật</MenuItem>
              <MenuItem value="name-asc">Tên từ A-Z</MenuItem>
              <MenuItem value="name-desc">Tên từ Z-A</MenuItem>
              <MenuItem value="price-asc">Giá tăng dần</MenuItem>
              <MenuItem value="price-desc">Giá giảm dần</MenuItem>
            </Select>
          </FormControl>
          <Box
            style={{ display: "flex", alignItems: "center" }}
            sx={{ width: 350, ml: 2, mr: 2 }}
          >
            <Typography
              style={{ width: "80px" }}
              id="range-slider"
              gutterBottom
            >
              Giá từ:
            </Typography>
            <Slider
              value={filters.priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={2000000}
              getAriaLabel={() => "Price range"}
              valueLabelFormat={formatValue}
            />
          </Box>
          <input
            placeholder="Tìm Kiếm"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ borderRadius: "20px" }}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Box>
        <Grid container spacing={2} padding="25px">
          {sortedAndFilteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} lg={2.4} key={product._id}>
                <Card
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    style={{ height: 400, objectFit: "contain" }}
                    image={product.images}
                    alt={product.title}
                    onClick={() => handleDetail(product._id)}
                  />
                  <CardContent
                    style={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      onClick={() => handleDetail(product._id)}
                      gutterBottom
                      variant="h6"
                      component="div"
                    >
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Giá: {formatValue(product.price)}
                    </Typography>
                    <div style={{ marginTop: "auto" }}>
                      <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCartIcon />
                      </IconButton>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Box mt={3} display="flex" justifyContent="center">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              variant="contained"
              color={currentPage === index + 1 ? "primary" : "inherit"}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ShopCategory;
