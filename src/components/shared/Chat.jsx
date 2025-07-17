import { useState, useEffect } from 'react';
import { socket } from '../../socket';

function Chat({ userType, userName, participants, onKickParticipant }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [chatEnabled, setChatEnabled] = useState(true);

  useEffect(() => {
    socket.on('chatMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on('existingMessages', (existingMessages) => {
      setMessages(existingMessages);
    });

    socket.on('chatPermission', (enabled) => {
      setChatEnabled(enabled);
    });

    return () => {
      socket.off('chatMessage');
      socket.off('existingMessages');
      socket.off('chatPermission');
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() && (userType === 'teacher' || chatEnabled)) {
      socket.emit('sendChatMessage', {
        message: newMessage,
        sender: userName || (userType === 'teacher' ? 'Teacher' : 'Student'),
        timestamp: new Date().toISOString()
      });
      setNewMessage('');
    }
  };

  const toggleChatPermission = () => {
    if (userType === 'teacher') {
      socket.emit('toggleChatPermission');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const renderChatTab = () => (
    <div className="flex flex-col h-full">
      {userType === 'teacher' && (
        <div className="p-3 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Student Chat</span>
            <button
              onClick={toggleChatPermission}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                chatEnabled
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              {chatEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 text-sm mt-8">
            No messages yet
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-purple-600">{msg.sender}</span>
                <span className="text-xs text-gray-400">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="bg-gray-800 text-white rounded-lg px-3 py-2 max-w-xs">
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-gray-100">
        {userType === 'teacher' || chatEnabled ? (
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22,2 15,22 11,13 2,9 22,2"/>
              </svg>
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-400 text-sm py-2">
            Chat is disabled by the teacher
          </div>
        )}
      </div>
    </div>
  );

  const renderParticipantsTab = () => {
    console.log('Rendering participants tab with participants:', participants);
    
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-center text-sm font-medium text-gray-600">
            <span>Name</span>
            {userType === 'teacher' && <span>Action</span>}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {participants && participants.length > 0 ? (
            participants.map((participant, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-sm font-medium text-gray-900">{participant}</span>
                {userType === 'teacher' && (
                  <button
                    onClick={() => onKickParticipant && onKickParticipant(participant)}
                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    Kick out
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 text-sm mt-8">
              No participants yet
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </button>

      {isOpen && (
        <div className="fixed right-6 bottom-24 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === 'chat'
                  ? 'text-gray-900 border-b-2 border-purple-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveTab('participants')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === 'participants'
                  ? 'text-gray-900 border-b-2 border-purple-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Participants
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            {activeTab === 'chat' ? renderChatTab() : renderParticipantsTab()}
          </div>
        </div>
      )}
    </>
  );
}

export default Chat; 