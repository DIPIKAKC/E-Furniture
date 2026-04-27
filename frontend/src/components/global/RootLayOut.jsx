import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CartSidebar from './CartSidebar'

export default function RootLayOut() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <CartSidebar />
        </>
    )
}
