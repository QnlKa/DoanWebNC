import React from "react";
import "./HomeWrapper.css";
import service1 from "../../assets/images/service.png";
import service2 from "../../assets/images/service-02.png";
import service3 from "../../assets/images/service-03.png";
import service4 from "../../assets/images/service-04.png";
import service5 from "../../assets/images/service-05.png";

const HomeWrapper = () => {
    return (
        <div className="services">
            <div className="service-item">
                <img src={service1} alt="Free Shipping" />
                <div>
                    <h4>Free Shipping</h4>
                    <p>Với đơn hàng từ 150k</p>
                </div>
            </div>
            <div className="service-item">
                <img src={service2} alt="Daily Surprise Offers" />
                <div>
                    <h4>Deal hời mỗi ngày</h4>
                    <p>Tiết kiệm đến 25%</p>
                </div>
            </div>
            <div className="service-item">
                <img src={service3} alt="Support 24/7" />
                <div>
                    <h4>Hỗ trợ 24/7</h4>
                    <p>Vui lòng khách đến</p>
                </div>
            </div>
            <div className="service-item">
                <img src={service4} alt="Affordable Prices" />
                <div>
                    <h4>Giá cả hợp lý</h4>
                    <p>Tương đương với nhà phân phối</p>
                </div>
            </div>
            <div className="service-item">
                <img src={service5} alt="Secure Payments" />
                <div>
                    <h4>Thanh toán bảo mật</h4>
                    <p>100% An toàn</p>
                </div>
            </div>
        </div>
    );
};

export default HomeWrapper;
