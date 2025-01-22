const About = () => {
  return (
    <section className="about pt-130">
      <div className="container">
        <div className="row">
          <div
            className="col-md-4 image animate-box"
            data-animate-effect="fadeInUp"
          >
            <div className="img">
              <img src="../assets/images/about.jpg" alt="" />
            </div>
          </div>
          <div
            className="col-md-8 image animate-box"
            data-animate-effect="fadeInUp"
          >
            {/* About */}
            <div className="row">
              <div className="col-md-12">
                <h3>
                  Welcome to <span>Blackrose</span>
                </h3>
                <p>
                  Curabitur mollis tortor ac congue porta. Donec vel eros
                  rhoncus nulla posuere interdum vitae nec lectus. Aenean rutrum
                  tortor, at tincidunt arcu malesuada ultricies. Praesent eu
                  aliquam ipsum. Sed at turpis vitae ex commodo fermentum vitae
                  dapibus libero. Curabitur orci orci, blandit ut fermentum sed,
                  eleifend vitae eros. Phasellus id justo sagittis, sagittis
                  quam sit amet porttitor enim.
                </p>
                <p>
                  Donec arcu lectus, bibendum sed turpis ut, porta dictum leo.
                  Quisque tincidunt ante et est female suada volutsan. Praesent
                  ultrices mi ut nunc volutpat tempus. Cras vitae nibh in neque
                  cursus finibus ac et metus. Nulla at euismod sem. Morbi vitae
                  eros orci. Quisque tincidunt ante et est malesuada.
                </p>

                <p>
                  <b>Phone :</b> +1 650-333-1138
                  <br />
                  <b>E-mail :</b> photography@pozo.com
                  <br />
                  <b>Skype :</b> @pozoartphoto
                  <br />
                  <b>500px :</b> /pozoartphoto
                </p>
              </div>
            </div>
            {/* Team */}
            <div className="row mt-60">
              <div className="col-md-12">
                <h3>
                  Professional <span>Team</span>
                </h3>
                <br />
              </div>
              <div className="col-md-6">
                <div className="team-holder">
                  <div className="team-image-holder">
                    <a href="team-details.html">
                      <img
                        src="../assets/images/team/01.jpg"
                        className="img-fluid"
                        alt=""
                      />
                      <div className="team-side-info">
                        <h4 className="team-name">Petter Snow</h4>
                        <h6 className="team-position">Wedding Photographer</h6>
                      </div>
                    </a>
                  </div>
                </div>
                <ul className="team-info-social text-center">
                  <li>
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-behance"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <div className="team-holder">
                  <div className="team-image-holder">
                    <a href="team-details.html">
                      <img
                        src="../assets/images/team/02.jpg"
                        className="img-fluid"
                        alt=""
                      />
                      <div className="team-side-info">
                        <h4 className="team-name">Emma White</h4>
                        <h6 className="team-position">Model Photographer</h6>
                      </div>
                    </a>
                  </div>
                </div>
                <ul className="team-info-social text-center">
                  <li>
                    <a href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-behance"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
