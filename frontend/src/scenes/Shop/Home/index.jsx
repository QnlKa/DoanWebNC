import React, { useEffect, useState } from "react";
import BannerSection from "../../../components/Banner/Banner.jsx";
import Footer from "../../../components/Footer/Footer";
import HomeWrapper from "../../../components/HomeWrapper/HomeWrapper.jsx";
import Menu from "../../../components/Menu/Menu.jsx";
import Popular from "../../../components/Popular/Popular.jsx";
import ShopHeader from "../../../components/ShopHeader/ShopHeader";
import { BASE_URL } from "../../../config";
import "./Home.css";
const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${BASE_URL}/products/soldproduct`);
      const data = await result.json();
      setData(data.data);
    };
    fetchData();
  }, []);



  return (
    <div className="home">
      <ShopHeader />
      <BannerSection />
      <HomeWrapper />
      <Menu />
      <Popular data={data} />
      {/* <Offer data={data} /> */}
      <Footer />
    </div>
  );
};
export default Home;
