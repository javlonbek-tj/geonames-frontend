import { useRegistriesFilters } from '../model/useRegistriesFilters';
import { useRegistry } from '@/entities/registry/model/useRegistry';
import { useLocations } from '@/entities/location/model/useLocations';
import RegistriesFilters from './RegistriesFilters';
import RegistriesTable from './RegistriesTable';

export default function RegistriesSection() {
  const { filters, searchInput, setSearchInput, setFilters, applySearch, clearFilters, hasFilters } =
    useRegistriesFilters();

  const { rows, total, isFetching } = useRegistry(filters);
  const { regions, districts, categories, typeOptions } = useLocations(filters.regionId, filters.categoryId);

  return (
    <div>
      <RegistriesFilters
        filters={filters}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setFilters={setFilters}
        applySearch={applySearch}
        clearFilters={clearFilters}
        hasFilters={hasFilters}
        regions={regions}
        districts={districts}
        categories={categories}
        typeOptions={typeOptions}
      />
      <RegistriesTable
        rows={rows}
        total={total}
        isFetching={isFetching}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
}
