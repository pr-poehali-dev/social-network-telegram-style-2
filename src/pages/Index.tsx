import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "chats" | "channels" | "groups" | "contacts" | "media" | "settings" | "search";

interface Story {
  id: number;
  name: string;
  avatar: string;
  color: string;
  seen: boolean;
  time: string;
  emoji: string;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  color: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  pinned?: boolean;
  type?: "channel" | "group" | "chat";
}

interface Message {
  id: number;
  text: string;
  time: string;
  mine: boolean;
  read: boolean;
}

const STORIES: Story[] = [
  { id: 1, name: "Мои истории", avatar: "А", color: "#5288c1", seen: false, time: "сейчас", emoji: "🚀" },
  { id: 2, name: "Алина К.", avatar: "А", color: "#ca3f3f", seen: false, time: "2 мин", emoji: "🌅" },
  { id: 3, name: "Денис М.", avatar: "Д", color: "#2ca5e0", seen: false, time: "15 мин", emoji: "💻" },
  { id: 4, name: "Оля Н.", avatar: "О", color: "#8e5af7", seen: true, time: "1 ч", emoji: "✨" },
  { id: 5, name: "Тим Р.", avatar: "Т", color: "#f5a623", seen: true, time: "3 ч", emoji: "📸" },
  { id: 6, name: "Катя В.", avatar: "К", color: "#27ae73", seen: true, time: "5 ч", emoji: "🎵" },
];

const CHATS: Chat[] = [
  { id: 1, name: "Алина Краснова", avatar: "А", color: "#ca3f3f", lastMessage: "Хорошо, увидимся завтра!", time: "21:45", unread: 2, online: true, pinned: true, type: "chat" },
  { id: 2, name: "Команда проекта", avatar: "К", color: "#5288c1", lastMessage: "Дима: Готово, смотрите результат", time: "21:30", unread: 5, online: false, pinned: true, type: "group" },
  { id: 3, name: "Денис Морозов", avatar: "Д", color: "#2ca5e0", lastMessage: "Ты: Ок, понял 👍", time: "20:15", unread: 0, online: true, type: "chat" },
  { id: 4, name: "Tech Новости", avatar: "Т", color: "#f5a623", lastMessage: "Apple выпустила обновление...", time: "19:00", unread: 12, online: false, type: "channel" },
  { id: 5, name: "Ольга Никитина", avatar: "О", color: "#8e5af7", lastMessage: "Спасибо большое!", time: "18:44", unread: 0, online: false, type: "chat" },
  { id: 6, name: "Дизайн Хаб", avatar: "Д", color: "#27ae73", lastMessage: "Маша: Посмотрите референсы", time: "17:30", unread: 3, online: false, type: "group" },
  { id: 7, name: "Катя Волкова", avatar: "К", color: "#e67e22", lastMessage: "Договорились на пятницу", time: "16:00", unread: 0, online: true, type: "chat" },
  { id: 8, name: "Crypto Channel", avatar: "₿", color: "#f39c12", lastMessage: "BTC достиг нового ATH...", time: "15:22", unread: 7, online: false, type: "channel" },
  { id: 9, name: "Тим Романов", avatar: "Т", color: "#1abc9c", lastMessage: "До встречи!", time: "14:10", unread: 0, online: false, type: "chat" },
  { id: 10, name: "Разработка", avatar: "Р", color: "#3498db", lastMessage: "Антон: PR одобрен", time: "13:05", unread: 1, online: false, type: "group" },
];

const CHANNELS: Chat[] = [
  ...CHATS.filter(c => c.type === "channel"),
  { id: 11, name: "Продуктивность 365", avatar: "П", color: "#16a085", lastMessage: "5 привычек успешных людей...", time: "12:00", unread: 4, online: false, type: "channel" },
  { id: 12, name: "Кино и Сериалы", avatar: "🎬", color: "#8e44ad", lastMessage: "Обзор: лучшее за месяц", time: "10:30", unread: 2, online: false, type: "channel" },
];

const GROUPS: Chat[] = [
  ...CHATS.filter(c => c.type === "group"),
  { id: 13, name: "Семья ❤️", avatar: "С", color: "#e74c3c", lastMessage: "Мама: Ждём вас в воскресенье!", time: "09:00", unread: 8, online: false, type: "group" },
  { id: 14, name: "Спорт Команда", avatar: "⚽", color: "#27ae60", lastMessage: "Тренировка в 19:00", time: "вчера", unread: 0, online: false, type: "group" },
];

