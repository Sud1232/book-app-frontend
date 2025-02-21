// 

import React, { useState, useEffect } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import axios from 'axios';

const SingleBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        console.log(response.data)
        setBook(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchBookData();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading book info</div>;

  return (
    <div className="max-w-lg shadow-md p-5">
      <h1 className="text-2xl font-bold mb-6">{book.title}</h1>

      <div>
        <div>
          <img
            src={`${getImgUrl(book.coverImage)}`}
            alt={book.title}
            className="mb-8"
          />
        </div>

        <div className='mb-5'>
          {/* <p className="text-gray-700 mb-2"><strong>Author:</strong> {book.author || 'admin'}</p> */}
          <p className="text-gray-700 mb-4">
            <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mb-4 capitalize">
            <strong>Category:</strong> {book?.category}
          </p>
          <p className="text-gray-700"><strong>Description:</strong> {book.description}</p>
        </div>

        <button onClick={() => handleAddToCart(book)} className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
          <FiShoppingCart />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default SingleBook;
