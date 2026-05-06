export interface Region {
  id: number;
  nameUz: string;
}

export interface District {
  id: number;
  nameUz: string;
  regionId: number;
}

export interface ObjectType {
  id: number;
  nameUz: string;
}

export interface Category {
  id: number;
  nameUz: string;
  code: string | null;
  objectTypes: ObjectType[];
}
