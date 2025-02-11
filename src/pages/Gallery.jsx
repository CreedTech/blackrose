import { assets } from '../assets/images/assets';

const Gallery = () => {
  return (
    <div className="blackrose-section md:mt-10 mt-0">
      <div className="container">
        <div className="row mb-4">
          <div
            className="section-head text-center col-md-12 animate-box"
            data-animate-effect="fadeInUp"
          >
            <h4>Image Gallery</h4>
          </div>
          <div className="col-md-4 animate-box" data-animate-effect="fadeInUp">
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
                <img className="img-fluid" src={assets.galleryEleven} alt="" />
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
          <div className="col-md-4 animate-box" data-animate-effect="fadeInUp">
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
                <img className="img-fluid" src={assets.gallerySixteen} alt="" />
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
                href={assets.galleryNineteen}
                data-caption="Orci varius natoque"
              >
                <img
                  className="img-fluid"
                  src={assets.galleryNineteen}
                  alt=""
                />
              </a>
            </figure>
          </div>
        </div>
        <div className="row mb-4 align-items-stretch mt-60">
          <div className="col-12">
            {/* show more */}
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
            {/* add more */}
            <div
              className="blackrose-more-wrapper txt-center animate-box"
              data-animate-effect="fadeInUp"
            >
              <a href="/" className="blackrose-more-trigger flex">
                <span className="plus flex-center">&nbsp;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
