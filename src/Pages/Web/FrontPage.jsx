import ProductSliderHome from "../Product/ProductSliderHome";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProductListing } from "../../Component/Fronpage/ProductinFrontpage";
import { AuthModal } from "../Web/AuthModal";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  GetBannerData,
  GetOfferBannerData,
} from "../../Redux/Features/BannerServicesSlice";
import {
  GetToprateddata,
  GetTrandingdata,
} from "../../Redux/Features/Tranding_ND_TopratedServicesSlice";

// const sideImages = [
//   "https://demo.readyecommerce.app/storage/ads/V6XGxnZXsekvObHLd3yam9R14OwFdtZViZmlQ9ZM.jpg",
//   "https://demo.readyecommerce.app/storage/ads/8iFiqA7eVqpiPab5HhKM1tYcMq1VDRseks75hYQx.jpg",
// ];

export const FrontPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const dispatch = useDispatch();

  const {
    BannerData,
    OfferbannerData,
    Offererror,
    Offerloading,
    Bannererror,
    Bannerloading,
  } = useSelector((state) => state.BannerOpration);

  const { TopratedData, TrandingData, Trandingloading, Trandingerror } =
    useSelector((state) => state.Tranding_nd_TopratedOpration);

  useEffect(() => {
    dispatch(GetBannerData());
    dispatch(GetOfferBannerData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(GetTrandingdata());
    dispatch(GetToprateddata());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen web pb-16 lg:pb-0">
      {/* ✅ Search Bar - Visible on mobile only */}
      <div className="flex w-80  lg:hidden mx-12 pt-2">
        <form onSubmit={handleSearch} className="flex-1 flex">
          <input
            type="text"
            placeholder="Search Product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:border-[#C71F46]"
          />
          <button
            type="submit"
            className="bg-[#C71F46] text-white px-4 lg:px-6 rounded-r-md hover:bg-[#A51A3A] transition-colors"
          >
            <FaSearch />
          </button>
        </form>
      </div>

      {/* ✅ Banner - Responsive */}

      <div className="mx-4 lg:mx-8 main-container mt-3 grid grid-cols-1 lg:grid-cols-4 gap-3 lg:gap-8">
        {/* Left Main Swiper Slider */}
        <div className="lg:col-span-3 h-full">
          {Bannerloading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading banners...</p>
            </div>
          ) : Bannererror ? (
            <div className="flex justify-center items-center h-64 text-red-500">
              <p>Error loading banners!</p>
            </div>
          ) : BannerData.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={!isMobile}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
              className="rounded-lg h-full"
            >
              {BannerData.map((src, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={src}
                    alt={`banner-${index}`}
                    className="w-full h-full object-cover rounded-lg aspect-[9/16]  lg:aspect-[16/6]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p>No banners available</p>
            </div>
          )}
        </div>

        {/* Right Side 2 Banners */}
        <div className="hidden lg:flex lg:flex-col lg:col-span-1 gap-4 h-full">
          {Offerloading ? (
            <div className="flex justify-center items-center h-full">
              <p>Loading offer banners...</p>
            </div>
          ) : Offererror ? (
            <div className="flex justify-center items-center h-full text-red-500">
              <p>Error loading offer banners!</p>
            </div>
          ) : OfferbannerData.length > 0 ? (
            OfferbannerData.slice(0, 2).map((banner) => (
              <div key={banner.id} className="flex-1">
                {banner.link ? (
                  <Link
                    to={`/product/${banner.link}`}
                    className="block w-full h-full"
                  >
                    <img
                      src={banner.image}
                      alt={banner.title || `banner-${banner.id}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </Link>
                ) : (
                  <img
                    src={banner.image}
                    alt={banner.title || `banner-${banner.id}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-full">
              <p>No offer banners available</p>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Product Section */}
      <section className="py-8 lg:py-16 bg-gradient-to-br from-slate-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 lg:mb-12">
            <div>
              <h2 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trending Now
              </h2>
              <p className="text-gray-600 mt-2 text-sm lg:text-base">
                Products everyone's talking about
              </p>
            </div>
          </div>
          <ProductSliderHome Productdata={TrandingData} sliderbox={4} />
        </div>
      </section>

      {/* Product Grid Section */}
      <div className="mt-8 lg:mt-12">
        <div className="mx-4 lg:ml-4 flex items-center justify-between mb-4">
          <h2 className="text-xl lg:text-2xl font-bold">Top Rated Items</h2>
          {/* <a
            href="/shops"
            className="hidden lg:block text-sm text-blue-600 hover:underline"
          >
            View All →
          </a> */}
        </div>

        <div className="mx-4 lg:mx-8 mt-6">
          <ProductSliderHome Productdata={TopratedData} />
        </div>

        <ProductListing />
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={() => {
          setShowAuthModal(false);
          window.location.reload();
        }}
      />
    </div>
  );
};
