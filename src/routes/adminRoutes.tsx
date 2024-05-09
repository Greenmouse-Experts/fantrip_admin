import DashboardLayout from "../layout";
import StayAmenities from "../pages/amenities";
import AdminDashboard from "../pages/dashboard";
import StayProperties from "../pages/properties";
import ProfileSettings from "../pages/settings";
import UsersPage from "../pages/users";

export const adminRooutes = [
    {
        path: '/',
        element: <DashboardLayout/>,
        children: [
          {
            index: true,
            element: <AdminDashboard/>,
          },
          {
            path: 'users',
            element: <UsersPage/>
          },
          {
            path: 'settings',
            element: <ProfileSettings/>
          },
          {
            path: 'settings/amenities',
            element: <StayAmenities/>
          },
          {
            path: 'settings/properties',
            element: <StayProperties/>
          }
        ],
      },
]