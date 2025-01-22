import { assets } from '../assets/images/assets';

const Home = () => {
  const projects = [
    {
      id: 1,
      image: assets.serviceTwo,
      title: 'Explore exclusive high-res photo galleries by top photographers',
      link: '',
      categoryLink: '',
      categoryText: '01',
    },
    {
      id: 2,
      image: assets.serviceSix,
      title: 'Read stories, tips, and insights on living your best life',
      link: '',
      categoryLink: '',
      categoryText: '02',
    },
    {
      id: 3,
      image: assets.serviceFive,
      title: 'Shop premium products curated just for you',
      link: '',
      categoryLink: '',
      categoryText: '03',
    },
  ];

  return (
    <div>
      {/* 
      <div id="blackrose-page-wrapper">
        <div className="content-lines-wrapper">
          <div className="content-lines-inner">
            <div className="content-lines"></div>
          </div>
        </div> */}

      <div className="container">
        <section className="blackrose-section-slider pt-130">
          <div className="next-container-center">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="swiper-slide-block w-full">
                    <div
                      className=" w-full animate-box"
                      data-animate-effect="fadeInLeft"
                      data-swiper-parallax-y="100%"
                    >
                      <a href="">
                        <img src={assets.sliderTwo} alt="" />
                      </a>
                    </div>
                    {/* <div
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
                    </div> */}
                  </div>
                </div>
                {/* <div className="swiper-slide">
                  <div className="swiper-slide-block">
                    <div
                      className="swiper-slide-block-img"
                      data-swiper-parallax-y="70%"
                    >
                      <a href="project-page-2.html">
                        <img src="../assets/images/slider/1.jpg" alt="" />
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
                </div> */}
                {/* <div className="swiper-slide">
                  <div className="swiper-slide-block">
                    <div
                      className="swiper-slide-block-img"
                      data-swiper-parallax-y="70%"
                    >
                      <a href="project-page-2.html">
                        <img src="../assets/images/gallery/21.jpg" alt="" />
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
                </div> */}

                {/* More swiper slides go here */}
              </div>
              {/* Navigation buttons */}
              {/* <div
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
              </div> */}
            </div>
          </div>
        </section>
      </div>
      <section className="projects pt-130 mb-60">
        <div className="container">
          <div className="row">
            <div
              className="section-head col-md-12 text-start animate-box"
              data-animate-effect="fadeInUp"
            >
              <h4>Discover the Best of The Black Rose</h4>
            </div>

            {projects.map((project) => (
              <div
                key={project.id}
                className="col-md-4 animate-box"
                data-animate-effect="fadeInUp"
              >
                <div className="item">
                  <div className="position-re o-hidden">
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className="con">
                    <h5>
                      <a href={project.link}>{project.title}</a>
                    </h5>
                    <a href={project.link}>
                      <i className="fa fa-long-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Gallery */}
      <div className="blackrose-section">
        <div className="container">
          <div className="row mb-4">
            <div
              className="section-head text-start col-md-12 animate-box"
              data-animate-effect="fadeInUp"
            >
              <h4>Spotlight on photography</h4>
            </div>
            <div
              className="col-md-4 animate-box"
              data-animate-effect="fadeInUp"
            >
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.galleryOne}
                  data-caption="Quisque in felis"
                >
                  <img className="img-fluid" src={assets.galleryOne} alt="" />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.galleryTwo}
                  data-caption="Pellentesque habitant"
                >
                  <img className="img-fluid" src={assets.galleryTwo} alt="" />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.galleryEleven}
                  data-caption="Curabitur convallis"
                >
                  <img
                    className="img-fluid"
                    src={assets.galleryEleven}
                    alt=""
                  />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.galleryThree}
                  data-caption="Quisque in dolor"
                >
                  <img className="img-fluid" src={assets.galleryThree} alt="" />
                </a>
              </figure>
            </div>
            <div
              className="col-md-4 animate-box"
              data-animate-effect="fadeInUp"
            >
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.galleryEighteen}
                  data-caption="Aliquam non luctus"
                >
                  <img
                    className="img-fluid"
                    src={assets.galleryEighteen}
                    alt=""
                  />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.gallerySeventeen}
                  data-caption="Quality in felis"
                >
                  <img
                    className="img-fluid"
                    src={assets.gallerySeventeen}
                    alt=""
                  />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.gallerySixteen}
                  data-caption="Vivamus a nisi"
                >
                  <img
                    className="img-fluid"
                    src={assets.gallerySixteen}
                    alt=""
                  />
                </a>
              </figure>
            </div>
            <div
              className="col-md-4 d-none d-lg-block animate-box"
              data-animate-effect="fadeInUp"
            >
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.galleryEight}
                  data-caption="Mauris pretium"
                >
                  <img className="img-fluid" src={assets.galleryEight} alt="" />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.galleryNine}
                  data-caption="Nunc blandit purus"
                >
                  <img className="img-fluid" src={assets.galleryNine} alt="" />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.gallerySeven}
                  data-caption="Nunc ultrices tellus"
                >
                  <img className="img-fluid" src={assets.gallerySeven} alt="" />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.galnin}
                  data-caption="Orci varius natoque"
                >
                  <img className="img-fluid" src={assets.galnin} alt="" />
                </a>
              </figure>
            </div>
          </div>
          {/* Show more section */}
          <div className="row mb-4 align-items-stretch mt-60">
            <div className="col-12">
              <div className="blackrose-show-more-container">
                <div
                  className="row align-items-stretch blackrose-photos"
                  id="blackrose-section-photos"
                >
                  <div
                    className="col-md-4 animate-box"
                    data-animate-effect="fadeInUp"
                  >
                    <figure>
                      <a
                        className="d-block mb-4"
                        data-fancybox="images"
                        href={assets.galleryTwelve}
                        data-caption="Vestibulum leo velit"
                      >
                        <img
                          className="img-fluid"
                          src={assets.galleryTwelve}
                          alt=""
                        />
                      </a>
                    </figure>
                    <figure>
                      <a
                        className="d-block mb-4"
                        data-fancybox="images"
                        href={assets.galleryFive}
                        data-caption="Etiam imperdiet hendrerit"
                      >
                        <img
                          className="img-fluid"
                          src={assets.galleryFive}
                          alt=""
                        />
                      </a>
                    </figure>
                  </div>
                  <div
                    className="col-md-4 animate-box"
                    data-animate-effect="fadeInUp"
                  >
                    <figure>
                      <a
                        className="d-block mb-4"
                        data-fancybox="images"
                        href={assets.galleryThirteen}
                        data-caption="Nulla turpis elementum"
                      >
                        <img
                          className="img-fluid"
                          src={assets.galleryThirteen}
                          alt=""
                        />
                      </a>
                    </figure>
                    <figure>
                      <a
                        className="d-block mb-4"
                        data-fancybox="images"
                        href={assets.gallerySix}
                        data-caption="Pellentesque habitant"
                      >
                        <img
                          className="img-fluid"
                          src={assets.gallerySix}
                          alt=""
                        />
                      </a>
                    </figure>
                  </div>
                  <div
                    className="col-md-4 d-none d-lg-block animate-box"
                    data-animate-effect="fadeInUp"
                  >
                    <figure>
                      <a
                        className="d-block mb-4"
                        data-fancybox="images"
                        href={assets.galleryFourteen}
                        data-caption="Quisque in felis"
                      >
                        <img
                          className="img-fluid"
                          src={assets.galleryFourteen}
                          alt=""
                        />
                      </a>
                    </figure>
                  </div>
                </div>
              </div>
              <div
                className="blackrose-more-wrapper txt-center animate-box"
                data-animate-effect="fadeInUp"
              >
                <a href="" className="blackrose-more-trigger flex">
                  <span className="plus flex-center">&nbsp;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Home;
