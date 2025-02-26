// import React, { useEffect, useState } from 'react'
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // import required modules
// import { Pagination, Navigation } from 'swiper/modules';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import BookCard from '../books/BookCard';
// import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';


// const Recommened = () => {

//   const { data: books = [] } = useFetchAllBooksQuery();
//   console.log(books)
//   return (
//     <div className='py-16'>
//       <h2 className='text-3xl font-semibold mb-6'>Recommended for you </h2>

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
//         modules={[Pagination, Navigation]}
//         className="mySwiper"
//       >

//         {
//           books.length > 0 && books.slice(8, 18).map((book, index) => (
//             <SwiperSlide key={index}>
//               <BookCard book={book} />
//             </SwiperSlide>
//           ))
//         }



//       </Swiper>
//     </div>
//   )
// }

// export default Recommened


import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BookCard from '../books/BookCard';
import axios from 'axios'; // Import Axios

const Recommened = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching books data using Axios
  useEffect(() => {
    axios.get('http://localhost:5000/api/books/') // Replace with your API endpoint
      .then(response => {
        setBooks(response.data); // Assuming response.data contains the array of books
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error if it occurs
  }

  return (
    <div className='py-16'>
      <h2 className='text-3xl font-semibold mb-6'>Recommended for you</h2>

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
          }
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {books.length > 0 && books.slice(8, 18).map((book, index) => (
          <SwiperSlide key={index}>
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Recommened;
