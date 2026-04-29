import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useSelector } from "react-redux";

export default function AdminLayout() {
  const { user } = useSelector((state) => state.userSlice ?? {});
  return (
    <>
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <div className="">
          {user && <AdminSidebar />}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Outlet />
        </div>

      </div>
    </>
  );
}