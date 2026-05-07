import {
  CheckCircleOutlined,
  DislikeOutlined,
  LikeOutlined,
  UserOutlined,
} from '@ant-design/icons';

export const STEPS = [
  {
    icon: <UserOutlined style={{ fontSize: 20, color: '#1565c0' }} />,
    title: 'Tizimga kiring',
    desc: '@geonomlar_bot Telegram botini ishga tushiring, telefon raqamingizni ulashing va login sahifasida tasdiqlash kodini kiriting.',
  },
  {
    icon: <CheckCircleOutlined style={{ fontSize: 20, color: '#1565c0' }} />,
    title: 'Muhokamani tanlang',
    desc: "Bosh sahifa yoki \"Muhokamalar\" bo'limida faol muhokamalar ro'yxatini ko'ring va sizni qiziqtirganini tanlang.",
  },
  {
    icon: <LikeOutlined style={{ fontSize: 20, color: '#16a34a' }} />,
    title: "Qo'llayman",
    desc: "Taklif etilgan nom sizga to'g'ri kelsa, yashil \"Qo'llayman\" tugmasini bosing. Ovozingiz darhol qayd etiladi.",
  },
  {
    icon: <DislikeOutlined style={{ fontSize: 20, color: '#dc2626' }} />,
    title: "Qo'llamayman",
    desc: 'Nom nomuvofiq deb hisoblasangiz, qizil "Qo\'llamayman" tugmasini bosib qarshi ovoz bering.',
  },
];
