import { useState, useCallback } from 'react';
import { useLocations } from '@/entities/location/model/useLocations';

const DEFAULT_LIMIT = 10;

export function useDiscussionsFilter() {
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [regionId, setRegionId] = useState<number | undefined>();
  const [districtId, setDistrictId] = useState<number | undefined>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);

  const { regions, districts } = useLocations(regionId);

  const applySearch = useCallback(() => {
    setSearch(searchInput);
    setPage(1);
  }, [searchInput]);

  const clearFilters = () => {
    setSearch('');
    setSearchInput('');
    setRegionId(undefined);
    setDistrictId(undefined);
    setPage(1);
  };

  const onRegionChange = (v: number | undefined) => {
    setRegionId(v);
    setDistrictId(undefined);
    setPage(1);
  };

  const onDistrictChange = (v: number | undefined) => {
    setDistrictId(v);
    setPage(1);
  };

  return {
    params: { regionId, districtId, search: search || undefined, page, limit },
    hasFilters: !!search || !!regionId || !!districtId,
    searchInput,
    setSearchInput,
    regionId,
    districtId,
    page,
    limit,
    regions,
    districts,
    applySearch,
    clearFilters,
    onRegionChange,
    onDistrictChange,
    onPageChange: (p: number, ps: number) => { setPage(p); setLimit(ps); },
    onSearchClear: () => { setSearchInput(''); setSearch(''); setPage(1); },
  };
}
