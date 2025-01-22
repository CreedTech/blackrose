
const Contact = () => {
  return (
    <div className="contact next-section-contact pt-130">
      <div className="container">
        <div className="row">
          <div
            className="section-head col-md-12 text-center animate-box"
            data-animate-effect="fadeInUp"
          >
            <h2>Contact Us</h2>
          </div>
          <div
            className="col-md-12 mb-60 animate-box"
            data-animate-effect="fadeInUp"
          >
            <div className="google-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1573147.7480448114!2d-74.84628175962355!3d41.04009641088412"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Map"
              ></iframe>
            </div>
          </div>

          <div
            className="col-md-4 mb-60 animate-box"
            data-animate-effect="fadeInUp"
          >
            <h4>BlackRose Photography</h4>
            <p>
              Our firm nisl sodales sit amet sapien idea placeran sodales oite.
             lorem erkjjw et kjebfds fleblfd leb lgrdfel.
            </p>
          
          </div>

          <div
            className="col-md-4 mb-60 animate-box"
            data-animate-effect="fadeInUp"
          >
            <h4>Phone</h4>
            <p>+1 650-333-0000</p>
            <h4>Email</h4>
            <p>photography@blackrose.com</p>
            <h4>Address</h4>
            <p>111, Nigeria</p>
          </div>

          <div
            className="col-md-4 mb-60 animate-box"
            data-animate-effect="fadeInUp"
          >
            <div>
              <h4>Drop me a line!</h4>
            </div>
            <form method="post" className="contact__form" action="/mail.php">
              <div className="row">
                <div className="col-12 form-group">
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name *"
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <input
                    name="email"
                    type="email"
                    placeholder="Your Email *"
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <input
                    name="phone"
                    type="text"
                    placeholder="Your Number *"
                    required
                  />
                </div>
                <div className="col-md-12 form-group">
                  <input
                    name="subject"
                    type="text"
                    placeholder="Subject *"
                    required
                  />
                </div>
                <div className="col-md-12 form-group">
                  <textarea
                    name="message"
                    cols="30"
                    rows="4"
                    placeholder="Message *"
                    required
                  ></textarea>
                </div>
                <div className="col-md-12">
                  <input name="submit" type="submit" value="Send Message" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
