import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
    <div className="main-container-wrapper">
      <div className="navbar-wrapper">
        {/* <Navbar/> */}
      </div>
      
      <div className='box-content' >
        {/* <Outlet /> */}Hello
      </div>
    </div>
      
    </>
  )
};

export default Layout;