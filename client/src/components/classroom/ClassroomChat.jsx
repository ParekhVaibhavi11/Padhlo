import {
  useEffect,
  useState,
  useRef,
} from "react";

import { io }
from "socket.io-client";

import {
  getMessages,
  saveMessage,
} from "../../services/chatService";

import useAuthStore
from "../../store/authStore";

const socket =
  io(
    import.meta.env
      .VITE_API_URL
      .replace("/api", "")
  );

const ClassroomChat = ({
  classroomId,
}) => {

  const user =
    useAuthStore(
      (state) => state.user
    );

  const [messages,
    setMessages] =
    useState([]);

  const [message,
    setMessage] =
    useState("");

  const messagesEndRef =
    useRef(null);

  useEffect(() => {

    loadMessages();

    socket.emit(
      "joinClassroom",
      classroomId
    );

    socket.on(
      "receiveMessage",
      (newMessage) => {

        setMessages(
          (prev) => [
            ...prev,
            newMessage,
          ]
        );

      }
    );

    return () => {
      socket.off(
        "receiveMessage"
      );
    };

  }, [classroomId]);

  useEffect(() => {

    messagesEndRef
      .current
      ?.scrollIntoView({
        behavior:
          "smooth",
      });

  }, [messages]);

  const loadMessages =
    async () => {

      try {

        const data =
          await getMessages(
            classroomId
          );

        setMessages(
          data.messages
        );

      } catch (error) {

        console.log(
          error
        );

      }
    };

  const handleSend =
    async (e) => {

      e.preventDefault();

      if (
        !message.trim()
      ) return;

      try {

        const data =
          await saveMessage(
            classroomId,
            message
          );

        socket.emit(
          "sendMessage",
          {
            classroomId,

            senderName:
              user.name,

            message,

            createdAt:
              new Date(),
          }
        );

        setMessage("");

      } catch (error) {

        console.log(
          error
        );

      }
    };

  return (

    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

      <h2 className="text-xl font-semibold mb-4">
        Classroom Chat
      </h2>

      <div className="h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50">

        {messages.length ===
        0 ? (

          <p className="text-gray-500">
            No messages yet.
          </p>

        ) : (

          messages.map(
            (
              msg,
              index
            ) => (

              <div
                key={index}
                className={`mb-3 flex ${
                  msg.senderName ===
                  user?.name
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div className={`max-w-xs px-4 py-2 rounded-xl ${
                  msg.senderName ===
                  user?.name
                    ? "bg-purple-600 text-white"
                    : "bg-white border"
                }`}>

                  <p className="text-xs font-semibold mb-1">
                    {
                      msg.senderName
                    }
                  </p>

                  <p>
                    {
                      msg.message
                    }
                  </p>

                </div>

              </div>

            )
          )

        )}

        <div
          ref={
            messagesEndRef
          }
        />

      </div>

      <form
        onSubmit={
          handleSend
        }
        className="flex gap-3 mt-4"
      >

        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          className="flex-1 border rounded-lg p-3"
        />

        <button
          className="bg-purple-600 text-white px-6 rounded-lg hover:bg-purple-700"
        >
          Send
        </button>

      </form>

    </div>

  );
};

export default ClassroomChat;