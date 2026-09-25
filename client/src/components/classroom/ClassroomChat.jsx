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

import { Send } from "lucide-react";

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

  if (!classroomId) return;

  loadMessages();

  socket.emit(
    "joinClassroom",
    classroomId
  );

  const handleReceiveMessage = (newMessage) => {

    setMessages((prev) => [
      ...prev,
      newMessage,
    ]);

  };

  const handleMessageDeleted = ({ messageId }) => {

    setMessages((prev) =>
      prev.filter(
        (msg) =>
          msg._id !== messageId
      )
    );

  };

  const handleMessageEdited = ({
    messageId,
    message,
  }) => {

    setMessages((prev) =>
      prev.map((msg) =>
        msg._id === messageId
          ? {
              ...msg,
              message,
            }
          : msg
      )
    );

  };

  socket.on(
    "receiveMessage",
    handleReceiveMessage
  );

  socket.on(
    "messageDeleted",
    handleMessageDeleted
  );

  socket.on(
    "messageEdited",
    handleMessageEdited
  );

  return () => {

    socket.emit(
      "leaveClassroom",
      classroomId
    );

    socket.off(
      "receiveMessage",
      handleReceiveMessage
    );

    socket.off(
      "messageDeleted",
      handleMessageDeleted
    );

    socket.off(
      "messageEdited",
      handleMessageEdited
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

    if (!message.trim()) return;

    try {

      const data =
        await saveMessage(
          classroomId,
          message.trim()
        );

      setMessages(
        (prev) => [
          ...prev,
          data.message
        ]
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

      console.log(error);

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

    if (!updatedMessage?.trim()) return;

    try {

      await editMessage(
        msg._id,
        updatedMessage.trim()
      );

      socket.emit(
        "messageEdited",
        {
          classroomId,

          messageId:
            msg._id,

          message:
            updatedMessage.trim(),
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
                      updatedMessage.trim(),
                  }
                : message
          )
      );

    } catch (error) {

      console.log(error);

    }

  };

return (

    <div className="flex flex-col h-full">

    <div className="flex-1 overflow-y-auto bg-slate-50 px-4 py-4">
      {messages.length ===
        0 ? (

        <div className="flex flex-col justify-center items-center h-full text-slate-400">

<div className="text-6xl">

💬

</div>

<p className="mt-4 font-semibold">

No messages yet

</p>

<p className="text-sm">

Start the conversation.

</p>

</div>

        ) : (
          
        <div className="space-y-4">
  
          {messages.map(( msg,index) => (

              <div
                key={msg._id}
                className={`flex px-2 ${
                  msg.senderName ===
                  user?.name
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`relative max-w-[72%] rounded-2xl px-4 py-3 shadow-sm transition-all

                  ${
                    msg.senderName === user?.name
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-br-md"
                      : "bg-white border border-slate-200 text-slate-800 rounded-bl-md"
                  }`}
                >

                  <p
                    className={`text-xs font-bold mb-2 ${
                      msg.senderName === user?.name
                        ? "text-violet-100"
                        : "text-violet-700"
                    }`}
                  >
                    {msg.senderName}
                  </p>

                  <div className="flex items-start justify-between gap-3">

  <p className="break-words leading-relaxed">
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
        className={`transition

          ${
          msg.senderName===user?.name

          ? "text-violet-100 hover:text-white"

          : "text-slate-400 hover:text-slate-700"

          }`}
      >
        <HiOutlineDotsVertical
          size={18}
          />
      </button>

      {openMenu ===
        msg._id && (

        <div className="absolute right-0 top-10 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-50 w-44">

              <button
                onClick={() => {
                  handleEdit(msg);
                  setOpenMenu(null);
                }}
                className="w-full text-left px-4 py-3 hover:bg-slate-50 text-sm text-gray-800"
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
                className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 text-sm"
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

            ))
          }

          <div ref={messagesEndRef} />
      </div> 
        )}
      

      </div>

      <form
  onSubmit={handleSend}
  className="
    flex
    flex-col
    sm:flex-row
    items-stretch
    sm:items-center
    gap-3
    border-t
    border-slate-200
    bg-white
    px-4
    py-4
    shrink-0
  "
>

      <input
  type="text"
  placeholder="Type a message..."
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  className="
    flex-1
    min-w-0
    rounded-full
    border
    border-slate-300
    px-5
    py-3
    outline-none
    focus:ring-2
    focus:ring-violet-500
  "
/>

      <button
  type="submit"
  className="
    h-12
    w-12
    rounded-full
    bg-gradient-to-r
    from-violet-600
    to-purple-600
    text-white
    flex
    items-center
    justify-center
    shadow-lg
    shadow-violet-300/40
    hover:from-violet-700
    hover:to-purple-700
    hover:shadow-xl
    hover:-translate-y-0.5
    transition-all
    duration-300
    active:scale-95
  "
>
  <Send size={20} />
</button>

      </form>

    </div>

  );
};

export default ClassroomChat;