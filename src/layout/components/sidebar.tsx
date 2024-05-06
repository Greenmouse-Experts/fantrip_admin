import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { RouteType, Routes } from "./routes";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../public/favicon.png";
import useAuth from "../../hooks/authUser";
import useDialog from "../../hooks/useDialog";
import LogoutModal from "../../modules/auth/logout-modal";
import ProfileAvatar from "../../components/ProfileAvatar";
import QuickLinks from "./quick-links";

const SidebarLayout = () => {
  const path = useLocation();
  const { Dialog, setShowModal } = useDialog();
  const { user, firstName } = useAuth();

  return (
    <div className="left-0 top-0  fixed overflow-y-hidden">
      <Sidebar
        customBreakPoint="1024px"
        className="h-screen overflow-y-hidden !border-none scroll-pro px-4"
        backgroundColor=""
        width="260px"
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
          <p className="text-[#1C1C1C66] fs-500">Dashboards</p>
        </div>
        <Menu
          className="overflow-y-auto relative scroll-pro"
          transitionDuration={600}
          menuItemStyles={{
            button: ({ level, active }) => {
              if (level === 0)
                return {
                  color: active ? "#9847FE" : "#AEB9E1",
                  marginTop: "4px",
                  padding: "3px 1px 3px 0px !important ",
                  background: active ? "#E3E3E30D" : "",
                  "&:hover": {
                    color: "#9847FE",
                    background: "#E3E3E30D",
                    fontWeight: "500",
                  },
                };
            },
          }}
        >
          {Routes.map((item) => {
            return (
              <div key={item.name}>
                {!!item.submenu.length ? (
                  <SubMenu label={item.name} icon={item.icon} key={item.name}>
                    {item.submenu.map((item: RouteType, i) => (
                      <MenuItem
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
          {/* <MenuItem
            component={<Link to={"/host/settings"} />}
            icon={<BsGear className="text-xl" />}
            className="mt-12 border-t border-[#ffffff3a] pt-6"
            active={path.pathname === "/host/settings" && true}
          >
            <div className="flex pr-4 justify-between items-center">
              <p className="fs-400">Settings</p>
            </div>
          </MenuItem>
          <div className="mt-5 lg:mt-8">
            <div
              onClick={() => setShowModal(true)}
              className="flex justify-center py-3 rounded-[5.5px] cursor-pointer hover:grayscale logout-grad"
            >
              Logout
            </div>
          </div> */}
        </Menu>
      </Sidebar>
      <Dialog title="" size="xs">
        <LogoutModal CloseModal={() => setShowModal(false)} />
      </Dialog>
    </div>
  );
};

export default SidebarLayout;
