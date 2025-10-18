import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - hidden on mobile, visible on medium screens */}
      <div className="hidden md:block w-64 bg-white shadow fixed h-full overflow-y-auto">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <main className="p-6">
          <Outlet /> {/* ✅ This renders your Dashboard/Profile/etc */}
        </main>{" "}
      </div>
    </div>
  );
};

export default UserLayout;
