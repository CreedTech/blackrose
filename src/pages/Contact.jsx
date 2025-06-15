import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { name, email, phone, subject, message } = formData;

    if (!name.trim()) {
      toast.error('Name is required');
      return false;
    }

    if (!email.trim()) {
      toast.error('Email is required');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (!phone.trim()) {
      toast.error('Phone number is required');
      return false;
    }

    if (!subject.trim()) {
      toast.error('Subject is required');
      return false;
    }

    if (!message.trim()) {
      toast.error('Message is required');
      return false;
    }

    if (message.length > 2000) {
      toast.error('Message is too long. Please keep it under 2000 characters.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${backendUrl}/contact/submit`,
        formData
      );

      if (response.data.success) {
        setIsSubmitted(true);
        setReferenceId(response.data.referenceId);
        toast.success(
          'Message sent successfully! We will get back to you soon.'
        );

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error(
        error.response?.data?.message ||
          'Failed to send message. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setReferenceId('');
  };

  if (isSubmitted) {
    return (
      <div className="relative px-4 py-10 max-w-2xl mx-auto md:mt-10 mt-0 text-primary font-medium">
        <div className="border border-gray-900 rounded-md p-8">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="success-message  p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
                <h2 className="text-3xl font-bold text-primary mb-4">
                  Message Sent Successfully!
                </h2>
                <p className="text-gray-900 mb-4">
                  Thank you for reaching out to BlackRose Photography. We&apos;ve
                  received your message and will get back to you within 24
                  hours.
                </p>
                <div className="bg-gray-900 p-4 rounded-lg mb-6">
                  <p className="text-base ">
                    <strong>Reference ID:</strong> #{referenceId}
                  </p>
                  <p className="text-md  mt-2">
                    Please keep this reference ID for your records.
                  </p>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={resetForm}
                    className="bg-primary text-light px-6 py-3 rounded-md"
                  >
                    Send Another Message
                  </button>
                  <div className="text-center">
                    <p className="text-base ">
                      Need immediate assistance? Call us at{' '}
                      <a
                        href="tel:+2349137104825"
                        className="text-gray-900 hover:underline"
                      >
                        +234 913 710 4825
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="contact next-section-contact md:mt-10 mt-0 text-primary font-medium">
      <div className="container">
        <div className="row">
          <div
            className="section-head col-md-12 text-center animate-box"
            data-animate-effect="fadeInUp"
          >
            <h2>Contact Us</h2>
            <p className="text-primary mt-4 max-w-2xl mx-auto">
              Ready to capture your special moments? Get in touch with BlackRose
              Photography and let&apos;s discuss how we can bring your vision to
              life.
            </p>
          </div>
          <div
            className="col-md-12 md:mb-60 mb-20 animate-box"
            data-animate-effect="fadeInUp"
          >
            <div className="google-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.2929618316434!2d4.093728976517282!3d7.542995392470506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039c272d5bf578f%3A0x2b26947f4f672add!2sIbadan%20-%20Iwo%20Rd%2C%20Nigeria!5e0!3m2!1sen!2suk!4v1746577164385!5m2!1sen!2suk"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                title="BlackRose Photography Location"
              ></iframe>
            </div>
          </div>

          <div
            className="col-md-4 md:mb-60 mb-20 animate-box"
            data-animate-effect="fadeInUp"
          >
            <h4>BlackRose Photography</h4>
            <p>
              Capturing life&apos;s most precious moments with artistic vision and
              professional expertise. From weddings to portraits, we bring your
              stories to life through the lens.
            </p>
            <div className="mt-6">
              <h5 className="font-semibold mb-3">Our Services</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Wedding Photography</li>
                <li>• Portrait Sessions</li>
                <li>• Family Photography</li>
                <li>• Event Coverage</li>
                <li>• Commercial Photography</li>
              </ul>
            </div>
          </div>

          <div
            className="col-md-4 md:mb-60 mb-20 animate-box"
            data-animate-effect="fadeInUp"
          >
            <div className="space-y-6">
              <div>
                <h4 className="flex items-center">
                  <span className="mr-2">📞</span> Phone
                </h4>
                <p>
                  <a
                    href="tel:+2349137104825"
                    className="text-primary hover:underline"
                  >
                    +234 913 710 4825
                  </a>
                </p>
              </div>

              <div>
                <h4 className="flex items-center">
                  <span className="mr-2">📧</span> Email
                </h4>
                <p>
                  <a
                    href="mailto:admin@blackrose.com"
                    className="text-primary hover:underline"
                  >
                    admin@blackrose.com
                  </a>
                </p>
              </div>

              <div>
                <h4 className="flex items-center">
                  <span className="mr-2">📍</span> Address
                </h4>
                <p>
                  Ibadan - Iwo Road
                  <br />
                  Nigeria
                </p>
              </div>

              <div>
                <h4 className="flex items-center">
                  <span className="mr-2">🕒</span> Business Hours
                </h4>
                <p className="text-sm text-gray-800">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                  <br />
                  Sunday: By appointment only
                </p>
              </div>
            </div>
          </div>

          <div
            className="col-md-4 md:mb-60 mb-20 animate-box relative transition-all duration-300 ease-out"
            data-animate-effect="fadeInUp"
          >
            <div>
              <h4>Drop me a line!</h4>
            </div>
            <form onSubmit={handleSubmit} className="contact__form">
              <div className="row">
                <div className="col-12 form-group">
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <input
                    name="email"
                    type="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <input
                    name="phone"
                    type="text"
                    placeholder="Your Phone *"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="col-md-12 form-group">
                  <input
                    name="subject"
                    type="text"
                    placeholder="Subject *"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                {/* <div className="col-md-12 form-group">
                  <textarea
                    name="message"
                    cols="30"
                    rows="4"
                    placeholder="Message *"
                    required
                  ></textarea>
                </div> */}
                <div className="col-md-12 form-group">
                  <textarea
                    name="message"
                    cols="30"
                    rows="4"
                    placeholder="Your Message *"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    maxLength={2000}
                    // className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 resize-vertical"
                  ></textarea>
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {formData.message.length}/2000 characters
                  </div>
                </div>
                {/* <div className="col-md-12">
                  <input name="submit" type="submit" value="Send Message" />
                </div> */}
                <div className="col-md-12">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="border border-primary bg-primary rounded-md px-10 py-3 flex-1 relative overflow-hidden group transition-all duration-300"
                  >
                    {/* <span className="absolute inset-0 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0"></span> */}
                    <span className="relative text-light  transition-colors duration-300 z-10 ">
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-light"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </span>
                  </button>
                  {/* <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button> */}
                </div>
              </div>
            </form>
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                We respect your privacy. Your information will never be shared
                with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

// const Contactus = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: '',
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [referenceId, setReferenceId] = useState('');

//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const validateForm = () => {
//     const { name, email, phone, subject, message } = formData;

//     if (!name.trim()) {
//       toast.error('Name is required');
//       return false;
//     }

//     if (!email.trim()) {
//       toast.error('Email is required');
//       return false;
//     }

//     if (!/\S+@\S+\.\S+/.test(email)) {
//       toast.error('Please enter a valid email address');
//       return false;
//     }

//     if (!phone.trim()) {
//       toast.error('Phone number is required');
//       return false;
//     }

//     if (!subject.trim()) {
//       toast.error('Subject is required');
//       return false;
//     }

//     if (!message.trim()) {
//       toast.error('Message is required');
//       return false;
//     }

//     if (message.length > 2000) {
//       toast.error('Message is too long. Please keep it under 2000 characters.');
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/contact/submit`,
//         formData
//       );

//       if (response.data.success) {
//         setIsSubmitted(true);
//         setReferenceId(response.data.referenceId);
//         toast.success(
//           'Message sent successfully! We will get back to you soon.'
//         );

//         // Reset form
//         setFormData({
//           name: '',
//           email: '',
//           phone: '',
//           subject: '',
//           message: '',
//         });
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error('Contact form error:', error);
//       toast.error(
//         error.response?.data?.message ||
//           'Failed to send message. Please try again.'
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setIsSubmitted(false);
//     setReferenceId('');
//   };

//   if (isSubmitted) {
//     return (
//       <div className="contact next-section-contact md:mt-10 mt-0">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-12 text-center">
//               <div className="success-message bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
//                 <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//                   <svg
//                     className="h-8 w-8 text-green-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M5 13l4 4L19 7"
//                     ></path>
//                   </svg>
//                 </div>
//                 <h2 className="text-3xl font-bold text-gray-900 mb-4">
//                   Message Sent Successfully!
//                 </h2>
//                 <p className="text-gray-600 mb-4">
//                   Thank you for reaching out to BlackRose Photography. We've
//                   received your message and will get back to you within 24
//                   hours.
//                 </p>
//                 <div className="bg-gray-50 p-4 rounded-lg mb-6">
//                   <p className="text-sm text-gray-700">
//                     <strong>Reference ID:</strong> #{referenceId}
//                   </p>
//                   <p className="text-sm text-gray-700 mt-2">
//                     Please keep this reference ID for your records.
//                   </p>
//                 </div>
//                 <div className="space-y-3">
//                   <button
//                     onClick={resetForm}
//                     className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     Send Another Message
//                   </button>
//                   <div className="text-center">
//                     <p className="text-sm text-gray-500">
//                       Need immediate assistance? Call us at{' '}
//                       <a
//                         href="tel:+16503330000"
//                         className="text-blue-600 hover:underline"
//                       >
//                         +1 650-333-0000
//                       </a>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="contact next-section-contact md:mt-10 mt-0">
//       <div className="container">
//         <div className="row">
//           <div
//             className="section-head col-md-12 text-center animate-box"
//             data-animate-effect="fadeInUp"
//           >
//             <h2>Contact Us</h2>
//             <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
//               Ready to capture your special moments? Get in touch with BlackRose
//               Photography and let's discuss how we can bring your vision to
//               life.
//             </p>
//           </div>

//           <div
//             className="col-md-12 mb-60 animate-box"
//             data-animate-effect="fadeInUp"
//           >
//             <div className="google-map">
//               <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.2929618316434!2d4.093728976517282!3d7.542995392470506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1039c272d5bf578f%3A0x2b26947f4f672add!2sIbadan%20-%20Iwo%20Rd%2C%20Nigeria!5e0!3m2!1sen!2suk!4v1746577164385!5m2!1sen!2suk"
//                 width="100%"
//                 height="500"
//                 style={{ border: 0 }}
//                 allowFullScreen=""
//                 loading="lazy"
//                 title="BlackRose Photography Location"
//               ></iframe>
//             </div>
//           </div>

//           <div
//             className="col-md-4 mb-60 animate-box"
//             data-animate-effect="fadeInUp"
//           >
//             <h4>BlackRose Photography</h4>
//             <p>
//               Capturing life's most precious moments with artistic vision and
//               professional expertise. From weddings to portraits, we bring your
//               stories to life through the lens.
//             </p>

//             <div className="mt-6">
//               <h5 className="font-semibold mb-3">Our Services</h5>
//               <ul className="text-sm text-gray-600 space-y-1">
//                 <li>• Wedding Photography</li>
//                 <li>• Portrait Sessions</li>
//                 <li>• Family Photography</li>
//                 <li>• Event Coverage</li>
//                 <li>• Commercial Photography</li>
//               </ul>
//             </div>
//           </div>

//           <div
//             className="col-md-4 mb-60 animate-box"
//             data-animate-effect="fadeInUp"
//           >
//             <div className="space-y-6">
//               <div>
//                 <h4 className="flex items-center">
//                   <span className="mr-2">📞</span> Phone
//                 </h4>
//                 <p>
//                   <a
//                     href="tel:+2349137104825"
//                     className="text-blue-600 hover:underline"
//                   >
//                     +234 913 710 4825
//                   </a>
//                 </p>
//               </div>

//               <div>
//                 <h4 className="flex items-center">
//                   <span className="mr-2">📧</span> Email
//                 </h4>
//                 <p>
//                   <a
//                     href="mailto:admin@blackrose.com"
//                     className="text-blue-600 hover:underline"
//                   >
//                     admin@blackrose.com
//                   </a>
//                 </p>
//               </div>

//               <div>
//                 <h4 className="flex items-center">
//                   <span className="mr-2">📍</span> Address
//                 </h4>
//                 <p>
//                   Ibadan - Iwo Road
//                   <br />
//                   Nigeria
//                 </p>
//               </div>

//               <div>
//                 <h4 className="flex items-center">
//                   <span className="mr-2">🕒</span> Business Hours
//                 </h4>
//                 <p className="text-sm text-gray-600">
//                   Monday - Friday: 9:00 AM - 6:00 PM
//                   <br />
//                   Saturday: 10:00 AM - 4:00 PM
//                   <br />
//                   Sunday: By appointment only
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div
//             className="col-md-4 mb-60 animate-box relative"
//             data-animate-effect="fadeInUp"
//           >
//             <div>
//               <h4>Drop us a line!</h4>
//               <p className="text-sm text-gray-600 mb-4">
//                 Fill out the form below and we'll get back to you as soon as
//                 possible.
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="contact__form">
//               <div className="row">
//                 <div className="col-12 form-group">
//                   <input
//                     name="name"
//                     type="text"
//                     placeholder="Your Name *"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     disabled={isLoading}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
//                   />
//                 </div>

//                 <div className="col-md-6 form-group">
//                   <input
//                     name="email"
//                     type="email"
//                     placeholder="Your Email *"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     disabled={isLoading}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
//                   />
//                 </div>

//                 <div className="col-md-6 form-group">
//                   <input
//                     name="phone"
//                     type="tel"
//                     placeholder="Your Phone *"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                     disabled={isLoading}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
//                   />
//                 </div>

//                 <div className="col-md-12 form-group">
//                   <input
//                     name="subject"
//                     type="text"
//                     placeholder="Subject *"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     required
//                     disabled={isLoading}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100"
//                   />
//                 </div>

//                 <div className="col-md-12 form-group">
//                   <textarea
//                     name="message"
//                     cols="30"
//                     rows="4"
//                     placeholder="Your Message *"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     disabled={isLoading}
//                     maxLength={2000}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 resize-vertical"
//                   ></textarea>
//                   <div className="text-right text-xs text-gray-500 mt-1">
//                     {formData.message.length}/2000 characters
//                   </div>
//                 </div>

//                 <div className="col-md-12">
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                   >
//                     {isLoading ? (
//                       <>
//                         <svg
//                           className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         Sending...
//                       </>
//                     ) : (
//                       'Send Message'
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </form>

//             <div className="mt-4 text-center">
//               <p className="text-xs text-gray-500">
//                 We respect your privacy. Your information will never be shared
//                 with third parties.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contactus;
