const Home = () => {
  const projects = [
    {
      id: 1,
      image: '/src/assets/images/services/02.jpg',
      title: 'Explore exclusive high-res photo galleries by top photographers',
      link: '',
      categoryLink: '',
      categoryText: '01',
    },
    {
      id: 2,
      image: '/src/assets/images/services/06.jpg',
      title: 'Read stories, tips, and insights on living your best life',
      link: '',
      categoryLink: '',
      categoryText: '02',
    },
    {
      id: 3,
      image: '/src/assets/images/services/05.jpg',
      title: 'Shop premium products curated just for you',
      link: '',
      categoryLink: '',
      categoryText: '03',
    },
  ];

  return (
    <div>
      {/* 
      <div id="pozo-page-wrapper">
        <div className="content-lines-wrapper">
          <div className="content-lines-inner">
            <div className="content-lines"></div>
          </div>
        </div> */}

      <div className="container">
        <section className="pozo-section-slider pt-130">
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
                        <img src="/src/assets/images/slider/2.jpg" alt="" />
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
                        <img src="/src/assets/images/slider/1.jpg" alt="" />
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
                        <img src="/src/assets/images/gallery/21.jpg" alt="" />
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
      <div className="pozo-section">
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
                  href="/src/assets/images/gallery/01.jpg"
                  data-caption="Quisque in felis"
                >
                  <img
                    className="img-fluid"
                    src="/src/assets/images/gallery/01.jpg"
                    alt=""
                  />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href="/src/assets/images/gallery/02.jpg"
                  data-caption="Pellentesque habitant"
                >
                  <img
                    className="img-fluid"
                    src="/src/assets/images/gallery/02.jpg"
                    alt=""
                  />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href="/src/assets/images/gallery/11.jpg"
                  data-caption="Curabitur convallis"
                >
                  <img
                    className="img-fluid"
                    src="/src/assets/images/gallery/11.jpg"
                    alt=""
                  />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href="/src/assets/images/gallery/03.jpg"
                  data-caption="Quisque in dolor"
                >
                  <img
                    className="img-fluid"
                    src="/src/assets/images/gallery/03.jpg"
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
                  href="/src/assets/images/gallery/18.jpg"
                  data-caption="Aliquam non luctus"
                >
                  <img
                    className="img-fluid"
                    src="/src/assets/images/gallery/18.jpg"
                    alt=""
                  />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href="/src/assets/images/gallery/17.jpg"
                  data-caption="Quality in felis"
                >
                  <img
                    className="img-fluid"
                    src="/src/assets/images/gallery/17.jpg"
                    alt=""
                  />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href="/src/assets/images/gallery/16.jpg"
                  data-caption="Vivamus a nisi"
                >
                  <img
                    className="img-fluid"
                    src="/src/assets/images/gallery/16.jpg"
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
                  href="/src/assets/images/gallery/08.jpg"
                  data-caption="Mauris pretium"
                >
                  <img
                    className="img-fluid"
                    src="/src/assets/images/gallery/08.jpg"
                    alt=""
                  />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href="/src/assets/images/gallery/09.jpg"
                  data-caption="Nunc blandit purus"
                >
                  <img
                    className="img-fluid"
                    src="/src/assets/images/gallery/09.jpg"
                    alt=""
                  />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href="/src/assets/images/gallery/07.jpg"
                  data-caption="Nunc ultrices tellus"
                >
                  <img
                    className="img-fluid"
                    src="/src/assets/images/gallery/07.jpg"
                    alt=""
                  />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href="/src/assets/images/gallery/19.jpg"
                  data-caption="Orci varius natoque"
                >
                  <img
                    className="img-fluid"
                    src="/src/assets/images/gallery/19.jpg"
                    alt=""
                  />
                </a>
              </figure>
            </div>
          </div>
          {/* Show more section */}
          <div className="row mb-4 align-items-stretch mt-60">
            <div className="col-12">
              <div className="pozo-show-more-container">
                <div
                  className="row align-items-stretch pozo-photos"
                  id="pozo-section-photos"
                >
                  <div
                    className="col-md-4 animate-box"
                    data-animate-effect="fadeInUp"
                  >
                    <figure>
                      <a
                        className="d-block mb-4"
                        data-fancybox="images"
                        href="/src/assets/images/gallery/12.jpg"
                        data-caption="Vestibulum leo velit"
                      >
                        <img
                          className="img-fluid"
                          src="/src/assets/images/gallery/12.jpg"
                          alt=""
                        />
                      </a>
                    </figure>
                    <figure>
                      <a
                        className="d-block mb-4"
                        data-fancybox="images"
                        href="/src/assets/images/gallery/05.jpg"
                        data-caption="Etiam imperdiet hendrerit"
                      >
                        <img
                          className="img-fluid"
                          src="/src/assets/images/gallery/05.jpg"
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
                        href="/src/assets/images/gallery/13.jpg"
                        data-caption="Nulla turpis elementum"
                      >
                        <img
                          className="img-fluid"
                          src="/src/assets/images/gallery/13.jpg"
                          alt=""
                        />
                      </a>
                    </figure>
                    <figure>
                      <a
                        className="d-block mb-4"
                        data-fancybox="images"
                        href="/src/assets/images/gallery/06.jpg"
                        data-caption="Pellentesque habitant"
                      >
                        <img
                          className="img-fluid"
                          src="/src/assets/images/gallery/06.jpg"
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
                        href="/src/assets/images/gallery/14.jpg"
                        data-caption="Quisque in felis"
                      >
                        <img
                          className="img-fluid"
                          src="/src/assets/images/gallery/14.jpg"
                          alt=""
                        />
                      </a>
                    </figure>
                  </div>
                </div>
              </div>
              <div
                className="pozo-more-wrapper txt-center animate-box"
                data-animate-effect="fadeInUp"
              >
                <a href="" className="pozo-more-trigger flex">
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
