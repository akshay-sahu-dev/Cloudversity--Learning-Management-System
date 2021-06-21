const url = process.env.PUBLIC_URL + "/images";

const images = {
  prev: { id: 0, src: `${url}/prev.png`, alt: "previous-icon" },
  next: { id: 1, src: `${url}/next.png`, alt: "next-icon" },
  bell: { id: 2, src: `${url}/bell.png`, alt: "bell-icon" },
  clock: { id: 3, src: `${url}/clock.png`, alt: "clock-icon" },
  home: { id: 4, src: `${url}/home.png`, alt: "home-icon" },
  logout: { id: 5, src: `${url}/logout.png`, alt: "logout-icon" },
  menu: { id: 6, src: `${url}/menu.png`, alt: "menu-icon" },
  profile: { id: 7, src: `${url}/profile.png`, alt: "profile-icon" },
  star: { id: 8, src: `${url}/star.png`, alt: "star-icon" },
  web_dev: { id: 9, src: `${url}/web_dev.jpg`, alt: "course-icon" },
  student: { id: 10, src: `${url}/student.jpg`, alt: "student-icon" },
  tutor: { id: 11, src: `${url}/tutor.jpg`, alt: "tutor-icon" },
  fire: { id: 12, src: `${url}/fire.png`, alt: "rating-icon" },
  back: { id: 13, src: `${url}/back.png`, alt: "back-icon" },
  forward: { id: 14, src: `${url}/forward.png`, alt: "forward-icon" },
  cart: { id: 15, src: `${url}/cart.png`, alt: "cart-icon" },
  love: { id: 16, src: `${url}/love.png`, alt: "love-icon" },
  like: { id: 17, src: `${url}/like.png`, alt: "like-icon" },
  heart: { id: 18, src: `${url}/heart.png`, alt: "heart-icon" },
};

export default images;
