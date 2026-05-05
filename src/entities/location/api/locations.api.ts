import api from '@/shared/api/axios';

export const locationsApi = {
  getRegions: () =>
    api.get<{ data: { id: number; nameUz: string }[] }>('/public/locations/regions'),

  getDistricts: (regionId?: number) =>
    api.get<{ data: { id: number; nameUz: string; regionId: number }[] }>(
      '/public/locations/districts',
      { params: regionId ? { regionId } : undefined },
    ),

  getCategories: () =>
    api.get<{
      data: {
        id: number;
        nameUz: string;
        code: string | null;
        objectTypes: { id: number; nameUz: string }[];
      }[];
    }>('/public/categories'),
};
