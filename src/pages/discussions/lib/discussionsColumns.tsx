import { Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DislikeOutlined, LikeOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router';
import type { DiscussionItem } from '@/entities/discussion/api/discussions.api';
import dayjs from 'dayjs';

export function getDiscussionsColumns(): ColumnsType<DiscussionItem> {
  return [
    {
      title: 'Ariza raqami',
      key: 'applicationId',
      className: 'hidden lg:table-cell',
      render: (_, d) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-[#e8efff] text-[#1565c0]">
          GEO-{String(d.applicationId).padStart(5, '0')}
        </span>
      ),
    },
    {
      title: 'Hudud',
      key: 'region',
      render: (_, d) => (
        <>
          {d.regionName && (
            <div className="text-sm text-gray-700 leading-tight">
              {d.regionName}
            </div>
          )}
          {d.districtName && (
            <div className="text-xs text-gray-400">{d.districtName}</div>
          )}
          {!d.regionName && !d.districtName && (
            <span className="text-gray-400 text-xs">—</span>
          )}
        </>
      ),
    },
    {
      title: 'Taklif etilgan nom',
      key: 'name',
      render: (_, d) => (
        <>
          <div className="font-semibold text-gray-900 text-sm leading-tight">
            {d.proposedNameUz}
          </div>
          {d.proposedNameKrill && (
            <div className="text-xs text-gray-400 mt-0.5">
              {d.proposedNameKrill}
            </div>
          )}
        </>
      ),
    },
    {
      title: 'Obyekt turi',
      dataIndex: 'objectType',
      key: 'objectType',
      render: (v: string) => <span className="text-sm text-gray-600">{v}</span>,
    },
    {
      title: 'Ovozlar',
      key: 'votes',
      render: (_, d) => (
        <div className="flex gap-1.5 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
            <LikeOutlined /> {d.supportCount ?? 0}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
            <DislikeOutlined /> {d.opposeCount ?? 0}
          </span>
        </div>
      ),
    },
    {
      title: "Qo'yilgan sana",
      key: 'createdAt',
      render: (_, d) => (
        <span className="text-xs text-gray-500 whitespace-nowrap">
          {d.createdAt ? dayjs(d.createdAt).format('DD.MM.YYYY') : '—'}
        </span>
      ),
    },
    {
      title: 'Muddat',
      key: 'deadline',
      render: (_, d) => {
        const left = dayjs(d.endsAt)
          .startOf('day')
          .diff(dayjs().startOf('day'), 'day');
        const active = left >= 0;
        return (
          <Badge
            status={active ? 'success' : 'default'}
            text={active ? (left === 0 ? 'Bugun tugaydi' : `${left} kun`) : 'Tugagan'}
          />
        );
      },
    },
    {
      title: '',
      key: 'detail',
      width: 44,
      render: (_, d) => (
        <Link
          to={`/discussions/${d.id}`}
          className="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-[#e8efff] transition-colors"
        >
          <EyeOutlined style={{ fontSize: 15, color: '#1565c0' }} />
        </Link>
      ),
    },
  ];
}
