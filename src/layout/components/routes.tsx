
import { PiBookOpen, PiChartPieSliceFill, PiShoppingBagOpen } from "react-icons/pi";
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
  // {
  //   name: "Locations",
  //   icon: <IoLocationOutline className="text-xl" />,
  //   route: "/host/locations",
  //   submenu: [],
  // },
  // {
  //   name: "Transactions",
  //   icon: <FaDollarSign className="text-xl" />,
  //   route: "/host/transact",
  //   submenu: [],
  // },
  // {
  //   name: "Inbox",
  //   icon: <IoExtensionPuzzleSharp className="text-xl" />,
  //   route: "/host/inbox",
  //   submenu: [],
  // },
];
