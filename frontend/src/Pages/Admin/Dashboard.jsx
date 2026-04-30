import { useState } from 'react';

import { useGetDashboardStatsQuery } from '../../API/admin/adminApi';

export default function Dashboard() {

    const { data, isLoading, isError } = useGetDashboardStatsQuery();
    const stats = data?.data ?? { users: 0, products: 0, orders: 0 };

    const cards = [
        { label: 'Users', value: stats.users },
        { label: 'Products', value: stats.products },
        { label: 'Orders', value: stats.orders },
    ];

    if (isLoading) return <p className="p-6 text-sm text-gray-400">Loading...</p>;
    if (isError) return <p className="p-6 text-sm text-red-400">Failed to load stats.</p>;

    return (
        <div>
            <h1 className='mt-10 ml-7 text-2xl font-semibold text-gray-900'>Admin Dashboard</h1>
            <div className="grid grid-cols-3 gap-3 p-6">
                {cards.map(({ label, value }) => (
                    <div key={label} className="bg-gray-100 rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-1">{label}</p>
                        <p className="text-3xl font-medium text-gray-900">{value.toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}