import DashboardLayout from "../layout";
import StayAmenities from "../pages/amenities";
import BookingPage from "../pages/booking";
import BookingDetails from "../pages/booking-detail";
import AdminDashboard from "../pages/dashboard";
import GuestDetail from "../pages/guest-detail";
import HostDetail from "../pages/host-detail";
import StayLisiting from "../pages/listing";
import ListingDetailPage from "../pages/listing-detail";
import NotificationPage from "../pages/notification";
import PlacesPage from "../pages/places";
import StayProperties from "../pages/properties";
import ReccomendationsPage from "../pages/reccomendations";
import RecommendationDetailPage from "../pages/recommend-details";
import ReservationPage from "../pages/reservation";
import ProfileSettings from "../pages/settings";
import StayTaxes from "../pages/taxes";
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
            path: 'settings/taxes',
            element: <StayTaxes/>
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
            element: <BookingDetails/>
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
          },
          {
            path: 'spot-categories',
            element: <PlacesPage/>
          },
          {
            path: 'reccomendations',
            element: <ReccomendationsPage/>
          },
          {
            path: 'reccomendations/:id',
            element: <RecommendationDetailPage/>
          },
          {
            path: 'notifications',
            element: <NotificationPage/>
          }
        ],
      },
]