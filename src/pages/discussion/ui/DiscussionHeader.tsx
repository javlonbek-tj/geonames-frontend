import { Badge } from 'antd';
import { EnvironmentOutlined, TagOutlined } from '@ant-design/icons';
import type { DiscussionItem } from '@/entities/discussion/api/discussions.api';

interface Props {
  discussion: DiscussionItem;
  isActive: boolean;
}

export default function DiscussionHeader({ discussion, isActive }: Props) {
  return (
    <div className="bg-white border border-[#e3e8f0] rounded-2xl px-8 py-7">
      <div className="mb-4">
        <Badge
          status={isActive ? 'success' : 'default'}
          text={isActive ? 'Jarayonda' : 'Yakunlangan'}
          className="text-sm font-semibold"
        />
      </div>

      <h1 className="text-[28px] font-extrabold text-[#0f1f3d] mb-1.5 leading-tight">
        {discussion.proposedNameUz}
      </h1>
      {discussion.proposedNameKrill && (
        <p className="text-[15px] text-gray-400 mb-5">
          {discussion.proposedNameKrill}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        {discussion.category && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-[#e8efff] text-[#1565c0]">
            <TagOutlined style={{ fontSize: 12 }} />
            {discussion.category}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-600">
          <TagOutlined style={{ fontSize: 12 }} />
          {discussion.objectType}
        </span>
        {discussion.districtName && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-800">
            <EnvironmentOutlined style={{ fontSize: 12 }} />
            {discussion.districtName}
          </span>
        )}
      </div>
    </div>
  );
}
