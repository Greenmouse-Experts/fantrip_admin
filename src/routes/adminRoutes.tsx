import DashboardLayout from "../layout";

export const adminRooutes = [
    {
        path: '/',
        element: <DashboardLayout/>,
        children: [
          {
            index: true,
            element: <>Admin</>,
          },
        ],
      },
]