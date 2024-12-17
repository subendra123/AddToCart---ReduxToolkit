import { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { NavLink } from "react-router-dom";
import { addToCart } from "../store/cartSlice";
import toast from "react-hot-toast";

const Product = () => {
  const [post, setPost] = useState([]);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const fetchPost = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    // console.log(response.data);
    setPost(response.data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <div className="mt-4 grid grid-cols-4 gap-4">
        {post.map((item, index) => {
          const { id, title, image, price, description, category } = item;
          return (
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img class="p-8 rounded-t-lg" src={image} alt="product image" />
              <h1 className="pl-3">{title}</h1>
              <p className="pl-3"> ${price}</p>

              <button
                className="border ml-5 mt-5 p-3 my-2 bg-blue-500 text-white"
                onClick={() => dispatch(addToCart(item))}
              >
                Add to card
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Product;
