// import { useEffect } from "react";
// import { ShoppingBag, X } from "lucide-react";
// import { EmptyWishlist } from "../../Component/Wishlist/EmptyWishlist";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   GetAllWishlistdata,
//   RemoveWishlist,
// } from "../../Redux/Features/WishlistServicesSlice";
// import toast from "react-hot-toast";
// import { AddTOCart } from "../../Redux/Features/CartServicesSlice";

// const Wishlist = () => {
//   const dispatch = useDispatch();
//   const { Wishlistitem, error, loading } = useSelector(
//     (state) => state.WishlistOpration
//   );

//   useEffect(() => {
//     dispatch(GetAllWishlistdata());
//   }, [dispatch]);

//   const removeFromWishlist = (productId) => {
//     dispatch(RemoveWishlist({ productid: productId }))
//       .unwrap()
//       .then(() => {
//         toast.success("Removed from wishlist");
//       })
//       // eslint-disable-next-line no-unused-vars
//       .catch((error) => {
//         toast.error("Failed to remove from wishlist");
//       });
//   };

//   // Format price in Indian Rupees
//   const formatPrice = (price) => {
//     if (!price || price === "null" || price === "0") return "Rs.0";
//     const priceNum = parseFloat(price);
//     if (isNaN(priceNum)) return "Rs.0";
//     return `Rs.${priceNum.toLocaleString("en-IN", {
//       maximumFractionDigits: 0,
//     })}`;
//   };

//   // Get display prices with proper fallbacks
//   const getDisplayPrices = (item) => {
//     const sellingPrice = item.sellingPrice || item.price;
//     const originalPrice = item.originalPrice || item.price;
//     const discount = item.discount;

//     return {
//       sellingPrice: formatPrice(sellingPrice),
//       originalPrice: formatPrice(originalPrice),
//       discount,
//     };
//   };

//   const handleAddtoCart = async (product_id) => {
//     try {
//       // dispatch the async thunk and unwrap the result
//       await dispatch(AddTOCart(product_id)).unwrap().then();

//       await dispatch(RemoveWishlist({ productid: product_id })).unwrap();

//       // show success toast
//       toast.success("Product added to cart successfully!");
//     } catch (error) {
//       // show error toast
//       toast.error(error.message || "Failed to add product to cart!");
//     }
//   };

//   // Handle image errors
//   const handleImageError = (e) => {
//     e.target.src = "https://via.placeholder.com/200x200?text=No+Image";
//     e.target.onerror = null;
//   };

//   // Wishlist Item Component - Grid Layout like reference image
//   const WishlistItem = ({ item, onRemove, onAddTOCart }) => {
//     const { sellingPrice, originalPrice, discount } = getDisplayPrices(item);

//     return (
//       <div className="bg-white rounded-none shadow-sm border border-gray-100 ">
//         {/* Product Image */}
//         <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
//           <img
//             src={
//               item.image || "https://via.placeholder.com/200x200?text=No+Image"
//             }
//             alt={item.name}
//             className="w-full h-full object-cover "
//             onError={handleImageError}
//             loading="lazy"
//           />

//           {/* Remove Button */}
//           <button
//             onClick={() => onRemove(item.id)}
//             className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition-colors"
//             title="Remove from wishlist"
//           >
//             <X size={14} strokeWidth={2} />
//           </button>
//         </div>

//         {/* Product Details */}
//         <div className="p-3">
//           {/* Product Name */}
//           <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2 leading-tight">
//             {item.name}
//           </h3>

//           {/* Price Section */}
//           <div className="flex items-center gap-2 mb-3 flex-wrap">
//             {/* Selling Price */}
//             <span className="font-bold text-gray-900 text-base">
//               {sellingPrice}
//             </span>

//             {/* Original Price with strikethrough */}
//             {discount > 0 && (
//               <>
//                 <span className="text-gray-500 line-through text-sm">
//                   {originalPrice}
//                 </span>

//                 <span className=" text-red-900  text-sm">
//                   ({item.discount}%OFF)
//                 </span>
//               </>
//             )}
//           </div>

