import { useEffect, useState } from "react";
import { getMessages, sendMessage } from "../services/messageApi";

function Chat({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMessages() {
      if (!selectedUser) {
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      setLoading(true);
      setError("");

      try {
        const data = await getMessages(selectedUser.id, token);

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

    if (!content.trim() || !selectedUser || sending) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

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
      <section>
        <p>Select a user to start chatting.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>
        {selectedUser.firstName} {selectedUser.lastName}
      </h2>

      {loading && <p>Loading messages...</p>}

      {error && <p>{error}</p>}

      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Type a message..."
          disabled={sending}
        />

        <button
          type="submit"
          disabled={sending || !content.trim()}
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </form>
    </section>
  );
}

export default Chat;