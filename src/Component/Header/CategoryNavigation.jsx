// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import "../../Component/Header/Css/style_navi.css";
// import { useDispatch, useSelector } from "react-redux";
// import { GetCategoriesData } from "../../Redux/Features/CategoryServicesSlice";
// import { Loader } from "../Common/Loader";
// export const Navigation = () => {
//   const dispatch = useDispatch();
//   const { CategoriesData, error, loading } = useSelector(
//     (state) => state.CategoryOpration
//   );

//   useEffect(() => {
//     dispatch(GetCategoriesData());
//   }, [dispatch]);

//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);

//   const dropdownRef = useRef(null);
//   const navItemRefs = useRef([]);
//   const timeoutRef = useRef(null);
//   const navRef = useRef(null);

//   // Close dropdown on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       setActiveDropdown(null);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Handle mouse leave with delay to prevent flickering
//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setActiveDropdown(null);
//     }, 200);
//   };

//   const handleMouseEnter = (index) => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//     setActiveDropdown(index);
//   };

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   // If mobile, don't render the desktop navigation
//   if (isMobile) {
//     return null;
//   }

//   const slugify = (text) => {
//     return text
//       .toString()
//       .trim() // Remove whitespace from start/end
//       .toLowerCase() // Convert to lowercase
//       .replace(/&/g, "-") // Replace & with 'and'
//       .replace(/[\s\W-]+/g, "-") // Replace spaces, non-word chars with -
//       .replace(/^-+|-+$/g, ""); // remove leading/trailing dashes
//   };

//   if (loading) return <div className="text-center  py-4">Loading..</div>;
//   if (error) return <div className="text-center py-4">Error: {error}</div>;
//   if (!CategoriesData || CategoriesData.length === 0) return null;

//   return (
//     <nav ref={navRef} className=" w-full relative">
//       <div className="container mx-auto px-6 py-3">
//         <ul className="flex gap-8 justify-center scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
//           {CategoriesData.map((item, idx) => (
//             <li
//               key={idx}
//               className="relative"
//               ref={(el) => (navItemRefs.current[idx] = el)}
//               onMouseEnter={() => handleMouseEnter(idx)}
//               onMouseLeave={handleMouseLeave}
//             >
//               <Link
//                 className={`text-[16px] font-[500]  transition-all duration-200 whitespace-nowrap ${
//                   activeDropdown === idx
//                     ? "text-blue-500 border-b-2 border-blue-500"
//                     : "hover:text-blue-500 hover:border-b-2 hover:border-blue-500"
//                 }`}
//                 to={`products${item.path}`}
//               >
//                 {item.label}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         {/* Fixed Dropdown Container - Outside the list but inside nav */}
//         {activeDropdown !== null && (
//           <div
//             ref={dropdownRef}
//             className="absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-lg z-50 pt-6"
//             onMouseEnter={() => handleMouseEnter(activeDropdown)}
//             onMouseLeave={handleMouseLeave}
//             onClick={handleMouseLeave}
//           >
//             <div className="container overflow-x-auto mx-auto px-6">
//               {CategoriesData[activeDropdown]?.megaMenu?.length > 0 && (
//                 <div
//                   className={`flex flex-wrap   ${
//                     CategoriesData[activeDropdown]?.megaMenu.length >= 4
//                       ? "flex flex-col"
//                       : CategoriesData[activeDropdown]?.megaMenu.length >= 2
//                       ? "flex flex-col"
//                       : "flex flex-col"
//                   }  max-h-[50vh] overflow-y-auto`}
//                 >
//                   {CategoriesData[activeDropdown]?.megaMenu.map(
//                     (section, secIdx) => (
//                       <div key={secIdx} className="min-w-[200px]">
//                         <h4 className="text-[15px] font-bold text-orange-600 border-t">
//                           <Link
//                             to={`/products/${slugify(
//                               CategoriesData[activeDropdown].path
//                             )}/${section.slug}`}
//                             className="block py-1"
//                           >
//                             {section.title}
//                           </Link>{" "}
//                         </h4>

//                         {/* Items tabhi dikhao jab exist kare */}
//                         {section.items && section.items.length > 0 && (
//                           <ul>
//                             {section.items.map((subItem, subIdx) => (
//                               <li key={subIdx}>
//                                 <Link
//                                   to={`/products/${slugify(
//                                     CategoriesData[activeDropdown].path
//                                   )}/${slugify(section.slug)}/${subItem.slug}`}
//                                   className="text-sm text-gray-700 hover:text-blue-600 transition-colors block "
//                                 >
//                                   {subItem}
//                                 </Link>
//                               </li>
//                             ))}
//                           </ul>
//                         )}
//                       </div>
//                     )
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetCategoriesData } from "../../Redux/Features/CategoryServicesSlice";
import "../../Component/Header/Css/style_navi.css";

export const Navigation = () => {
  const dispatch = useDispatch();
  const { CategoriesData, error, loading } = useSelector(
    (state) => state.CategoryOpration
  );

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    dispatch(GetCategoriesData());
  }, [dispatch]);

  // Close dropdown on scroll
  useEffect(() => {
    const handleScroll = () => setActiveDropdown(null);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 200);
  };

  const handleMouseEnter = (index) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(index);
  };

  // Don't render on mobile
  if (isMobile) return null;

  if (loading) return <div className="text-center py-4">Loading..</div>;
  if (error) return <div className="text-center py-4">Error: {error}</div>;
  if (!CategoriesData?.length) return null;

  return (
    <nav className="w-full relative">
      <div className="container mx-auto px-6 py-3">
        <ul className="flex gap-8 justify-center scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {CategoriesData.map((item, idx) => (
            <li
              key={idx}
              className="relative"
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                className={`text-[16px] font-[500] transition-all duration-200 whitespace-nowrap ${
                  activeDropdown === idx
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "hover:text-blue-500 hover:border-b-2 hover:border-blue-500"
                }`}
                to={`categories${item.path}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Dropdown */}
        {activeDropdown !== null && (
          <div
            className="absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-lg z-50 pt-6"
            onMouseEnter={() => handleMouseEnter(activeDropdown)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container mx-auto px-6">
              {CategoriesData[activeDropdown]?.megaMenu?.length > 0 && (
                <div
                  className={`flex flex-wrap   ${
                    CategoriesData[activeDropdown]?.megaMenu.length >= 4
                      ? "flex flex-col"
                      : CategoriesData[activeDropdown]?.megaMenu.length >= 2
                      ? "flex flex-col"
                      : "flex flex-col"
                  }  max-h-[50vh] overflow-y-auto`}
                >
                  {CategoriesData[activeDropdown].megaMenu.map(
                    (section, secIdx) => (
                      <div key={secIdx} className="min-w-[200px]">
                        <h4 className="text-[15px] font-bold text-orange-600 border-t">
                          <Link
                            to={`/categories${section.path}`}
                            className="block py-1"
                          >
                            {section.title}
                          </Link>
                        </h4>

                        {section.items?.length > 0 && (
                          <ul>
                            {section.items.map((subItem, subIdx) => (
                              <li key={subIdx}>
                                <Link
                                  to={`/categories${subItem.path}`}
                                  className="text-sm text-gray-700 hover:text-blue-600 transition-colors block"
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
