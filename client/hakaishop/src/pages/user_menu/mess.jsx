import React, { useState, useEffect } from "react";
import "../../CSS/user_menu/mess.css";

const Messenger = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [contacts, setContacts] = useState([
    { id: 1, name: "Admin Support", avatar: "admin-avatar.jpg", unread: 2 },
    { id: 2, name: "Sales Team", avatar: "sales-avatar.jpg", unread: 0 },
  ]);

  useEffect(() => {
    // Fetch messages for selected contact
    if (selectedContact) {
      fetchMessages(selectedContact.id);
    }
  }, [selectedContact]);

  const fetchMessages = async (contactId) => {
    // Mock data - replace with actual API call
    const mockMessages = [
      {
        id: 1,
        senderId: contactId,
        text: "Xin chào, tôi có thể giúp gì cho bạn?",
        timestamp: "10:00 AM"
      },
      {
        id: 2,
        senderId: "user",
        text: "Tôi cần hỗ trợ về đơn hàng",
        timestamp: "10:05 AM"
      }
    ];
    setMessages(mockMessages);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      senderId: "user",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="messenger-container">
      <div className="contacts-sidebar">
        <div className="contacts-header">
          <h2>Tin nhắn</h2>
        </div>
        <div className="contacts-list">
          {contacts.map(contact => (
            <div
              key={contact.id}
              className={`contact-item ${selectedContact?.id === contact.id ? 'active' : ''}`}
              onClick={() => setSelectedContact(contact)}
            >
              <img src={contact.avatar} alt={contact.name} className="contact-avatar" />
              <div className="contact-info">
                <h3>{contact.name}</h3>
                {contact.unread > 0 && <span className="unread-badge">{contact.unread}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-area">
        {selectedContact ? (
          <>
            <div className="chat-header">
              <img src={selectedContact.avatar} alt={selectedContact.name} />
              <h3>{selectedContact.name}</h3>
            </div>
            <div className="messages-container">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`message ${message.senderId === 'user' ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="timestamp">{message.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
            <form className="message-input" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <p>Chọn một cuộc trò chuyện để bắt đầu</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messenger;
