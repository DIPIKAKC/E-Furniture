import { Delete, DeleteIcon, Edit2Icon, Minus, MountainIcon, Plus, PlusCircleIcon, Trash2, Trash2Icon, TrashIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AddProduct from './CRUD/AddProduct';
import { useGetAllProductsQuery } from '../../API/Product/productApi';

export default function Products() {

  const { data, isLoading } = useGetAllProductsQuery();
  const nav = useNavigate();
  const [showAddProduct, setShowAddProduct] = useState(false);


  const products = data?.products || [];
  console.log("all prod", products)

  return (
    <div>

      <button onClick={() => setShowAddProduct(true)} className='flex items-center gap-2 mt-10 ml-20 py-2 px-5 bg-orange-100 text-gray-400 text-sm font-bold rounded-lg'>
        <PlusCircleIcon size={18} />
        Add Product
      </button>

      <div className='flex justify-between gap-10 px-20 py-10'>
        <div className='w-full'>
          <table className='w-full text-left text-sm font-light text-gray-400'>
            <thead className='bg-orange-100'>
              <tr>
                <th></th>
                <th className='py-2'>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Size</th>
                <th>Colors</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                // skeleton rows
                [1, 2, 3].map((i) => (
                  <tr key={i}>
                    <td colSpan={6} className='py-4'>
                      <div className='h-16 bg-gray-100 animate-pulse rounded-lg' />
                    </td>
                  </tr>
                ))
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className='py-10 text-center text-gray-400 normal-case'>
                    There are no products to be found.{' '}
                  </td>
                </tr>
              ) : (
                products.map((item) => (
                  <tr key={item._id} className='items-center'>
                    <td className='py-4'>
                      <img
                        className='size-15 object-cover rounded-lg'
                        src={item?.images?.[0]}
                        alt=""
                      />
                    </td>
                    <td>{item?.productName}</td>
                    <td>Rs. {item?.price?.toLocaleString()}</td>
                    <td>{item?.category?.name}</td>
                    <td>{item?.sizes.join(" , ")}</td>
                    <td>{item?.colors.join(" , ")}</td>
                    <td>
                      <div className="flex items-center gap-4">
                        <Edit2Icon
                          className='text-orange-300 cursor-pointer hover:text-blue-400'
                          size={18}
                        />
                        <TrashIcon
                          className='text-orange-300 cursor-pointer hover:text-red-400'
                          size={18}
                          onClick={() => removeItem(item?._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>


      </div>


      {/* for modal */}
      {showAddProduct && (
        <AddProduct onClose={() => setShowAddProduct(false)} />
      )}

    </div>
  )
}
