// export const base_url = "https://cloudversity-api-server.herokuapp.com";
export const base_url = "http://localhost:5233";


export const courseApis = {
  GET: {
    allCourses: `/allcourses`,
    getCourseById: `/courses/:courseId`,
  },
  POST: {
    addCourse: `/addcourse`,
    addVideo: `/uploadvideo/:courseId`,
    enrollCourse: `/enroll/:courseId`,
    addToWishList: `/addtowishlist/:courseId`,
  },
  PATCH: {
    updateCourse: `/updatecourse/:courseId`,
    updateThumbnail: `/updatethumbnail/:courseId`,
  },
};

export const userApis = {
  GET: {},
  POST: {
    studentLogin: `/stu/login`,
    studentSignup: `/stu/signup`,
    tutorLogin: `/tut/login`,
    tutorSignup: `/tut/signup`,
  },
};
