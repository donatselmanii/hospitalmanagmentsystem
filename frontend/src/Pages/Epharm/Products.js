import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";
import "../../css/Epharm/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productCategories, setProductCategories] = useState([]);
  const [companyCategories, setCompanyCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompanyCategory, setSelectedCompanyCategory] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentFilter, setCurrentFilter] = useState("");
  const productsPerPage = 12;
  

  const CART_STORAGE_KEY = process.env.REACT_APP_CART_STORAGE_KEY;


// Define the addToCart function
const addToCart = (product) => {
  // Check if the product is already in the cart
  const existingProduct = cart.find((item) => item.id === product.id);

  if (!existingProduct) {
    // Product doesn't exist in the cart, add it with a minimum quantity of 1
    const newProduct = { ...product, quantity: 1 };
    const updatedCart = [...cart, newProduct];
    
    // Update the cart state
    setCart(updatedCart);
    
    // Update local storage
    localStorage.setItem(CART_STORAGE_KEY , JSON.stringify(updatedCart));
  }
};

// Initialize the cart from local storage
useEffect(() => {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);
  if (storedCart) {
    setCart(JSON.parse(storedCart));
  }
}, []);


 

  useEffect(() => {
    getProducts();
  }, [currentPage]);

  const getProducts = async () => {
    const response = await axios.get(
      `http://localhost:8081/epharm/?page=${currentPage}&perPage=${productsPerPage}`
    );
    setProducts(response.data);
  };

  const totalPagess = Math.ceil((products.length || 1) / productsPerPage);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Define filteredProducts here based on the current page and products per page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const filteredProducts = products.slice(startIndex, endIndex) || [];

  

  useEffect(() => {
    

    async function fetchProductCategories() {
      try {
        const response = await axios.get("http://localhost:8081/productcategory");
        setProductCategories(response.data);
      } catch (error) {
        console.error("Error fetching product categories:", error);
      }
    }

    async function fetchCompanyCategories() {
      try {
        const response = await axios.get("http://localhost:8081/company");
        setCompanyCategories(response.data);
      } catch (error) {
        console.error("Error fetching company categories:", error);
      }
    }


    fetchProductCategories();
    fetchCompanyCategories();
  }, []);

  // ...

 

  const getProductsByCategory = async (categoryName, page = currentPage) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/epharm/category/${categoryName}?page=${page}&perPage=${productsPerPage}&searchQuery=${currentFilter}`
      );
      // Handle the response as needed
      return response.data;
    } catch (error) {
      console.error("Error fetching products by category:", error);
      return [];
    }
  };
  
  const searchProducts = async (searchQuery, page = currentPage) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/epharm/searchProducts?searchQuery=${searchQuery}&page=${page}&perPage=${productsPerPage}&selectedCategory=${currentFilter}`
      );
      if (response && response.data && Array.isArray(response.data)) {
        return response.data; 
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };
  
  const getProductsByCompanyCategory = async (companyCategoryName, page = currentPage) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/epharm/company-category/${companyCategoryName}?page=${page}&perPage=${productsPerPage}`
      );
      // Handle the response as needed
      return response.data;
    } catch (error) {
      console.error("Error fetching products by company category:", error);
      return [];
    }
  };
  
  
  


  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
    setSelectedCategory("");
    setSelectedCompanyCategory("");
  };


  const handleSearchButtonClick = async () => {
    try {
      const searchResults = await searchProducts(searchQuery);
      if (Array.isArray(searchResults)) {
        setProducts(searchResults);
        const newTotalPages = Math.ceil(searchResults.length / productsPerPage);
        setTotalPages(newTotalPages);
        setCurrentPage(1);
        setCurrentFilter(searchQuery); // Update the current filter
      } else {
        setProducts([]);
        setTotalPages(1);
      }
    } catch (error) {
      setProducts([]);
      setTotalPages(1);
    }
  };
  
  const handleCategorySelect = async (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    setSelectedCompanyCategory("");
    setSearchQuery("");
    setCurrentFilter(selectedCategory); // Update the current filter
    const categoryResults = await getProductsByCategory(selectedCategory);
    setProducts(categoryResults);
    // You can also update the total pages and other state as needed
  };
  
  const handleCompanyCategoryChange = async (event) => {
    setSelectedCompanyCategory(event.target.value);
    setSelectedCategory("");
    setSearchQuery("");
    const companyCategoryResults = await getProductsByCompanyCategory(event.target.value);
    setProducts(companyCategoryResults);
    // You can also update the total pages and other state as needed
  };
  

  // Check if products array is empty
  if (products.length === 0) {
    return <div>No products available.</div>;
  }

 
  
  return (
    <div className="products-container">
      <div className="epharm-navbar">
        <div className="epharm-logo">HeisenBerg</div>
        <ul className="epharm-navbar-list">
          <li className="epharm-navbar-item">
            <Link to="/E-Pharmacy" className="epharm-navbar-link">
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
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Products"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button className="search-button" onClick={handleSearchButtonClick}>
          Search
        </button>
        <select
          className="category-select"
          value={selectedCategory}
          onChange={handleCategorySelect}
        >
          <option value="">Product Category</option>
          {productCategories.map((category) => (
            <option key={category.id} value={category.productname}>
              {category.productname}
            </option>
          ))}
        </select>
        <select
          className="category-select"
          value={selectedCompanyCategory}
          onChange={handleCompanyCategoryChange}
        >
          <option value="">Company Category</option>
          {companyCategories.map((category) => (
            <option key={category.id} value={category.companyname}>
              {category.companyname}
            </option>
          ))}
        </select>
      </div>

      <div className="products-grid-container">
  {filteredProducts.length === 0 ? (
    <div className="no-products-message">No products found.</div>
  ) : (
    <div className="products-list">
      {filteredProducts.map((product) => (
  <React.Fragment key={product.id}>
    <Link to={`/Product/${product.id}`}>
      <div className="product">
        <img
          src={product.image_url}
          alt="Product"
          className="product-image"
        />
        <div className="product-details">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-price">${product.price}</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="add-to-cart-button"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  </React.Fragment>
))}

    </div>
  )}
</div>


      <div className="pagination">
        {Array.from({ length: totalPagess }, (_, index) => (
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

export default Products;
