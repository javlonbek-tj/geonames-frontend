import { useQuery } from '@tanstack/react-query';
import { registryApi, type RegistryParams } from '../api/registry.api';
import type { GeoObject } from './types';

export function useRegistry(filters: RegistryParams) {
  const { data, isFetching } = useQuery({
    queryKey: ['public-registry', filters],
    queryFn: () => registryApi.getRegistry(filters).then((r) => r.data),
    placeholderData: (prev) => prev,
  });

  return {
    rows: (data?.data ?? []) as GeoObject[],
    total: data?.meta?.total ?? 0,
    isFetching,
  };
}
