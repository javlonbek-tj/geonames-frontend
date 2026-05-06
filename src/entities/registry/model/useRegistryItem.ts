import { useQuery } from '@tanstack/react-query';
import { registryApi } from '../api/registry.api';
import type { GeoObject } from './types';

export function useRegistryItem(id: number) {
  const { data: obj, isLoading } = useQuery({
    queryKey: ['public-registry-item', id],
    queryFn: () => registryApi.getOne(id).then((r) => r.data.data as GeoObject),
    enabled: id > 0,
  });

  return { obj, isLoading };
}
