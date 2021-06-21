import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { addCourse } from "../../stateHandling/utils/serverRequests";
import { AuthContext } from "../../stateHandling/contexts/AuthContext";
import "./NewCourse.scss";
import { StateContext } from "../../stateHandling/contexts/StateContext";

export function NewCourse() {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(StateContext);
  const history = useHistory();

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    courseName: "",
    price: 0,
    description: "",
    category: "",
    discount: 0,
    course_duration: 0,
    level: "",
  });

  const imageType = ["image/png", "image/jpeg"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(user);
    // const token = user.user.token;
    // console.log(token);
    // addCourse(formData, file, token);

    console.log(formData);
    if (addCourse(formData, file, user, dispatch)) {
      history.push("/dashboard");
    }

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
        <h3>Add New Course</h3>
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

            <option value="" defaultValue disabled>
              Difficulty?
            </option>
            <option value="Beginner">Beginner</option>

            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <button type="submit"> Add Course </button>

      </form>
    </div>
  ) : (
    <Redirect to="/usertype" />
  );
}
