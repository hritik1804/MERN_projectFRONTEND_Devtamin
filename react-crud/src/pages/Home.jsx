import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import { Link } from "react-router-dom";
// import { VITE_BACKEND_URL } from "../App";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:3000/api/product`);
            console.log(response.data); // Debugging: check the data structure

            // Ensure that the response is an array
            if (Array.isArray(response.data)) {
                setProducts(response.data);  // Set the products data
            } else {
                console.error("Expected an array but got something else:", response.data);
                setProducts([]);  // If it's not an array, clear the products
            }

            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div>
            <div className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
                <Link to="/create">
                    Create a Product
                </Link>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                {isLoading ? (
                    "Loading"
                ) : (
                    <>
                        {products.length > 0 ? (
                            <>
                                {products.map((product, index) => {
                                    return (
                                        <Product key={index} product={product} getProducts={getProducts} />
                                    );
                                })}
                            </>
                        ) : (
                            <p>No products available</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default HomePage;
