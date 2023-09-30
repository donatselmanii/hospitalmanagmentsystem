import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import classes from "../../css/Epharm/Product.module.css";
import { FaShoppingCart } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";


const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [mostSoldProducts, setMostSoldProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const CART_STORAGE_KEY = process.env.REACT_APP_CART_STORAGE_KEY;

    const addToCart = (productToAdd) => {
        const existingProduct = cart.find((item) => item.id === productToAdd.id);

        const newProduct = { ...productToAdd, quantity: 1 };
        const updatedCart = [...cart, newProduct];

        setCart(updatedCart);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    };

    const increaseQuantity = (productToUpdate) => {
        const updatedCart = cart.map((item) => {
            if (item.id === productToUpdate.id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });

        setCart(updatedCart);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    };

    const decreaseQuantity = (productToUpdate) => {
        const updatedCart = cart.map((item) => {
            if (item.id === productToUpdate.id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });

        setCart(updatedCart);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    };

    useEffect(() => {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/epharm/getbyid/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProductDetails();

        axios.get("http://localhost:8081/epharm/10MostSelled/")
            .then((response) => {
                setMostSoldProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching most sold products:", error);
            });
    }, [id]);

    const handleCheckout = (productToAdd) => {
        const newCart = [{ ...productToAdd, quantity: 1 }];

        setCart(newCart);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    };

    return (
        <>
            {product && (
                <div className={classes.product}>
                    <div className={classes.productContainer}>
                        <img src={product.image_url} alt={product.name} />
                    </div>
                    <div className={classes.productContainer}>
                        <h2>{product.name}</h2>
                        <p className={classes.company}>Company: {product.companyname}</p>
                        <p className={classes.category}>Category: {product.productcategory}</p>
                        <p>Price: ${product.price}</p>
                        <p>Description: {product.description}</p>
                        <div className={classes.buttonContainer}>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    addToCart(product);
                                }}
                                className={classes.addToCartButton}
                            >
                                <FaShoppingCart className={classes.cartIcon} />
                            </button>
                            <button className={classes.checkoutButton} onClick={() => handleCheckout(product)}>
                                <Link className={classes.LinkToAddToCart} to={'/AddToCart'}>
                                    Buy Now
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {mostSoldProducts.map((soldProduct) => (
                <div className={classes.mostSoldCard} key={soldProduct.id}>
                    <Link to={`/Product/${soldProduct.id}`}>
                        <img src={soldProduct.image_url} alt={soldProduct.name} />
                        <div className={classes.mostSoldInfo}>
                            <h4 className={classes.ProductName}>{soldProduct.name}</h4>
                            <p className={classes.productP}><b>Price: $</b>{soldProduct.price}</p>
                            <div className={classes.buttonContainer}>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addToCart(product);
                                    }}
                                    className={classes.addToCartButton}
                                >
                                    <FaShoppingCart className={classes.cartIcon} />
                                </button>
                                <button className={classes.checkoutButton} onClick={() => handleCheckout(soldProduct)}>
                                <Link className={classes.LinkToAddToCart} to={'/AddToCart'}>
                                    Buy Now
                                </Link>
                                </button>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}

        </>
    );
};

export default Product;
