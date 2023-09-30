import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/Epharm/Epharm.css";
import wallpaper from "../../img/wallpaper.jpeg";

const CART_STORAGE_KEY = process.env.REACT_APP_CART_STORAGE_KEY;

const Epharm = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const sliderContainerRef = useRef(null);


  useEffect(() => {
    axios.get("http://localhost:8081/epharm/Companies").then((response) => {
      setCompanies(response.data);
    });
  }, []);

  useEffect(() => {
    getProducts();

    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, [currentPage]);

  useEffect(() => {
    // Save cart data to local storage whenever it changes
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const getProducts = async () => {
    const response = await axios.get(
      `http://localhost:8081/epharm/?page=${currentPage}&perPage=${productsPerPage}`
    );
    setProducts(response.data);
  };

  const addToCart = (product) => {
    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.id === product.id);

    if (!existingProduct) {
      // Product doesn't exist in the cart, add it with a minimum quantity of 1
      const newProduct = { ...product, quantity: 1 };
      setCart([...cart, newProduct]);
    }
  };

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Define filteredProducts here based on the current page and products per page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const filteredProducts = products.slice(startIndex, endIndex);

  // Add your slider functionality
  useEffect(() => {
    const kornizaEBrendeve = [
      ...document.querySelectorAll(".kornizaEBrendeve"),
    ];
    const shkoDjathtas = [...document.querySelectorAll(".shkoDjathtas")];
    const shkoMajtas = [...document.querySelectorAll(".shkoMajtas")];

    kornizaEBrendeve.forEach((item, i) => {
      let containerDimensions = item.getBoundingClientRect();
      let containerWidth = containerDimensions.width;

      shkoDjathtas[i].addEventListener("click", () => {
        item.scrollLeft += containerWidth;
      });

      shkoMajtas[i].addEventListener("click", () => {
        item.scrollLeft -= containerWidth;
      });
    });
  }, []);

  const scrollLeft = () => {
    const container = document.querySelector(".kornizaEBrendeve");
    container.scrollLeft -= 700; // Adjust the scroll amount as needed
  };

  const scrollRight = () => {
    const container = document.querySelector(".kornizaEBrendeve");
    container.scrollLeft += 700; // Adjust the scroll amount as needed
  };

  return (
    <div className="epharm-container">
      <div className="epharm-navbar">
        <div className="epharm-logo">HeisenBerg</div>
        <ul className="epharm-navbar-list">
          <li className="epharm-navbar-item">
            <Link to="/" className="epharm-navbar-link">
              Home
            </Link>
          </li>
          <li className="epharm-navbar-item">
            <Link to="/about" className="epharm-navbar-link">
              About Us
            </Link>
          </li>
          <li className="epharm-navbar-item">
            <Link to="/Products" className="epharm-navbar-link">
              Products
            </Link>
          </li>
        </ul>
        <div className="epharm-cart">
          <Link to="/AddToCart" className="epharm-cart-link">
            <i className="fas fa-shopping-cart"></i> View Cart ({cart.length})
          </Link>
        </div>
      </div>
      {/* Gap */}
      <div className="epharm-gap">
        <img className="epharm-gap-img" src={wallpaper} alt="" />
      </div>
      {/* Container for Company Logos */}
      <div className="company-logo-container">
        <section className="brandsSlider">
          <div className="slider-buttons">
            <button className="shkoDjathtas" onClick={scrollRight}>
              &gt; {/* Right arrow */}
            </button>
            <div className="kornizaEBrendeve">
              {companies.map((company) => (
                <div className="kartelaEBrendit" key={company.id}>
                  <div className="logoBrendit">
                    <a href={`/company/${company.id}`}>
                      <img
                        src={company.companylogo}
                        alt={company.companyname}
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <button className="shkoMajtas" onClick={scrollLeft}>
              &lt; {/* Left arrow */}
            </button>
          </div>
        </section>
      </div>
      {/* Product List */}
      <div className="epharm-product-grid-container">
        <div className="epharm-product-list">
          {filteredProducts.map((product) => (
            <div className="epharm-product" key={product.id}>
              <img
                src={product.image_url}
                alt="Product"
                className="epharm-product-image"
              />
              <div className="epharm-product-details">
                <h2 className="epharm-product-title">{product.name}</h2>
                <p className="epharm-product-price">${product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="epharm-add-to-cart-button"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-number ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Epharm;
