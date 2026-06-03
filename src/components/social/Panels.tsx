import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CHATS, CONTACTS, MEDIA_ITEMS } from "./types";

export function MediaPanel() {
  const [tab, setTab] = useState<"photos" | "videos" | "files">("photos");
  const filtered =
    tab === "files"
      ? MEDIA_ITEMS
      : MEDIA_ITEMS.filter(m => (tab === "photos" ? m.type === "photo" : m.type === "video"));

  return (
    <div className="flex-1 flex flex-col" style={{ background: "linear-gradient(180deg, #0f1923 0%, #131f2e 100%)" }}>
      <div className="px-6 pt-6 pb-4 flex-shrink-0" style={{ borderBottom: "1px solid #2a2a3a" }}>
        <h2 className="text-[#e8eaf0] text-xl font-semibold mb-4">Медиафайлы</h2>
        <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: "#242f3d" }}>
          {(["photos", "videos", "files"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-1.5 rounded-lg text-sm transition-all"
              style={tab === t ? { background: "#5288c1", color: "white" } : { color: "#6c7883" }}
            >
              {t === "photos" ? "Фото" : t === "videos" ? "Видео" : "Файлы"}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-3 gap-2">
          {filtered.map(item => (
            <div
              key={item.id}
              className="aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group hover:bg-[#2a3a4a]"
              style={{ background: "#1f2d3d" }}
            >
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

export function SearchPanel() {
  const [query, setQuery] = useState("");
  const all = [
    ...CHATS,
    ...CONTACTS.map(c => ({
      ...c,
      type: "contact" as const,
      lastMessage: c.phone,
      time: "",
      unread: 0,
      pinned: false,
    })),
  ];
  const results = query.length > 1 ? all.filter(i => i.name.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <div className="flex-1 flex flex-col" style={{ background: "linear-gradient(180deg, #0f1923 0%, #131f2e 100%)" }}>
      <div className="px-6 pt-6 pb-4 flex-shrink-0" style={{ borderBottom: "1px solid #2a2a3a" }}>
        <h2 className="text-[#e8eaf0] text-xl font-semibold mb-4">Глобальный поиск</h2>
        <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "#242f3d" }}>
          <Icon name="Search" size={18} className="text-[#6c7883]" />
          <input
            className="flex-1 bg-transparent text-[#e8eaf0] outline-none placeholder:text-[#6c7883]"
            placeholder="Чаты, каналы, люди..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
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
              <div
                key={item.id}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors hover:bg-[#1f2d3d]"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                  style={{ background: item.color }}
                >
                  {item.avatar}
                </div>
                <div>
                  <p className="text-[#e8eaf0] text-sm font-medium">{item.name}</p>
                  <p className="text-[#6c7883] text-xs">
                    {(item as { type?: string }).type === "channel"
                      ? "Канал"
                      : (item as { type?: string }).type === "group"
                      ? "Группа"
                      : (item as { type?: string }).type === "contact"
                      ? "Контакт"
                      : "Диалог"}
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

export function SettingsPanel() {
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
    <div
      className="flex-1 flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0f1923 0%, #131f2e 100%)" }}
    >
      <div className="flex flex-col items-center py-10 px-6 flex-shrink-0" style={{ borderBottom: "1px solid #2a2a3a" }}>
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-3"
          style={{ background: "#5288c1", boxShadow: "0 0 0 4px #2b5278" }}
        >
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
          <button
            key={i}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-left group hover:bg-[#1f2d3d]"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#2b5278" }}>
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
