
import { useState } from 'react';
import { useUserRegisterMutation } from '../../API/Authentication/authApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik } from "formik";
import toast from "react-hot-toast"
import Button from '../global/Button';
import { LockKeyhole, LockKeyholeOpenIcon } from 'lucide-react';


export default function Checkout() {
    const [show, setShow] = useState(false);
    const [userRegister, { isLoading, isSuccess, data }] = useUserRegisterMutation();

    return (
        <div className="flex flex-col bg-white w-full max-w-110 px-10 py-10 space-y-6">

            <h2 className="text-2xl font-semibold text-gray-900">Register your account</h2>
            <Formik
                initialValues={{
                    username: "",
                    email: "",
                    password: "",
                }}
                onSubmit={async (val) => {
                    try {
                        const response = await userRegister(val).unwrap();
                        toast.success('User Registered Successfully');
                        console.log(response);
                    } catch (error) {
                        toast.error(error?.data?.data || error?.data?.message)
                    }
                }}
                validationSchema={registerSchema}
            >
                {({ values, handleChange, errors, touched, handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <label htmlFor="email" className="text-sm text-gray-600">Email address</label>
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
                                <label htmlFor="username" className="text-sm text-gray-600">Username</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    placeholder="m@example.com"
                                    onChange={handleChange}
                                    value={values.username}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-800 focus:ring-2 focus:ring-gray-100 transition"
                                />
                                {errors.username && touched.username && <p className="text-xs text-red-500">
                                    {errors.username}
                                </p>}
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="password" className="text-sm text-gray-600">Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        id="password"
                                        name="password"
                                        type={show ? 'text' : 'password '}
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

                            <Button type="submit">
                                Signup
                            </Button>

                        </div>
                    </form>
                )}
            </Formik>

        </div>
    )
}