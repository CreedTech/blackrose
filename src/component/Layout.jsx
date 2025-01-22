import { useEffect, useState } from 'react';
// import Swiper from 'swiper';
import { Outlet, NavLink } from 'react-router-dom'; // Assuming you're using React Router
import { assets } from '../assets/images/assets';

const Layout = () => {
  const [loading, setLoading] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State for navbar toggle

  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust the time as needed
  }, []);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen); // Toggle navbar state
  };

  //   const [scrollPos, setScrollPos] = useState(0);
  //   const [loading, setLoading] = useState(true);

  //   //   useEffect(() => {
  //   //     // Preloader Logic
  //   //     const preloader = document.getElementById('Lfa-page-loading');
  //   //     if (preloader) {
  //   //       preloader.style.display = 'none';
  //   //     }
  //   //     setLoading(false);
  //   //   }, []);

  //   useEffect(() => {
  //     // Wait for the page to load and then hide the preloader
  //     const preloader = document.getElementById('Lfa-page-loading');

  //     if (preloader) {
  //       preloader.style.display = 'block'; // Make sure preloader is visible initially

  //       window.onload = () => {
  //         // Fade out the preloader after page load
  //         preloader.style.transition = 'opacity 1s ease-out';
  //         preloader.style.opacity = 0;

  //         // After the fade-out animation completes, set display to 'none'
  //         setTimeout(() => {
  //           preloader.style.display = 'none';
  //         }, 1000); // Adjust the timeout to match the fade duration
  //       };
  //     }
  //   }, []);

  //   useEffect(() => {
  //     // Scroll handling for navbar
  //     const handleScroll = () => setScrollPos(window.scrollY);
  //     window.addEventListener('scroll', handleScroll);
  //     return () => window.removeEventListener('scroll', handleScroll);
  //   }, []);

  //   // Initialize Swiper on page load
  //   useEffect(() => {
  //     if (window.innerWidth < 1200) {
  //       new Swiper('.swiper-container', {
  //         /* Swiper config */
  //       });
  //     } else {
  //       new Swiper('.swiper-container', {
  //         /* Swiper config */
  //       });
  //     }
  //   }, []);

  //   // Scroll progress logic
  //   useEffect(() => {
  //     const progressPath = document.querySelector('.progress-wrap path');

  //     if (progressPath) {
  //       const pathLength = progressPath.getTotalLength();
  //       progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
  //       progressPath.style.strokeDashoffset = pathLength;

  //       const updateProgress = () => {
  //         const scroll = window.scrollY;
  //         const height =
  //           document.documentElement.scrollHeight - window.innerHeight;
  //         const progress = pathLength - (scroll * pathLength) / height;
  //         progressPath.style.strokeDashoffset = progress;
  //       };

  //       window.addEventListener('scroll', updateProgress);
  //       updateProgress(); // Call once to set the initial progress
  //     }

  //     // Clean up event listener
  //     return () => {
  //       window.removeEventListener('scroll', updateProgress);
  //     };
  //   }, []); // Empty dependency array to ensure it runs once when the component mounts

  //   if (loading) {
  //     return (
  //       <div id="Lfa-page-loading" className="blackrose-pageloading">
  //         <div className="blackrose-pageloading-inner">
  //           <img src="../assets/images/logo.png" className="logo" alt="Logo" />
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div>
      {loading && (
        <div id="Lfa-page-loading" className="blackrose-pageloading">
          <div className="blackrose-pageloading-inner">
            <img src={assets.logo} className="logo" alt="" />
          </div>
        </div>
      )}
      <div className="progress-wrap cursor-pointer">
        <svg
          className="progress-circle svg-content"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102"
        >
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
      </div>
      <div className="progress-wrap cursor-pointer">
        <svg
          className="progress-circle svg-content"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102"
        >
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
      </div>
      <div id="blackrose-page-wrapper">
        <div className="content-lines-wrapper">
          <div className="content-lines-inner">
            <div className="content-lines"></div>
          </div>
        </div>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <div className="logo-wrapper">
              <NavLink className="logo" to="/">
                <img src={assets.logo} className="logo-img" alt="" />
              </NavLink>
            </div>

            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleNavbar}
              data-bs-toggle="collapse"
              data-bs-target="#navbar"
              aria-controls="navbar"
              aria-expanded={isNavbarOpen ? 'true' : 'false'}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon">
                <i className="fa fa-bars"></i>
              </span>
            </button>

            <div
              className={`collapse navbar-collapse ${
                isNavbarOpen ? 'show' : ''
              }`}
              id="navbar"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/"
                    style={({ isActive }) => ({
                      color: isActive ? '#FF5733' : '', // Active link color
                    })}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/photography"
                    style={({ isActive }) => ({
                      color: isActive ? '#FF5733' : '',
                    })}
                  >
                    Photography
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/lifestyle"
                    style={({ isActive }) => ({
                      color: isActive ? '#FF5733' : '',
                    })}
                  >
                    LifeStyle
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/about"
                    style={({ isActive }) => ({
                      color: isActive ? '#FF5733' : '',
                    })}
                  >
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/contact"
                    style={({ isActive }) => ({
                      color: isActive ? '#FF5733' : '',
                    })}
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>

              <div className="ms-auto">
                <NavLink
                  className="nav-link"
                  to="/shop"
                  style={({ isActive }) => ({
                    color: isActive ? '#FF5733' : '',
                  })}
                >
                  Shop
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        {/* Render child pages */}
        <div>
          <Outlet />
        </div>

        {/* Scroll progress */}
        {/* <div className="progress-wrap">
        <svg>
          <path d="..." />
        </svg>
      </div> */}

        {/* Footer */}
        <footer>
          <div className="container blackrose-footer-container">
            <div className="row">
              <div className="col-md-8">
                <ul className="blackrose-social-icons">
                  <li className="blackrose-social-icons-item">
                    <a className="blackrose-social-link" href="index-2.html#">
                      <span className="blackrose-social-icon fa fa-facebook-f"></span>
                    </a>
                  </li>
                  <li className="blackrose-social-icons-item">
                    <a className="blackrose-social-link" href="index-2.html#">
                      <span className="blackrose-social-icon fa fa-twitter"></span>
                    </a>
                  </li>
                  <li className="blackrose-social-icons-item">
                    <a className="blackrose-social-link" href="index-2.html#">
                      <span className="blackrose-social-icon fa fa-instagram"></span>
                    </a>
                  </li>
                  <li className="blackrose-social-icons-item">
                    <a className="blackrose-social-link" href="index-2.html#">
                      <span className="blackrose-social-icon fa fa-behance"></span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4">
                <p className="blackrose-copyright">
                  © {new Date().getFullYear()} <span>BLACKROSE</span> All right
                  reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
