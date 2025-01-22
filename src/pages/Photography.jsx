import { assets } from '../assets/images/assets';

const Photography = () => {
  return (
    <div>
      <div className="container">
        <section className="blackrose-section-slider pt-130">
          <div className="next-container-center">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="swiper-slide-block">
                    <div
                      className=" swiper-slide-block-img animate-box"
                      data-animate-effect="fadeInLeft"
                      data-swiper-parallax-y="100%"
                    >
                      <a href="">
                        <img src={assets.sliderTwo} alt="" />
                      </a>
                    </div>
                    <div
                      className="swiper-slide-block-text animate-box"
                      data-animate-effect="fadeInRight"
                    >
                      <h2
                        data-swiper-parallax-x="-60%"
                        className="next-main-title"
                      >
                        Anna Lussen
                      </h2>
                      <h3
                        data-swiper-parallax-x="-50%"
                        className="next-main-subtitle"
                      >
                        Model, Moscow
                      </h3>
                      <p
                        data-swiper-parallax-x="-40%"
                        className="next-paragraph"
                      >
                        Quisque pellentesque odio ut libero iaculis, nec
                        fringilla sapien tincidunt. Sed laoree nulvinar ex sed
                        estas in duru rana.
                      </p>
                      <a
                        data-swiper-parallax-x="-30%"
                        style={{ zIndex: 5 }}
                        className="next-link"
                        href="project-page.html"
                      >
                        View Details
                      </a>
                      <span
                        data-swiper-parallax-y="60%"
                        className="next-number"
                      >
                        1
                      </span>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="swiper-slide-block">
                    <div
                      className="swiper-slide-block-img"
                      data-swiper-parallax-y="70%"
                    >
                      <a href="project-page-2.html">
                        <img src={assets.sliderOne} alt="" />
                      </a>
                    </div>
                    <div className="swiper-slide-block-text">
                      <h2
                        data-swiper-parallax-x="-60%"
                        className="next-main-title"
                      >
                        Tomas & Isabel
                      </h2>
                      <h3
                        data-swiper-parallax-x="-50%"
                        className="next-main-subtitle"
                      >
                        Wedding, Norwalk
                      </h3>
                      <p
                        data-swiper-parallax-x="-40%"
                        className="next-paragraph"
                      >
                        Quisque pellentesque odio ut libero iaculis, nec
                        fringilla sapien tincidunt. Sed laoree nulvinar ex sed
                        estas in duru rana.
                      </p>
                      <a
                        data-swiper-parallax-x="-30%"
                        className="next-link"
                        href="project-page-2.html"
                      >
                        View Details
                      </a>
                      <span
                        data-swiper-parallax-y="60%"
                        className="next-number animate-box"
                        data-animate-effect="fadeInUp"
                      >
                        2
                      </span>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="swiper-slide-block">
                    <div
                      className="swiper-slide-block-img"
                      data-swiper-parallax-y="70%"
                    >
                      <a href="project-page-2.html">
                        <img src={assets.galleryTwentyOne} alt="" />
                      </a>
                    </div>
                    <div className="swiper-slide-block-text">
                      <h2
                        data-swiper-parallax-x="-60%"
                        className="next-main-title"
                      >
                        Jenna & James
                      </h2>
                      <h3
                        data-swiper-parallax-x="-50%"
                        className="next-main-subtitle"
                      >
                        Wedding, London
                      </h3>
                      <p
                        data-swiper-parallax-x="-40%"
                        className="next-paragraph"
                      >
                        Quisque pellentesque odio ut libero iaculis, nec
                        fringilla sapien tincidunt. Sed laoree nulvinar ex sed
                        estas in duru rana.
                      </p>
                      <a
                        data-swiper-parallax-x="-30%"
                        className="next-link"
                        href="https://1.envato.market/e6o9j"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Buy Now
                      </a>
                      <span
                        data-swiper-parallax-y="60%"
                        className="next-number"
                      >
                        3
                      </span>
                    </div>
                  </div>
                </div>

                {/* More swiper slides go here */}
              </div>
              {/* Navigation buttons */}
              <div
                className="swiper-button-next animate-box"
                data-animate-effect="fadeInRight"
              >
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </div>
              <div
                className="swiper-button-prev animate-box"
                data-animate-effect="fadeInLeft"
              >
                <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Photography;
