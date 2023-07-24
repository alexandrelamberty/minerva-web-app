import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { TalkEventPayload, TalkRequestPayload } from "../../payloads";
import { socket } from "../../services/ws-service";
import { RootState } from "../../store/store";

interface Chat {
  username: string;
  messages: [];
}

interface Message {
  username: string;
  avatar: string;
  timestamp: string;
  message: string;
}

type MessageProp = {
  username: string;
  timestamp: string;
  message: string;
};

export const RoomList = () => {
  return (
    <>
      <ul></ul>
    </>
  );
};

export const IncomingMessage = ({
  username,
  timestamp,
  message,
}: MessageProp) => {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end ">
      <div>
        <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
          <span className="text-sm text-slate-300">{username}</span>
          <p>{message}</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">{timestamp}</span>
      </div>
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    </div>
  );
};

export const OutgoingMessage = ({
  username,
  timestamp,
  message,
}: MessageProp) => {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-xs">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
      <div>
        <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
          <span className="text-sm text-slate-500">{username}</span>
          <p>{message}</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">{timestamp}</span>
      </div>
    </div>
  );
};

type ChatProp = {
  className?: string;
};

/**
 * Chat using Socket.io.
 * @param param0
 * @returns
 */
const Chat = ({ className }: ChatProp) => {
  const [chat, setChat] = useState<Chat>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>();
  const [files, setFiles] = useState();
  // Use ref to scroll to last messages
  const listItemsRef = useRef<null | HTMLDivElement>(null);

  // Global authentication state
  const {
    loggedInUser: user,
    loading,
    errors,
  } = useSelector((state: RootState) => state.auth);

  // Listening
  const onTalk = (payload: TalkEventPayload) => {
    console.log("> onTalk: ", payload);
    const data = {
      username: payload.username,
      avatar: "",
      timestamp: new Date().toLocaleDateString(),
      message: payload.message,
    };
    console.log("setMessages:", data);
    setMessages((messages) => [...messages, data]);
  };

  const onYell = (payload) => {
    console.log("onYell: ", payload);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setChat({
      username: user?.firstName + " " + user?.lastName,
      messages: [],
    });
  }, []);

  /**
   * Add event listeners when the socket is connected
   */
  useEffect(() => {
    if (socket.connected) {
      console.log("Socket connected!");
      socket.on("messaging:talk", onTalk);
      socket.on("messaging:yell", onYell);
    }
    // socket.io.on("error", (error) => {});
    return () => {
      if (socket) {
        socket.off("messaging:talk", onTalk);
        socket.on("messaging:yell", onYell);
      }
    };
  }, [socket.connected]);

  // Render messages components
  const listItems = messages.map((message) => {
    if (message.username === chat?.username) {
      return <OutgoingMessage key={message.timestamp} {...message} />;
    } else {
      return <IncomingMessage key={message.timestamp} {...message} />;
    }
  });

  const scrollToBottom = () => {
    if (listItemsRef.current) {
      listItemsRef.current?.scrollIntoView({ behavior: "smooth" });
      const lastItem = listItemsRef.current.lastElementChild;
      if (lastItem) {
        lastItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  };

  return (
    <div
      className={`flex flex-col flex-grow w-full max-w-full border border-gray-200 rounded-lg bg-slate-100 dark:bg-gray-800 dark:border-gray-700 shadow-xl overflow-hidden ${className}`}
    >
      {/* Chat Header */}
      <div className="p-4 bg-slate-200 ">
        <p>
          Chat as {chat?.username} {messages.length}
        </p>
      </div>
      {/* Chat Sidebar */}
      <RoomList />
      {/* Chat Messages */}
      <div
        ref={listItemsRef}
        className="flex flex-col flex-grow h-0 p-4 overflow-auto chat-pattern"
      >
        {listItems}
      </div>
      {/* Chat TextInput */}
      <div className="p-4 bg-gray-300">
        <input
          className="form-input"
          type="text"
          placeholder="Type your message…"
          value={message}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setMessage(event.target.value);
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (user && message !== undefined && event.key === "Enter") {
              console.log("> onSend");
              // Create a message object to add the message state.
              // const data: Message = {
              //   username: user?.firstName + " " + user?.lastName,
              //   avatar: "",
              //   timestamp: new Date().toLocaleTimeString(),
              //   message: message,
              // };
              // console.log("setMessages:", data);
              // setMessages([...messages, data]);
              /**
               * Create a payload to send the message.
               */
              const payload: TalkRequestPayload = {
                message: message,
              };
              console.log("message:talk:", payload);
              socket.emit("messaging:talk", payload);
              // Clean text input
              setMessage("");
            }
          }}
        />
      </div>
    </div>
  );
};

export default Chat;
