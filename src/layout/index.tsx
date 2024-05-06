
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../hooks/authUser";
import SidebarLayout from "./components/sidebar";
// import useDialog from "../hooks/useDialog";

const DashboardLayout = () => {
  const { firstName } = useAuth();
  // const { Dialog, setShowModal } = useDialog();
  const token = sessionStorage.getItem('fantrip_admin_token')
  const navigate = useNavigate()
  useEffect(() => {
    if(!token){
      navigate("/auth/login");
    }
  }, [])
  if (!token) {
    return;
  }
  return (
    <>
      <div className="flex">
        <div className="lg:w-[280px] border-r border-[#1C1C1C1A]">
          <SidebarLayout />
        </div>
        <div className="w-full  lg:w-[calc(100%_-_280px)] min-h-screen py-4 lg:py-9">
          <div className="">
            <div className="h-[30px] border-b border-[#1C1C1C1A] relative index-30">
              <div className="fixed top-0 w-full lg:w-[calc(100%_-_280px)] pl-9 pr-5 py-4 lg:py-[23px] flex items-center justify-between">
               <div>
               <p className="fw-600 lg:text-xl">Welcome back, {firstName}</p>
               </div>
              </div>
            </div>
            <div className="px-3 lg:px-9">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      {/* <Dialog title="" size="xs">
        <>Hello peeople</>
      </Dialog> */}
    </>
  );
};

export default DashboardLayout;
