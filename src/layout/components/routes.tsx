
import { BsChatDots, BsGear } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { IoChatbubblesOutline } from "react-icons/io5";
// import { MdOutlineFeaturedPlayList } from "react-icons/md";
import { PiBookOpen, PiChartPieSliceFill, PiShoppingBagOpen } from "react-icons/pi";
import { RiHotelLine, RiProfileLine } from "react-icons/ri";
export interface RouteType {
  name: string;
  icon: any;
  route: string;
  submenu: {
    name: string;
    icon: any;
    route: string;
  }[];
}
export const Routes = [
  {
    name: "Overview",
    icon: <PiChartPieSliceFill className="text-xl" />,
    route: "/",
    submenu: [],
  },
  {
    name: "Stay",
    icon: <RiHotelLine className="text-xl" />,
    route: "/",
    submenu: [
      {
        name: "Listings",
        icon: <PiShoppingBagOpen className="text-xl" />,
        route: "/listing",
        submenu: [],
      },
      {
        name: "Billboard",
        icon: <PiShoppingBagOpen className="text-xl" />,
        route: "/special-listing",
        submenu: [],
      },
      {
        name: "Reservations",
        icon: <PiShoppingBagOpen className="text-xl" />,
        route: "/reservation",
        submenu: [],
      },
      {
        name: "Bookings",
        icon: <PiShoppingBagOpen className="text-xl" />,
        route: "/booking",
        submenu: [],
      },
    ],
  },
  {
    name: "Area Guide",
    icon: <PiBookOpen className="text-xl" />,
    route: "/area",
    submenu: [
      {
        name: "Spot Categories",
        icon: <PiShoppingBagOpen className="text-xl" />,
        route: "/spot-categories",
        submenu: [],
      },
      {
        name: "Reccomended Spots",
        icon: <PiShoppingBagOpen className="text-xl" />,
        route: "/reccomendations",
        submenu: [],
      },
      {
        name: "Top Places",
        icon: <PiShoppingBagOpen className="text-xl" />,
        route: "/places",
        submenu: [],
      },
    ],
  },
  {
    name: "Chat Room",
    icon: <BsChatDots className="text-xl" />,
    route: "/chat-room",
    submenu: [],
  },
];

export const Routes2 = [
  {
    name: "Profile",
    icon: <RiProfileLine className="text-xl" />,
    route: "/",
    submenu: [
      {
        name: "Users",
        icon: <RiProfileLine className="text-xl" />,
        route: "/users",
        submenu: [],
      },
      // {
      //   name: "Messages",
      //   icon: <RiProfileLine className="text-xl" />,
      //   route: "/",
      //   submenu: [],
      // },
      {
        name: "Notifications",
        icon: <RiProfileLine className="text-xl" />,
        route: "/notifications",
        submenu: [],
      },
      {
        name: "Settings",
        icon: <RiProfileLine className="text-xl" />,
        route: "/settings",
        submenu: [],
      },
    ],
  },
  // {
  //   name: "Features",
  //   icon: <MdOutlineFeaturedPlayList className="text-xl"/>,
  //   route: "",
  //   submenu: [
  //     {
  //       name: "",
  //       icon: <IoChatbubblesOutline className="text-xl"/>,
  //       route: "/places",
  //       submenu: [],
  //     },
  //   ],
  // },
  {
    name: "Transactions",
    icon: <GrTransaction className="text-xl" />,
    route: "/transact",
    submenu: [],
  },
  // {
  //   name: "Analytics",
  //   icon: <IoExtensionPuzzleSharp className="text-xl" />,
  //   route: "/",
  //   submenu: [],
  // },
  // {
  //   name: "Reports",
  //   icon: <IoChatbubblesOutline className="text-xl"/>,
  //   route: "/",
  //   submenu: [],
  // },
  {
    name: "Settings",
    icon: <BsGear className="text-xl"/>,
    route: "/settings",
    submenu: [
      {
        name: "Properties",
        icon: <IoChatbubblesOutline className="text-xl"/>,
        route: "/settings/properties",
        submenu: [],
      },
      {
        name: "Amenities",
        icon: <IoChatbubblesOutline className="text-xl"/>,
        route: "/settings/amenities",
        submenu: [],
      },
      {
        name: "Taxes",
        icon: <IoChatbubblesOutline className="text-xl"/>,
        route: "/settings/taxes",
        submenu: [],
      }
    ],
  }
]
