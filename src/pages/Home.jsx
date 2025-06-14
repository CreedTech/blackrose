// // import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { assets } from '../assets/images/assets';
// import { useGallery } from '../hooks/useGallery';
// import { useProducts } from '../hooks/useProducts';
// import { useContext } from 'react';
// import { ShopContext } from '../context/ShopContext';

// const Home = () => {
//   const { useCategories, useImages,useBlogs } = useGallery();
//   const { data: categories } = useCategories();
//   const { data: blogs } = useBlogs();
//   const { data: images } = useImages();
//   const { useLists } = useProducts();
//   const { data: products } = useLists();
//   const { addToCart } = useContext(ShopContext);

//   return (
//     <div>
//       <section className="container">
//         <section className="blackrose-section-slider md:mt-10 mt-0 pb-0">
//           <div className="relative h-[600px] w-full ">
//             {/* Background Image */}
//             <div className="absolute inset-0">
//               <img
//                 src={assets.bg_img}
//                 alt="Photographer capturing city"
//                 className="w-full h-full object-cover"
//               />
//               {/* Dark overlay */}
//               <div className="absolute inset-0 bg-black/40"></div>
//             </div>

//             {/* Content */}
//             <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
//               {/* Main Heading */}
//               <h1 className="text-2xl md:text-4xl font-bold text-center max-w-2xl mb-8 font-inter">
//                 Capture Beauty, Explore Stories, and Shop the Extraordinary
//               </h1>

//               {/* Scroll Down Button */}
//               <Link to="/photography">
//                 <button className="animate-bounce p-2 rounded-full border-2 border-white/50 hover:border-white transition-colors">
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 14l-7 7m0 0l-7-7m7 7V3"
//                     />
//                   </svg>
//                 </button>
//               </Link>

//               {/* Welcome Box */}
//               <div className="absolute bottom-0 right-0 bg-black/80 p-6 max-w-md">
//                 <h2 className="text-sm font-semibold mb-2">
//                   WELCOME TO BLACK ROSE
//                 </h2>
//                 <p className="text-lg">
//                   Immerse yourself in breathtaking visuals, curated blogs, and a
//                   premium shopping experience - all in one place.
//                 </p>
//                 <a
//                   href="/lifestyle"
//                   className="inline-flex items-center mt-4 text-sm hover:underline"
//                 >
//                   Explore
//                   <svg
//                     className="w-4 h-4 ml-2"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17 8l4 4m0 0l-4 4m4-4H3"
//                     />
//                   </svg>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </section>
//       </section>

//       <section className="projects pt-130 mb-30">
//         <div className="container">
//           <div className="row">
//             <div
//               className="section-head col-md-12 text-start animate-box"
//               data-animate-effect="fadeInUp"
//             >
//               <h4>Discover the Best of The Black Rose</h4>
//             </div>

//             {categories?.map((category) => (
//               <div
//                 key={category._id}
//                 className="col-md-4 animate-box"
//                 data-animate-effect="fadeInUp"
//               >
//                 <div className="item">
//                   <div className="position-re o-hidden aspect-square">
//                     <img
//                       src={category.image}
//                       alt={category.title}
//                       className="w-full h-full object-cover "
//                     />
//                   </div>
//                   <div className="con">
//                     <p className="text-lg">{category.title}</p>
//                     <p>{category.description}</p>
//                     <a href={category.link}>
//                       <i className="fa fa-long-arrow-right"></i>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       {/* Gallery */}
//       <div className="blackrose-section">
//         <div className="container">
//           <div className="row mb-4">
//             <div
//               className="section-head text-start col-md-12 animate-box"
//               data-animate-effect="fadeInUp"
//             >
//               <h4>Spotlight on photography</h4>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {images?.images.map((image) => (
//                 <Link
//                   to={`/photography/${image._id}`}
//                   key={image._id}
//                   className={`relative mb-4 cursor-pointer overflow-hidden group aspect-square`}
//                 >
//                   <img
//                     src={image.watermarkedUrl}
//                     alt={image.title}
//                     className="w-full h-full object-cover  transition-transform duration-300 group-hover:scale-105 aspect-square"
//                     loading="lazy"
//                   />

