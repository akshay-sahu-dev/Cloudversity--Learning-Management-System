import React, { useState } from "react";

import { uploadVideo } from "../../stateHandling/utils/serverRequests";
import "./modal.scss";
function VideoUploadModal({ modalToggle, id, user }) {
  const [file, setFile] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");

  const handleVideoSubmit = (e) => {
    e.preventDefault();
    const data = { title: videoTitle, file: file };
    uploadVideo(id, user?.user.token, data);
  };
  return (
    <div className="modal">
      <i class="bx bx-x" onClick={modalToggle}></i>
      <form onSubmit={handleVideoSubmit}>
        <div className="modal__input-grp">
          <input
            type="text"
            name="title"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            placeholder="Enter the title"
            required
          />
          <div className="modal__video-upload">
            <input
              type="file"
              name="videoLink"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
            <i class="bx bxs-video-recording"></i>
          </div>
        </div>
        <button type="submit">Add video </button>
      </form>
    </div>
  );
}

export default VideoUploadModal;
