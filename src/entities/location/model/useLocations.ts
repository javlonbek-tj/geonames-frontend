import { useQuery } from '@tanstack/react-query';
import { locationsApi } from '../api/locations.api';

export function useLocations(regionId?: number, categoryId?: number) {
  const { data: regionsRes } = useQuery({
    queryKey: ['public-regions'],
    queryFn: () => locationsApi.getRegions().then((r) => r.data.data),
    staleTime: Infinity,
  });

  const { data: districtsRes } = useQuery({
    queryKey: ['public-districts', regionId],
    queryFn: () => locationsApi.getDistricts(regionId).then((r) => r.data.data),
    enabled: !!regionId,
  });

  const { data: categoriesRes } = useQuery({
    queryKey: ['public-categories'],
    queryFn: () => locationsApi.getCategories().then((r) => r.data.data),
    staleTime: Infinity,
  });

  const categories = categoriesRes ?? [];
  const selectedCategory = categories.find((c) => c.id === categoryId);

  return {
    regions: regionsRes ?? [],
    districts: districtsRes ?? [],
    categories,
    typeOptions: selectedCategory?.objectTypes ?? [],
  };
}
