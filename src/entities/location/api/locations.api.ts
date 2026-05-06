import api from '@/shared/api/axios';
import type { Region, District, Category } from '../model/types';

export const locationsApi = {
  getRegions: () =>
    api.get<{ data: Region[] }>('/public/locations/regions'),

  getDistricts: (regionId?: number) =>
    api.get<{ data: District[] }>(
      '/public/locations/districts',
      { params: regionId ? { regionId } : undefined },
    ),

  getCategories: () =>
    api.get<{ data: Category[] }>('/public/categories'),
};
