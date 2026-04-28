
import { ArrowLeftIcon } from 'lucide-react';
import { useSearchQuery } from '../../API/Search/searchApi';
import ProductCard from '../../components/global/ProductCard';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Search() {

    const nav = useNavigate();
    const [params] = useSearchParams();
    const query = params.get("q");

    const { data, isLoading } = useSearchQuery(query, {
        skip: !query
    });
    console.log('search data', data)


    if (!query) return <p className="p-4">Type something to search</p>;
    if (isLoading) return <p className="p-4">Searching...</p>;

    return (
        <div className='mt-5 mb-15'>
            <div className="ml-2 sm:ml-4 md:ml-6 lg:ml-32">
                <button
                    className=" flex items-center gap-2 px-2 py-1"
                    size="sm"
                    onClick={() => nav(-1)}
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    <span className="hidden sm:inline cursor-pointer">Back</span>
                </button>
            </div>

            <div className="max-w-6xl mx-auto mt-3 sm:mt-4 md:mt-5 space-y-4 sm:space-y-6 px-4 sm:px-6 md:px-0">
                {/* Products */}
                <div>
                    <h2 className="font-semibold text-base sm:text-xl mb-10">Products</h2>
                    {data?.products?.length === 0 && <p className="text-sm sm:text-base">No products found</p>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {data?.products?.map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


