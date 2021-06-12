import axios from 'axios';

// Uncomment to run in deployed server

const API = axios.create({ baseURL: 'https://cloudversity-api-server.herokuapp.com/' });

// To run in local server
// const API = axios.create({ baseURL: 'http://localhost:5233' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchCourses = () => API.get(`/allcourses`);
export const fetchCourse = (courseId) => API.get(`/course/${courseId}`);
export const addVideo = (courseId,videoData) => API.post(`/addvideo/${courseId}`, videoData);
export const addReview = (courseId, reviewData) => API.post(`/review/${courseId}`, reviewData);
export const likeCourse = (CourseId) => API.patch(`/likecourse/${CourseId}`);
export const updateCourse = (CourseId, updatedCourseData) => API.patch(`/course/${CourseId}`, updatedCourseData);
export const deleteCourse = (CourseId) => API.delete(`/course/${CourseId}`);

export const student_signIn = (formData) => API.post('/stu/login', formData);
export const student_signUp = (formData) => API.post('/stu/signup', formData);
export const tutor_signIn = (formData) => API.post('/tut/login', formData);
export const tutor_signUp = (formData) => API.post('/tut/signup', formData);

export const signIn = (formData) => API.post('/stu/login', formData);
export const signUp = (formData) => API.post('/tut/signup', formData);