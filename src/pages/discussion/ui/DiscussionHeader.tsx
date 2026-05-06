import { EnvironmentOutlined, TagOutlined } from '@ant-design/icons';
import type { DiscussionItem } from '@/entities/discussion/api/discussions.api';

interface Props {
  discussion: DiscussionItem;
  isActive: boolean;
}

export default function DiscussionHeader({ discussion, isActive }: Props) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e3e8f0', borderRadius: 16, padding: '28px 32px' }}>
      <div className='flex items-start gap-3 mb-4'>
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
            isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
          {isActive ? 'Faol muhokama' : 'Tugagan'}
        </span>
      </div>

      <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f1f3d', marginBottom: 6, lineHeight: 1.2 }}>
        {discussion.proposedNameUz}
      </h1>
      {discussion.proposedNameKrill && (
        <p style={{ fontSize: 15, color: '#9ca3af', marginBottom: 20 }}>
          {discussion.proposedNameKrill}
        </p>
      )}

      <div className='flex flex-wrap gap-3'>
        {discussion.category && (
          <span
            className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium'
            style={{ background: '#e8efff', color: '#1565c0' }}
          >
            <TagOutlined style={{ fontSize: 12 }} />
            {discussion.category}
          </span>
        )}
        <span
          className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium'
          style={{ background: '#f3f4f6', color: '#4b5563' }}
        >
          <TagOutlined style={{ fontSize: 12 }} />
          {discussion.objectType}
        </span>
        {discussion.districtName && (
          <span
            className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium'
            style={{ background: '#f0fdf4', color: '#166534' }}
          >
            <EnvironmentOutlined style={{ fontSize: 12 }} />
            {discussion.districtName}
          </span>
        )}
      </div>
    </div>
  );
}
