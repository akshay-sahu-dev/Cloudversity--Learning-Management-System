import React from "react";

export function SentMessage({ messageData }) {
  const today = new Date(messageData.timestamp?.toDate());
  const time = `${today.getHours()}:${today.getMinutes()}`;

  return (
    <div className="messageBox__sender">
      {/* <div className="messageBox__sender-author">{messageData.author}</div> */}
      <div className="messageBox__sender-message">{messageData.message}</div>
      <div className="messageBox__sender-time">{time}</div>
    </div>
  );
}
