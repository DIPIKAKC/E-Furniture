import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function RootLayOut() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
