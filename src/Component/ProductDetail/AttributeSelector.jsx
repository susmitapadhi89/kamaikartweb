import { useMemo } from "react";
import { FaCheck } from "react-icons/fa";

export const AttributeSelector = ({
  attributeName,
  product,
  selectedAttributes,
  onChange,
  getAvailableValues,
}) => {
  const selectedValue = selectedAttributes[attributeName];

  // Get all possible values for this attribute
  const allPossibleValues = useMemo(() => {
    if (!product?.variants) return [];

    const values = new Set();
    product.variants.forEach((variant) => {
      variant.attributes?.forEach((attr) => {
        if (attr.attribute_name === attributeName && attr.value) {
          values.add(attr.value);
        }
      });
    });
    return Array.from(values);
  }, [product, attributeName]);

  const availableValues = getAvailableValues(attributeName);

  if (allPossibleValues.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Attribute Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 capitalize">
          {attributeName.replace(/_/g, " ")}
        </h3>
        {selectedValue && (
          <span className="text-sm text-gray-500">
            Selected: {selectedValue}
          </span>
        )}
      </div>

      {/* Attribute Options */}
      <div className="flex flex-wrap gap-3">
        {allPossibleValues.map((value) => {
          const isAvailable = availableValues.includes(value);
          const isSelected = selectedValue === value;

          return (
            <button
              key={value}
              onClick={() => isAvailable && onChange(attributeName, value)}
              disabled={!isAvailable}
              className={`px-6 py-3 border-2 rounded-xl text-sm font-medium transition-all ${
                isSelected
                  ? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-200"
                  : isAvailable
                  ? "border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600"
                  : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
              } ${isAvailable ? "cursor-pointer" : "cursor-not-allowed"}`}
              title={
                !isAvailable
                  ? `Not available with current selection`
                  : isSelected
                  ? `Deselect ${value}`
                  : `Select ${value}`
              }
            >
              <div className="flex items-center gap-2">
                {value}
                {isSelected && <FaCheck className="w-3 h-3" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selection Guidance */}
      {!selectedValue && availableValues.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <p className="text-sm text-gray-600">
            💡 Please select a {attributeName.toLowerCase()} to see available
            options
          </p>
        </div>
      )}
    </div>
  );
};
