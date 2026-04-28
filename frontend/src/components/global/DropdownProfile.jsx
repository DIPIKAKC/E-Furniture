import { LogOutIcon, User2Icon } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { removeUser } from '../../API/Slice/userSlice';

export default function DropdownProfile({ user, close }) {
    const nav = useNavigate();
    const dispatch = useDispatch();

    const handleAccount = () => {
        close();
        if (user) nav('/account');
        else nav('/authentication');
    };

    const handleLogout = () => {
        dispatch(removeUser());
        close();
        nav('/authentication');
    };

    return (
        <div className='absolute right-0 mt-2 w-40 shadow-lg rounded-lg bg-white text-gray-700 py-2 z-50'>

            <div
                onClick={handleAccount}
                className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer'
            >
                <User2Icon size={18} />
                My Account
            </div>

            <div
                onClick={handleLogout}
                className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer'
            >
                <LogOutIcon size={18} />
                Sign Out
            </div>

        </div>
    );
}