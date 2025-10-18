import React, { useCallback, useState } from "react";

export const Filter = React.memo(
  ({ filterOptions, onFilterChange, activeFilters }) => {
    const [expandedSections, setExpandedSections] = useState({
      brands: true,
      price: false,
      category: false,
      size: false,
      color: false,
      fabric: false,
      discount: false,
    });

    const toggleSection = useCallback((section) => {
      const isMobile = window.innerWidth < 1024; // lg breakpoint

      setExpandedSections((prev) => {
        if (isMobile) {
          // 👉 Mobile: એક જ section open
          const newState = Object.keys(prev).reduce((acc, key) => {
            acc[key] = false;
            return acc;
          }, {});
          newState[section] = !prev[section]; // clicked toggle
          return newState;
        } else {
          // 👉 Desktop: multiple allow
          return {
            ...prev,
            [section]: !prev[section],
          };
        }
      });
    }, []);

    const handleFilterChange = useCallback(
      (filterType, value, checked) => {
        onFilterChange(filterType, value, checked);
      },
      [onFilterChange]
    );

    const FilterSection = ({ title, sectionKey, children }) => (
      <div className="border-b border-gray-200 pb-4 mb-4">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex justify-between items-center w-full text-left font-medium text-gray-900 mb-3"
        >
          <span>{title}</span>
          <svg
            className={`w-4 h-4 transform transition-transform duration-200 ${
              expandedSections[sectionKey] ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {expandedSections[sectionKey] && (
          <div className="space-y-2">{children}</div>
        )}
      </div>
    );

    const CheckboxFilter = ({ items, filterType, title }) => (
      <FilterSection
        title={title}
        sectionKey={(filterType || "").toLowerCase().replace(/\s+/g, "")}
      >
        {items.map((item, index) => (
          <label
            key={index}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              className="filter-checkbox"
              checked={activeFilters[filterType]?.includes(item) || false}
              onChange={(e) =>
                handleFilterChange(filterType, item, e.target.checked)
              }
            />
            <span className="text-sm text-gray-700">{item}</span>
          </label>
        ))}
      </FilterSection>
    );

    const PriceRangeFilter = () => (
      <FilterSection title="Price Range" sectionKey="price">
        {filterOptions.priceRanges.map((range, index) => (
          <label
            key={index}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              className="filter-checkbox"
              checked={activeFilters.priceRange?.includes(range.label) || false}
              onChange={(e) =>
                handleFilterChange("priceRange", range.label, e.target.checked)
              }
            />
            <span className="text-sm text-gray-700">{range.label}</span>
          </label>
        ))}
      </FilterSection>
    );

    const DiscountFilter = () => (
      <FilterSection title="Discount" sectionKey="discount">
        {filterOptions.discounts.map((discount, index) => (
          <label
            key={index}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              className="filter-checkbox"
              checked={
                activeFilters.discount?.includes(discount.label) || false
              }
              onChange={(e) =>
                handleFilterChange("discount", discount.label, e.target.checked)
              }
            />
            <span className="text-sm text-gray-700">{discount.label}</span>
          </label>
        ))}
      </FilterSection>
    );

    const clearAllFilters = useCallback(() => {
      Object.entries(activeFilters).forEach(([filterType, values]) => {
        values?.forEach((value) => {
          handleFilterChange(filterType, value, false);
        });
      });
    }, [activeFilters, handleFilterChange]);

    const hasActiveFilters = Object.values(activeFilters).some(
      (filter) => filter?.length > 0
    );

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-myntra-pink hover:text-pink-600 font-medium"
            >
              Clear All
            </button>
          )}
        </div>
        <div className="space-y-4">
          <PriceRangeFilter />

          <CheckboxFilter
            items={filterOptions.brands}
            filterType="brands"
            title="Brand"
          />

          <CheckboxFilter
            items={filterOptions.categories}
            filterType="categories"
            title="Category"
          />

          <CheckboxFilter
            items={filterOptions.sizes}
            filterType="sizes"
            title="Size"
          />

          <CheckboxFilter
            items={filterOptions.colors}
            filterType="colors"
            title="Color"
          />

          <CheckboxFilter
            items={filterOptions.fabrics}
            filterType="fabrics"
            title="Fabric"
          />

          <DiscountFilter />
        </div>
        {/* Sort Options */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Sort By</h4>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-myntra-pink focus:border-transparent text-sm"
            value={activeFilters.sortBy || "popularity"}
            onChange={(e) => handleFilterChange("sortBy", e.target.value, true)}
          >
            <option value="popularity">Popularity</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
            <option value="newest-first">Newest First</option>
            <option value="customer-rating">Customer Rating</option>
            <option value="discount">Better Discount</option>
          </select>
        </div>
        {/* <div className="mt-6 pt-4 lg:hidden  border-t border-gray-200">
        <div className="mt-6 pt-4 lg:hidden border-t border-gray-200">
          <button
            onClick={() => onFilterChange("apply", activeFilters, true)}
            className="w-full bg-[#C71F46] text-white py-2 rounded-md hover:bg-[#A51A3A] transition-colors font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div> */}
        <div className="mt-6 pt-4 lg:hidden border-t border-gray-200">
          <button
            onClick={() => onFilterChange("apply", activeFilters, true)}
            className="w-full bg-[#C71F46] text-white py-2 rounded-md hover:bg-[#A51A3A] transition-colors font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>
    );
  }
);
