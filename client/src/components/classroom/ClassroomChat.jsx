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
  deleteMessage,
  editMessage,
} from "../../services/chatService";

import useAuthStore
from "../../store/authStore";

import {
  HiOutlineDotsVertical
}
from "react-icons/hi";

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

  const [openMenu,
  setOpenMenu] =
  useState(null);

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

    socket.on(
  "messageDeleted",
  ({ messageId }) => {

    setMessages(
      (prev) =>
        prev.filter(
          (msg) =>
            msg._id !==
            messageId
        )
    );

  }
);

socket.on(
  "messageEdited",
  ({
    messageId,
    message,
  }) => {

    setMessages(
      (prev) =>
        prev.map(
          (msg) =>
            msg._id ===
            messageId
              ? {
                  ...msg,
                  message,
                }
              : msg
        )
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
            ...data.message
          }
        );

        setMessage("");

      } catch (error) {

        console.log(
          error
        );

      }
    };

   const handleDelete =
  async (
    messageId
  ) => {

    try {

      await deleteMessage(
        messageId
      );

      socket.emit(
        "messageDeleted",
        {
          classroomId,
          messageId,
        }
      );

      setMessages(
        (prev) =>
          prev.filter(
            (msg) =>
              msg._id !==
              messageId
          )
      );

    } catch (error) {

      console.log(error);

    }

};

const handleEdit =
  async (msg) => {

    const updatedMessage =
      prompt(
        "Edit Message",
        msg.message
      );

    if (
      !updatedMessage
    ) return;

    try {

      await editMessage(
        msg._id,
        updatedMessage
      );

      socket.emit(
        "messageEdited",
        {
          classroomId,

          messageId:
            msg._id,

          message:
            updatedMessage,
        }
      );

      setMessages(
        (prev) =>
          prev.map(
            (message) =>
              message._id ===
              msg._id
                ? {
                    ...message,
                    message:
                      updatedMessage,
                  }
                : message
          )
      );

    } catch (error) {

      console.log(error);

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
                key={msg._id}
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
                    {msg.senderName}
                  </p>

                  <div className="flex items-start justify-between gap-3">

  <p className="break-words">
    {msg.message}
  </p>

  {msg.senderName ===
    user?.name && (

    <div className="relative">

      <button
        onClick={() =>
          setOpenMenu(
            openMenu ===
              msg._id
              ? null
              : msg._id
          )
        }
        className="text-gray-400 hover:text-gray-700 text-lg font-bold"
      >
        <HiOutlineDotsVertical
         size={18}
          />
      </button>

      {openMenu ===
        msg._id && (

        <div className="absolute right-0 top-7 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50 min-w-[160px]">

              <button
                onClick={() => {
                  handleEdit(msg);
                  setOpenMenu(null);
                }}
                 className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm text-gray-800"
                 >
                Edit Message
              </button>

              <button
                onClick={() => {
                  handleDelete(
                    msg._id
                  );
                  setOpenMenu(null);
                }}
                 className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm text-gray-800"
              >
                Delete Message
              </button>

            </div>

          )}

        </div>

  )}

</div>

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