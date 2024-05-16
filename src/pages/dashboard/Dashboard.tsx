import { useState } from "react";
import { useClientContext } from "../../context/client/ClientContext";

export function DashboardPage() {
  const { sendMessage, friends } = useClientContext();
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  const handleSendMessage = (jid: string) => {
    if (message.trim() === "") return;

    sendMessage({ message, jid });
    setChatMessages([...chatMessages, { from: "me", message }]);
    setMessage("");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <h2 className="text-xl font-semibold mb-2">Friends List</h2>
          <div className="space-y-2">
            {friends.map((friend) => (
              <div key={friend.jid} className="p-2 bg-gray-100 rounded-lg flex justify-between items-center">
                <span>{friend.name}</span>
                <button className="btn btn-primary" onClick={() => handleSendMessage(friend.jid)}>
                  Send Message
                </button>
              </div>
            ))}
          </div>
          <button className="btn btn-primary mt-4" onClick={() => console.log(friends)}>
            Log Friends
          </button>
        </div>

        <div className="md:w-2/3 mt-4 md:mt-0 md:ml-4">
          <h2 className="text-xl font-semibold mb-2">Chat</h2>
          <div className="bg-white shadow-md rounded-lg p-4 h-96 overflow-y-auto">
            {chatMessages.map((msg: any, index) => (
              <div
                key={index}
                className={`p-2 my-2 rounded-lg ${msg.from === "me" ? "bg-blue-100 self-end" : "bg-gray-100"}`}
              >
                <span>{msg.message}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              className="input input-bordered w-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
            />
            <button
              className="btn btn-primary ml-2"
              onClick={() => handleSendMessage("49f9f9af-1f50-5427-a386-915b9914e8e2@br1.pvp.net")}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
