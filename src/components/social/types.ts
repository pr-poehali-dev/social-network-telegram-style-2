export type Section = "chats" | "channels" | "groups" | "contacts" | "media" | "settings" | "search";

export interface Story {
  id: number;
  name: string;
  avatar: string;
  color: string;
  seen: boolean;
  time: string;
  emoji: string;
}

export interface Chat {
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

export interface Message {
  id: number;
  text: string;
  time: string;
  mine: boolean;
  read: boolean;
}

export const STORIES: Story[] = [
  { id: 1, name: "Мои истории", avatar: "А", color: "#5288c1", seen: false, time: "сейчас", emoji: "🚀" },
  { id: 2, name: "Алина К.", avatar: "А", color: "#ca3f3f", seen: false, time: "2 мин", emoji: "🌅" },
  { id: 3, name: "Денис М.", avatar: "Д", color: "#2ca5e0", seen: false, time: "15 мин", emoji: "💻" },
  { id: 4, name: "Оля Н.", avatar: "О", color: "#8e5af7", seen: true, time: "1 ч", emoji: "✨" },
  { id: 5, name: "Тим Р.", avatar: "Т", color: "#f5a623", seen: true, time: "3 ч", emoji: "📸" },
  { id: 6, name: "Катя В.", avatar: "К", color: "#27ae73", seen: true, time: "5 ч", emoji: "🎵" },
];

export const CHATS: Chat[] = [
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

export const CHANNELS: Chat[] = [
  ...CHATS.filter(c => c.type === "channel"),
  { id: 11, name: "Продуктивность 365", avatar: "П", color: "#16a085", lastMessage: "5 привычек успешных людей...", time: "12:00", unread: 4, online: false, type: "channel" },
  { id: 12, name: "Кино и Сериалы", avatar: "🎬", color: "#8e44ad", lastMessage: "Обзор: лучшее за месяц", time: "10:30", unread: 2, online: false, type: "channel" },
];

export const GROUPS: Chat[] = [
  ...CHATS.filter(c => c.type === "group"),
  { id: 13, name: "Семья ❤️", avatar: "С", color: "#e74c3c", lastMessage: "Мама: Ждём вас в воскресенье!", time: "09:00", unread: 8, online: false, type: "group" },
  { id: 14, name: "Спорт Команда", avatar: "⚽", color: "#27ae60", lastMessage: "Тренировка в 19:00", time: "вчера", unread: 0, online: false, type: "group" },
];

export const CONTACTS = [
  { id: 1, name: "Алина Краснова", avatar: "А", color: "#ca3f3f", phone: "+7 900 123-45-67", online: true },
  { id: 2, name: "Денис Морозов", avatar: "Д", color: "#2ca5e0", phone: "+7 912 234-56-78", online: true },
  { id: 3, name: "Катя Волкова", avatar: "К", color: "#e67e22", phone: "+7 926 345-67-89", online: true },
  { id: 4, name: "Маша Соколова", avatar: "М", color: "#e91e8c", phone: "+7 963 789-01-23", online: false },
  { id: 5, name: "Ольга Никитина", avatar: "О", color: "#8e5af7", phone: "+7 931 456-78-90", online: false },
  { id: 6, name: "Тим Романов", avatar: "Т", color: "#1abc9c", phone: "+7 945 567-89-01", online: false },
  { id: 7, name: "Антон Белов", avatar: "А", color: "#3498db", phone: "+7 950 678-90-12", online: false },
];

export const MESSAGES: Message[] = [
  { id: 1, text: "Привет! Как дела?", time: "20:01", mine: false, read: true },
  { id: 2, text: "Всё отлично, спасибо! Работаю над новым проектом 🚀", time: "20:02", mine: true, read: true },
  { id: 3, text: "Звучит интересно! Расскажи подробнее", time: "20:03", mine: false, read: true },
  { id: 4, text: "Строим социальную сеть в стиле Telegram — тёмная тема, stories, чаты, каналы", time: "20:05", mine: true, read: true },
  { id: 5, text: "Вау, это круто! Когда запуск?", time: "20:06", mine: false, read: true },
  { id: 6, text: "Уже сейчас 😄", time: "20:07", mine: true, read: true },
  { id: 7, text: "Хорошо, увидимся завтра!", time: "21:45", mine: false, read: true },
];

export const MEDIA_ITEMS = [
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
