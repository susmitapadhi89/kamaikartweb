// import { useMemo, useState, useEffect, useCallback } from "react";
// import { Filter } from "../../Component/ProductListing/Filter";
// import { ProductGrid } from "../../Component/ProductListing/ProductGrid";
// import { products, filterOptions } from "../../data/mockData";

// export const ProductListing = (props) => {
//   const [activeFilters, setActiveFilters] = useState({
//     brands: [],
//     categories: [],
//     sizes: [],
//     colors: [],
//     fabrics: [],
//     priceRange: [],
//     discount: [],
//     sortBy: "popularity",
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(12);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   // Filter and sort products based on active filters
//   const filteredAndSortedProducts = useMemo(() => {
//     let filteredProducts = [...products];

//     // Apply brand filter
//     if (activeFilters.brands.length > 0) {
//       filteredProducts = filteredProducts.filter((product) =>
//         activeFilters.brands.includes(product.brand)
//       );
//     }

//     // Apply category filter
//     if (activeFilters.categories.length > 0) {
//       filteredProducts = filteredProducts.filter((product) =>
//         activeFilters.categories.includes(product.category)
//       );
//     }

//     // Apply size filter
//     if (activeFilters.sizes.length > 0) {
//       filteredProducts = filteredProducts.filter((product) =>
//         product.sizes.some((size) => activeFilters.sizes.includes(size))
//       );
//     }

//     // Apply color filter
//     if (activeFilters.colors.length > 0) {
//       filteredProducts = filteredProducts.filter((product) =>
//         product.colors.some((color) => activeFilters.colors.includes(color))
//       );
//     }

//     // Apply fabric filter
//     if (activeFilters.fabrics.length > 0) {
//       filteredProducts = filteredProducts.filter((product) =>
//         activeFilters.fabrics.includes(product.fabric)
//       );
//     }

//     // Apply price range filter
//     if (activeFilters.priceRange.length > 0) {
//       filteredProducts = filteredProducts.filter((product) => {
//         return activeFilters.priceRange.some((rangeLabel) => {
//           const range = filterOptions.priceRanges.find(
//             (r) => r.label === rangeLabel
//           );
//           return (
//             range && product.price >= range.min && product.price <= range.max
//           );
//         });
//       });
//     }

//     // Apply discount filter
//     if (activeFilters.discount.length > 0) {
//       filteredProducts = filteredProducts.filter((product) => {
//         return activeFilters.discount.some((discountLabel) => {
//           const discount = filterOptions.discounts.find(
//             (d) => d.label === discountLabel
//           );
//           return discount && product.discount >= discount.min;
//         });
//       });
//     }

//     // Apply sorting
//     switch (activeFilters.sortBy) {
//       case "price-low-to-high":
//         filteredProducts.sort((a, b) => a.price - b.price);
//         break;
//       case "price-high-to-low":
//         filteredProducts.sort((a, b) => b.price - a.price);
//         break;
//       case "newest-first":
//         filteredProducts.sort((a, b) => b.id - a.id);
//         break;
//       case "customer-rating":
//         filteredProducts.sort((a, b) => b.rating - a.rating);
//         break;
//       case "discount":
//         filteredProducts.sort((a, b) => b.discount - a.discount);
//         break;
//       default:
//         filteredProducts.sort((a, b) => b.reviews - a.reviews);
//         break;
//     }

//     return filteredProducts;
//   }, [activeFilters]);

//   // Calculate current products to display
//   const currentProducts = useMemo(() => {
//     return filteredAndSortedProducts.slice(0, currentPage * itemsPerPage);
//   }, [filteredAndSortedProducts, currentPage, itemsPerPage]);

//   // Check if there are more products to load
//   useEffect(() => {
//     setHasMore(currentProducts.length < filteredAndSortedProducts.length);
//   }, [currentProducts, filteredAndSortedProducts]);

//   // Handle filter changes
//   const handleFilterChange = (filterType, value, checked) => {
//     setActiveFilters((prev) => {
//       const newFilters = { ...prev };

