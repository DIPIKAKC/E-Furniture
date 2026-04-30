import { HeartIcon, LayoutGridIcon, LogOutIcon, SearchIcon, ShoppingCartIcon, User2Icon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../../API/Slice/userSlice";
import toast from "react-hot-toast";


export default function AdminSidebar() {
    const { user } = useSelector((state) => state.userSlice ?? {}); //userslice ko matra initial state taneko
    const nav = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async() =>{
        try {
            await dispatch(removeUser());
            nav('/admin/login');
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <aside className='w-fit h-screen border-r border-gray-100 flex flex-col justify-between px-5 bg-gray-50'>

            <div onClick={()=>nav('/admin/dashboard')} className="px-5 py-10 border-b border-gray-100 flex items-center gap-3 cursor-pointer">
                <div className="w-8 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
                    <LayoutGridIcon size={25} className="text-amber-400" />
                </div>
                <div>
                    <p className="text-md font-medium text-gray-900 leading-none">Admin Panel</p>
                    <p className="text-sm text-gray-400 mt-0.5">Dashboard</p>
                </div>
            </div>


            <div className='flex flex-col space-y-2'>
                <NavLink
                    to={'/admin/products'}
                    className={({ isActive }) =>
                        `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm bg-amber-50 font-semibold transition-colors ${isActive
                            ? "bg-gray-100 text-gray-900 font-medium"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                        }`}>
                    Products
                </NavLink>
            </div>


            <div className="px-2.5 py-10 border-t border-gray-100">
                <div className="flex items-center gap-2.5 px-2.5 py-2 mb-1">
                    <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-medium text-gray-500">
                        {user?.email?.[0]?.toUpperCase() ?? "A"}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-[14px] font-medium text-gray-900 truncate leading-none">{user?.name ?? "Admin"}</p>
                        <p className="text-[12px] text-gray-400 truncate mt-0.5">{user?.email ?? "admin@store.com"}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[13px] text-red-500 border bg-white border-gray-200 hover:bg-red-50 transition-colors cursor-pointer"
                >
                    <LogOutIcon size={14} />
                    Log out
                </button>
            </div>
        </aside>
    )
}
