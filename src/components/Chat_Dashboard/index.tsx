'use client';

import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'; // Import Firebase Storage

// Your Firebase configuration
const firebaseConfigChat = {
    apiKey: "AIzaSyCW44riJJVCrwZVEm_ot3hZICCqlKe5_Hg",
    authDomain: "chatmodule-49f11.firebaseapp.com",
    projectId: "chatmodule-49f11",
    storageBucket: "chatmodule-49f11.appspot.com",
    messagingSenderId: "419491122281",
    appId: "1:419491122281:web:02ae863d4e3dd12130a6f8",
    measurementId: "G-GBL47YXCJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfigChat);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { db, collection, addDoc, query, onSnapshot, orderBy, storage }; // Export storage


interface CustomerChatPageProps {
  id: string;
}

interface Message {
  id: string;
  text: string;
  file?: string;
  timestamp: { seconds: number }; // Adjust according to your Firestore structure
  type: 'customer' | 'designer'; // Define possible types
}

const CustomerChatPage: React.FC<CustomerChatPageProps> = ({ id }) => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const userId = id;

  useEffect(() => {
    if (userId) {
      const conversationPath = `conversations/${userId}/messages`;
      const q = query(
        collection(db, conversationPath),
        orderBy('timestamp', 'asc')
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messagesArray: Message[] = [];
        querySnapshot.forEach((doc) => {
          messagesArray.push({ id: doc.id, ...doc.data() } as Message);
        });
        setMessages(messagesArray);
      }, (error) => {
        console.error('Snapshot error:', error);
      });

      return () => unsubscribe();
    }
  }, [userId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      console.error('User ID is not set.');
      return;
    }

    setLoading(true); // Set loading state to true

    try {
      const conversationPath = `conversations/${userId}/messages`;
      let fileUrl = '';

      if (file) {
        const fileRef = ref(storage, `uploads/${file.name}`);
        await uploadBytes(fileRef, file);
        fileUrl = await getDownloadURL(fileRef);
      }

      await addDoc(collection(db, conversationPath), {
        text: message,
        file: fileUrl,
        timestamp: new Date(),
        type: 'customer',
      });

      setMessage('');
      setFile(null); // Clear file input after sending
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false); // Reset loading state after operation
    }
  };

  const formatDate = (timestamp: { seconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  const formatTime = (timestamp: { seconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-[#172554]">
      <h1 className="text-xl font-bold mb-4 flex justify-center text-white">Free Chat with Fashion Stylish</h1>
      <div className="flex-1 overflow-y-auto mb-4 p-2 rounded-lg shadow-lg" style={{ 
        backgroundImage: "url('/chatbg1.png')", 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center' 
      }} >
        {messages.map((msg, index) => {
          const dateString = formatDate(msg.timestamp);
          const timeString = formatTime(msg.timestamp);
          // const date = new Date(msg.timestamp.seconds * 1000);
          const showDateHeader = index === 0 || formatDate(messages[index - 1].timestamp) !== dateString;

          return (
            <div key={msg.id} className={`mb-2 flex ${msg.type === 'customer' ? 'justify-end' : 'justify-start'}`}>
              {showDateHeader && (
                <div className="text-center mx-auto text-white mb-2 font-semibold w-full">
                  {dateString}
                </div>
              )}
              <div className={`p-2 rounded-lg flex flex-col max-w-lg ${msg.type === 'customer' ? 'bg-white text-black' : 'bg-gray-300 text-black'}`}>
                <strong>{msg.type === 'customer' ? 'You' : 'Designer'}:</strong>
                <span>{msg.text}</span>
                {msg.file && (
                  <a href={msg.file} target="_blank" rel="noopener noreferrer">
                    <img src={msg.file} alt="Uploaded" className="mt-1 max-w-full h-auto rounded-lg cursor-pointer" />
                  </a>
                )}
                <span className="text-sm text-black-800 mt-1 text-right">{timeString}</span>
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSend} className="flex">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200"
          rows={2}
        />
        <label className="ml-2 cursor-pointer">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3V3z" />
          </svg>
          <input
            type="file"
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
            className="ml-2 border rounded-lg text-white"
          />
        </label>
        <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default CustomerChatPage;
