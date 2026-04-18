
import { useState } from 'react';
import * as Yup from 'yup'
import { useUserLoginMutation } from '../../API/Authentication/authApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik } from "formik";
import toast from "react-hot-toast"
import { setUser } from '../../API/Slice/userSlice';
import Button from '../global/Button';
import { LockKeyhole, LockKeyholeOpenIcon } from 'lucide-react';


const loginShcema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(3).required()
})

export default function Login() {
    const [show, setShow] = useState(false);
    const [userLogin, { isLoading, isSuccess, data }] = useUserLoginMutation();
    const nav = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col bg-white w-full max-w-110 px-10 py-10 space-y-6">

            <h2 className="text-2xl font-semibold text-gray-900">Login to your account</h2>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={async (val) => {
                    try {
                        const response = await userLogin(val).unwrap();
                        dispatch(setUser({
                            user: response.data.user,
                            token: response.data.token
                        }));
                        localStorage.setItem("user", JSON.stringify({
                            user: response.data.user,
                            token: response.data.token
                        }));

                        toast.success('Login Successful');
                        nav("/");

                        console.log(response);
                    } catch (error) {
                        toast.error(error?.data?.data || error?.data?.message)
                    }
                }}
                validationSchema={loginShcema}
            >
                {({ values, handleChange, errors, touched, handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <label htmlFor="email" className="text-sm text-gray-600">Username or email address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    onChange={handleChange}
                                    value={values.email}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-800 focus:ring-2 focus:ring-gray-100 transition"
                                />
                                {errors.email && touched.email && <p className="text-xs text-red-500">
                                    {errors.email}
                                </p>}
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="password" className="text-sm text-gray-600">Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        id="password"
                                        name="password"
                                        type={show ? 'text' : 'password'}
                                        placeholder="••••••"
                                        onChange={handleChange}
                                        value={values.password}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm outline-none focus:border-gray-800 focus:ring-2 focus:ring-gray-100 transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShow((prev) => !prev)}
                                        className="absolute right-3 text-gray-400 hover:text-gray-600 transition"
                                    >
                                        {show
                                            ? <LockKeyholeOpenIcon size={16} />
                                            : <LockKeyhole size={16} />
                                        }
                                    </button>
                                </div>
                                {errors.password && touched.password && <p className="text-xs text-red-500">
                                    {errors.password}
                                </p>}
                            </div>

                            {/* Remember me */}
                            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    onChange={handleChange}
                                    className="w-4 h-4 cursor-pointer accent-gray-800"
                                />
                                Remember me
                            </label>
                            
                            <Button type="submit">
                                Login
                            </Button>

                        </div>
                    </form>
                )}
            </Formik>

        </div>
    )
}