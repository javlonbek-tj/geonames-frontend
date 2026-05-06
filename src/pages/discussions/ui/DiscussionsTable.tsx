import { Card, Table } from 'antd';
import { useNavigate } from 'react-router';
import type { DiscussionItem } from '@/entities/discussion/api/discussions.api';
import { getDiscussionsColumns } from '../lib/discussionsColumns';

interface Props {
  rows: DiscussionItem[];
  total: number;
  isFetching: boolean;
  page: number;
  limit: number;
  onPageChange: (page: number, pageSize: number) => void;
}

const columns = getDiscussionsColumns();

export default function DiscussionsTable({
  rows,
  total,
  isFetching,
  page,
  limit,
  onPageChange,
}: Props) {
  const navigate = useNavigate();

  return (
    <Card size="small" styles={{ body: { padding: 0 } }}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={rows}
        loading={isFetching}
        onRow={(d) => ({
          onClick: () => void navigate(`/discussions/${d.id}`),
          className: 'cursor-pointer',
        })}
        pagination={{
          current: page,
          pageSize: limit,
          total,
          showSizeChanger: true,
          hideOnSinglePage: true,
          pageSizeOptions: ['10', '20', '25', '50', '75'],
          size: 'small',
          onChange: onPageChange,
          showTotal: (total) => (
            <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950">
              Jami: {total} ta
            </span>
          ),
        }}
        className="compact-table"
        scroll={{ x: true }}
      />
    </Card>
  );
}
