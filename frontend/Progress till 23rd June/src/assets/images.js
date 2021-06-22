const path = process.env.PUBLIC_URL + "/images";

const images = {
  prev: { id: 0, src: `${path}/prev.png`, alt: "previous-icon" },
  next: { id: 1, src: `${path}/next.png`, alt: "next-icon" },
  bell: { id: 2, src: `${path}/bell.png`, alt: "bell-icon" },
  clock: { id: 3, src: `${path}/clock.png`, alt: "clock-icon" },
  home: { id: 4, src: `${path}/home.png`, alt: "home-icon" },
  logout: { id: 5, src: `${path}/logout.png`, alt: "logout-icon" },
  menu: { id: 6, src: `${path}/menu.png`, alt: "menu-icon" },
  profile: { id: 7, src: `${path}/profile.png`, alt: "profile-icon" },
  star: { id: 8, src: `${path}/star.png`, alt: "star-icon" },
  web_dev: { id: 9, src: `${path}/web_dev.jpg`, alt: "course-icon" },
  student: { id: 10, src: `${path}/student.jpg`, alt: "student-icon" },
  tutor: { id: 11, src: `${path}/tutor.jpg`, alt: "tutor-icon" },
  fire: { id: 12, src: `${path}/fire.png`, alt: "rating-icon" },
  back: { id: 13, src: `${path}/back.png`, alt: "back-icon" },
  forward: { id: 14, src: `${path}/forward.png`, alt: "forward-icon" },
  cart: { id: 15, src: `${path}/cart.png`, alt: "cart-icon" },
  love: { id: 16, src: `${path}/love.png`, alt: "love-icon" },
  like: { id: 17, src: `${path}/like.png`, alt: "like-icon" },
  heart: { id: 18, src: `${path}/heart.png`, alt: "heart-icon" },
  detail: { id: 19, src: `${path}/detail.png`, alt: "detail-icon" },
  add: { id: 20, src: `${path}/add.png`, alt: "add-icon" },
};

export default images;
