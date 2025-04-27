import { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/images/assets';
import { Link, useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { Helmet } from 'react-helmet';
import { ShopContext } from '../context/ShopContext';

const ProductPage = () => {
  const { productId } = useParams();
  // console.log(productId);
  const { addToCart } = useContext(ShopContext);
  // const firstImage = assets.blogFour;
  const [currentMedia, setCurrentMedia] = useState(null);
  // const [selectedColor, setSelectedColor] = useState('black');
  // const [selectedSize, setSelectedSize] = useState(37);
  const [quantity, setQuantity] = useState(1);
  const { useGetSingleProduct, useSimilarProducts } = useProducts();
  const { data: product, isLoading, error } = useGetSingleProduct(productId);
  const { data: similarProducts = [], isLoading: loadingSimilar } =
    useSimilarProducts(productId);

  useEffect(() => {
    if (product?.image?.length) {
      setCurrentMedia(product.image[0]);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error.message}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Product not found
      </div>
    );
  }
  return (
    <div className="bg-black text-white min-h-screen p-4 md:mt-10 mt-0">
      <Helmet>
        <title>{product.title} | BlackRose</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <div className="max-w-5xl mx-auto">
        <nav className=" mb-4">
          <a href="#" className="hover:text-white text-white font-bold">
            Home /
          </a>{' '}
          <a href="#" className="hover:text-white text-white font-bold">
            {' '}
            Shop /
          </a>{' '}
          {/* <a href="#" className="hover:text-white text-white font-bold">
            {' '}
            Shoes
          </a>{' '} */}
          {/* / */}
          {product.title}
        </nav>

        <div className="flex flex-col md:flex-row mb-8 relative">
          <div className="md:w-1/2">
            {/* {mediaItems.find(item => item.src === currentMedia).type === 'video' ? (
              <video src={currentMedia} controls className="w-full h-auto mb-4" />
            ) : ( */}
            <div className="w-full  max-w-[600px] mx-auto">
              <div className="relative w-full h-[400px] mb-4">
                {currentMedia ? (
                  <img
                    className="w-full h-full object-cover rounded-md"
                    src={currentMedia}
                    alt={currentMedia}
                  />
                ) : (
                  <div className="bg-gray-800 text-gray-400 p-6 text-center rounded">
                    No Image Available
                  </div>
                )}
              </div>
            </div>
            {/* {currentMedia ? (
              <img
                src={currentMedia}
                alt={currentMedia}
                className="w-full h-[600px] max-w-[600px] mb-4 rounded object-cover"
              />
            ) : (
              <div className="bg-gray-800 text-gray-400 p-6 text-center rounded">
                No Image Available
              </div>
            )} */}

            {/* // )} */}
            <div className="flex space-x-4 justify-start sm:w-[18.7%]">
              {product.image?.map((img, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setCurrentMedia(img)}
                  className="relative w-[75px] h-[75px] sm:w-full sm:h-[100px] mb-2 md:mx-0 mx-2 flex-shrink-0 cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${img} ${index}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                  {/* {item.type === 'video' ? (
                    <video src={item.src} className="w-full h-auto" />
                  ) : (
                    <img
                      src={img}
                      alt={`Thumbnail ${index}`}
                      className="w-full h-auto"
                    />
                  )} */}
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 md:pl-8">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-400 mb-4 text-sm">{product.description}</p>
            <p className="text-2xl font-bold mb-2 text-white">
              ₦{Number(product.finalPrice).toLocaleString()}
            </p>

            {product.discount > 0 && (
              <div className="flex items-center space-x-2">
                <span className="line-through text-white font-medium">
                  ₦{Number(product.price).toLocaleString()}
                </span>
                <span className="text-green-400 font-medium">
                  ({product.discount}% off)
                </span>
              </div>
            )}

            {/* <hr className="my-5" />
            <div className="mb-4">
              <h3 className="font-bold mb-2">Choose a Color</h3>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full ${
                      selectedColor === color ? 'ring-2 ring-white p-2 ' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  ></button>
                ))}
              </div>
            </div> */}
            {/* <hr className="my-5" />
            <div className="mb-4">
              <h3 className="font-bold mb-2">Select Size</h3>
              <div className="flex space-x-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded-full ${
                      selectedSize === size
                        ? 'bg-white text-black'
                        : 'bg-gray-700'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div> */}
            <hr className="my-5" />
            <div className="mb-4">
              <h3 className="font-bold mb-2">Quantity</h3>
              <div className=" flex flex-row items-center gap-3">
                <input
                  type="number"
                  className="w-32 p-2 bg-white text-black font-medium text-xl"
                  min="1"
                  max="12"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <span className="text-gray-400 mt-2 text-xs">
                  <strong>Only {product.stock} Items Left!</strong> <br />{' '}
                  Don&apos;t miss it
                </span>
              </div>
            </div>
            <hr className="my-5" />
            <div className="flex space-x-4">
              {/* <button className="bg-white  text-black font-medium px-10 py-3">
                Buy Now
              </button> */}
              <button
                onClick={() => addToCart(product._id, quantity)}
                className="border border-white px-10 py-3 relative overflow-hidden group transition-all duration-300"
              >
                <span className="absolute inset-0 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0"></span>
                <span className="relative text-white group-hover:text-black transition-colors duration-300 z-10">
                  Add to Cart
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="py-6 ">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="mb-4 font-medium text-white">{product.description}</p>
          {/* Add more content as needed */}
        </div>
        <section className="max-w-full mx-auto  py-10 relative">
          <h2 className="text-2xl font-bold text-center">
            Similar Items You Might Like
          </h2>
          <section className="py-10">
            <section className="py-10">
              {loadingSimilar ? (
                <p className="text-gray-400">Loading similar products...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {similarProducts.map((product) => (
                    <div key={product._id} className=" py-4 rounded">
                      <Link
                        to={`/shop/${product._id}`}
                        className="w-full mx-auto"
                      >
                        <div className="relative w-full h-64 mb-4">
                          <img
                            src={product.image[0]}
                            alt={product.title}
                            className="w-full h-full object-cover mb-4"
                          />
                        </div>
                      </Link>
                      <div className="flex justify-between items-center mb-2">
                        <h3>{product.title}</h3>
                        <span>₦{product.finalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => {
                            const full = star <= Math.floor(product.rating);
                            const half = !full && star - product.rating < 1;

                            return (
                              <svg
                                key={star}
                                className={`w-4 h-4 ${
                                  full
                                    ? 'text-yellow-400'
                                    : half
                                    ? 'text-yellow-300'
                                    : 'text-gray-400'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            );
                          })}
                        </div>

                        <span className="ml-2 text-sm">
                          ({product.reviews.length})
                        </span>
                      </div>
                      <button
                        onClick={() => addToCart(product._id, 1)}
                        className="w-1/2 bg-white text-black py-2 hover:bg-gray-200 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </section>
        </section>
      </div>
    </div>
  );
};

export default ProductPage;
