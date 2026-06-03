import { useState } from "react";
import { Section, Chat, Story, Message, CHATS, CHANNELS, GROUPS, MESSAGES } from "@/components/social/types";
import Sidebar from "@/components/social/Sidebar";
import { ChatWindow, EmptyPanel } from "@/components/social/ChatWindow";
import { MediaPanel, SearchPanel, SettingsPanel } from "@/components/social/Panels";
import Icon from "@/components/ui/icon";

const BOTTOM_NAV = [
  { id: "chats" as Section, icon: "MessageCircle", label: "Чаты" },
  { id: "channels" as Section, icon: "Megaphone", label: "Каналы" },
  { id: "groups" as Section, icon: "Users", label: "Группы" },
  { id: "search" as Section, icon: "Search", label: "Поиск" },
  { id: "settings" as Section, icon: "Settings", label: "Профиль" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("chats");
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>(MESSAGES);
  const [searchQuery, setSearchQuery] = useState("");
  const [storyOpen, setStoryOpen] = useState<Story | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [storyIntervalRef, setStoryIntervalRef] = useState<ReturnType<typeof setInterval> | null>(null);

  const sendMessage = () => {
    if (!messageText.trim()) return;
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: messageText,
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      mine: true,
      read: false,
    }]);
    setMessageText("");
  };

  const openStory = (story: Story) => {
    if (storyIntervalRef) clearInterval(storyIntervalRef);
    setStoryOpen(story);
    setStoryProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setStoryProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStoryOpen(null);
        setStoryProgress(0);
      }
    }, 80);
    setStoryIntervalRef(interval);
  };

  const closeStory = () => {
    if (storyIntervalRef) clearInterval(storyIntervalRef);
    setStoryOpen(null);
    setStoryProgress(0);
  };

  const getListItems = () => {
    if (activeSection === "channels") return CHANNELS;
    if (activeSection === "groups") return GROUPS;
    return CHATS;
  };

  const filteredItems = getListItems().filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sectionTitle = {
    chats: "Чаты", channels: "Каналы", groups: "Группы",
    contacts: "Контакты", media: "Медиа", search: "Поиск", settings: "Настройки",
  }[activeSection];

  const isListSection = activeSection === "chats" || activeSection === "channels" || activeSection === "groups" || activeSection === "contacts";
  const showMobileChat = activeChat && isListSection;

  const handleSelectChat = (chat: Chat) => {
    setActiveChat(chat);
  };

  const handleBackFromChat = () => {
    setActiveChat(null);
  };

  const handleSectionChange = (s: Section) => {
    setActiveSection(s);
    setActiveChat(null);
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden font-golos" style={{ background: "#0f1923" }}>

      {/* Story overlay */}
      {storyOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={closeStory}
        >
          <div className="w-[360px] max-w-[95vw] rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex gap-1 px-3 pt-3 absolute top-0 left-0 right-0 z-10 w-[360px] max-w-[95vw]">
              <div className="flex-1 h-0.5 bg-white/25 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${storyProgress}%` }}
                />
              </div>
            </div>
            <div
              className="pt-8 pb-0 relative"
              style={{ background: `linear-gradient(160deg, ${storyOpen.color}dd 0%, #0f1923 100%)` }}
            >
              <div className="flex items-center gap-3 px-4 mb-4">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm"
                  style={{ background: storyOpen.color }}
                >
                  {storyOpen.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{storyOpen.name}</p>
                  <p className="text-white/50 text-xs">{storyOpen.time}</p>
                </div>
                <button className="ml-auto p-1 hover:bg-white/10 rounded-full transition-colors" onClick={closeStory}>
                  <Icon name="X" size={18} className="text-white/70" />
                </button>
              </div>
              <div
                className="mx-4 mb-4 h-[380px] rounded-xl flex flex-col items-center justify-center"
                style={{ background: "rgba(0,0,0,0.35)" }}
              >
                <span className="text-8xl mb-6">{storyOpen.emoji}</span>
                <p className="text-white text-lg font-semibold px-4 text-center">
                  История {storyOpen.name.split(" ")[0]}
                </p>
                <p className="text-white/50 text-xs mt-2">Исчезнет через 24 часа</p>
              </div>
              <div className="flex items-center gap-2 px-4 pb-4">
                <div className="flex-1 bg-white/10 rounded-full px-4 py-2.5 flex items-center gap-2">
                  <input
                    className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/40"
                    placeholder="Ответить на историю..."
                  />
                </div>
                <button className="p-2.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Icon name="Heart" size={18} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Main layout ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── DESKTOP layout ── */}
        <div className="hidden md:flex flex-1 overflow-hidden">
          <Sidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            activeChat={activeChat}
            setActiveChat={handleSelectChat}
            filteredItems={filteredItems}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sectionTitle={sectionTitle}
            openStory={openStory}
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            {activeSection === "settings" && <SettingsPanel />}
            {activeSection === "media" && <MediaPanel />}
            {activeSection === "search" && <SearchPanel />}
            {activeSection === "contacts" && (
              <EmptyPanel icon="BookUser" title="Контакты" desc="Выберите контакт из списка, чтобы написать сообщение" />
            )}
            {isListSection && activeSection !== "contacts" && (
              activeChat ? (
                <ChatWindow
                  chat={activeChat}
                  messages={messages}
                  messageText={messageText}
                  onTextChange={setMessageText}
                  onSend={sendMessage}
                />
              ) : (
                <EmptyPanel icon="MessageCircle" title="Выберите чат" desc="Нажмите на любой диалог, чтобы начать общение" />
              )
            )}
          </div>
        </div>

        {/* ── MOBILE layout ── */}
        <div className="flex md:hidden flex-1 overflow-hidden flex-col">
          {/* Mobile: chat open — full screen chat with back button */}
          {showMobileChat ? (
            <MobileChatView
              chat={activeChat}
              messages={messages}
              messageText={messageText}
              onTextChange={setMessageText}
              onSend={sendMessage}
              onBack={handleBackFromChat}
            />
          ) : (
            <>
              {/* Mobile: list/panel view */}
              <div className="flex-1 overflow-hidden flex flex-col">
                {activeSection === "settings" && <SettingsPanel />}
                {activeSection === "media" && <MediaPanel />}
                {activeSection === "search" && <SearchPanel />}
                {isListSection && (
                  <Sidebar
                    activeSection={activeSection}
                    setActiveSection={handleSectionChange}
                    activeChat={activeChat}
                    setActiveChat={handleSelectChat}
                    filteredItems={filteredItems}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    sectionTitle={sectionTitle}
                    openStory={openStory}
                  />
                )}
              </div>
              {/* Bottom navigation */}
              <div
                className="flex-shrink-0 flex items-center justify-around px-2 pt-2"
                style={{
                  background: "#17212b",
                  borderTop: "1px solid #2a2a3a",
                  paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 8px)",
                }}
              >
                {BOTTOM_NAV.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSectionChange(item.id)}
                    className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors relative"
                    style={activeSection === item.id ? { color: "#5288c1" } : { color: "#6c7883" }}
                  >
                    <Icon name={item.icon} size={22} className={activeSection === item.id ? "text-[#5288c1]" : "text-[#6c7883]"} />
                    <span className="text-[10px] font-medium">{item.label}</span>
                    {activeSection === item.id && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: "#5288c1" }} />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function MobileChatView({ chat, messages, messageText, onTextChange, onSend, onBack }: {
  chat: Chat;
  messages: Message[];
  messageText: string;
  onTextChange: (v: string) => void;
  onSend: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Mobile chat header with back button */}
      <div
        className="flex items-center gap-3 px-3 py-3 flex-shrink-0"
        style={{
          background: "#17212b",
          borderBottom: "1px solid #2a2a3a",
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 12px)",
        }}
      >
        <button
          onClick={onBack}
          className="p-1.5 rounded-full hover:bg-[#1f2d3d] transition-colors flex-shrink-0 mr-1"
        >
          <Icon name="ArrowLeft" size={20} className="text-[#5288c1]" />
        </button>
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
          <button className="p-2 rounded-full transition-colors hover:bg-[#1f2d3d]">
            <Icon name="Phone" size={18} className="text-[#6c7883]" />
          </button>
          <button className="p-2 rounded-full transition-colors hover:bg-[#1f2d3d]">
            <Icon name="MoreVertical" size={18} className="text-[#6c7883]" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-3 py-4 space-y-1"
        style={{ background: "linear-gradient(180deg, #0f1923 0%, #131f2e 100%)" }}
      >
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-[80%] px-3 py-2 text-sm leading-relaxed"
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
        style={{
          background: "#17212b",
          borderTop: "1px solid #2a2a3a",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)",
        }}
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
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-95"
          style={{ background: messageText.trim() ? "#5288c1" : "#242f3d" }}
        >
          <Icon name={messageText.trim() ? "Send" : "Mic"} size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
}