const CONTACTS = [
  { id: 1, name: "Алина Краснова", avatar: "А", color: "#ca3f3f", phone: "+7 900 123-45-67", online: true },
  { id: 2, name: "Денис Морозов", avatar: "Д", color: "#2ca5e0", phone: "+7 912 234-56-78", online: true },
  { id: 3, name: "Катя Волкова", avatar: "К", color: "#e67e22", phone: "+7 926 345-67-89", online: true },
  { id: 4, name: "Маша Соколова", avatar: "М", color: "#e91e8c", phone: "+7 963 789-01-23", online: false },
  { id: 5, name: "Ольга Никитина", avatar: "О", color: "#8e5af7", phone: "+7 931 456-78-90", online: false },
  { id: 6, name: "Тим Романов", avatar: "Т", color: "#1abc9c", phone: "+7 945 567-89-01", online: false },
  { id: 7, name: "Антон Белов", avatar: "А", color: "#3498db", phone: "+7 950 678-90-12", online: false },
];

const MESSAGES: Message[] = [
  { id: 1, text: "Привет! Как дела?", time: "20:01", mine: false, read: true },
  { id: 2, text: "Всё отлично, спасибо! Работаю над новым проектом 🚀", time: "20:02", mine: true, read: true },
  { id: 3, text: "Звучит интересно! Расскажи подробнее", time: "20:03", mine: false, read: true },
  { id: 4, text: "Строим социальную сеть в стиле Telegram — тёмная тема, stories, чаты, каналы", time: "20:05", mine: true, read: true },
  { id: 5, text: "Вау, это круто! Когда запуск?", time: "20:06", mine: false, read: true },
  { id: 6, text: "Уже сейчас 😄", time: "20:07", mine: true, read: true },
  { id: 7, text: "Хорошо, увидимся завтра!", time: "21:45", mine: false, read: true },
];

