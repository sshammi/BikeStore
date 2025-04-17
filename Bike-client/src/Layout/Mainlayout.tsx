import { Outlet } from 'react-router'
import Navbar from '@/Shared/NavBar'
import Footer from '@/Shared/Footer'

const Mainlayout = () => {
  return (
    <div>
        <Navbar></Navbar>
        <div className='min-h-screen'>
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default Mainlayout
