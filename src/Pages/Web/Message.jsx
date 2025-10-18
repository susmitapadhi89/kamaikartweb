// import { useState, useRef, useEffect } from "react";
// import Layout from "../Layout/Layout";

// export default function ChatPage() {
//   const [sellers, setSellers] = useState([
//     {
//       id: 1,
//       name: "Razin Shop",
//       status: "offline",
//       lastMessage: "hello",
//       lastSeen: "2 weeks ago",
//       messages: [
//         {
//           id: 1,
//           text: "hello",
//           sender: "shop",
//           time: "03:55 pm, 24 May, 2025",
//         },
//         {
//           id: 2,
//           text: "1222",
//           sender: "me",
//           time: "04:43 pm, 16 Jul, 2025",
//         },
//       ],
//     },
//     {
//       id: 2,
//       name: "Easy Life",
//       status: "online",
//       lastMessage: "hh",
//       lastSeen: "1 month ago",
//       messages: [
//         { id: 1, text: "hh", sender: "shop", time: "01:10 pm, 12 Aug, 2025" },
//       ],
//     },
//     {
//       id: 3,
//       name: "Style Haven",
//       status: "offline",
//       lastMessage: "hi",
//       lastSeen: "3 months ago",
//       messages: [
//         { id: 1, text: "hi", sender: "shop", time: "10:20 am, 10 Jun, 2025" },
//       ],
//     },
//   ]);

//   const [activeSellerId, setActiveSellerId] = useState(1);
//   const [newMessage, setNewMessage] = useState("");
//   const endRef = useRef(null);

//   const activeSeller = sellers.find((s) => s.id === activeSellerId);

//   // Scroll down when new messages added
//   useEffect(() => {
//     endRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [activeSeller.messages]);

//   const handleSend = () => {
//     if (!newMessage.trim()) return;

//     const now = new Date();
//     const time = now.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     const date = now.toLocaleDateString("en-US", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });

//     const newMsg = {
//       id: Date.now(),
//       text: newMessage,
//       sender: "me",
//       time: `${time}, ${date}`,
//     };

//     setSellers((prev) =>
//       prev.map((seller) =>
//         seller.id === activeSellerId
//           ? {
//             ...seller,
//             messages: [...seller.messages, newMsg],
//             lastMessage: newMessage,
//             lastSeen: "just now",
//           }
//           : seller
//       )
//     );

//     setNewMessage("");
//   };

//   return (
//     <Layout>
//       <div className="ml-4 pl-64 p-6 space-y-6">
//         <div className="flex h-[80vh] w-full bg-white shadow rounded-lg">
//           {/* Seller List Sidebar */}
//           <div className="w-1/3 border-r flex flex-col">
//             <div className="p-3 border-b">
//               <input
//                 type="text"
//                 placeholder="Search Seller"
//                 className="w-full px-3 py-2 text-sm border rounded-lg"
//               />
//             </div>
//             <div className="flex-1 overflow-y-auto">
//               {sellers.map((seller) => (
//                 <div
//                   key={seller.id}
//                   onClick={() => setActiveSellerId(seller.id)}
//                   className={`px-4 py-3 cursor-pointer border-b hover:bg-gray-100 ${seller.id === activeSellerId ? "bg-pink-100" : ""
//                     }`}
//                 >
//                   <div className="flex justify-between items-center">
//                     <p className="font-medium">{seller.name}</p>
//                     <span className="text-xs text-gray-500">{seller.lastSeen}</span>
//                   </div>
//                   <p className="text-sm text-gray-600 truncate">
//                     {seller.lastMessage}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Chat Window */}
//           <div className="flex-1 flex flex-col">
//             {/* Chat Header */}
//             <div className="p-3 border-b bg-gray-100 flex items-center justify-between">
//               <div>
//                 <h2 className="font-semibold">{activeSeller.name}</h2>
//                 <span
//                   className={`text-sm ${activeSeller.status === "online"
//                       ? "text-green-500"
//                       : "text-red-500"
//                     }`}
//                 >
//                   {activeSeller.status}
//                 </span>
//               </div>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-3">
//               {activeSeller.messages.map((msg) => (
//                 <div
//                   key={msg.id}
//                   className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"
//                     }`}
//                 >
//                   <div
//                     className={`px-3 py-2 rounded-lg text-sm max-w-[70%] ${msg.sender === "me"
//                         ? "bg-gray-200 text-gray-600 rounded-br-none"
//                         : "bg-gray-200 text-gray-600 rounded-bl-none"
//                       }`}
//                   >
//                     <p>{msg.text}</p>
//                     <span className="block text-xs mt-1 opacity-70">{msg.time}</span>
//                   </div>
//                 </div>
//               ))}
//               <div ref={endRef} />
//             </div>

//             {/* Input Box */}
//             <div className="p-3 border-t flex items-center gap-2">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                 placeholder="Type a message"
//                 className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:border-pink-500"
//               />
//               <button
//                 onClick={handleSend}
//                 className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
//               >
//                 ➤
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//     </Layout>

//   );
// }
