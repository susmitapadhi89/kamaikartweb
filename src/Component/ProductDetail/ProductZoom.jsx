import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const ProductImages = ({ images = [], alt }) => {
  const [activeImage, setActiveImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-gray-400 bg-gray-100 rounded-2xl">
        No Image Available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
        <img
          src={images[activeImage]}
          alt={alt}
          className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setActiveImage((prev) =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-3 shadow-lg hover:bg-opacity-100 transition-all"
            >
              <FaArrowLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={() =>
                setActiveImage((prev) =>
                  prev === images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-3 shadow-lg hover:bg-opacity-100 transition-all"
            >
              <FaArrowRight className="w-4 h-4 text-gray-700" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {activeImage + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                activeImage === idx
                  ? "border-blue-500 shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img
                src={img}
                alt={`${alt} ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
