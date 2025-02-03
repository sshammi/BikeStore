import { Outlet } from 'react-router'
import Navbar from '@/Shared/NavBar'
import Footer from '@/Shared/Footer'

const Mainlayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <Navbar></Navbar>
          <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Mainlayout
