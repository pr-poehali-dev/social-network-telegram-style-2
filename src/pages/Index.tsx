import { useState } from "react";
import { Section, Chat, Story, Message, CHATS, CHANNELS, GROUPS, MESSAGES } from "@/components/social/types";
import Sidebar from "@/components/social/Sidebar";
import { ChatWindow, EmptyPanel } from "@/components/social/ChatWindow";
import { MediaPanel, SearchPanel, SettingsPanel } from "@/components/social/Panels";
import Icon from "@/components/ui/icon";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("chats");
  const [activeChat, setActiveChat] = useState<Chat | null>(CHATS[0]);
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

  return (
    <div className="h-screen w-screen flex overflow-hidden font-golos" style={{ background: "#0f1923" }}>

      {/* Story overlay */}
      {storyOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={closeStory}
        >
          <div className="w-[360px] max-w-[95vw] rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Progress */}
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

      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        filteredItems={filteredItems}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sectionTitle={sectionTitle}
        openStory={openStory}
      />

      {/* Main panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeSection === "settings" && <SettingsPanel />}
        {activeSection === "media" && <MediaPanel />}
        {activeSection === "search" && <SearchPanel />}
        {activeSection === "contacts" && (
          <EmptyPanel icon="BookUser" title="Контакты" desc="Выберите контакт из списка, чтобы написать сообщение" />
        )}
        {(activeSection === "chats" || activeSection === "channels" || activeSection === "groups") && (
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
  );
}
