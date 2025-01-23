import { assets } from '../assets/images/assets';

const Lifestyle = () => {
  const blogPosts = [
    {
      id: 1,
      image: assets.blogOne,
      title: 'Wedding pellentesque moss',
      category: 'Wedding',
      date: 'Dec 28, 2025',
      link: '',
    },
    {
      id: 2,
      image: assets.blogTwo,
      title: 'Quisque tincidunt wedding',
      category: 'Wedding',
      date: 'Dec 26, 2025',
      link: '',
    },
    {
      id: 3,
      image: assets.blogThree,
      title: 'Family fusce fermentum',
      category: 'Family',
      date: 'Dec 25, 2025',
      link: 'blog.html',
    },
    {
      id: 4,
      image: assets.blogFour,
      title: 'Movie vellentesque Lue',
      category: 'Movie',
      date: 'Dec 24, 2025',
      link: '',
    },
    {
      id: 5,
      image: assets.blogFive,
      title: 'Curabitur tincidunt family',
      category: 'Family',
      date: 'Dec 23, 2025',
      link: '',
    },
    {
      id: 6,
      image: assets.blogSix,
      title: 'Portrait model verotum',
      category: 'Model',
      date: 'Dec 22, 2025',
      link: '',
    },
    {
      id: 7,
      image: assets.blogSeven,
      title: 'Wedding tristique leo',
      category: 'Wedding',
      date: 'Dec 20, 2025',
      link: '',
    },
    {
      id: 8,
      image: assets.blogNine,
      title: 'Travel rutrum finibus',
      category: 'Travel',
      date: 'Dec 19, 2025',
      link: '',
    },
    {
      id: 9,
      image: assets.blogEight,
      title: 'Wedding mauris sapien',
      category: 'Family',
      date: 'Dec 18, 2025',
      link: '',
    },
  ];
  return (
    <section className="blog pt-130">
      <div className="container">
        <div className="row">
          <div
            className="section-head col-md-12 text-start animate-box"
            data-animate-effect="fadeInUp"
          >
            <h4>Lifestyle Blog</h4>
          </div>

          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="col-md-4 mb-40 animate-box"
              data-animate-effect="fadeInUp"
            >
              <div className="item">
                <div className="post-img">
                  <div className="img">
                    <a href={post.link}>
                      <img src={post.image} alt={post.title} />
                    </a>
                  </div>
                </div>
                <div className="cont">
                  <h6>
                    <a href={post.link}>{post.title}</a>
                  </h6>
                  <div className="info">
                    <a href={post.link}>
                      {post.category} / {post.date}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          <div
            className="col-md-12 mt-40 mb-60 text-center animate-box"
            data-animate-effect="fadeInUp"
          >
            <ul className="blackrose-pagination-wrap align-center">
              <li>
                <a href="">
                  <i className="fa fa-angle-left"></i>
                </a>
              </li>
              <li>
                <a href="">1</a>
              </li>
              <li>
                <a href="" className="active">
                  2
                </a>
              </li>
              <li>
                <a href="">3</a>
              </li>
              <li>
                <a href="">
                  <i className="fa fa-angle-right"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lifestyle;
