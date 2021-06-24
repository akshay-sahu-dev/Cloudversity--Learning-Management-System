export const popularCourses = (courses) => {
  const sortedData = courses.filter((course) =>
    course.rating >= 3 ? course : null
  );
  return sortedData;
};