//           {/* Move to Bag Button */}
//           <button
//             onClick={() => onAddTOCart(item.id)}
//             className="w-full flex items-center justify-center gap-2 py-2 text-blue-600 text-sm font-medium "
//           >
//             <ShoppingBag className="w-4 h-4" />
//             MOVE TO BAG
//           </button>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="animate-pulse">
//             <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {[1, 2, 3, 4, 5, 6].map((n) => (
//                 <div key={n} className="bg-white rounded-none p-3">
//                   <div className="w-full h-64 bg-gray-200 mb-3"></div>
//                   <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
//                   <div className="h-8 bg-gray-200 rounded"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-6">
//         {/* Page Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-3">
//             <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
//             {Wishlistitem && Wishlistitem.length > 0 && (
//               <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
//                 {Wishlistitem.length} items
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Wishlist Items Grid */}
//         {!Wishlistitem || Wishlistitem.length === 0 ? (
//           <EmptyWishlist />
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {Wishlistitem.map((item) => (
//               <WishlistItem
//                 key={item.id}
//                 item={item}
//                 onRemove={removeFromWishlist}
//                 onAddTOCart={handleAddtoCart}
//               />
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Wishlist;
import { useEffect } from "react";
import { ShoppingBag, X, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EmptyWishlist } from "../../Component/Wishlist/EmptyWishlist";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAllWishlistdata,
  RemoveWishlist,
} from "../../Redux/Features/WishlistServicesSlice";
import toast from "react-hot-toast";
import { AddTOCart } from "../../Redux/Features/CartServicesSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Wishlistitem, error, loading } = useSelector(
    (state) => state.WishlistOpration
  );

  useEffect(() => {
    dispatch(GetAllWishlistdata());
  }, [dispatch]);

  const removeFromWishlist = (productId) => {
    dispatch(RemoveWishlist({ productid: productId }))
      .unwrap()
      .then(() => {
        toast.success("Removed from wishlist");
      })
      .catch((error) => {
        toast.error("Failed to remove from wishlist");
      });
  };

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    if (!price || price === "null" || price === "0") return "Rs.0";
    const priceNum = parseFloat(price);
    if (isNaN(priceNum)) return "Rs.0";
    return `Rs.${priceNum.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    })}`;
  };

  // Get display prices with proper fallbacks
  const getDisplayPrices = (item) => {
    const sellingPrice = item.sellingPrice || item.price;
    const originalPrice = item.originalPrice || item.price;
    const discount = item.discount;

    return {
      sellingPrice: formatPrice(sellingPrice),
      originalPrice: formatPrice(originalPrice),
      discount,
    };
  };

  // Handle Add to Cart for SIMPLE products
  const handleAddtoCart = async (product_id, product_type) => {
    // If product is VARIABLE, navigate to product detail page
    if (product_type === "variable") {
      navigate(`/product/${product_id}`);
      return;
    }

    // For SIMPLE products, add directly to cart
    try {
      await dispatch(AddTOCart(product_id)).unwrap();
      await dispatch(RemoveWishlist({ productid: product_id })).unwrap();
      toast.success("Product added to cart successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to add product to cart!");
    }
  };

  // Handle View Details for VARIABLE products
  const handleViewDetails = (product_id, name) => {
    navigate(`/${name}/${product_id}`);
  };

  // Handle image errors
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/200x200?text=No+Image";
    e.target.onerror = null;
  };

  // Wishlist Item Component
  const WishlistItem = ({ item, onRemove, onAddTOCart, onViewDetails }) => {
    const { sellingPrice, originalPrice, discount } = getDisplayPrices(item);

    // Determine product type (default to 'simple' if not specified)
    const productType = item.product_type || "simple";
    const isVariableProduct = productType === "variable";

    return (
      <div className="bg-white rounded-none shadow-sm border border-gray-100">
        {/* Product Image */}
        <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />

          {/* Remove Button */}
          <button
            onClick={() => onRemove(item.id)}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition-colors"
            title="Remove from wishlist"
          >
            <X size={14} strokeWidth={2} />
          </button>

          {/* Product Type Badge */}
          {isVariableProduct && (
            <div className="absolute top-2 left-2">
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                Options Available
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="p-3">
          {/* Product Name */}
          <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2 leading-tight">
            {item.name}
          </h3>

          {/* Price Section */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {/* Selling Price */}
            <span className="font-bold text-gray-900 text-base">
              {sellingPrice}
            </span>

            {/* Original Price with strikethrough */}
            {discount > 0 && (
              <>
                <span className="text-gray-500 line-through text-sm">
                  {originalPrice}
                </span>
                <span className="text-red-900 text-sm">
                  ({item.discount}%OFF)
                </span>
              </>
            )}
          </div>

          {/* Action Buttons - Different for Simple vs Variable products */}
          {isVariableProduct ? (
            // VARIABLE PRODUCT: Show "VIEW DETAILS" button
            <button
              onClick={() => onViewDetails(item.id, item.name)}
              className="w-full flex items-center justify-center gap-2 py-2 text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              <Eye className="w-4 h-4" />
              VIEW DETAILS
            </button>
          ) : (
            // SIMPLE PRODUCT: Show "MOVE TO BAG" button
            <button
              onClick={() => onAddTOCart(item.id, productType)}
              className="w-full flex items-center justify-center gap-2 py-2 text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              MOVE TO BAG
            </button>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-white rounded-none p-3">
                  <div className="w-full h-64 bg-gray-200 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
            {Wishlistitem && Wishlistitem.length > 0 && (
              <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {Wishlistitem.length} items
              </span>
            )}
          </div>
        </div>

        {/* Wishlist Items Grid */}
        {!Wishlistitem || Wishlistitem.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Wishlistitem.map((item) => (
              <WishlistItem
                key={item.id}
                item={item}
                onRemove={removeFromWishlist}
                onAddTOCart={handleAddtoCart}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