//       if (!newFilters[filterType]) {
//         newFilters[filterType] = [];
//       }

//       if (checked) {
//         newFilters[filterType] = [...newFilters[filterType], value];
//       } else {
//         newFilters[filterType] = newFilters[filterType].filter(
//           (item) => item !== value
//         );
//       }

//       // Reset to first page when filters change
//       setCurrentPage(1);

//       return newFilters;
//     });
//   };

//   // Load more products function
//   const loadMoreProducts = useCallback(() => {
//     if (loading || !hasMore) return;

//     setLoading(true);

//     // Simulate API call delay
//     setTimeout(() => {
//       setCurrentPage((prev) => prev + 1);
//       setLoading(false);
//     }, 500);
//   }, [loading, hasMore]);

//   // Infinite scroll handler
//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop >=
//         document.documentElement.offsetHeight - 100
//       ) {
//         loadMoreProducts();
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [loadMoreProducts]);

//   // Manual load more button handler
//   const handleLoadMore = () => {
//     loadMoreProducts();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <main className="max-w-7xl mx-auto sm:px-2 lg:px-4 py-6">
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Filters Sidebar */}
//           <aside className="lg:w-80 flex-shrink-0">
//             <div className="sticky top-24">
//               <Filter
//                 filterOptions={filterOptions}
//                 onFilterChange={handleFilterChange}
//                 activeFilters={activeFilters}
//               />
//             </div>
//           </aside>

//           {/* Main Content */}
//           <div className="flex-1">
//             {/* Results Info */}
//             <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
//               <p className="text-sm text-gray-600">
//                 Showing {currentProducts.length} of{" "}
//                 {filteredAndSortedProducts.length} products
//                 {filteredAndSortedProducts.length !== products.length &&
//                   ` (filtered from ${products.length} total products)`}
//               </p>
//             </div>

//             {/* Products Grid */}
//             <ProductGrid products={currentProducts} loading={false} />

//             {/* Load More Button */}
//             {hasMore && (
//               <div className="flex justify-center mt-8">
//                 <button
//                   onClick={handleLoadMore}
//                   disabled={loading}
//                   className={`px-6 py-3 bg-blue-600 text-white rounded-md font-medium transition-colors duration-200 ${
//                     loading
//                       ? "opacity-50 cursor-not-allowed"
//                       : "hover:bg-blue-700"
//                   }`}
//                 >
//                   {loading ? "Loading..." : "Load More Products"}
//                 </button>
//               </div>
//             )}

//             {/* End of results message */}
//             {!hasMore && currentProducts.length > 0 && (
//               <div className="text-center mt-8 py-4">
//                 <p className="text-gray-500 text-sm">
//                   You've reached the end of the products list.
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };
import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Filter } from "../../Component/ProductListing/Filter";
import { filterOptions } from "../../data/mockData";
import { FaFilter, FaTimes } from "react-icons/fa";
import { ProductCard } from "../../Component/ProductListing/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllProductdata,
  resetProducts,
} from "../../Redux/Features/ProductServicesSlice";

