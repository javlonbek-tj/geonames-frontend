import api from '@/shared/api/axios';

export interface RegistryParams {
  page?: number;
  limit?: number;
  search?: string;
  regionId?: number;
  districtId?: number;
  objectTypeId?: number;
  categoryId?: number;
}

export const geoObjectsApi = {
  getRegistry: (params?: RegistryParams) =>
    api.get<{ data: unknown[]; meta: { total: number; page: number; limit: number } }>(
      '/public/registry',
      { params },
    ),

  getOne: (id: number) =>
    api.get<{ data: unknown }>(`/public/registry/${id}`),
};
