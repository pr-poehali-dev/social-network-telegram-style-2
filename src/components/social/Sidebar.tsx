import Icon from "@/components/ui/icon";
import { Section, Chat, Story, STORIES, CONTACTS } from "./types";

interface SidebarProps {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
  activeChat: Chat | null;
  setActiveChat: (c: Chat) => void;
  filteredItems: Chat[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sectionTitle: string;
  openStory: (story: Story) => void;
}

const NAV_ITEMS = [
  { id: "chats" as Section, icon: "MessageCircle", label: "Чаты" },
  { id: "channels" as Section, icon: "Megaphone", label: "Каналы" },
  { id: "groups" as Section, icon: "Users", label: "Группы" },
  { id: "contacts" as Section, icon: "BookUser", label: "Контакты" },
  { id: "media" as Section, icon: "Image", label: "Медиа" },
  { id: "search" as Section, icon: "Search", label: "Поиск" },
  { id: "settings" as Section, icon: "Settings", label: "Настройки" },
];

export default function Sidebar({
  activeSection,
  setActiveSection,
  activeChat,
  setActiveChat,
  filteredItems,
  searchQuery,
  setSearchQuery,
  sectionTitle,
  openStory,
}: SidebarProps) {
  return (
    <>
      {/* ── Desktop: left nav strip (hidden on mobile) ── */}
      <div
        className="hidden md:flex w-[62px] flex-col items-center py-3 gap-0.5 flex-shrink-0"
        style={{ background: "#17212b", borderRight: "1px solid #2a2a3a" }}
      >
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm mb-2 ring-2 ring-[#5288c1]"
          style={{ background: "#5288c1" }}
          onClick={() => setActiveSection("settings")}
        >
          А
        </button>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            title={item.label}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-[#1f2d3d] relative group"
            style={activeSection === item.id ? { background: "#2b5278" } : {}}
          >
            <Icon
              name={item.icon}
              size={20}
              className={activeSection === item.id ? "text-[#5288c1]" : "text-[#6c7883]"}
            />
            <span
              className="absolute left-[calc(100%+8px)] px-2 py-1 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20"
              style={{ background: "#242f3d", boxShadow: "0 4px 12px rgba(0,0,0,0.5)" }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* ── Chat list panel (desktop: fixed width, mobile: full width) ── */}
      <div
        className="flex flex-col flex-shrink-0 md:w-[300px] w-full"
        style={{ background: "#17212b", borderRight: "1px solid #2a2a3a" }}
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-3 flex-shrink-0" style={{ paddingTop: "env(safe-area-inset-top, 16px)" }}>
          <div className="flex items-center justify-between mb-3">
            {/* Mobile: show avatar button inline */}
            <div className="flex items-center gap-2">
              <button
                className="md:hidden w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs ring-2 ring-[#5288c1]"
                style={{ background: "#5288c1" }}
                onClick={() => setActiveSection("settings")}
              >
                А
              </button>
              <h1 className="text-[#e8eaf0] font-semibold">{sectionTitle}</h1>
            </div>
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
                <button
                  key={story.id}
                  onClick={() => openStory(story)}
                  className="flex flex-col items-center gap-1 flex-shrink-0 group"
                >
                  <div
                    className="p-[2px] rounded-full"
                    style={{
                      background: story.seen
                        ? "#3a3a4a"
                        : "linear-gradient(135deg, #5288c1, #8e5af7)",
                    }}
                  >
                    <div
                      className="w-[46px] h-[46px] rounded-full flex items-center justify-center font-bold text-white text-sm border-2"
                      style={{ background: story.color, borderColor: "#17212b" }}
                    >
                      {story.id === 1 ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                          <span>А</span>
                          <div
                            className="absolute bottom-0 right-0 w-4 h-4 rounded-full flex items-center justify-center border"
                            style={{ background: "#5288c1", borderColor: "#17212b" }}
                          >
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
        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
          {(activeSection === "chats" || activeSection === "channels" || activeSection === "groups") &&
            filteredItems.map(chat => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className="w-full flex items-center gap-3 px-4 py-3 transition-colors text-left hover:bg-[#1f2d3d] active:bg-[#2b5278]"
                style={activeChat?.id === chat.id ? { background: "#2b5278" } : {}}
              >
                <div className="relative flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                    style={{ background: chat.color, fontSize: "15px" }}
                  >
                    {chat.avatar}
                  </div>
                  {chat.online && chat.type === "chat" && (
                    <div
                      className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                      style={{ background: "#4dcd5e", borderColor: "#17212b" }}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1 min-w-0">
                      {chat.pinned && (
                        <Icon name="Pin" size={10} className="text-[#6c7883] flex-shrink-0" style={{ transform: "rotate(45deg)" }} />
                      )}
                      {chat.type === "channel" && <Icon name="Megaphone" size={10} className="text-[#6c7883] flex-shrink-0" />}
                      {chat.type === "group" && <Icon name="Users" size={10} className="text-[#6c7883] flex-shrink-0" />}
                      <span className="text-[#e8eaf0] text-sm font-medium truncate">{chat.name}</span>
                    </div>
                    <span className="text-[11px] text-[#6c7883] flex-shrink-0 ml-1">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6c7883] text-xs truncate">{chat.lastMessage}</span>
                    {chat.unread > 0 && (
                      <span
                        className="min-w-[18px] h-[18px] rounded-full text-white text-[10px] font-bold flex items-center justify-center px-1 flex-shrink-0 ml-1"
                        style={{ background: "#5288c1" }}
                      >
                        {chat.unread > 99 ? "99+" : chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          }

          {activeSection === "contacts" && (
            <div className="p-2">
              {CONTACTS.map((contact, i) => (
                <div key={contact.id}>
                  {(i === 0 || contact.name[0] !== CONTACTS[i - 1].name[0]) && (
                    <div className="px-3 py-1 text-xs font-semibold" style={{ color: "#5288c1" }}>
                      {contact.name[0]}
                    </div>
                  )}
                  <div className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-colors hover:bg-[#1f2d3d] active:bg-[#1f2d3d]">
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-sm"
                        style={{ background: contact.color }}
                      >
                        {contact.avatar}
                      </div>
                      {contact.online && (
                        <div
                          className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                          style={{ background: "#4dcd5e", borderColor: "#17212b" }}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#e8eaf0] text-sm font-medium truncate">{contact.name}</p>
                      <p className="text-[#6c7883] text-xs">{contact.phone}</p>
                    </div>
                    <button className="p-2 rounded-lg transition-colors hover:bg-[#2a3a4a]">
                      <Icon name="MessageCircle" size={18} className="text-[#5288c1]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
