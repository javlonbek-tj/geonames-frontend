export interface GeoObject {
  id: number;
  nameUz: string | null;
  nameKrill: string | null;
  registryNumber: string | null;
  soato?: string | null;
  objectType?: {
    nameUz: string;
    category?: { nameUz: string; code?: string | null } | null;
  } | null;
  region?: { nameUz: string } | null;
  district?: { nameUz: string } | null;
  affiliation?: string | null;
  historicalName?: string | null;
  basisDocument?: string | null;
  comment?: string | null;
  geometry?: object | null;
  existsInRegistry?: boolean | null;
}
