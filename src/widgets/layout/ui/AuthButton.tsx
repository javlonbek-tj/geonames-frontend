import { Link, useNavigate } from 'react-router';
import { Dropdown } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { useCitizenStore } from '@/entities/citizen/model/citizenStore';

export default function AuthButton() {
  const navigate = useNavigate();
  const { citizen, clearAuth } = useCitizenStore();

  const handleLogout = () => {
    clearAuth();
    void navigate('/');
  };

  if (citizen) {
    return (
      <Dropdown
        trigger={['click']}
        menu={{
          items: [
            {
              key: 'logout',
              icon: <LogoutOutlined />,
              label: 'Chiqish',
              danger: true,
              onClick: handleLogout,
            },
          ],
        }}
      >
        <button className="flex items-center gap-2 h-9 px-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors cursor-pointer text-sm font-medium text-gray-700">
          <div className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center shrink-0">
            <UserOutlined style={{ color: '#fff', fontSize: 11 }} />
          </div>
          <span className="hidden sm:block max-w-30 truncate">
            {citizen.fullName?.split(' ')[0]}
          </span>
          <DownOutlined className="hidden sm:block" style={{ fontSize: 10, color: '#9ca3af' }} />
        </button>
      </Dropdown>
    );
  }

  return (
    <Link
      to="/login"
      className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-lg text-xs font-semibold text-white bg-[#1565c0] hover:opacity-90 transition-opacity"
    >
      <LoginOutlined />
      Kirish
    </Link>
  );
}
