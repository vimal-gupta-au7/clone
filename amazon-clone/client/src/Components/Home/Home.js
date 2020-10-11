import React from "react";
import "./Home.css";
import hero_section from "../../images/hero_section/img4.jpg";
import Product from "./Product";
import product_img1 from "../../images/products/img1.jpg";
import product_img2 from "../../images/products/img2.jpg";
import product_img3 from "../../images/products/img3.jpg";
import product_img4 from "../../images/products/img4.jpg";
import product_img5 from "../../images/products/img5.jpg";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <Link to="./signUp">
          <img
            className="hero__section__image"
            src={hero_section}
            onClick={Redirect("./signUp")}
            alt="prime ads"
          />
        </Link>
        <div className="home_row">
          <Product
            id="0"
            title="Joy Stick"
            price={2200}
            rating={3}
            image={product_img1}
          />
        </div>
        <div className="home_row">
          <Product
            id="1"
            title="Joy Stick"
            price={2200}
            rating={4}
            image={product_img1}
          />
          <Product
            id="2"
            title="DSLR Camera"
            price={60000}
            rating={5}
            image={product_img2}
          />
          <Product
            id="3"
            title="USB Router: Wifi"
            price={1500}
            rating={1}
            image={product_img3}
          />
        </div>
        <div className="home_row">
          <Product
            id="4"
            title="Laptop Scren Gurard"
            price={400}
            rating={2}
            image={product_img4}
          />
          <Product
            id="5"
            title="Sofa Set"
            price={40000}
            star="Star Rating"
            image={product_img5}
          />
        </div>
      </div>
    </div>
  );
}
