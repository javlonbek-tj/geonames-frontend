import { useNavigate } from 'react-router';
import { Card, Table } from 'antd';
import type { RegistryParams } from '@/entities/registry/api/registry.api';
import type { GeoObject } from '@/entities/registry/model/types';
import { getRegistriesColumns } from '../lib/registriesColumns';
import { DEFAULT_LIMIT } from '../model/useRegistriesFilters';

interface Props {
  rows: GeoObject[];
  total: number;
  isFetching: boolean;
  filters: RegistryParams;
  setFilters: (updater: (prev: RegistryParams) => RegistryParams) => void;
}

export default function RegistriesTable({ rows, total, isFetching, filters, setFilters }: Props) {
  const navigate = useNavigate();
  const page = filters.page ?? 1;
  const limit = filters.limit ?? DEFAULT_LIMIT;

  return (
    <Card size="small" styles={{ body: { padding: 0 } }}>
      <Table
        rowKey="id"
        columns={getRegistriesColumns(page, limit)}
        dataSource={rows}
        loading={isFetching}
        scroll={{ x: true }}
        onRow={(obj) => ({
          onClick: () => void navigate(`/registry/${obj.id}`),
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
          showTotal: (t) => (
            <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950">
              Jami: {t} ta
            </span>
          ),
          onChange: (p, ps) => setFilters((f) => ({ ...f, page: p, limit: ps })),
        }}
        bordered
        className="compact-table"
      />
    </Card>
  );
}
