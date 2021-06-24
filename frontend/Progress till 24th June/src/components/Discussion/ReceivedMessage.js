import React from "react";

export function ReceivedMessage({ messageData }) {
  const today = new Date(messageData.timestamp?.toDate());
  const time = `${today.getHours()}:${today.getMinutes()}`;

  return (
    <div className="messageBox__receiver">
      <div className="messageBox__receiver-author">{messageData.author}</div>
      <div className="messageBox__receiver-message">{messageData.message}</div>
      <div className="messageBox__receiver-time">{time}</div>
    </div>
  );
}