const MEDIA_ITEMS = [
  { id: 1, type: "photo", thumb: "🌅", label: "Закат" },
  { id: 2, type: "photo", thumb: "🏔️", label: "Горы" },
  { id: 3, type: "video", thumb: "🎬", label: "Видео" },
  { id: 4, type: "photo", thumb: "🌃", label: "Ночной город" },
  { id: 5, type: "photo", thumb: "🌊", label: "Море" },
  { id: 6, type: "video", thumb: "🎵", label: "Концерт" },
  { id: 7, type: "photo", thumb: "🌸", label: "Весна" },
  { id: 8, type: "photo", thumb: "🦋", label: "Природа" },
  { id: 9, type: "video", thumb: "🎮", label: "Игра" },
];

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

  const navItems = [
    { id: "chats" as Section, icon: "MessageCircle", label: "Чаты" },
    { id: "channels" as Section, icon: "Megaphone", label: "Каналы" },
    { id: "groups" as Section, icon: "Users", label: "Группы" },
    { id: "contacts" as Section, icon: "BookUser", label: "Контакты" },
    { id: "media" as Section, icon: "Image", label: "Медиа" },
    { id: "search" as Section, icon: "Search", label: "Поиск" },
    { id: "settings" as Section, icon: "Settings", label: "Настройки" },
  ];

  const sectionTitle = {
    chats: "Чаты", channels: "Каналы", groups: "Группы",
    contacts: "Контакты", media: "Медиа", search: "Поиск", settings: "Настройки"
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
                <div className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${storyProgress}%` }} />
              </div>
            </div>
            <div className="pt-8 pb-0 relative" style={{ background: `linear-gradient(160deg, ${storyOpen.color}dd 0%, #0f1923 100%)` }}>
              <div className="flex items-center gap-3 px-4 mb-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm"
                  style={{ background: storyOpen.color }}>
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
              <div className="mx-4 mb-4 h-[380px] rounded-xl flex flex-col items-center justify-center"
                style={{ background: "rgba(0,0,0,0.35)" }}>
                <span className="text-8xl mb-6">{storyOpen.emoji}</span>
                <p className="text-white text-lg font-semibold px-4 text-center">История {storyOpen.name.split(" ")[0]}</p>
                <p className="text-white/50 text-xs mt-2">Исчезнет через 24 часа</p>
              </div>
              <div className="flex items-center gap-2 px-4 pb-4">
                <div className="flex-1 bg-white/10 rounded-full px-4 py-2.5 flex items-center gap-2">
                  <input className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/40"
                    placeholder="Ответить на историю..." />
                </div>
                <button className="p-2.5 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Icon name="Heart" size={18} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Left nav strip */}
      <div className="w-[62px] flex flex-col items-center py-3 gap-0.5 flex-shrink-0" style={{ background: "#17212b", borderRight: "1px solid #2a2a3a" }}>
        {/* Avatar */}
        <button className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm mb-2 ring-2 ring-[#5288c1]"
          style={{ background: "#5288c1" }}
          onClick={() => setActiveSection("settings")}>
          А
        </button>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            title={item.label}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-[#1f2d3d] relative group`}
            style={activeSection === item.id ? { background: "#2b5278" } : {}}
          >
            <Icon
              name={item.icon}
              size={20}
              className={activeSection === item.id ? "text-[#5288c1]" : "text-[#6c7883]"}
            />
            <span className="absolute left-[calc(100%+8px)] px-2 py-1 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20"
              style={{ background: "#242f3d", boxShadow: "0 4px 12px rgba(0,0,0,0.5)" }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Chat list */}
      <div className="w-[300px] flex flex-col flex-shrink-0" style={{ background: "#17212b", borderRight: "1px solid #2a2a3a" }}>
        {/* Header */}
        <div className="px-4 pt-4 pb-3 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-[#e8eaf0] font-semibold">{sectionTitle}</h1>
            <button className="p-1.5 rounded-lg transition-colors hover:bg-[#1f2d3d]">
              <Icon name="PenSquare" size={16} className="text-[#6c7883]" />
            </button>
          </div>
          <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: "#242f3d" }}>
            <Icon name="Search" size={14} className="text-[#6c7883]" />
            <input
              className="flex-1 bg-transparent text-[#e8eaf0] text-sm outline-none placeholder:text-[#6c7883]"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")}>
                <Icon name="X" size={13} className="text-[#6c7883]" />
              </button>
            )}
          </div>
        </div>

        {/* Stories */}
        {activeSection === "chats" && (
          <div className="px-3 pb-3 flex-shrink-0">
            <div className="flex gap-2.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {STORIES.map(story => (
                <button key={story.id} onClick={() => openStory(story)}
                  className="flex flex-col items-center gap-1 flex-shrink-0 group">
                  <div className={`p-[2px] rounded-full`}
                    style={{
                      background: story.seen
                        ? "#3a3a4a"
                        : "linear-gradient(135deg, #5288c1, #8e5af7)"
                    }}>
                    <div className="w-[46px] h-[46px] rounded-full flex items-center justify-center font-bold text-white text-sm border-2"
                      style={{ background: story.color, borderColor: "#17212b" }}>
                      {story.id === 1 ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <span>А</span>
                          <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full flex items-center justify-center border"
                            style={{ background: "#5288c1", borderColor: "#17212b" }}>
                            <Icon name="Plus" size={9} className="text-white" />
                          </div>
                        </div>
                      ) : story.avatar}
                    </div>
                  </div>
                  <span className="text-[10px] text-[#6c7883] max-w-[52px] truncate group-hover:text-[#aab] transition-colors">
                    {story.id === 1 ? "Мои" : story.name.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="mx-4 mb-1 h-px" style={{ background: "#2a2a3a" }} />

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {(activeSection === "chats" || activeSection === "channels" || activeSection === "groups") && (
            filteredItems.map(chat => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className="w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left hover:bg-[#1f2d3d]"
                style={activeChat?.id === chat.id ? { background: "#2b5278" } : {}}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-sm"
                    style={{ background: chat.color }}>
                    {chat.avatar}
                  </div>
                  {chat.online && chat.type === "chat" && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                      style={{ background: "#4dcd5e", borderColor: "#17212b" }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1 min-w-0">
                      {chat.pinned && <Icon name="Pin" size={10} className="text-[#6c7883] flex-shrink-0" style={{ transform: "rotate(45deg)" }} />}
                      {chat.type === "channel" && <Icon name="Megaphone" size={10} className="text-[#6c7883] flex-shrink-0" />}
                      {chat.type === "group" && <Icon name="Users" size={10} className="text-[#6c7883] flex-shrink-0" />}
                      <span className="text-[#e8eaf0] text-sm font-medium truncate">{chat.name}</span>
                    </div>
                    <span className="text-[11px] text-[#6c7883] flex-shrink-0 ml-1">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6c7883] text-xs truncate">{chat.lastMessage}</span>
                    {chat.unread > 0 && (
                      <span className="min-w-[18px] h-[18px] rounded-full text-white text-[10px] font-bold flex items-center justify-center px-1 flex-shrink-0 ml-1"
                        style={{ background: "#5288c1" }}>
                        {chat.unread > 99 ? "99+" : chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}

          {activeSection === "contacts" && (
            <div className="p-2">
              {CONTACTS.map((contact, i) => (
                <div key={contact.id}>
                  {(i === 0 || contact.name[0] !== CONTACTS[i - 1].name[0]) && (
                    <div className="px-3 py-1 text-xs font-semibold" style={{ color: "#5288c1" }}>
                      {contact.name[0]}
                    </div>
                  )}
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors hover:bg-[#1f2d3d]">
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                        style={{ background: contact.color }}>
                        {contact.avatar}
                      </div>
                      {contact.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                          style={{ background: "#4dcd5e", borderColor: "#17212b" }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#e8eaf0] text-sm font-medium truncate">{contact.name}</p>
                      <p className="text-[#6c7883] text-xs">{contact.phone}</p>
                    </div>
                    <button className="p-1.5 rounded-lg transition-colors hover:bg-[#2a3a4a]">
                      <Icon name="MessageCircle" size={15} className="text-[#5288c1]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeSection === "settings" && <SettingsPanel />}
        {activeSection === "media" && <MediaPanel />}
        {activeSection === "search" && <SearchPanel />}
        {activeSection === "contacts" && <EmptyPanel icon="BookUser" title="Контакты" desc="Выберите контакт из списка, чтобы написать сообщение" />}

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

function ChatWindow({ chat, messages, messageText, onTextChange, onSend }: {
  chat: Chat;
  messages: Message[];
  messageText: string;
  onTextChange: (v: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ background: "#17212b", borderBottom: "1px solid #2a2a3a" }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
          style={{ background: chat.color }}>
          {chat.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[#e8eaf0] font-semibold text-sm truncate">{chat.name}</div>
          <div className="text-xs text-[#6c7883]">
            {chat.type === "channel" ? "канал" : chat.type === "group" ? "группа · 12 участников" : chat.online ? "в сети" : "был(а) недавно"}
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
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1"
        style={{ background: "linear-gradient(180deg, #0f1923 0%, #131f2e 100%)" }}>
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
                  <Icon name={msg.read ? "CheckCheck" : "Check"} size={12}
                    className={msg.read ? "text-[#5288c1]" : "text-[#6c8fa8]"} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-3 py-3 flex items-end gap-2 flex-shrink-0" style={{ background: "#17212b", borderTop: "1px solid #2a2a3a" }}>
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
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(); } }}
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

function EmptyPanel({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-6"
      style={{ background: "linear-gradient(180deg, #0f1923 0%, #131f2e 100%)" }}>
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ background: "#1f2d3d" }}>
        <Icon name={icon} size={28} className="text-[#5288c1]" />
      </div>
      <p className="text-[#e8eaf0] font-semibold">{title}</p>
      <p className="text-[#6c7883] text-sm">{desc}</p>
    </div>
  );
}

function MediaPanel() {
  const [tab, setTab] = useState<"photos" | "videos" | "files">("photos");
  const filtered = tab === "files" ? MEDIA_ITEMS : MEDIA_ITEMS.filter(m => tab === "photos" ? m.type === "photo" : m.type === "video");
  return (
    <div className="flex-1 flex flex-col" style={{ background: "linear-gradient(180deg, #0f1923 0%, #131f2e 100%)" }}>
      <div className="px-6 pt-6 pb-4 flex-shrink-0" style={{ borderBottom: "1px solid #2a2a3a" }}>
        <h2 className="text-[#e8eaf0] text-xl font-semibold mb-4">Медиафайлы</h2>
        <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: "#242f3d" }}>
          {(["photos", "videos", "files"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 py-1.5 rounded-lg text-sm transition-all"
              style={tab === t ? { background: "#5288c1", color: "white" } : { color: "#6c7883" }}>
              {t === "photos" ? "Фото" : t === "videos" ? "Видео" : "Файлы"}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-3 gap-2">
          {filtered.map(item => (
            <div key={item.id} className="aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group hover:bg-[#2a3a4a]"
              style={{ background: "#1f2d3d" }}>
              <span className="text-4xl group-hover:scale-110 transition-transform">{item.thumb}</span>
              <span className="text-xs mt-1" style={{ color: "#6c7883" }}>{item.label}</span>
              {item.type === "video" && <Icon name="Play" size={12} className="text-[#5288c1] mt-0.5" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchPanel() {
  const [query, setQuery] = useState("");
  const all = [...CHATS, ...CONTACTS.map(c => ({
    ...c, type: "contact" as const, lastMessage: c.phone, time: "", unread: 0, pinned: false
  }))];
  const results = query.length > 1 ? all.filter(i => i.name.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <div className="flex-1 flex flex-col" style={{ background: "linear-gradient(180deg, #0f1923 0%, #131f2e 100%)" }}>
      <div className="px-6 pt-6 pb-4 flex-shrink-0" style={{ borderBottom: "1px solid #2a2a3a" }}>
        <h2 className="text-[#e8eaf0] text-xl font-semibold mb-4">Глобальный поиск</h2>
        <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "#242f3d" }}>
          <Icon name="Search" size={18} className="text-[#6c7883]" />
          <input className="flex-1 bg-transparent text-[#e8eaf0] outline-none placeholder:text-[#6c7883]"
            placeholder="Чаты, каналы, люди..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus />
          {query && (
            <button onClick={() => setQuery("")}>
              <Icon name="X" size={16} className="text-[#6c7883] hover:text-white transition-colors" />
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {query.length <= 1 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 pb-20">
            <Icon name="Search" size={48} className="text-[#1f2d3d]" />
            <p className="text-[#6c7883] text-sm">Начните вводить запрос</p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 pb-20">
            <Icon name="SearchX" size={48} className="text-[#1f2d3d]" />
            <p className="text-[#6c7883] text-sm">Ничего не найдено по «{query}»</p>
          </div>
        ) : (
          <div className="space-y-0.5 py-2">
            {results.map(item => (
              <div key={item.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors hover:bg-[#1f2d3d]">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                  style={{ background: item.color }}>
                  {item.avatar}
                </div>
                <div>
                  <p className="text-[#e8eaf0] text-sm font-medium">{item.name}</p>
                  <p className="text-[#6c7883] text-xs">
                    {(item as {type?: string}).type === "channel" ? "Канал" : (item as {type?: string}).type === "group" ? "Группа" : (item as {type?: string}).type === "contact" ? "Контакт" : "Диалог"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsPanel() {
  const items = [
    { icon: "User", label: "Мой профиль", desc: "Имя, фото, статус" },
    { icon: "Bell", label: "Уведомления", desc: "Звуки, вибрация, режим без звука" },
    { icon: "Lock", label: "Конфиденциальность", desc: "Блокировки, активные сеансы" },
    { icon: "Palette", label: "Оформление", desc: "Тема, размер шрифта, фон чата" },
    { icon: "Database", label: "Данные и хранилище", desc: "Автозагрузка медиа, кеш" },
    { icon: "Globe", label: "Язык", desc: "Русский" },
    { icon: "HelpCircle", label: "Помощь", desc: "FAQ, поддержка, о приложении" },
  ];
  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "linear-gradient(180deg, #0f1923 0%, #131f2e 100%)" }}>
      <div className="flex flex-col items-center py-10 px-6 flex-shrink-0" style={{ borderBottom: "1px solid #2a2a3a" }}>
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-3"
          style={{ background: "#5288c1", boxShadow: "0 0 0 4px #2b5278" }}>
          А
        </div>
        <h2 className="text-[#e8eaf0] text-xl font-semibold">Алексей Иванов</h2>
        <p className="text-[#5288c1] text-sm mt-0.5">@aleksei_ivan</p>
        <p className="text-[#6c7883] text-sm mt-1">+7 900 123-45-67</p>
        <div className="flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full" style={{ background: "#1f2d3d" }}>
          <div className="w-2 h-2 rounded-full" style={{ background: "#4dcd5e" }} />
          <span className="text-xs" style={{ color: "#4dcd5e" }}>в сети</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {items.map((s, i) => (
          <button key={i} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-left group hover:bg-[#1f2d3d]">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "#2b5278" }}>
              <Icon name={s.icon} size={17} className="text-[#5288c1]" />
            </div>
            <div className="flex-1">
              <p className="text-[#e8eaf0] text-sm font-medium">{s.label}</p>
              <p className="text-xs" style={{ color: "#6c7883" }}>{s.desc}</p>
            </div>
            <Icon name="ChevronRight" size={15} className="text-[#3a4a5a] group-hover:text-[#6c7883] transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}