// components/global/Breadcrumb.jsx
import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from 'lucide-react';

export default function Breadcrumb({ productName }) {
    const location = useLocation();

    // Split path into segments: "/shop/product/abc123" → ["shop", "product", "abc123"]
    const segments = location.pathname.split('/').filter(Boolean);

    // Map segment keys to readable labels
    const labelMap = {
        shop: 'Shop',
        product: 'Product',
        cart: 'Cart',
        checkout: 'Checkout',
        account: 'Account',
    };

    const crumbs = segments.map((segment, index) => {
        const path = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;

        // If last segment looks like a MongoDB ID, use productName instead
        const isId = /^[a-f\d]{24}$/i.test(segment);
        const label = isId
            ? (productName ?? 'Product')
            : (labelMap[segment] ?? segment);

        return { label, path, isLast };
    });

    return (
        <nav className='flex items-center gap-2 text-sm'>
            {/* Home */}
            <Link to='/' className='text-gray-400 hover:text-gray-700 flex items-center gap-1'>
                <HomeIcon size={14} />
                Home
            </Link>

            {crumbs.map(({ label, path, isLast }) => (
                <div key={path} className='flex items-center gap-2'>
                    <ChevronRightIcon size={14} className='text-gray-400' />
                    {isLast ? (
                        // Last crumb — not clickable
                        <span className='text-gray-700 font-medium'>{label}</span>
                    ) : (
                        <Link to={path} className='text-gray-400 hover:text-gray-700'>
                            {label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}