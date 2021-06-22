import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { updateCourse } from "../../stateHandling/utils/serverRequests";
import { AuthContext } from "../../stateHandling/contexts/AuthContext";
import { StateContext } from "../../stateHandling/contexts/StateContext";
import "./UpdateCourse.scss";
import { useHistory } from "react-router-dom";

export function UpdateCourse({ match }) {
  const { user } = useContext(AuthContext);
  const {
    state: { courses },
    dispatch,
  } = useContext(StateContext);
  const history = useHistory();

  const paramsId = match.params.id;

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    ...courses.filter((course) => course._id === paramsId)[0],
  });

  const imageType = ["image/png", "image/jpeg"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCourse(formData, file, user, dispatch, paramsId);
    history.push("/dashboard");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && imageType.includes(selectedFile.type)) {
      setFile(selectedFile);
    }
    console.log(file);
  };

  return user?.user.role === "tutor" ? (
    <div className="newCourse">
      <div className="newCourse__header">
        <h3>Update Course</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="newCourse__form_group">
          <div className="newCourse__label">Title</div>
          <input
            className="newCourse__input"
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            placeholder="Title of your course..."
            required
          />
        </div>
        <div className="newCourse__form_group">
          <div className="newCourse__label">Price (in $)</div>
          <input
            className="newCourse__input"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="How much would it cost?"
            required
          />
        </div>
        <div className="newCourse__form_group">
          <div className="newCourse__label ">
            Thumbnail
            <div className="newCourse__file_upload">
              <input
                name="thumbnail"
                onChange={handleFileChange}
                type="file"
                required
              />
              <i className="bx bxs-cloud-upload "></i>
            </div>
          </div>
        </div>
        <div className="newCourse__form_group">
          <div className="newCourse__label"> Description</div>
          <textarea
            className="newCourse__input"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us about the course..."
            required
          ></textarea>
        </div>
        <div className="newCourse__form_group">
          <div className="newCourse__label">Category</div>
          <input
            className="newCourse__input"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="eg. Web development, Animations, Android development, etc..."
            required
          />
        </div>
        <div className="newCourse__form_group">
          <div className="newCourse__label">Level</div>
          <select
            className="newCourse__input"
            type="text"
            name="level"
            onChange={handleChange}
            placeholder="Give level..."
            required
          >
            <option value="" selected disabled>
              Difficulty?
            </option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <button type="submit">Update Course</button>
      </form>
    </div>
  ) : (
    <Redirect to="/usertype" />
  );
}
