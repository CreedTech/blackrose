// import { Link } from 'react-router-dom';
// import { assets } from '../assets/images/assets';

// const Lifestyle = () => {
//   const blogPosts = [
//     {
//       id: 1,
//       image: assets.blogOne,
//       title: 'Wedding pellentesque moss',
//       category: 'Wedding',
//       date: 'Dec 28, 2025',
//       link: '',
//     },
//     {
//       id: 2,
//       image: assets.blogTwo,
//       title: 'Quisque tincidunt wedding',
//       category: 'Wedding',
//       date: 'Dec 26, 2025',
//       link: '',
//     },
//     {
//       id: 3,
//       image: assets.blogThree,
//       title: 'Family fusce fermentum',
//       category: 'Family',
//       date: 'Dec 25, 2025',
//       link: 'blog.html',
//     },
//     {
//       id: 4,
//       image: assets.blogFour,
//       title: 'Movie vellentesque Lue',
//       category: 'Movie',
//       date: 'Dec 24, 2025',
//       link: '',
//     },
//     {
//       id: 5,
//       image: assets.blogFive,
//       title: 'Curabitur tincidunt family',
//       category: 'Family',
//       date: 'Dec 23, 2025',
//       link: '',
//     },
//     {
//       id: 6,
//       image: assets.blogSix,
//       title: 'Portrait model verotum',
//       category: 'Model',
//       date: 'Dec 22, 2025',
//       link: '',
//     },
//     {
//       id: 7,
//       image: assets.blogSeven,
//       title: 'Wedding tristique leo',
//       category: 'Wedding',
//       date: 'Dec 20, 2025',
//       link: '',
//     },
//     {
//       id: 8,
//       image: assets.blogNine,
//       title: 'Travel rutrum finibus',
//       category: 'Travel',
//       date: 'Dec 19, 2025',
//       link: '',
//     },
//     {
//       id: 9,
//       image: assets.blogEight,
//       title: 'Wedding mauris sapien',
//       category: 'Family',
//       date: 'Dec 18, 2025',
//       link: '',
//     },
//   ];
//   return (
//     <section className="blog md:mt-10 mt-0">
//       <div className="container">
//         <div className="row">
//           <div
//             className="section-head col-md-12 text-start animate-box"
//             data-animate-effect="fadeInUp"
//           >
//             <h4>Lifestyle Blog</h4>
//           </div>

//           {blogPosts.map((post) => (
//             <Link
//               to={`/lifestyle/${post.id}`}
//               key={post.id}
//               className="col-md-4 mb-40 animate-box cursor-pointer relative"
//               data-animate-effect="fadeInUp"
//             >
//               <div className="item">
//                 <div className="post-img">
//                   <div className="img">
//                     {/* <a href={post.link}> */}
//                     <img src={post.image} alt={post.title} />
//                     {/* </a> */}
//                   </div>
//                 </div>
//                 <div className="cont">
//                   <h6>{post.title}</h6>
//                   <div className="info">
//                     {/* <a href={post.link}> */}
//                     {post.category} / {post.date}
//                     {/* </a> */}
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         <div className="row">
//           <div
//             className="col-md-12 mt-40 mb-60 text-center animate-box"
//             data-animate-effect="fadeInUp"
//           >
//             <ul className="blackrose-pagination-wrap align-center">
//               <li>
//                 <a href="">
//                   <i className="fa fa-angle-left"></i>
//                 </a>
//               </li>
//               <li>
//                 <a href="">1</a>
//               </li>
//               <li>
//                 <a href="" className="active">
//                   2
//                 </a>
//               </li>
//               <li>
//                 <a href="">3</a>
//               </li>
//               <li>
//                 <a href="">
//                   <i className="fa fa-angle-right"></i>
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Lifestyle;

// src/pages/LifeStyle.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start justify-between mb-8 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Lifestyle Blog
            </h1>
            <p className="text-gray-400">
              Explore curated stories, tips, and trends to enrich your everyday
              life.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
            <div className="relative">
              <select
                className="appearance-none bg-transparent border border-gray-700 text-white px-4 py-2 pr-8 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                value={categoryParam}
                onChange={(e) => handleCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="relative">
              <select
                className="appearance-none bg-transparent border border-gray-700 text-white px-4 py-2 pr-8 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                onChange={(e) => navigate(`/lifestyle?sort=${e.target.value}`)}
              >
                <option value="latest">Latest</option>
                <option value="popular">Popular</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white text-lg">No blog posts found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  to={`/lifestyle/${post.slug}`}
                  key={post._id}
                  className="group overflow-hidden rounded-lg transition-transform hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 bg-gray-900">
                    <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <div className="text-gray-400 text-sm mb-3">
                      {new Date(
                        post.publishedAt || post.createdAt
                      ).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm border border-gray-700 rounded-lg text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {[...Array(totalPages)].map((_, i) => {
                    // Show current page, first, last, and one page before and after current
                    if (
                      i + 1 === currentPage ||
                      i + 1 === 1 ||
                      i + 1 === totalPages ||
                      i + 1 === currentPage - 1 ||
                      i + 1 === currentPage + 1
                    ) {
                      return (
                        <button
                          key={i}
                          onClick={() => handlePageChange(i + 1)}
                          className={`px-4 py-2 text-sm rounded-lg ${
                            currentPage === i + 1
                              ? 'bg-primary text-white'
                              : 'border border-gray-700 text-white hover:bg-gray-800'
                          }`}
                        >
                          {i + 1}
                        </button>
                      );
                    }

                    // Show ellipsis
                    if (
                      (i + 1 === currentPage - 2 && currentPage > 3) ||
                      (i + 1 === currentPage + 2 &&
                        currentPage < totalPages - 2)
                    ) {
                      return (
                        <span key={i} className="px-4 py-2 text-gray-500">
                          ...
                        </span>
                      );
                    }

                    return null;
                  })}

                  <button
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm border border-gray-700 rounded-lg text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default LifeStyle;
