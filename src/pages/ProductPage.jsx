import { useState } from 'react';
import { assets } from '../assets/images/assets';

const ProductPage = () => {
  const firstImage = assets.blogFour;
  const [currentMedia, setCurrentMedia] = useState(firstImage);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState(37);
  const [quantity, setQuantity] = useState(1);

  const mediaItems = [
    { type: 'image', src: assets.blogFive },
    { type: 'image', src: assets.blogThree },
    { type: 'image', src: assets.blogNine },
    { type: 'image', src: assets.blogSeven },
  ];

  const colors = ['purple', 'green', 'gray', 'yellow', 'blue', 'red'];
  const sizes = [37, 38, 39, 41, 42, 43, 44];

  const featuredProducts = [
    {
      id: 1,
      name: 'Court Heels',
      price: 95.0,
      rating: 5,
      reviews: 91,
      image: assets.blogFive,
    },
    {
      id: 2,
      name: 'Leather Handbag',
      price: 150.0,
      rating: 4.5,
      reviews: 67,
      image: assets.blogSeven,
    },
    {
      id: 3,
      name: 'Wool Scarf',
      price: 35.0,
      rating: 4,
      reviews: 28,
      image: assets.galleryThirtyThree,
    },
    {
      id: 4,
      name: 'Classic Watch',
      price: 250.0,
      rating: 4.8,
      reviews: 123,
      image: assets.galleryNineteen,
    },
  ];
  return (
    <div className="bg-black text-white min-h-screen p-4 md:mt-10 mt-0">
      <div className="max-w-5xl mx-auto">
        <nav className=" mb-4">
          <a href="#" className="hover:text-white text-white font-bold">
            Home /
          </a>{' '}
          <a href="#" className="hover:text-white text-white font-bold">
            {' '}
            Shop /
          </a>{' '}
          <a href="#" className="hover:text-white text-white font-bold">
            {' '}
            Shoes
          </a>{' '}
          / Nike Blazer Low &apos;77 Vintage
        </nav>

        <div className="flex flex-col md:flex-row mb-8 relative">
          <div className="md:w-1/2">
            {/* {mediaItems.find(item => item.src === currentMedia).type === 'video' ? (
              <video src={currentMedia} controls className="w-full h-auto mb-4" />
            ) : ( */}

            <img
              src={currentMedia}
              alt="Nike Blazer"
              className="w-full h-auto mb-4"
            />
            {/* // )} */}
            <div className="flex space-x-4">
              {mediaItems.map((item, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setCurrentMedia(item.src)}
                  className="w-1/4 h-auto cursor-pointer"
                >
                  {item.type === 'video' ? (
                    <video src={item.src} className="w-full h-auto" />
                  ) : (
                    <img
                      src={item.src}
                      alt={`Thumbnail ${index}`}
                      className="w-full h-auto"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 md:pl-8">
            <h1 className="text-3xl font-bold mb-2">
              Nike Blazer Low &apos;77 Vintage
            </h1>
            <p className="text-gray-400 mb-4 text-sm">
              Praised by the streets for its classic simplicity and comfort, the
              Nike Blazer Low &apos;77 Vintage returns with its low-profile
              style and heritage b-ball looks.
            </p>
            <p className="text-2xl font-bold mb-2 text-white">$29.99</p>
            <span className="line-through text-white font-medium">$49.99 </span>
            <span className="text-white font-medium">(20% off)</span>
            <hr className="my-5" />
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
            </div>
            <hr className="my-5" />
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
            </div>
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
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <span className="text-gray-400 mt-2 text-xs">
                  <strong>Only 12 Items Left!</strong> <br /> Don&apos;t miss it
                </span>
              </div>
            </div>
            <hr className="my-5" />
            <div className="flex space-x-4">
              <button className="bg-white  text-black font-medium px-10 py-3">
                Buy Now
              </button>
              <button className="border border-white px-10 py-3">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="py-6 ">
          <h1 className="text-3xl font-bold mb-2">
            Nike Blazer Low &apos;77 Vintage
          </h1>
          <p className="mb-4 font-medium text-white">
            {' '}
            Lorem ipsum dolor sit amet consectetur adipiscing elit fusce,
            aliquam vehicula feugiat eu nulla massa sollicitudin platea, pretium
            est donec arcu netus potenti tempus. Accumsan metus viverra
            fermentum eu platea facilisi molestie feugiat dignissim, donec neque
            cubilia urna faucibus praesent aliquam curabitur, est velit senectus
            ante non aenean nascetur posuere. Placerat a velit risus gravida
            consequat bibendum tincidunt potenti arcu vel, ad commodo dignissim
            torquent neque hendrerit sed congue. Scelerisque facilisi ultrices
            posuere quisque pharetra porta massa iaculis condimentum mattis
            nascetur, justo sapien vivamus placerat suscipit ridiculus sagittis
            imperdiet viverra lobortis, nec primis molestie porttitor ornare
            arcu nullam himenaeos magna morbi. Integer parturient diam hac
            eleifend condimentum morbi quisque, nec metus curabitur montes
            turpis pharetra, tortor facilisi malesuada mollis eget ac.
          </p>
          {/* Add more content as needed */}
        </div>
        <section className="max-w-full mx-auto  py-10 relative">
          <h2 className="text-2xl font-bold text-center">
            Similar Items You Might Like
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
            {featuredProducts.map((product) => (
              <div key={product.id} className=" py-4 rounded">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover mb-4"
                />
                <div className="flex justify-between items-center mb-2">
                  <h3>{product.name}</h3>
                  <span>${product.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < product.rating
                            ? 'text-yellow-400'
                            : 'text-gray-400'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm">({product.reviews})</span>
                </div>
                <button className="w-1/2 bg-white text-black py-2 hover:bg-gray-200 transition-colors">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPage;
