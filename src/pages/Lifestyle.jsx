
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';

const LifeStyle = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category') || '';
  const tagParam = queryParams.get('tag') || '';
  const searchParam = queryParams.get('search') || '';

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const paginationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.3,
      },
    },
  };

  const filterVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        delay: 0.1,
      },
    },
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          page: currentPage,
          limit: 9,
          ...(categoryParam && { category: categoryParam }),
          ...(tagParam && { tag: tagParam }),
          ...(searchParam && { search: searchParam }),
        });

        const [postsRes, categoriesRes] = await Promise.all([
          api.get(`/blog/posts?${params}`),
          api.get('/blog/categories'),
        ]);

        setPosts(postsRes.data.data.posts);
        setTotalPages(postsRes.data.totalPages);
        setCategories(categoriesRes.data.data.categories);
      } catch (err) {
        setError('Failed to load blog posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, categoryParam, tagParam, searchParam]);

  const handleCategoryFilter = (category) => {
    queryParams.set('category', category);
    queryParams.delete('page');
    setCurrentPage(1);
    navigate(`/lifestyle?${queryParams.toString()}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <motion.div
        className="flex justify-center items-center h-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="text-center py-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className="text-red-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {error}
        </motion.p>
        <motion.button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-light text-primary rounded"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.section
      className=" py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          className="flex flex-col items-start justify-between mb-8 md:flex-row md:items-center"
          variants={headerVariants}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.h1
              className="text-3xl font-bold text-primary mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Lifestyle Blog
            </motion.h1>
            <motion.p
              className="text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Explore curated stories, tips, and trends to enrich your everyday
              life.
            </motion.p>
          </motion.div>

          {/* Filter Section */}
          <motion.div
            className="flex flex-wrap items-center gap-2 mt-4 md:mt-0"
            variants={filterVariants}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <motion.select
                className="appearance-none bg-transparent border border-gray-700 text-primary px-4 py-2 pr-8 rounded focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"
                value={categoryParam}
                onChange={(e) => handleCategoryFilter(e.target.value)}
                whileFocus={{ borderColor: '#your-primary-color' }}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </motion.select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {posts.length === 0 ? (
            <motion.div
              className="text-center py-16"
              key="no-posts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="text-primary text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                No blog posts found.
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="posts-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Posts Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {posts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    variants={cardVariants}
                    custom={index}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.3 },
                    }}
                    layout
                  >
                    <Link
                      to={`/lifestyle/${post.slug}`}
                      className="group block overflow-hidden rounded-lg"
                    >
                      <motion.div
                        className="relative aspect-[4/3] overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                      >
                        <motion.img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.6 }}
                          whileHover={{ scale: 1.05 }}
                        />
                        <motion.div
                          className="absolute top-4 left-4"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <motion.span
                            className="px-3 py-1 bg-light text-primary text-xs font-semibold rounded-full"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {post.category}
                          </motion.span>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        className="p-5 bg-gray-900"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.h2
                          className="text-xl font-semibold text-white mb-2  transition-colors duration-300"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {post.title}
                        </motion.h2>

                        <motion.div
                          className="text-gray-200 text-sm mb-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {new Date(
                            post.publishedAt || post.createdAt
                          ).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </motion.div>

                        {post.tags && post.tags.length > 0 && (
                          <motion.div
                            className="flex flex-wrap gap-2 mt-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            {post.tags.slice(0, 3).map((tag, tagIndex) => (
                              <motion.span
                                key={tagIndex}
                                className="text-xs px-2 py-1 bg-gray-700 text-gray-200 rounded"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + tagIndex * 0.1 }}
                                whileHover={{
                                  scale: 1.1,
                                  backgroundColor: '#374151',
                                }}
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </motion.div>
                        )}
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages == 1 && (
                <>
                  <motion.div
                    className="row"
                    variants={paginationVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div
                      className="col-md-12 mt-40 mb-60 text-center animate-box"
                      data-animate-effect="fadeInUp"
                    >
                      <ul className="blackrose-pagination-wrap align-center relative">
                        <motion.li
                          whileHover={{ scale: currentPage !== 1 ? 1.05 : 1 }}
                          whileTap={{ scale: currentPage !== 1 ? 0.95 : 1 }}
                        >
                          <a
                            className="cursor-pointer text-gray-700 hover:text-gray-900"
                            onClick={() =>
                              handlePageChange(Math.max(1, currentPage - 1))
                            }
                            disabled={currentPage === 1}
                          >
                            <i className="fa fa-angle-left"></i>
                          </a>
                        </motion.li>
                        {[...Array(totalPages)].map((_, i) => {
                          if (
                            i + 1 === currentPage ||
                            i + 1 === 1 ||
                            i + 1 === totalPages ||
                            i + 1 === currentPage - 1 ||
                            i + 1 === currentPage + 1
                          ) {
                            return (
                              <motion.li
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`p-0.5  transition-all rounded-full duration-300 ${
                                  currentPage === i + 1
                                    ? 'bg-primary text-white'
                                    : 'border border-gray-700 text-white hover:bg-gray-800 hover:text-dark'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                              >
                                <span className="inline-block w-10 h-10 leading-10 text-center text-[#999] font-light border border-[#222] rounded-full hover:bg-light">
                                  <span className=" font-thin hover:text-dark ">
                                    {i + 1}
                                  </span>
                                </span>
                              </motion.li>
                            );
                          }

                          // Show ellipsis
                          if (
                            (i + 1 === currentPage - 2 && currentPage > 3) ||
                            (i + 1 === currentPage + 2 &&
                              currentPage < totalPages - 2)
                          ) {
                            return (
                              <motion.span
                                key={i}
                                className="text-gray-700"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                              >
                                ...
                              </motion.span>
                            );
                          }

                          return null;
                        })}

                        <motion.li
                          whileHover={{
                            scale: currentPage !== totalPages ? 1.05 : 1,
                          }}
                          whileTap={{
                            scale: currentPage !== totalPages ? 0.95 : 1,
                          }}
                        >
                          <a
                            className="cursor-pointer text-gray-700 hover:text-gray-900"
                            onClick={() =>
                              handlePageChange(
                                Math.min(totalPages, currentPage + 1)
                              )
                            }
                            disabled={currentPage === totalPages}
                          >
                            <i className="fa fa-angle-right"></i>
                          </a>
                        </motion.li>
                      </ul>
                    </div>
                  </motion.div>
                
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default LifeStyle;
