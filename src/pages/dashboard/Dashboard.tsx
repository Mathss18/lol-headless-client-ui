import { useEffect, useRef, useState, useCallback } from "react";
import { useChatContext } from "../../context/chat/ChatContext";
import React from "react";

export function DashboardPage() {
  const {
    sendMessage,
    friends,
    currentChat,
    getChatHistory,
    getFriendList,
    myJid,
  } = useChatContext();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = useCallback(() => {
    if (message.trim() === "") return;
    sendMessage({ message, jid: currentChat.friendJid });
    setMessage("");
  }, [message, currentChat.friendJid, sendMessage]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  useEffect(() => {
    // Scroll to the bottom of the messages container when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentChat.messages]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="flex flex-col md:flex-row">
        <FriendsList
          friends={friends}
          getChatHistory={getChatHistory}
          getFriendList={getFriendList}
        />
        <ChatMessages
          currentChat={currentChat}
          myJid={myJid}
          messagesEndRef={messagesEndRef}
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}

const Message = React.memo(({ msg, myJid }: any) => {
  return (
    <div
      className={`p-2 my-2 rounded-lg ${
        msg.sender === myJid ? "bg-blue-100 self-end" : "bg-gray-100"
      }`}
    >
      <span>{msg.content}</span>
    </div>
  );
});

const FriendsList = React.memo(
  ({ friends, getChatHistory, getFriendList }: any) => {
    return (
      <div className="md:w-1/3">
        <h2 className="text-xl font-semibold mb-2">Friends List</h2>
        <div className="space-y-2">
          {friends.map((friend: any) => (
            <div
              key={friend.jid}
              className="p-2 bg-gray-100 rounded-lg flex justify-between items-center cursor-pointer"
            >
              <span onClick={() => getChatHistory({ jid: friend.jid })}>
                {friend.name}
              </span>
            </div>
          ))}
        </div>
        <button
          className="btn btn-primary mt-4"
          onClick={() => console.log(friends)}
        >
          Log Friends
        </button>
        <button className="btn btn-primary mt-4" onClick={getFriendList}>
          Reload Friends
        </button>
      </div>
    );
  }
);

const ChatMessages = React.memo(
  ({
    currentChat,
    myJid,
    messagesEndRef,
    message,
    setMessage,
    handleSendMessage, 
    handleKeyPress
  }: any) => {
    return (
      <div className="md:w-2/3 mt-4 md:mt-0 md:ml-4 flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-2">Chat</h2>
        <div className="bg-white shadow-md rounded-lg p-4 h-96 overflow-y-auto flex-grow">
          {currentChat.messages.map((msg: any, index: any) => (
            <Message key={index} msg={msg} myJid={myJid} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            className="input input-bordered w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            onKeyDown={handleKeyPress}
          />
          <button
            className="btn btn-primary ml-2"
            onClick={() => handleSendMessage()}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
);
