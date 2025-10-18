import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GetCategoriesData } from "../../Redux/Features/CategoryServicesSlice";
import { Link } from "react-router-dom";

export const MobileCategoryModal = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const dispatch = useDispatch();
  const { CategoriesData, error, loading } = useSelector(
    (state) => state.CategoryOpration
  );

  useEffect(() => {
    dispatch(GetCategoriesData());
  }, [dispatch]);

  const categories = CategoriesData || [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-bold">Categories</h2>
          <button onClick={onClose} className="text-gray-500">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="flex h-[60vh]">
          {/* Main Categories */}
          <div className="w-2/5 border-r overflow-y-auto">
            {loading ? (
              <p className="p-4 text-gray-500">Loading...</p>
            ) : error ? (
              <p className="p-4 text-red-500">{error}</p>
            ) : categories.length === 0 ? (
              <p className="p-4 text-gray-500">No categories found</p>
            ) : (
              categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(category)}
                  className={`w-full text-left p-4 border-b ${
                    activeCategory?.label === category.label
                      ? "bg-gray-100"
                      : ""
                  }`}
                >
                  {category.label}
                </button>
              ))
            )}
          </div>

          {/* Subcategories / Mega Menu */}
          <div className="w-3/5 overflow-y-auto">
            {activeCategory ? (
              <div className="p-4">
                {activeCategory.megaMenu?.length > 0 ? (
                  activeCategory.megaMenu.map((menu, idx) => (
                    <div key={idx} className="mb-4">
                      <h3 className="font-semibold mb-2">
                        <Link
                          to={`/categories${menu.path}`}
                          className="block py-1"
                          onClick={onClose}
                        >
                          {menu.title}
                        </Link>
                      </h3>
                      <div className="space-y-2">
                        {menu.items?.length > 0 ? (
                          menu.items.map((item, i) => (
                            <Link
                              key={i}
                              to={`/categories${item.path}`}
                              className="block w-full text-left p-2 hover:bg-gray-100 rounded text-sm text-gray-700 hover:text-blue-600 transition-colors"
                              onClick={onClose}
                            >
                              {item.name}
                            </Link>
                          ))
                        ) : (
                          <p className="text-gray-400 italic"></p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No subcategories</p>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a category
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
