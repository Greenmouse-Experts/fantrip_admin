import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/authUser";
import SidebarLayout from "./components/sidebar";
import ThemeSwitch from "./components/theme-switch";
import { PiSidebarDuotone } from "react-icons/pi";
import { BsBell } from "react-icons/bs";
import { ImSwitch } from "react-icons/im";
import useDialog from "../hooks/useDialog";
import LogoutModal from "../modules/auth/logout-modal";

const DashboardLayout = () => {
  const { firstName } = useAuth();
  const { Dialog, setShowModal } = useDialog();
  const token = sessionStorage.getItem("fantrip_admin_token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, []);
  if (!token) {
    return;
  }
  const [toggled, setToggled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <div className="flex dark:bg-[#0D0D0D] dark:text-white">
        <div className={`${collapsed? 'lg:w-[70px]' : 'lg:w-[280px]'} border-r border-[#1C1C1C1A]`}>
          <SidebarLayout
            toggled={toggled}
            collapsed={collapsed}
            setToggled={setToggled}
          />
        </div>
        <div className={`${collapsed? 'lg:w-[calc(100%_-_70px)]' : 'lg:w-[calc(100%_-_280px)]'} w-full min-h-screen py-4 lg:py-9`}>
          <div className="">
            <div className="h-[30px] border-b border-[#1C1C1C1A] relative index-30">
              <div className={`${collapsed? 'lg:w-[calc(100%_-_70px)]' : 'lg:w-[calc(100%_-_280px)]'} fixed top-0 w-full pl-9 pr-5 py-4 lg:py-[23px] flex items-center justify-between`}>
                <div className="flex gap-x-2 items-center">
                  <PiSidebarDuotone
                    className="text-xl"
                    onClick={() => setCollapsed(!collapsed)}
                  />
                  <p className="fw-600 lg:text-lg">Welcome back, {firstName}</p>
                </div>
                <div className="flex gap-x-2 lg:gap-x-3">
                  <ThemeSwitch/>
                  <BsBell className='text-xl cursor-pointer'/>
                  <ImSwitch className='text-xl cursor-pointer' onClick={() => setShowModal(true)}/>
                </div>
              </div>
            </div>
            <div className="px-3 lg:px-7 pt-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Dialog title="" size="xs">
        <LogoutModal CloseModal={() => setShowModal(false)}/>
      </Dialog>
    </>
  );
};

export default DashboardLayout;
