import { useEffect, useState } from "react";
import {
  getMessages,
  sendMessage,
} from "../services/messageApi";
import "../styles/chat.css";

function Chat({
  selectedUser,
  currentUser,
  onBack,
}) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMessages() {
      if (!selectedUser) return;

      const token = localStorage.getItem("token");

      if (!token) return;

      setLoading(true);
      setError("");

      try {
        const data = await getMessages(
          selectedUser.id,
          token
        );

        setMessages(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadMessages();
  }, [selectedUser]);

  async function handleSendMessage(event) {
    event.preventDefault();

    if (
      !content.trim() ||
      !selectedUser ||
      sending
    ) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) return;

    setSending(true);
    setError("");

    try {
      const newMessage = await sendMessage(
        selectedUser.id,
        content,
        token
      );

      setMessages((previousMessages) => [
        ...previousMessages,
        newMessage,
      ]);

      setContent("");
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setSending(false);
    }
  }

  if (!selectedUser) {
    return (
      <section className="chat chat--empty">
        <div className="empty-chat">
          <div className="empty-chat-icon">💬</div>

          <h2>Welcome to Messages</h2>

          <p>
            Select a user from the list to start
            chatting.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="chat">
      <header className="chat-header">
        <button
          type="button"
          className="chat-back-button"
          onClick={onBack}
          aria-label="Back to users"
        >
          ←
        </button>

        <div className="chat-user-avatar">
          {selectedUser.firstName
            .charAt(0)
            .toUpperCase()}
        </div>

        <div className="chat-user-info">
          <h2>
            {selectedUser.firstName}{" "}
            {selectedUser.lastName}
          </h2>

          <span>@{selectedUser.username}</span>
        </div>
      </header>

      {loading && (
        <p className="chat-status">
          Loading messages...
        </p>
      )}

      {error && (
        <p className="chat-error">
          {error}
        </p>
      )}

      <div className="messages">
        {messages.map((message) => {
          const isMine =
            message.senderId === currentUser.id;

          return (
            <div
              key={message.id}
              className={`message ${
                isMine
                  ? "message--mine"
                  : "message--received"
              }`}
            >
              <p>{message.content}</p>
            </div>
          );
        })}
      </div>

      <form
        className="message-form"
        onSubmit={handleSendMessage}
      >
        <input
          type="text"
          value={content}
          onChange={(event) =>
            setContent(event.target.value)
          }
          placeholder="Type a message..."
          disabled={sending}
        />

        <button
          type="submit"
          disabled={
            sending || !content.trim()
          }
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </form>
    </section>
  );
}

export default Chat;
