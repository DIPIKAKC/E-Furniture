import React from 'react'
import { useGetAllProductsQuery } from '../../API/Product/productApi';

export default function filterDropdown() {
      const { data } = useGetAllProductsQuery();

  return (
    <div>
      
    </div>
  )
}
