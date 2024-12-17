import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decrementProduct,
  removeAllCart,
  removeProduct,
} from "../store/cartSlice";
import toast from "react-hot-toast";

const Carts = () => {
  const [post, setPost] = useState([]);

  const [totalprice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const dispatch = useDispatch();
  const fetchPost = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    // console.log(response.data);
    setPost(response.data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const { cart } = useSelector((state) => state.cart);

  const decremenItem = (e) => {
    dispatch(decrementProduct(e));
    toast.success("Product Increased");
  };

  const total = () => {
    let totalPriceofcart = 0;
    cart.map((curElem, ind) => {
      totalPriceofcart = curElem.price * curElem.quantity + totalPriceofcart;
    });
    setTotalPrice(totalPriceofcart);
  };

  useEffect(() => {
    total();
  }, [total]);

  const countQuantity = () => {
    let allQuantity = 0;
    cart.map((curElem, ind) => {
      allQuantity = curElem.quantity + allQuantity;
    });
    setTotalQuantity(allQuantity);
  };

  useEffect(() => {
    countQuantity();
  }, [countQuantity]);

  return (
    <>
      <h1>total Ites : {cart.length}</h1>

      <div class="font-sans">
        <div class="grid lg:grid-cols-3 gap-4 max-lg:max-w-3xl mx-auto">
          <div class="lg:col-span-2 bg-white divide-y divide-gray-300 px-4 overflow-y-auto h-[25rem]">
            {cart.map((item, index) => {
              const {
                id,
                title,
                image,
                price,
                description,
                category,
                quantity,
              } = item;
              return (
                <div class="grid md:grid-cols-4 items-center gap-4 py-4">
                  <div class="col-span-2 flex items-center gap-6">
                    <div class="w-28 h-28 shrink-0">
                      <img src={image} class="w-full h-full object-contain" />
                    </div>

                    <div>
                      <h3 class="text-base font-bold text-gray-800">{title}</h3>
                      <h6 class="text-sm text-gray-500 mt-1">
                        Color: <span class="ml-2 font-semibold">Black</span>
                      </h6>
                    </div>
                  </div>

                  <div class="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => decremenItem(item)}
                      class="flex items-center justify-center w-5 h-5 bg-blue-600 outline-none rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-2 fill-white"
                        viewBox="0 0 124 124"
                      >
                        <path
                          d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                    <span class="font-bold text-sm leading-[18px]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => dispatch(addToCart(item))}
                      class="flex items-center justify-center w-5 h-5 bg-blue-600 outline-none rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-2 fill-white"
                        viewBox="0 0 42 42"
                      >
                        <path
                          d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <div class="flex items-center">
                    <h4 class="text-base font-bold text-gray-800">
                      ${quantity * price}
                    </h4>

                    <button
                      className="bg-red-500 p-3 ml-5"
                      onClick={() => dispatch(removeProduct(item))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div class="bg-gradient-to-tl from-[#B0EBB4] via-[#BFF6C3] to-[#E0FBE2] p-6 lg:sticky top-0">
            <ul class="text-gray-800 divide-y divide-gray-300">
              <li class="flex flex-wrap gap-4 text-sm py-4 font-semibold">
                Total Quantity <span class="ml-auto">{totalQuantity}</span>
              </li>

              <li class="flex flex-wrap gap-4 text-sm pt-4 font-bold">
                Total Price <span class="ml-auto">$ {totalprice}</span>
              </li>
            </ul>

            <div class="mt-8">
              <h3 class="text-base font-bold text-gray-800">
                Apply promo code
              </h3>
              <div class="flex border border-blue-600 overflow-hidden max-w-md rounded-lg mt-4">
                <input
                  type="email"
                  placeholder="Promo code"
                  class="w-full outline-none bg-white text-gray-800 text-sm px-4 py-3 bg-white"
                />

                <button
                  type="button"
                  class="flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-6 py-3 font-semibold tracking-wide text-sm text-white outline-none"
                >
                  Apply
                </button>
              </div>
            </div>

            <button
              type="button"
              class="mt-8 max-w-md text-sm px-6 py-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold tracking-wide rounded-lg"
            >
              Pay Now
            </button>
          </div>
        </div>
        <div className=" w-[65%] ml-2 ">
          <button
            onClick={() => dispatch(removeAllCart())}
            className="p-4 bg-red-500 text-white font-bold w-full uppercase hover:bg-red-400"
          >
            Cleart Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Carts;
