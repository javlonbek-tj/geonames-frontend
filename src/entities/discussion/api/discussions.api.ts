import api from '@/shared/api/axios';

export interface DiscussionItem {
  id: number;
  applicationId: number;
  geoObjectId: number;
  proposedNameUz: string;
  proposedNameKrill: string | null;
  objectType: string;
  category: string | null;
  regionName: string | null;
  districtName: string | null;
  geometry: object | null;
  endsAt: string;
  createdAt: string;
  voteCount: number;
  supportCount: number;
  opposeCount: number;
  myVote: 'support' | 'oppose' | null;
}

export interface VotePayload {
  discussionId: number;
  vote: 'support' | 'oppose';
}

export const discussionsApi = {
  list: (params?: { regionId?: number; districtId?: number; search?: string; page?: number; limit?: number }) =>
    api.get<{ data: DiscussionItem[]; meta: { total: number; page: number; limit: number; totalPages: number } }>(
      '/public/discussions',
      { params },
    ),

  getOne: (id: number) =>
    api.get<{ data: DiscussionItem }>(`/public/discussions/${id}`),

  submitVote: (payload: VotePayload) =>
    api.post('/public/discussions/vote', payload),
};