export const ProductListing = () => {
  const dispatch = useDispatch();

  const { main, sub, child } = useParams(); // URL params
  const [searchParams] = useSearchParams(); // Search params get करें
  const search = searchParams.get("search"); // URL से search  करें
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

  const [hasMore, setHasMore] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Reset products on mount and fetch initial data with URL params
  useEffect(() => {
    dispatch(resetProducts());
    dispatch(GetAllProductdata({ page: 1, limit, main, sub, child, search }));
  }, [dispatch, main, sub, child, limit, search]);

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

  // Load more products
  const loadMoreProducts = useCallback(() => {
    if (productloadings || !hasMore) return;
    dispatch(GetAllProductdata({ page, limit, main, sub, child, search }));
  }, [
    dispatch,
    productloadings,
    hasMore,
    page,
    limit,
    main,
    sub,
    child,
    search,
  ]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreProducts();
      }
    };
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [loadMoreProducts]);

  // Update hasMore
  useEffect(() => {
    setHasMore(Products.length < total);
  }, [Products, total]);

  // Mobile filter scroll lock
  useEffect(() => {
    document.body.style.overflow = showMobileFilters ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [showMobileFilters]);

  // Handle filter changes
  const handleFilterChange = useCallback((filterType, value, checked) => {
    if (filterType === "apply") {
      setShowMobileFilters(false);
      return;
    }
    setActiveFilters((prev) => {
      const newFilters = { ...prev };
      if (!newFilters[filterType]) newFilters[filterType] = [];
      if (checked) newFilters[filterType] = [...newFilters[filterType], value];
      else
        newFilters[filterType] = newFilters[filterType].filter(
          (item) => item !== value
        );
      return newFilters;
    });
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    if (!Products) return [];
    let filteredProducts = [...Products];

    if (activeFilters.brands.length)
      filteredProducts = filteredProducts.filter((p) =>
        activeFilters.brands.includes(p.brand)
      );
    if (activeFilters.categories.length)
      filteredProducts = filteredProducts.filter((p) =>
        activeFilters.categories.includes(p.category)
      );
    if (activeFilters.sizes.length)
      filteredProducts = filteredProducts.filter((p) =>
        p.sizes.some((size) => activeFilters.sizes.includes(size))
      );
    if (activeFilters.colors.length)
      filteredProducts = filteredProducts.filter((p) =>
        p.colors.some((color) => activeFilters.colors.includes(color))
      );
    if (activeFilters.fabrics.length)
      filteredProducts = filteredProducts.filter((p) =>
        activeFilters.fabrics.includes(p.fabric)
      );
    if (activeFilters.priceRange.length)
      filteredProducts = filteredProducts.filter((p) =>
        activeFilters.priceRange.some((label) => {
          const range = filterOptions.priceRanges.find(
            (r) => r.label === label
          );
          return range && p.price >= range.min && p.price <= range.max;
        })
      );
    if (activeFilters.discount.length)
      filteredProducts = filteredProducts.filter((p) =>
        activeFilters.discount.some((label) => {
          const discount = filterOptions.discounts.find(
            (d) => d.label === label
          );
          return discount && p.discount >= discount.min;
        })
      );

    // Sorting
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

  const currentProducts = useMemo(
    () => filteredAndSortedProducts,
    [filteredAndSortedProducts]
  );
  const handleLoadMore = () => loadMoreProducts();

  return (
    <div className="min-h-screen bg-gray-50 pb-16 lg:pb-0">
      <main className="w-full mx-auto px-4 lg:px-8 py-6">
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

        <div className="flex flex-col lg:flex-row gap-2">
          {/* Sidebar */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <Filter
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
              activeFilters={activeFilters}
            />
          </aside>

          {/* Mobile Filters Overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 overflow-y-auto lg:hidden">
              <div
                className="absolute inset-0 bg-black bg-opacity-40"
                onClick={() => setShowMobileFilters(false)}
              />
              <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end md:hidden">
                <div className="bg-white rounded-t-2xl w-full max-h-[85vh] overflow-hidden flex flex-col">
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
                  <div className="flex-1 overflow-y-auto p-6">
                    <Filter
                      filterOptions={filterOptions}
                      onFilterChange={handleFilterChange}
                      activeFilters={activeFilters}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Info */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-2">
              <p className="text-sm text-gray-600">
                Showing {currentProducts.length} of {total} products
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {productloadings && Products.length === 0 && (
                <p className="col-span-2 lg:col-span-4 text-center text-gray-600">
                  Loading products...
                </p>
              )}
              {producterror && Products.length === 0 && (
                <p className="col-span-2 lg:col-span-4 text-center text-red-500">
                  Sorry ,No Products Avilable
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
                // <ProductCard key={product.id} product={product} />
                <ProductCard
                  key={`${product.id}-${product.title}`}
                  product={product}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleLoadMore}
                  disabled={productloadings}
                  className="px-6 py-3 text-black rounded-md font-medium"
                >
                  {productloadings ? "Fetching More..." : "Load More Products"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
