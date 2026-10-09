import { useCallback, useMemo, useState } from 'react';
import {
  useMapRegions,
  useMapDistricts,
  useMapRegistryObjects,
} from '@/entities/map/model/useMapData';
import { useLocations } from '@/entities/location/model/useLocations';
import type { MapFeature } from '@/entities/map/api/map.api';
import { partitionRegistryFeatures } from '@/features/map-view/lib/mapLayerBuilders';

const DEFAULT_TYPE_NAMES = new Set([
  "Ko'cha",
  "Tor ko'cha",
  "Berk ko'cha",
  "Shoh ko'cha",
]);

export function useMapExplorer() {
  const [selectedRegionId, setSelectedRegionId] = useState<number | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(
    null,
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [selectedTypeIds, setSelectedTypeIds] = useState<number[] | null>(null);

  const { regions, districts, categories } = useLocations(
    selectedRegionId ?? undefined,
  );

  const defaultTypeIds = useMemo(
    () =>
      categories
        .flatMap((c) => c.objectTypes)
        .filter((t) => DEFAULT_TYPE_NAMES.has(t.nameUz))
        .map((t) => t.id),
    [categories],
  );

  const activeTypeIds = selectedDistrictId
    ? (selectedTypeIds ?? defaultTypeIds)
    : [];

  const { data: regionFeatures, isLoading: regionsLoading } = useMapRegions();
  const { data: districtFeatures, isFetching: districtsFetching } =
    useMapDistricts(selectedRegionId);
  const { data: registryObjects, isFetching: registryFetching } =
    useMapRegistryObjects({
      typeIds: activeTypeIds,
      regionId: selectedRegionId,
      districtId: selectedDistrictId,
    });

  const isLoading = regionsLoading || districtsFetching || registryFetching;

  const selectedRegion = regions.find((r) => r.id === selectedRegionId);
  const selectedDistrict = districts.find((d) => d.id === selectedDistrictId);

  const resetFilter = useCallback(() => {
    setSelectedCategoryId(null);
    setSelectedTypeIds(null);
  }, []);

  const onRegionChange = useCallback(
    (id: number | null) => {
      setSelectedRegionId(id);
      setSelectedDistrictId(null);
      resetFilter();
    },
    [resetFilter],
  );

  const onDistrictChange = useCallback(
    (id: number | null) => {
      setSelectedDistrictId(id);
      if (id === null) resetFilter();
    },
    [resetFilter],
  );

  const handleRegionClick = useCallback(
    (feature: MapFeature) => {
      const regionDbId =
        feature.properties.regionDbId ?? feature.properties.regionId;
      onRegionChange(regionDbId);
    },
    [onRegionChange],
  );

  const handleDistrictClick = useCallback(
    (feature: MapFeature) => {
      const districtDbId =
        feature.properties.districtDbId ?? feature.properties.districtId;
      onDistrictChange(districtDbId);
    },
    [onDistrictChange],
  );

  const { mfy: mfyFeatures, streets: streetFeatures, other: otherFeatures } =
    useMemo(
      () =>
        partitionRegistryFeatures(
          (registryObjects?.features ?? []) as unknown as GeoJSON.Feature[],
        ),
      [registryObjects],
    );

  const featureCounts = {
    regions:
      selectedRegionId === null ? (regionFeatures?.features.length ?? 0) : 0,
    districts:
      selectedRegionId !== null && selectedDistrictId === null
        ? (districtFeatures?.features.length ?? 0)
        : 0,
    mfy: mfyFeatures.length,
    streets: streetFeatures.length,
    registry: otherFeatures.length,
  };

  const breadcrumbs = [
    {
      label: "O'zbekiston",
      onClick:
        selectedRegionId !== null ? () => onRegionChange(null) : undefined,
    },
    ...(selectedRegion
      ? [
          {
            label: selectedRegion.nameUz,
            onClick:
              selectedDistrictId !== null
                ? () => onDistrictChange(null)
                : undefined,
          },
        ]
      : []),
    ...(selectedDistrict ? [{ label: selectedDistrict.nameUz }] : []),
  ];

  return {
    selectedRegionId,
    selectedDistrictId,
    selectedCategoryId,
    activeTypeIds,
    regions,
    districts,
    categories,
    regionFeatures,
    districtFeatures,
    registryObjects,
    isLoading,
    featureCounts,
    breadcrumbs,
    onRegionChange,
    onDistrictChange,
    onCategoryChange: setSelectedCategoryId,
    onTypeIdsChange: setSelectedTypeIds,
    handleRegionClick,
    handleDistrictClick,
  };
}
