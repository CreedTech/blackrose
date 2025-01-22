const Gallery = () => {
  return (
    <div className="pozo-section pt-130">
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
                href="../assets/images/gallery/01.jpg"
                data-caption="Quisque in felis"
              >
                <img
                  className="img-fluid"
                  src="../assets/images/gallery/01.jpg"
                  alt=""
                />
              </a>
            </figure>
            <figure>
              <a
                className="d-block mb-4"
                data-fancybox="images"
                href="../assets/images/gallery/02.jpg"
                data-caption="Pellentesque habitant"
              >
                <img
                  className="img-fluid"
                  src="../assets/images/gallery/02.jpg"
                  alt=""
                />
              </a>
            </figure>
            <figure>
              <a
                className="d-block mb-4"
                data-fancybox="images"
                href="../assets/images/gallery/11.jpg"
                data-caption="Curabitur convallis"
              >
                <img
                  className="img-fluid"
                  src="../assets/images/gallery/11.jpg"
                  alt=""
                />
              </a>
            </figure>
            <figure>
              <a
                className="d-block mb-4"
                data-fancybox="images"
                href="../assets/images/gallery/03.jpg"
                data-caption="Quisque in dolor"
              >
                <img
                  className="img-fluid"
                  src="../assets/images/gallery/03.jpg"
                  alt=""
                />
              </a>
            </figure>
          </div>
          <div className="col-md-4 animate-box" data-animate-effect="fadeInUp">
            <figure>
              <a
                className="d-block mb-4"
                data-fancybox="images"
                href="../assets/images/gallery/18.jpg"
                data-caption="Aliquam non luctus"
              >
                <img
                  className="img-fluid"
                  src="../assets/images/gallery/18.jpg"
                  alt=""
                />
              </a>
            </figure>
            <figure>
              <a
                className="d-block mb-4"
                data-fancybox="images"
                href="../assets/images/gallery/17.jpg"
                data-caption="Quality in felis"
              >
                <img
                  className="img-fluid"
                  src="../assets/images/gallery/17.jpg"
                  alt=""
                />
              </a>
            </figure>
            <figure>
              <a
                className="d-block mb-4"
                data-fancybox="images"
                href="../assets/images/gallery/16.jpg"
                data-caption="Vivamus a nisi"
              >
                <img
                  className="img-fluid"
                  src="../assets/images/gallery/16.jpg"
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
                href="../assets/images/gallery/08.jpg"
                data-caption="Mauris pretium"
              >
                <img
                  className="img-fluid"
                  src="../assets/images/gallery/08.jpg"
                  alt=""
                />
              </a>
            </figure>
            <figure>
              <a
                className="d-block mb-4"
                data-fancybox="images"
                href="../assets/images/gallery/09.jpg"
                data-caption="Nunc blandit purus"
              >
                <img
                  className="img-fluid"
                  src="../assets/images/gallery/09.jpg"
                  alt=""
                />
              </a>
            </figure>
            <figure>
              <a
                className="d-block mb-4"
                data-fancybox="images"
                href="../assets/images/gallery/07.jpg"
                data-caption="Nunc ultrices tellus"
              >
                <img
                  className="img-fluid"
                  src="../assets/images/gallery/07.jpg"
                  alt=""
                />
              </a>
            </figure>
            <figure>
              <a
                className="d-block mb-4"
                data-fancybox="images"
                href="../assets/images/gallery/19.jpg"
                data-caption="Orci varius natoque"
              >
                <img
                  className="img-fluid"
                  src="../assets/images/gallery/19.jpg"
                  alt=""
                />
              </a>
            </figure>
          </div>
        </div>
        <div className="row mb-4 align-items-stretch mt-60">
          <div className="col-12">
            {/* show more */}
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
                      href="../assets/images/gallery/12.jpg"
                      data-caption="Vestibulum leo velit"
                    >
                      <img
                        className="img-fluid"
                        src="../assets/images/gallery/12.jpg"
                        alt=""
                      />
                    </a>
                  </figure>
                  <figure>
                    <a
                      className="d-block mb-4"
                      data-fancybox="images"
                      href="../assets/images/gallery/05.jpg"
                      data-caption="Etiam imperdiet hendrerit"
                    >
                      <img
                        className="img-fluid"
                        src="../assets/images/gallery/05.jpg"
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
                      href="../assets/images/gallery/13.jpg"
                      data-caption="Nulla turpis elementum"
                    >
                      <img
                        className="img-fluid"
                        src="../assets/images/gallery/13.jpg"
                        alt=""
                      />
                    </a>
                  </figure>
                  <figure>
                    <a
                      className="d-block mb-4"
                      data-fancybox="images"
                      href="../assets/images/gallery/06.jpg"
                      data-caption="Pellentesque habitant"
                    >
                      <img
                        className="img-fluid"
                        src="../assets/images/gallery/06.jpg"
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
                      href="../assets/images/gallery/14.jpg"
                      data-caption="Quisque in felis"
                    >
                      <img
                        className="img-fluid"
                        src="../assets/images/gallery/14.jpg"
                        alt=""
                      />
                    </a>
                  </figure>
                </div>
              </div>
            </div>
            {/* add more */}
            <div
              className="pozo-more-wrapper txt-center animate-box"
              data-animate-effect="fadeInUp"
            >
              <a href="/" className="pozo-more-trigger flex">
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
