import Icon from "@/components/ui/icon";
import { Chat, Message } from "./types";

interface ChatWindowProps {
  chat: Chat;
  messages: Message[];
  messageText: string;
  onTextChange: (v: string) => void;
  onSend: () => void;
}

export function ChatWindow({ chat, messages, messageText, onTextChange, onSend }: ChatWindowProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{ background: "#17212b", borderBottom: "1px solid #2a2a3a" }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
          style={{ background: chat.color }}
        >
          {chat.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[#e8eaf0] font-semibold text-sm truncate">{chat.name}</div>
          <div className="text-xs text-[#6c7883]">
            {chat.type === "channel"
              ? "канал"
              : chat.type === "group"
              ? "группа · 12 участников"
              : chat.online
              ? "в сети"
              : "был(а) недавно"}
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {[{ icon: "Phone" }, { icon: "Video" }, { icon: "Search" }, { icon: "MoreVertical" }].map(btn => (
            <button key={btn.icon} className="p-2 rounded-full transition-colors hover:bg-[#1f2d3d]">
              <Icon name={btn.icon} size={18} className="text-[#6c7883]" />
            </button>
          ))}
        </div>
      </div>

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-1"
        style={{ background: "linear-gradient(180deg, #0f1923 0%, #131f2e 100%)" }}
      >
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-[72%] px-3 py-2 text-sm leading-relaxed"
              style={{
                background: msg.mine ? "#2b5278" : "#182533",
                color: "#e8eaf0",
                borderRadius: msg.mine ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              }}
            >
              <p>{msg.text}</p>
              <div className={`flex items-center gap-1 mt-0.5 ${msg.mine ? "justify-end" : "justify-start"}`}>
                <span className="text-[10px]" style={{ color: "#6c8fa8" }}>{msg.time}</span>
                {msg.mine && (
                  <Icon
                    name={msg.read ? "CheckCheck" : "Check"}
                    size={12}
                    className={msg.read ? "text-[#5288c1]" : "text-[#6c8fa8]"}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        className="px-3 py-3 flex items-end gap-2 flex-shrink-0"
        style={{ background: "#17212b", borderTop: "1px solid #2a2a3a" }}
      >
        <button className="p-2 rounded-full transition-colors hover:bg-[#1f2d3d] flex-shrink-0">
          <Icon name="Paperclip" size={20} className="text-[#6c7883]" />
        </button>
        <div className="flex-1 rounded-2xl px-4 py-2 flex items-end gap-2" style={{ background: "#242f3d" }}>
          <textarea
            className="flex-1 bg-transparent text-[#e8eaf0] text-sm outline-none resize-none leading-5 placeholder:text-[#6c7883] max-h-32"
            placeholder="Сообщение..."
            value={messageText}
            rows={1}
            onChange={e => onTextChange(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
          />
          <button className="flex-shrink-0">
            <Icon name="Smile" size={20} className="text-[#6c7883] hover:text-[#5288c1] transition-colors" />
          </button>
        </div>
        <button
          onClick={onSend}
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-105 active:scale-95"
          style={{ background: messageText.trim() ? "#5288c1" : "#242f3d" }}
        >
          <Icon name={messageText.trim() ? "Send" : "Mic"} size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
}

export function EmptyPanel({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div
      className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-6"
      style={{ background: "linear-gradient(180deg, #0f1923 0%, #131f2e 100%)" }}
    >
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ background: "#1f2d3d" }}>
        <Icon name={icon} size={28} className="text-[#5288c1]" />
      </div>
      <p className="text-[#e8eaf0] font-semibold">{title}</p>
      <p className="text-[#6c7883] text-sm">{desc}</p>
    </div>
  );
}
