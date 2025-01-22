import { Routes, Route } from 'react-router-dom';
import './App.css';
import Contact from './pages/Contact';
import Layout from './component/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Lifestyle from './pages/Lifestyle';
import Photography from './pages/Photography';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {' '}
        {/* Wrap Contact route with Layout */}
        <Route path="/" element={<Home />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/lifestyle" element={<Lifestyle />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
