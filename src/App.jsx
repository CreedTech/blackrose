import { Routes, Route } from 'react-router-dom';
import './App.css';
import Contact from './pages/Contact';
import Layout from './component/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Lifestyle from './pages/Lifestyle';
import Photography from './pages/Photography';
import PhotographyDetails from './pages/PhotographyDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SingleBlog from './pages/SingleBlog';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
import Signup from './pages/SignUp';
import Checkout from './pages/Checkout';
import PaymentStatus from './pages/PaymentStatus';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          {' '}
          {/* Wrap Contact route with Layout */}
          <Route path="/" element={<Home />} />
          <Route path="/photography" element={<Photography />} />
          <Route
            path="/photography/:imageId"
            element={<PhotographyDetails />}
          />
          <Route path="/lifestyle" element={<Lifestyle />} />
          <Route path="/lifestyle/:id" element={<SingleBlog />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:productId" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment/status" element={<PaymentStatus />} />
          <Route path="/payment/callback" element={<PaymentStatus />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Signup />} />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
