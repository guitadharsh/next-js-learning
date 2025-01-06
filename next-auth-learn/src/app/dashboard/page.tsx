export default function Dashboard() {
    return (
            <div className="min-h-screen bg-gray-100 p-4">
                {/* Header */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Logout
                    </button>
                </header>

                {/* Main Content */}
                <div className="flex mt-4">
                    {/* Sidebar */}
                    <aside className="w-1/4 bg-white shadow p-4">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Navigation</h2>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Overview
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Analytics
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Settings
                                </a>
                            </li>
                        </ul>
                    </aside>

                    {/* Dashboard Content */}
                    <main className="flex-1 bg-white shadow p-4 ml-4">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Welcome Back!</h2>
                        <p className="text-gray-600">
                            This is a simple dashboard. Use the navigation on the left to explore.
                        </p>
                    </main>
                </div>
            </div>
    );
}
