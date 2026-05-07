import { Descriptions } from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  LikeOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

interface Props {
  endsAt: string;
  left: number;
  isActive: boolean;
  total: number;
}

export default function DiscussionInfo({
  endsAt,
  left,
  isActive,
  total,
}: Props) {
  const timeLeftValue = isActive
    ? left === 0
      ? 'Bugun tugaydi'
      : `${left} kun`
    : 'Tugagan';
  const timeLeftDanger = isActive && left <= 3;

  const items = [
    {
      key: 'endsAt',
      label: (
        <span className="flex items-center gap-2 text-gray-500">
          <CalendarOutlined style={{ color: '#1565c0' }} />
          Tugash sanasi
        </span>
      ),
      children: dayjs(endsAt).format('DD MMMM YYYY'),
    },
    {
      key: 'left',
      label: (
        <span className="flex items-center gap-2 text-gray-500">
          <ClockCircleOutlined style={{ color: '#1565c0' }} />
          Qolgan vaqt
        </span>
      ),
      children: (
        <span className={timeLeftDanger ? 'text-red-600' : ''}>
          {timeLeftValue}
        </span>
      ),
    },
    {
      key: 'total',
      label: (
        <span className="flex items-center gap-2 text-gray-500">
          <LikeOutlined style={{ color: '#1565c0' }} />
          Jami ovozlar
        </span>
      ),
      children: `${total} ta`,
    },
  ];

  return (
    <div className="bg-white border border-[#e3e8f0] rounded-2xl px-6 py-5">
      <h3 className="text-sm font-bold text-[#0f1f3d] mb-3.5">
        Muhokama ma'lumoti
      </h3>
      <Descriptions
        column={1}
        size="small"
        items={items}
        styles={{
          label: { fontWeight: 500, fontSize: 13 },
          content: { fontWeight: 600, fontSize: 13, color: '#0f1f3d', justifyContent: 'flex-end' },
        }}
      />
    </div>
  );
}
