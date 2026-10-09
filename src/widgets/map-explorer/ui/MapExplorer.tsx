import { Spin } from 'antd';
import { useMapExplorer } from '../model/useMapExplorer';
import MapView from '@/features/map-view/ui/MapView';
import MapFilterPanel from './MapFilterPanel';
import MapBreadcrumb from './MapBreadcrumb';

export default function MapExplorer() {
  const {
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
    onCategoryChange,
    onTypeIdsChange,
    handleRegionClick,
    handleDistrictClick,
  } = useMapExplorer();

  return (
    <div className="w-full h-[calc(100vh-100px)] min-h-[420px] flex flex-col lg:flex-row bg-white">
      <div className="w-full lg:w-72 shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-[#e2e8f4] p-4 overflow-y-auto max-h-[38vh] lg:max-h-none">
        <MapFilterPanel
          regions={regions}
          districts={districts}
          categories={categories}
          selectedRegionId={selectedRegionId}
          selectedDistrictId={selectedDistrictId}
          onRegionChange={onRegionChange}
          onDistrictChange={onDistrictChange}
          selectedCategoryId={selectedCategoryId}
          selectedTypeIds={activeTypeIds}
          onCategoryChange={onCategoryChange}
          onTypeIdsChange={onTypeIdsChange}
          featureCounts={featureCounts}
          isLoading={isLoading}
        />
      </div>

      <div className="flex-1 relative min-w-0 min-h-0">
        <div className="absolute top-3 left-3 z-1000">
          <MapBreadcrumb crumbs={breadcrumbs} />
        </div>

        {isLoading && (
          <div className="absolute inset-0 z-1000 flex items-center justify-center pointer-events-none">
            <Spin size="large" />
          </div>
        )}

        <MapView
          regionFeatures={regionFeatures}
          districtFeatures={districtFeatures}
          registryObjects={registryObjects}
          onRegionClick={handleRegionClick}
          onDistrictClick={handleDistrictClick}
          selectedRegionId={selectedRegionId}
          selectedDistrictId={selectedDistrictId}
        />
      </div>
    </div>
  );
}
