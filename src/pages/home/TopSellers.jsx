// import React, { useEffect, useState } from 'react'
// import BookCard from '../books/BookCard'

// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// import { Navigation, Pagination } from 'swiper/modules';
// import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

// const categories = ["Choose a genre", "romance", "horror", "magic", "self-help", "finance", "learning", "fiction", "sci-fi"]

// const TopSellers = () => {



//   const [selectedCategory, setSelectedCategory] = useState("Choose a genre")

//   const { data: books = [] } = useFetchAllBooksQuery();

//   const filteredBooks = selectedCategory === "Choose a genre" ? books : books.filter(book => book.category == selectedCategory.toLowerCase())

//   return (
//     <div className='py-10'>
//       <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
//       {/* category filtering */}
//       <div className='mb-8 flex items-center'>
//         <select onChange={(e) => setSelectedCategory(e.target.value)} name="category" id="category" className='border bg-[#EAEAEA] border-red-300 rounded-md px-4 py-2 focus:outline-none'>
//           {
//             categories.map((category, index) => (
//               <option key={index} value={category}>{category}</option>
//             ))
//           }
//         </select>
//       </div>

//       <Swiper
//         slidesPerView={1}
//         spaceBetween={30}
//         navigation={true}

//         breakpoints={{
//           640: {
//             slidesPerView: 1,
//             spaceBetween: 20,
//           },
//           768: {
//             slidesPerView: 2,
//             spaceBetween: 40,
//           },
//           1024: {
//             slidesPerView: 2,
//             spaceBetween: 50,
//           },
//           1180: {
//             slidesPerView: 3,
//             spaceBetween: 50,
//           }
//         }}
//         modules={[Navigation]}
//         className="mySwiper"
//       >

//         {
//           filteredBooks.length > 0 && filteredBooks.map((book, index) => (
//             <SwiperSlide key={index}>
//               <BookCard key={index} book={book} />
//             </SwiperSlide>

//           ))
//         }


//       </Swiper>




//     </div>
//   )
// }

// export default TopSellers


import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BookCard from '../books/BookCard'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';

const categories = ["Choose a genre", "romance", "horror", "magic", "self-help", "finance", "learning", "fiction", "sci-fi"];

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching books data with Axios
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books/'); // Replace with your actual API endpoint
        setBooks(response.data);
      } catch (err) {
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); // Empty dependency array to run once on mount

  const filteredBooks = selectedCategory === "Choose a genre" ? books : books.filter(book => book.category === selectedCategory.toLowerCase());

  return (
    <div className='py-10'>
      <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>

      {/* Category Filtering */}
      <div className='mb-8 flex items-center'>
        <select onChange={(e) => setSelectedCategory(e.target.value)} name="category" id="category" className='border bg-[#EAEAEA] border-red-300 rounded-md px-4 py-2 focus:outline-none'>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Display loading, error, or the books */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1180: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {filteredBooks.length > 0 && filteredBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default TopSellers;
