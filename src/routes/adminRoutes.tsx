import DashboardLayout from "../layout";
import StayAmenities from "../pages/amenities";
import BookingPage from "../pages/booking";
import AdminDashboard from "../pages/dashboard";
import GuestDetail from "../pages/guest-detail";
import HostDetail from "../pages/host-detail";
import StayLisiting from "../pages/listing";
import ListingDetailPage from "../pages/listing-detail";
import PlacesPage from "../pages/places";
import StayProperties from "../pages/properties";
import ReservationPage from "../pages/reservation";
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
            path: 'users/guest/:id',
            element: <GuestDetail/>
          },
          {
            path: 'users/host/:id',
            element: <HostDetail/>
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
          },
          {
            path: 'places',
            element: <PlacesPage/>
          },
          {
            path: 'booking',
            element: <BookingPage/>
          },
          {
            path: 'booking/:id',
            element: <ListingDetailPage/>
          },
          {
            path: 'reservation',
            element: <ReservationPage/>
          },
          {
            path: 'listing',
            element: <StayLisiting/>
          },
          {
            path: 'listing/:id',
            element: <ListingDetailPage/>
          }
        ],
      },
]