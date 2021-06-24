import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../stateHandling/contexts/AuthContext";
import {
  getCourseById,
  deleteVideo,
  postReview,
} from "../../stateHandling/utils/serverRequests";
import "./CourseDetails.scss";
import VideoUploadModal from "../../components/VideoUploadModal";

export function CourseDetails({ match }) {
  const [courseDetails, setCourseDetails] = useState(null);
  const [publicId, setPublicId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [review, setReview] = useState({ reviewBody: "", rating: "" });
  const id = match.params.id;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getCourseById(id).then((data) => {
      setCourseDetails(data);
      if (data.videos.length) {
        setPublicId(data.videos[0].publicId);
        setVideoTitle(data.videos[0].title);
      }
    });
  }, [id]);

  const modalToggle = () => {
    setShowModal(!showModal);
  };

  const deleteSelectecVideo = async (videoId) => {
    const res = await deleteVideo(videoId, user?.user.token);
    if (!res) {
      return alert("Couldn't delete the video");
    }
    return alert("Video deleted sucessfully");
  };

  const fillStar = (e) => {
    setReview({ ...review, rating: e.target.id });
    if (e.target.className === "bx bxs-star gold") {
      e.target.className = "bx bx-star";
    } else {
      e.target.className = "bx bxs-star gold";
    }
    let count = e.target.id;
    for (let i = 1; i < count; i++) {
      if (e.target.id > 0) {
        console.log(e.target.id);

        e.target.previousElementSibling.className = "bx bxs-star gold";
        e.target = e.target.previousElementSibling;
      }
    }
  };

  const postreview = async (e) => {
    e.preventDefault();
    try {
      const res = await postReview(courseDetails._id, review, user?.user.token);
      console.log("Review Data before sending: ", review);
      if (res) {
        console.log(res);
        alert("Review posted successfully");
      }
    } catch (error) {
      console.log("Error occured: ", error);
    }
  };

  return (
    <div className={"details"}>
      <div className="details__title">
        <div>
          <h2>{courseDetails?.courseName}</h2>
          <small>
            by{" "}
            {`${courseDetails?.authorName.firstName} ${courseDetails?.authorName.lastName}`}
          </small>
          <h3>{videoTitle}</h3>
        </div>
      </div>
      <div className="details__content">
        <div className="details__content-left">
          {publicId && (
            <div className="details__content-left--video">
              <iframe
                className="iframe"
                style={{
                  width: "100%",
                  height: "100%",
                }}
                title="demo"
                src={
                  publicId
                    ? `https://player.cloudinary.com/embed/?cloud_name=cloudversity&public_id=tutor%20resources/${publicId}&fluid=true&controls=true&source_types%5B0%5D=mp4`
                    : null
                }
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                frameBorder="0"
              ></iframe>
            </div>
          )}
          <div className="details__content-left--info">
            <h4
              style={{
                margin: ".5rem",
                paddingBottom: ".5rem",
                borderBottom: "1px solid #000",
              }}
            >
              About
            </h4>
            <p style={{ margin: ".5rem", fontSize: "1.4rem" }}>
              {courseDetails?.description}
            </p>
          </div>
          <div className="details__content-left--reviews">
            <h2>Reviews</h2>
            {courseDetails?.reviews &&
              courseDetails.reviews.map((review) => {
                return (
                  <>
                    <div className="review" key={review._id}>
                      <div className="rating-grp">
                        <h4>{review.reviewerName}</h4>
                        <span>{review.rating} Star</span>
                      </div>
                      <p>{review.reviewBody}</p>
                    </div>
                  </>
                );
              })}
          </div>
        </div>

        <div className="details__content-right">
          {showModal && (
            <div className="details__content-right--uploadvideo">
              <VideoUploadModal id={id} user={user} modalToggle={modalToggle} />
            </div>
          )}

          {user && (
            <div
              className="details__content-right--uploadbtn"
              onClick={modalToggle}
            >
              Add a new Video
              <i className="bx bx-video-recording"></i>
            </div>
          )}

          <div className="details__content-right--videos">
            <h4>Contents</h4>
            {courseDetails &&
              courseDetails.videos.map((video) => (
                 
                
                <div
                  key={video._id}
                  className="video"
                  onClick={() => {
                    setVideoTitle(video.title);
                    if (courseDetails.enrolledStudents.includes(user?.user._id)) {
                      setPublicId(video.publicId);
                    }
                  }}
                >
                  <small>{video.title.substring(0, 35)}</small>
                  <div className="details__content-right--videos-r">
                    <small>
                      {video.videoLength
                        ? video.videoLength.toFixed(2).toString()
                        : null}
                    </small>
                    {user && (
                      <i
                        className="bx bx-trash"
                        onClick={() => deleteSelectecVideo(video._id)}
                      ></i>
                    )}
                  </div>
                </div>
              ))}
          </div>
          <div className="details__content-right--post-review">
            <div className="details__content-right--post-review">
              <form onSubmit={postreview} method="POST">
                <h3>Post a Review</h3>
                <div className="rating-grp">
                  <h4>Rating: </h4>
                  {[1, 2, 3, 4, 5].map((i) => {
                    return (
                      <i
                        className="bx bx-star"
                        key={i}
                        id={i}
                        onClick={fillStar}
                      ></i>
                    );
                  })}
                </div>
                <textarea
                  name="reviewBody"
                  cols="30"
                  rows="10"
                  value={review.reviewBody}
                  placeholder="Write review here..."
                  onChange={(e) =>
                    setReview({ ...review, reviewBody: e.target.value })
                  }
                ></textarea>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
