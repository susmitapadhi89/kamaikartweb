import { useState, useEffect, useMemo, useCallback } from "react";
import { Filter } from "../../Component/ProductListing/Filter";
import { filterOptions } from "../../data/mockData";
import { FaFilter, FaTimes } from "react-icons/fa";
import { ProductCard } from "../ProductListing/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllProductdata,
  resetProducts,
} from "../../Redux/Features/ProductServicesSlice";

export const ProductListing = () => {
  const dispatch = useDispatch();

  const { Products, productloadings, producterror, limit, page, total } =
    useSelector((state) => state.ProductOpration);

  const [activeFilters, setActiveFilters] = useState({
    brands: [],
    categories: [],
    sizes: [],
    colors: [],
    fabrics: [],
    priceRange: [],
    discount: [],
    sortBy: "popularity",
  });

  useEffect(() => {
    dispatch(resetProducts());
    dispatch(GetAllProductdata());
  }, [dispatch]);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter and sort products based on active filters
  const filteredAndSortedProducts = useMemo(() => {
    if (!Products) return [];

    let filteredProducts = [...Products];

    // Apply brand filter
    if (activeFilters.brands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        activeFilters.brands.includes(product.brand)
      );
    }

    // Apply category filter
    if (activeFilters.categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        activeFilters.categories.includes(product.category)
      );
    }

    // Apply size filter
    if (activeFilters.sizes.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.sizes.some((size) => activeFilters.sizes.includes(size))
      );
    }

    // Apply color filter
    if (activeFilters.colors.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.colors.some((color) => activeFilters.colors.includes(color))
      );
    }

    // Apply fabric filter
    if (activeFilters.fabrics.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        activeFilters.fabrics.includes(product.fabric)
      );
    }

    // Apply price range filter
    if (activeFilters.priceRange.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        return activeFilters.priceRange.some((rangeLabel) => {
          const range = filterOptions.priceRanges.find(
            (r) => r.label === rangeLabel
          );
          return (
            range && product.price >= range.min && product.price <= range.max
          );
        });
      });
    }

    // Apply discount filter
    if (activeFilters.discount.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        return activeFilters.discount.some((discountLabel) => {
          const discount = filterOptions.discounts.find(
            (d) => d.label === discountLabel
          );
          return discount && product.discount >= discount.min;
        });
      });
    }

    // Apply sorting
    switch (activeFilters.sortBy) {
      case "price-low-to-high":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high-to-low":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest-first":
        filteredProducts.sort((a, b) => b.id - a.id);
        break;
      case "customer-rating":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "discount":
        filteredProducts.sort((a, b) => b.discount - a.discount);
        break;
      default:
        filteredProducts.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return filteredProducts;
  }, [Products, activeFilters]);

  // // Calculate current products to display
  const currentProducts = useMemo(() => {
    return filteredAndSortedProducts; // Already limited by API
  }, [filteredAndSortedProducts]);

  // Check if there are more products to load
  useEffect(() => {
    setHasMore(Products.length < total);
  }, [Products, total]);

  useEffect(() => {
    if (showMobileFilters) {
      // Disable background scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Restore scrolling
      document.body.style.overflow = "";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobileFilters]);

  // Handle filter changes
  const handleFilterChange = useCallback((filterType, value, checked) => {
    if (filterType === "apply") {
      setShowMobileFilters(false);
      return;
    }

    setActiveFilters((prev) => {
      const newFilters = { ...prev };

      if (!newFilters[filterType]) {
        newFilters[filterType] = [];
      }

      if (checked) {
        newFilters[filterType] = [...newFilters[filterType], value];
      } else {
        newFilters[filterType] = newFilters[filterType].filter(
          (item) => item !== value
        );
      }

      return newFilters;
    });
  }, []);

  // Load more products function
  const loadMoreProducts = useCallback(() => {
    if (productloadings || !hasMore) return;

    dispatch(GetAllProductdata({ page, limit }));
  }, [dispatch, productloadings, hasMore, page, limit]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreProducts();
      }
    };

    // Add throttle to scroll handler
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [loadMoreProducts]);

  // Manual load more button handler
  const handleLoadMore = () => {
    loadMoreProducts();
  };

  const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 lg:pb-0">
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full bg-white border border-gray-300 rounded-md px-4 py-3 flex items-center justify-between shadow-sm"
          >
            <span className="font-medium">Filters & Sort</span>
            <FaFilter className="text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}

          <aside className="hidden lg:block w-80 flex-shrink-0">
            <Filter
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
              activeFilters={activeFilters}
            />
          </aside>
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 overflow-y-auto lg:hidden">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black bg-opacity-40"
                onClick={() => setShowMobileFilters(false)}
              />

              {/* Filter Panel */}
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end md:hidden">
                <div className="bg-white rounded-t-2xl w-full max-h-[85vh] overflow-hidden flex flex-col">
                  {/* Header */}
                  <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm z-10">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Filters
                    </h3>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="p-2"
                    >
                      <FaTimes className="text-gray-500" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    <div className="p-6">
                      <Filter
                        filterOptions={filterOptions}
                        onFilterChange={handleFilterChange}
                        activeFilters={activeFilters}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Info */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
              <p className="text-sm text-gray-600">
                Showing {total} of {filteredAndSortedProducts.length} products
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {productloadings && Products.length === 0 && (
                <p className="col-span-2 lg:col-span-4 text-center text-gray-600">
                  Loading products...
                </p>
              )}

              {producterror && Products.length === 0 && (
                <p className="col-span-2 lg:col-span-4 text-center text-red-500">
                  Failed to load products. Please try again.
                </p>
              )}

              {currentProducts.length === 0 &&
                !productloadings &&
                !producterror && (
                  <p className="col-span-2 lg:col-span-4 text-center text-gray-500">
                    No products found.
                  </p>
                )}

              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <div
                  onClick={handleLoadMore}
                  disabled={loading}
                  className={`px-6 py-3  text-black rounded-md font-medium
                    `}
                >
                  {loading
                    ? "Fetching More......"
                    : "Fetching More Products........"}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
