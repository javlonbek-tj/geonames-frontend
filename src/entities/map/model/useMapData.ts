import { useQuery } from '@tanstack/react-query';
import { mapApi } from '@/entities/map/api/map.api';
import type { RegistryObjectsParams } from '@/entities/map/api/map.api';

export function useMapRegions() {
  return useQuery({
    queryKey: ['public-map-regions'],
    queryFn: () => mapApi.getRegions().then((r) => r.data.data),
    staleTime: Infinity,
  });
}

export function useMapDistricts(regionId: number | null) {
  return useQuery({
    queryKey: ['public-map-districts', regionId],
    queryFn: () => mapApi.getDistricts(regionId!).then((r) => r.data.data),
    enabled: regionId !== null,
    staleTime: 10 * 60 * 1000,
  });
}

export function useMapRegistryObjects(params: RegistryObjectsParams) {
  return useQuery({
    queryKey: ['public-map-registry-objects', params],
    queryFn: () => mapApi.getRegistryObjects(params).then((r) => r.data.data),
    enabled: params.typeIds.length > 0,
    staleTime: 5 * 60 * 1000,
  });
}
