// // import { useState } from 'react';
// import PropTypes from 'prop-types';

// // Lightbox Component
// const ImageLightbox = ({ image, onClose }) => {
//   return (
//     <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
//       {/* Close button */}
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
//       >
//         <svg
//           className="w-8 h-8"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M6 18L18 6M6 6l12 12"
//           />
//         </svg>
//       </button>

//       {/* Navigation buttons */}
//       <button
//         className="absolute left-4 text-white hover:text-gray-300 z-50"
//         onClick={image.onPrevious}
//       >
//         <svg
//           className="w-8 h-8"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M15 19l-7-7 7-7"
//           />
//         </svg>
//       </button>

//       <button
//         className="absolute right-4 text-white hover:text-gray-300 z-50"
//         onClick={image.onNext}
//       >
//         <svg
//           className="w-8 h-8"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9 5l7 7-7 7"
//           />
//         </svg>
//       </button>

//       {/* Main image */}
//       <div className="relative max-w-7xl mx-auto">
//         <img
//           src={image.url}
//           alt={image.title}
//           className="max-h-[90vh] object-contain"
//         />

//         {/* Image info */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/60 to-transparent">
//           <h2 className="text-xl font-bold">{image.title}</h2>
//           <p className="text-sm opacity-75">{image.description}</p>
//         </div>
//       </div>

//       {/* Thumbnails */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
//         <div className="flex gap-2 overflow-x-auto p-2">
//           {image.map((thumb, index) => (
//             <button
//               key={index}
//               onClick={() => image.onThumbClick(index)}
//               className={`w-16 h-16 flex-shrink-0 ${
//                 thumb.active ? 'ring-2 ring-white' : 'opacity-50'
//               }`}
//             >
//               <img
//                 src={thumb.url}
//                 alt=""
//                 className="w-full h-full object-cover"
//               />
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// ImageLightbox.propTypes = {
//   image: PropTypes.shape({
//     url: PropTypes.string.isRequired,
//     title: PropTypes.string,
//     description: PropTypes.string,
//     thumbnails: PropTypes.arrayOf(
//       PropTypes.shape({
//         url: PropTypes.string.isRequired,
//         active: PropTypes.bool,
//       })
//     ),
//     onPrevious: PropTypes.func.isRequired,
//     onNext: PropTypes.func.isRequired,
//     onThumbClick: PropTypes.func.isRequired,
//   }).isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default ImageLightbox;