//                   {/* Hover Overlay */}
//                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <div className="absolute bottom-4 left-4 right-4 text-white">
//                       <h3 className="text-lg font-semibold">{image.title}</h3>
//                       {image.photographer && (
//                         <p className="text-sm opacity-75">
//                           {image.photographer.name}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//           <div className="">
//             {/* Featured Products Section */}
//             <section className="max-w-7xl mx-auto px-4 py-10 relative">
//               <div className="flex justify-between items-center mb-8">
//                 <h2 className="text-2xl font-bold">Shop Featured Products</h2>
//                 <a
//                   href="/shop"
//                   className="flex items-center hover:underline relative"
//                 >
//                   Shop All Products
//                   <span className="ml-2">+</span>
//                 </a>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {products?.products?.slice(0, 4).map((product) => (
//                   <div
//                     key={product._id}
//                     className=" py-4 rounded cursor-pointer relative"
//                   >
//                     <Link
//                       to={`/shop/${product._id}`}
//                       className="w-full mx-auto"
//                     >
//                       <div className="relative w-full h-64 mb-4">
//                         <img
//                           src={product?.images[0]}
//                           alt={product.title}
//                           className="w-full h-full object-cover mb-4 "
//                         />
//                       </div>
//                     </Link>
//                     <div className="flex justify-between items-center mb-2">
//                       <h3>{product.title}</h3>
//                       <span>₦{product.price.toFixed(2)}</span>
//                     </div>
//                     <div className="flex items-center mb-4">
//                       <div className="flex">
//                         {[1, 2, 3, 4, 5].map((star) => {
//                           const full = star <= Math.floor(product.rating);
//                           const half = !full && star - product.rating < 1;

//                           return (
//                             <svg
//                               key={star}
//                               className={`w-4 h-4 ${
//                                 full
//                                   ? 'text-yellow-400'
//                                   : half
//                                   ? 'text-yellow-300'
//                                   : 'text-gray-400'
//                               }`}
//                               fill="currentColor"
//                               viewBox="0 0 20 20"
//                             >
//                               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                             </svg>
//                           );
//                         })}
//                       </div>

//                       <span className="ml-2 text-sm">
//                         ({product.reviews.length})
//                       </span>
//                     </div>
//                     <button
//                       onClick={() => addToCart(product._id, 1)}
//                       className="w-1/2 bg-white text-black py-2 hover:bg-gray-200 transition-colors"
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Trending Stories Section */}
//             <section className="max-w-7xl mx-auto px-4 py-12 relative">
//               <div className="flex justify-between items-center mb-8">
//                 <h2 className="text-2xl font-bold">
//                   Trending Stories in Lifestyle
//                 </h2>
//                 <a href="/blogs" className="flex items-center hover:underline">
//                   Read More Blogs
//                   <span className="ml-2">+</span>
//                 </a>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {blogs?.data?.posts?.map((post) => (
//                   <Link to={`/lifestyle/${post.slug}`} key={post.id}>
//                     <div className="group cursor-pointer">
//                       <img
//                         src={post.featuredImage}
//                         alt={post.title}
//                         className="w-full h-64 object-cover mb-4"
//                       />
//                       <h3 className="text-xl font-bold mb-2 group-hover:underline">
//                         {post.title}
//                       </h3>
//                     {/* <p className="text-gray-400">{post.content}</p> */}
//                   </div>
//                   </Link>
//                 ))}
//               </div>
//             </section>

//           </div>
//         </div>
//       </div>
//       {/* </div> */}
//     </div>
//   );
// };

// export default Home;

