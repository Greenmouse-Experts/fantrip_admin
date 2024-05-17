import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { RouteType, Routes, Routes2 } from "./routes";
import { Link, useLocation } from "react-router-dom";
import logo from "/favicon.png";
import useAuth from "../../hooks/authUser";
import useDialog from "../../hooks/useDialog";
import LogoutModal from "../../modules/auth/logout-modal";
import ProfileAvatar from "../../components/ProfileAvatar";
import QuickLinks from "./quick-links";
import { FC } from "react";
interface Props {
  toggled: boolean;
  collapsed: boolean;
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
}
const SidebarLayout: FC<Props> = ({ toggled, setToggled, collapsed }) => {
  const path = useLocation();
  const { Dialog, setShowModal } = useDialog();
  const { user, firstName } = useAuth();
  
  return (
    <div className="left-0 top-0  fixed overflow-y-hidden">
      <Sidebar
        customBreakPoint="1024px"
        className="h-screen overflow-y-hidden !border-none scroll-pro px-4"
        collapsed={collapsed}
        width="276px"
        backgroundColor=""
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        breakPoint="always"
        collapsedWidth="70px"
      >
        <div className="py-4 lg:py-6 lg:pb-8 items-center">
          <Link to="/" className="gap-x-3 flex">
            <img src={logo} alt="logo" className="w-8" />
            <p className="text-xl lg:text-2xl">Fantrip</p>
          </Link>
        </div>
        <div className="">
          <div className="flex items-center gap-x-2">
            <div className="shrink-0">
              <ProfileAvatar
                url={user.image}
                name={user.name}
                size={30}
                font={12}
                type="dark"
              />
            </div>
            <div>
              <p className="fw-400">{firstName}</p>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <QuickLinks />
        </div>
        <div className="mt-5">
          <p className="text-[#1C1C1C66] dark:text-white fs-500">Dashboards</p>
        </div>
        <Menu
          className="overflow-y-auto relative scroll-pro"
          transitionDuration={600}
        >
          {Routes.map((item) => {
            return (
              <div key={item.name} className="">
                {!!item.submenu.length ? (
                  <SubMenu className="[&>a]:dark:!bg-[#131313] dark:text-white" label={item.name} icon={item.icon} key={item.name}>
                    {item.submenu.map((item: RouteType, i) => (
                      <MenuItem
                      className="[&>a]:dark:!bg-[#131313] dark:!text-white"
                        component={<Link to={item.route} />}
                        active={path.pathname === item.route && true}
                        key={i}
                      >
                        <p className="fs-400">{item.name}</p>
                      </MenuItem>
                    ))}
                  </SubMenu>
                ) : (
                  <MenuItem
                  className="[&>a]:dark:!bg-[#131313] dark:!text-white"
                    component={<Link to={item.route} />}
                    icon={item.icon}
                    active={path.pathname === item.route && true}
                    key={item.name}
                  >
                    <div className="flex pr-4 justify-between items-center">
                      <p className="fs-400">{item.name}</p>
                    </div>
                  </MenuItem>
                )}
              </div>
            );
          })}
        </Menu>
        <div className="mt-5">
          <p className="text-[#1C1C1C66] dark:text-white fs-500">General</p>
        </div>
        <Menu
          className="overflow-y-auto relative scroll-pro"
          transitionDuration={600}
        >
          {Routes2.map((item) => {
            return (
              <div key={item.name}>
                {!!item.submenu.length ? (
                  <SubMenu className="[&>a]:dark:!bg-[#131313] dark:text-white" label={item.name} icon={item.icon} key={item.name}>
                    {item.submenu.map((item: RouteType, i) => (
                      <MenuItem
                      className="[&>a]:dark:!bg-[#131313] dark:!text-white"
                        component={<Link to={item.route} />}
                        active={path.pathname === item.route && true}
                        key={i}
                      >
                        <p className="fs-400">{item.name}</p>
                      </MenuItem>
                    ))}
                  </SubMenu>
                ) : (
                  <MenuItem
                  className="[&>a]:dark:!bg-[#131313] dark:!text-white"
                    component={<Link to={item.route} />}
                    icon={item.icon}
                    active={path.pathname === item.route && true}
                    key={item.name}
                  >
                    <div className="flex pr-4 justify-between items-center">
                      <p className="fs-400">{item.name}</p>
                    </div>
                  </MenuItem>
                )}
              </div>
            );
          })}
        </Menu>
      </Sidebar>
      <Dialog title="" size="xs">
        <LogoutModal CloseModal={() => setShowModal(false)} />
      </Dialog>
    </div>
  );
};

export default SidebarLayout;
