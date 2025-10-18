import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

// Layout
import { Layout } from "./Layout";

// Public Pages
import { LandingPage } from "./Pages/Web/LandingPage";
import { FrontPage } from "./Pages/Web/FrontPage";
import { TokenMarket } from "./Pages/Web/TokenMarket";
import { LuckyDraw } from "./Pages/Web/LuckyDraw";
import { Product_Detail } from "./Pages/Web/ProductDetailPage";

// User Pages
import Dashboard from "./Pages/Web/Dashboard";
import Profile from "./Pages/Web/Profile";
import WishList from "./Pages/Web/WishList";
import Address from "./Pages/Web/Address";
import SupportTicket from "./Pages/Web/SupportTicket";
import ChangePasswordPage from "./Pages/Web/ChangePassword";
import Orders from "./Pages/Web/Modal/Dashboard/AllOrderModel/Orders";
// Toast
import { Toaster } from "react-hot-toast";
import { ProductListing } from "./Pages/Web/ProductListing";
import CartPage from "./Pages/Web/Cart";
import { ProtectedRoute } from "./Component/ProtectRoute/ProtectRoute";
import CheckoutPage from "./Pages/Web/Modal/CheckOutpageAddress";
import PaymentPage from "./Pages/Web/Modal/Payment";
import OrderConfirmation from "./Pages/Web/OrderConformation";
import UserLayout from "./Pages/Layout/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },

    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "home", element: <FrontPage /> },
        { path: "token-market", element: <TokenMarket /> },
        { path: "lucky-draw", element: <LuckyDraw /> },
        {
          path: "categories",
          children: [
            {
              path: ":main/:sub?/:child?",
              index: true,
              element: <ProductListing />,
            },
          ],
        },
        { path: ":slug/:id", element: <Product_Detail /> },

        // ✅ PROTECTED ROUTES
        {
          element: <ProtectedRoute />, // protect these
          children: [
            {
              element: <UserLayout />,
              children: [
                { path: "dashboard", element: <Dashboard /> },
                { path: "profile", element: <Profile /> },
                { path: "orders", element: <Orders /> },
                { path: "address", element: <Address /> },
                { path: "support", element: <SupportTicket /> },
                { path: "change-password", element: <ChangePasswordPage /> },
              ],
            },
            { path: "wishlist", element: <WishList /> },
            { path: "cart", element: <CartPage /> },
            { path: "checkout", element: <CheckoutPage /> },
            { path: "payment", element: <PaymentPage /> },

            { path: "/order-confirmation", element: <OrderConfirmation /> },
            // { path: "messages", element: <Message /> },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
