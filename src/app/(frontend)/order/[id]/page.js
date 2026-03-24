"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FiCheckCircle } from 'react-icons/fi'; 

export default function OrderTicketPage() {
  const params = useParams();
  const orderId = params.id;
  
  const [showEmbeddedChat, setShowEmbeddedChat] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.$crisp = window.$crisp || [];
      
      // Send data to Crisp safely, one key-value pair at a time
      window.$crisp.push(["set", "session:data", ["Order ID", String(orderId)]]);
      window.$crisp.push(["set", "session:data", ["Status", "Pending Live Chat Setup"]]);
    }

    // Cleanup function: Show the chat bubble again when leaving this page
    return () => {
      if (typeof window !== "undefined" && window.$crisp) {
        window.$crisp.push(["do", "chat:show"]);
      }
    };
  }, [orderId]);

  const handleOpenEmbeddedChat = () => {
    setShowEmbeddedChat(true);
    
    // Hide the floating bubble so we don't have two chats on the screen
    if (typeof window !== "undefined" && window.$crisp) {
      window.$crisp.push(["do", "chat:hide"]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white pt-24 md:pt-32 pb-12 font-body">
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-4 gap-6">
        
        {/* LEFT COLUMN: Dynamic Chat Area */}
        {showEmbeddedChat ? (
          
          // The Embedded Chat View
          <div className="flex-1 bg-[#121820] border border-white/5 rounded-2xl shadow-2xl overflow-hidden h-[600px]">
            <iframe 
              src={`https://go.crisp.chat/chat/embed/?website_id=${process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID}`}
              width="100%" 
              height="100%" 
              frameBorder="0"
              title="Order Chat"
              className="bg-white" // Crisp's iframe has a white background by default
            />
          </div>

        ) : (
          
          // Original "Waiting Room" View
          <div className="flex-1 flex flex-col bg-[#121820] border border-white/5 rounded-2xl shadow-2xl p-8 lg:p-12 items-center justify-center text-center h-[600px]">
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
              <FiCheckCircle className="w-8 h-8" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 uppercase tracking-wider text-white">Order Created Successfully!</h2>
            
            <p className="text-white/60 mb-8 max-w-md text-lg leading-relaxed">
              Your order <strong className="text-blue-400 font-bold">#{orderId}</strong> is ready. 
              <br/><br/>
              Please open the chat to connect directly with our admin, complete your payment securely, and provide your game details!
            </p>
            
            <button 
              onClick={handleOpenEmbeddedChat}
              className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold font-heading hover:bg-blue-700 transition uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)]"
            >
              Open Live Chat Now
            </button>
          </div>

        )}

        {/* RIGHT COLUMN: Order Summary (Stays the same) */}
        <div className="w-full md:w-96 flex flex-col gap-6 sticky top-32 h-fit">
          <div className="bg-[#121820] border border-white/5 p-6 rounded-2xl shadow-xl">
            <h3 className="font-bold text-lg text-white mb-4 pb-3 border-b border-white/5 uppercase font-heading tracking-wider">Order Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/50">Order ID</span>
                <span className="font-semibold text-white tracking-widest">{orderId}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/50">Status</span>
                <span className="font-semibold text-yellow-400 bg-yellow-900/20 border border-yellow-500/30 px-3 py-1.5 rounded-lg text-xs tracking-wider uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_8px_rgba(250,204,21,0.8)]" /> Pending Setup
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#121820] border border-white/5 p-6 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400" />
            <h3 className="font-bold text-lg text-white mb-4 pb-3 border-b border-white/5 uppercase font-heading tracking-wider">Payment Summary</h3>
            <div className="space-y-3">
              <p className="text-sm text-white/60 leading-relaxed mb-4">
                Payments are handled manually by our team to ensure the safety of your transaction.
              </p>
              <div className="flex justify-between items-center pt-3 border-t border-white/5">
                <span className="text-white/80 font-medium">Total Price</span>
                <span className="font-bold font-heading text-xl text-blue-500 cursor-help tracking-tight">
                  Check Chat
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}