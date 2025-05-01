// // ChatBot.jsx with OpenAI GPT integration
// import React, { useState } from 'react';
// import { CardBody } from 'react-bootstrap';


// const ChatBot = () => {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);

//   const handleSend = async () => {
//     const userMsg = { sender: 'user', text: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput('');
//     const API_TOKEN = import.meta.env.VITE_TOKEN;

//     try {
//       const res = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer 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`// Replace with your API key
//         },
//         body: JSON.stringify({
//           model: 'gpt-3.5-turbo',
//           messages: [
//             { role: 'system', content: 'أنت شات بوت مساعد لحجز الفنادق في مصر. تجاوب فقط على استفسارات عن فنادق وأسعارها في المدن السياحية.' },
//             { role: 'user', content: input }
//           ]
//         })
//       });

//       const data = await res.json();
//       const botMsg = { sender: 'bot', text: data.choices[0].message.content };
//       setMessages((prev) => [...prev, botMsg]);
//     } catch (err) {
//       console.log(err);
      
//       setMessages((prev) => [...prev, { sender: 'bot', text: 'حدث خطأ أثناء الاتصال بـ GPT.' }]);
//     }
//   };

//   return (
//     <CardBody className="max-w-xl mx-auto mt-10">
//       <CardBody className="p-4 space-y-4">
//         <div className="h-64 overflow-y-auto border p-2 rounded bg-gray-50">
//           {messages.map((msg, i) => (
//             <div key={i} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
//               <span className={msg.sender === 'user' ? 'text-blue-600' : 'text-green-600'}>
//                 {msg.sender === 'user' ? 'أنت' : 'البوت'}:
//               </span>
//               <span> {msg.text}</span>
//             </div>
//           ))}
//         </div>
//         <div className="flex gap-2">
//           <input
//             placeholder="اسأل عن فندق..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//           />
//           <button onClick={handleSend}>إرسال</button>
//         </div>
//       </CardBody>
//     </CardBody>
//   );
// };

// export default ChatBot;