import { Link } from 'react-router-dom';
import { assets } from '../assets/images/assets';
import { useGallery } from '../hooks/useGallery';
import { useProducts } from '../hooks/useProducts';
import { useContext, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const Home = () => {
  const { useCategories, useImages, useBlogs } = useGallery();
  const { data: categories } = useCategories();
  const { data: blogs } = useBlogs();
  const { data: images } = useImages();
  const { useLists } = useProducts();
  const { data: products } = useLists();
  const { addToCart } = useContext(ShopContext);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div>
      <section className="container">
        <section
          ref={heroRef}
          className="blackrose-section-slider mt-10 pb-0 !rounded-md"
        >
          <div className="relative h-[600px] w-full overflow-hidden  !rounded-md">
            {/* Background Image with Parallax */}
            <motion.div
              className="absolute inset-0 !rounded-md"
              style={{ y, scale }}
            >
              <img
                src={assets.bg_img}
                alt="Photographer capturing city"
                className="w-full h-full object-cover !rounded-md"
              />
              {/* Dark overlay */}
              <motion.div
                className="absolute inset-0 bg-black/40 !rounded-md"
                style={{ opacity }}
              />
            </motion.div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-light px-4 !rounded-md">
              {/* Main Heading */}
              <motion.h1
                className="text-2xl md:text-4xl font-bold text-center max-w-2xl mb-8 font-inter"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-light"
                >
                  Capture Beauty, Explore Stories, and Shop the Extraordinary
                </motion.span>
              </motion.h1>

              {/* Scroll Down Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 1.2,
                  type: 'spring',
                  stiffness: 200,
                }}
              >
                <Link to="/photography">
                  <motion.button
                    className="animate-bounce p-2 rounded-full border-2 border-white/50 hover:border-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </motion.button>
                </Link>
              </motion.div>

              {/* Welcome Box */}
              {/* <motion.div
                className="absolute bottom-0 right-0 bg-light/10 p-6 max-w-md"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.8,
                  ease: 'easeOut',
                }}
                whileHover={{ x: -10 }}
              >
                <motion.h2
                  className="text-sm font-semibold mb-2 text-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  WELCOME TO BLACK ROSE
                </motion.h2>
                <motion.p
                  className="text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  Immerse yourself in breathtaking visuals, curated blogs, and a
                  premium shopping experience - all in one place.
                </motion.p>
                <motion.a
                  href="/lifestyle"
                  className="inline-flex items-center mt-4 text-sm hover:underline"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                >
                  Explore
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.a>
              </motion.div> */}
              <motion.div
                className="absolute bottom-0 right-0 md:p-6  p-4 md:m-6 m-4 max-w-md"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.8,
                  ease: 'easeOut',
                }}
                whileHover={{ x: -10 }}
              >
                {/* Glass effect with subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/10 to-transparent backdrop-blur-sm rounded-2xl" />
                <div className="absolute inset-0 rounded-2xl shadow-2xl" />

                <div className="relative">
                  <motion.div
                    className="w-16 h-0.5 bg-white/60 mb-4"
                    initial={{ width: 0 }}
                    animate={{ width: 64 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                  />

                  <motion.h2
                    className="text-sm font-bold mb-2 text-white/70 uppercase "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    WELCOME TO BLACK ROSE
                  </motion.h2>

                  <motion.p
                    className="text-lg text-white font-light leading-relaxed mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                  >
                    Immerse yourself in breathtaking visuals, curated blogs, and
                    a premium shopping experience - all in one place.
                  </motion.p>

                  <motion.a
                    href="/lifestyle"
                    className="inline-flex items-center text-white/90 hover:text-white text-sm font-medium group"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    <span className="border-b border-white/40 group-hover:border-white pb-1 transition-colors">
                      Explore
                    </span>
                    <svg
                      className="w-4 h-4 ml-3 transform transition-all group-hover:translate-x-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </section>

      {/* Categories Section */}
      <section className="projects pt-130 mb-30">
        <div className="container">
          <motion.div
            className="row"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="section-head col-md-12 text-start animate-box font-medium text-darker"
              variants={fadeInUp}
            >
              <h4>Discover the Best of The Black Rose</h4>
            </motion.div>

            {categories?.map((category, index) => (
              <motion.div
                key={category._id}
                className="col-md-4 animate-box"
                variants={itemVariants}
                custom={index}
              >
                <motion.div
                  className="item"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="position-relative overflow-hidden aspect-square rounded-md border border-gray-300 shadow"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                    />
                  </motion.div>
                  <motion.div
                    className="con"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-lg">{category.title}</p>
                    <p>{category.description}</p>
                    <motion.a
                      href={category.link}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <i className="fa fa-long-arrow-right"></i>
                    </motion.a>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <div className="blackrose-section">
        <div className="container">
          <motion.div
            className="row mb-4"
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.div
              className="section-head md:text-start text-center col-md-12 animate-box font-medium"
              variants={fadeInUp}
            >
              <h4>Spotlight on photography</h4>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={containerVariants}
            >
              {images?.images.map((image, index) => (
                <motion.div
                  key={image._id}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ y: -8 }}
                >
                  <Link
                    to={`/photography/${image._id}`}
                    className={`relative mb-4 cursor-pointer overflow-hidden group aspect-square block`}
                  >
                    <motion.img
                      src={image.watermarkedUrl}
                      alt={image.title}
                      className="w-full h-full object-cover aspect-square rounded-md"
                      loading="lazy"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/50"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute bottom-4 left-4 right-4 text-white"
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <h3 className="text-lg font-semibold">{image.title}</h3>
                        {image.photographer && (
                          <p className="text-sm opacity-75">
                            {image.photographer.name}
                          </p>
                        )}
                      </motion.div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <div className="blackrose-section">
            {/* Featured Products Section */}
            <motion.section
              className="max-w-7xl mx-auto px-4 py-10 relative"
              initial="hidden"
              animate="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              <motion.div
                className="flex justify-between md:items-center flex-col md:flex-row"
                variants={fadeInUp}
              >
                <motion.div
                  className="section-head text-start  animate-box font-medium"
                  variants={fadeInUp}
                >
                  <h4> Shop Featured Products</h4>
                </motion.div>

                <motion.a
                  href="/shop"
                  className="flex items-center hover:underline relative text-darker font-medium"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  View All
                  <motion.span
                    className="ml-2"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    +
                  </motion.span>
                </motion.a>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={containerVariants}
              >
                {products?.products?.slice(0, 4).map((product, index) => (
                  <motion.div
                    key={product._id}
                    className="py-4 rounded cursor-pointer relative"
                    variants={scaleIn}
                    custom={index}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={`/shop/${product._id}`}
                      className="w-full mx-auto"
                    >
                      <motion.div
                        className="relative w-full h-64 mb-4 overflow-hidden rounded-md"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.img
                          src={product?.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover aspect-square rounded-md"
                          initial={{ scale: 1.2 }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                      </motion.div>
                    </Link>
                    <motion.div
                      className="flex justify-between items-center mb-2 text-lg text-darker font-medium"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <h3>{product.title}</h3>
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{
                          delay: 0.3,
                          type: 'spring',
                          stiffness: 200,
                        }}
                        viewport={{ once: true }}
                      >
                        ₦{product.price.toFixed(2)}
                      </motion.span>
                    </motion.div>
                    <motion.div
                      className="flex items-center mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const full = star <= Math.floor(product.rating);
                          const half = !full && star - product.rating < 1;

                          return (
                            <motion.svg
                              key={star}
                              className={`w-4 h-4 ${
                                full
                                  ? 'text-yellow-400'
                                  : half
                                  ? 'text-yellow-300'
                                  : 'text-gray'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              initial={{ scale: 0, rotate: -180 }}
                              whileInView={{ scale: 1, rotate: 0 }}
                              transition={{
                                delay: 0.1 * star,
                                type: 'spring',
                                stiffness: 200,
                              }}
                              viewport={{ once: true }}
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </motion.svg>
                          );
                        })}
                      </div>

                      <span className="ml-2 text-sm text-darker font-medium">
                        ({product.reviews.length})
                      </span>
                    </motion.div>
                    <motion.button
                      onClick={() => addToCart(product._id, 1)}
                      className="w-1/2 bg-black text-white py-2 hover:bg-secondary transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      Add to Cart
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* Trending Stories Section */}
            <motion.section
              className="max-w-7xl mx-auto px-4 py-12 relative"
              initial="hidden"
              animate="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              <motion.div
                className="flex justify-between md:items-center flex-col md:flex-row"
                variants={fadeInUp}
              >
                <motion.div
                  className="section-head md:text-start text-center  animate-box font-medium"
                  variants={fadeInUp}
                >
                  <h4> Trending Stories in Lifestyle</h4>
                </motion.div>

                <motion.a
                  href="/lifestyle"
                  className="flex items-center hover:underline relative text-darker font-medium"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Read More Blogs
                  <motion.span
                    className="ml-2"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    +
                  </motion.span>
                </motion.a>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 md:mt-0"
                variants={containerVariants}
              >
                {blogs?.data?.posts?.map((post, index) => (
                  <motion.div
                    key={post.id}
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link to={`/lifestyle/${post.slug}`}>
                      <motion.div
                        className="group cursor-pointer"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="overflow-hidden mb-4 rounded-md"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-64 object-cover"
                            initial={{ scale: 1.2 }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          />
                        </motion.div>
                        <motion.h3
                          className="text-xl font-bold mb-2 group-hover:underline"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          viewport={{ once: true }}
                        >
                          {post.title}
                        </motion.h3>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
