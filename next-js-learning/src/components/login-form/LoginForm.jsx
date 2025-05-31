'use client'
import Image from "next/image"
import LoginImage from "@/assets/login_image.avif"

export default function LoginForm() {
    return (
        <div className="text-gray-800 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-cyan-100 p-0 flex rounded-2xl shadow-lg max-w-3xl w-full overflow-hidden">
                {/* form */}
                <div className="w-1/2 px-10 py-10 flex flex-col justify-center">
                    <h2 className="text-blue-800 font-bold text-2xl">Login</h2>
                    <p className="text-gray-700 text-xs mt-2">If you already a member, easily login.</p>

                    <form
                        action=""
                        className="flex flex-col gap-4"
                    >
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className="p-2 mt-3 rounded-xl border text-xs"
                        />

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="p-2 mt-3 rounded-xl border text-xs"
                        />

                        <button
                            type="submit"
                            className="bg-blue-900 rounded-xl text-white py-1 mt-2 text-sm cursor-pointer"
                        >
                            Login
                        </button>

                        {/* divider */}
                        <div className="grid grid-cols-3 items-center">
                            <hr className="border-gray-400" />
                            <p className="text-gray-400 text-center text-xs">OR</p>
                            <hr className="border-gray-400" />
                        </div>

                        <button
                            type="button"
                            className="bg-white rounded-xl text-gray-600 py-1 text-sm cursor-pointer"
                        >
                            Login with Google
                        </button>
                    </form>
                </div>

                {/* image */}
                <div className="w-1/2 relative h-auto">
                    <Image
                        src={LoginImage}
                        alt="login-screen"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    )
}
