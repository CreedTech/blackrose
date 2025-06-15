import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { useGallery } from '../hooks/useGallery';

const Layout = () => {
  // const [loading, setLoading] = useState(false);

  const { useImages } = useGallery();
  const { isLoading } = useImages();

  if (isLoading) {
    return (
      <div className="flex items-center flex-col justify-center h-screen bg-main">
        <div className="animate-spin rounded-full h-16 w-16 md:h-32 md:w-32 border-t-2 border-b-2 border-primary"></div>
        <p>Loaing Contents</p>
      </div>
    );
  }
  return (
    <div>
      <div className="progress-wrap cursor-pointer">
        <svg
          className="progress-circle svg-content"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102"
        >
          <path d="M50,1 a49,49 0 0,1s 0,98 a49,49 0 0,1 0,-98" />
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
      <div id="">
        <div className="content-lines-wrapper">
          <div className="content-lines-inner">
            <div className="content-lines"></div>
          </div>
        </div>
        {/* Navbar */}

        <div className="">
          <Navigation />
          {/* </nav> */}
        </div>
        {/* Render child pages */}
        <div className="min-h-[75vh]">
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
                    <a
                      className="blackrose-social-link inline-flex items-center justify-center w-12 h-12  rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      href="#"
                    >
                      <span className="blackrose-social-icon fa fa-facebook-f"></span>
                    </a>
                  </li>
                  <li className="blackrose-social-icons-item">
                    <a
                      className="blackrose-social-link inline-flex items-center justify-center w-12 h-12  rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      href="#"
                    >
                      <span className="blackrose-social-icon fa fa-twitter"></span>
                    </a>
                  </li>
                  <li className="blackrose-social-icons-item">
                    <a
                      className="blackrose-social-link inline-flex items-center justify-center w-12 h-12  rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      href="#"
                    >
                      <span className="blackrose-social-icon fa fa-instagram"></span>
                    </a>
                  </li>
                  <li className="blackrose-social-icons-item">
                    <a
                      className="blackrose-social-link inline-flex items-center justify-center w-12 h-12  rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      href="#"
                    >
                      <span className="blackrose-social-icon fa fa-behance"></span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4">
                <p className="blackrose-copyright font-bold text-darker">
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
