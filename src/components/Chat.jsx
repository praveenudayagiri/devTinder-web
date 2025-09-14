import React, { useEffect, useState } from "react";
import createSocketConnection from "../utils/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

let socket;

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { targetId } = useParams();
  const { _id, firstName } = useSelector((store) => store.user);

  useEffect(() => {
    if (!_id) return;

    socket = createSocketConnection();

    socket.emit("joinChat", { firstName, _id, targetId });

    socket.on("messageReceived", ({ senderId, senderName, text, time }) => {
      setMessages((prev) => [...prev, { senderId, senderName, text, time }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [_id, firstName, targetId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("sendMessage", {
        firstName,
        _id,
        targetId,
        text: newMessage,
      });

      setNewMessage("");
    }
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col rounded-lg bg-base-200">
      {/* Header */}
      <h1 className="p-4 border-b border-gray-600 font-semibold">Chat</h1>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`chat ${
                msg.senderId === _id ? "chat-end" : "chat-start"
              }`}
            >
              <div
                className={`chat-bubble ${
                  msg.senderId === _id
                    ? "chat-bubble-primary"
                    : "chat-bubble-secondary"
                }`}
              >
                <b>{msg.senderId === _id ? "You" : msg.senderName}:</b>{" "}
                {msg.text}
                <div className="text-xs opacity-70">
                  {new Date(msg.time).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet</p>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-600 flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="input input-bordered flex-1"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
