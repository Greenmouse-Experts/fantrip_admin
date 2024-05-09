
import { BsGear } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { IoChatbubblesOutline, IoExtensionPuzzleSharp } from "react-icons/io5";
import { PiBookOpen, PiChartPieSliceFill, PiShoppingBagOpen } from "react-icons/pi";
import { RiProfileLine } from "react-icons/ri";
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
    name: "Billing",
    icon: <PiShoppingBagOpen className="text-xl" />,
    route: "/",
    submenu: [
      {
        name: "Condo Billing",
        icon: <PiShoppingBagOpen className="text-xl" />,
        route: "/",
        submenu: [],
      },
    ],
  },
  {
    name: "Area Guide",
    icon: <PiBookOpen className="text-xl" />,
    route: "/area",
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
      {
        name: "Listings",
        icon: <RiProfileLine className="text-xl" />,
        route: "/",
        submenu: [],
      },
      {
        name: "Messages",
        icon: <RiProfileLine className="text-xl" />,
        route: "/",
        submenu: [],
      },
      {
        name: "Notifications",
        icon: <RiProfileLine className="text-xl" />,
        route: "/",
        submenu: [],
      },
      {
        name: "Settings",
        icon: <RiProfileLine className="text-xl" />,
        route: "/",
        submenu: [],
      },
    ],
  },
  {
    name: "Transactions",
    icon: <GrTransaction className="text-xl" />,
    route: "/transact",
    submenu: [],
  },
  {
    name: "Analytics",
    icon: <IoExtensionPuzzleSharp className="text-xl" />,
    route: "/",
    submenu: [],
  },
  {
    name: "Reports",
    icon: <IoChatbubblesOutline className="text-xl"/>,
    route: "/",
    submenu: [],
  },
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
      }
    ],
  }
]
