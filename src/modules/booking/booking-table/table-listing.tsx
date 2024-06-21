import { FC } from "react";
import {
  BookingItemWithPricing,
  PaidBookingItem,
} from "../../../contracts/booking";
import { DynamicTable } from "../../../components/DynamicTable";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import {
  formatAsNgnMoney,
  formatName,
  formatStatus,
  formatStayStatus,
} from "../../../utils/formatHelp";
import UserInfoAvatar from "../../../utils/user-info";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface Props {
  data: BookingItemWithPricing[];
}
const BookingTableListing: FC<Props> = ({ data }) => {
  const navigate = useNavigate();
  // table column configuration and formating
  const columnHelper = createColumnHelper<PaidBookingItem>();
  const columns = [
    columnHelper.accessor((row) => row.reservation.guest.picture, {
      id: "Guest",
      cell: (info) => (
        <UserInfoAvatar
          url={info.getValue()}
          fname={info.row.original.reservation.guest.firstName}
          lname={info.row.original.reservation.guest.lastName}
        />
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.reservation.stay.host.picture, {
      id: "Host",
      cell: (info) => (
        <UserInfoAvatar
          url={info.getValue()}
          fname={info.row.original.reservation.stay.host.firstName}
          lname={info.row.original.reservation.stay.host.lastName}
        />
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.reservation.stay, {
      id: "Stay",
      cell: (info) =>
        info.getValue() && (
          <div className="min-w-[230px] flex gap-x-2 items-center">
            {!!info.getValue().photos.length && (
              <img
                src={info.getValue().photos[0]}
                alt="condo-img"
                className="w-[80px] h-[60px] rounded-lg"
              />
            )}
            <div>
              <p className="w-[160px] whitespace-nowrap">
                {info.getValue().name}
              </p>
              <p>{formatName(info.getValue().address, 20)}</p>
            </div>
          </div>
        ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.pricePerNight, {
      id: "Amount Paid",
      cell: (info) => (
        <p className="text-lg fw-600">{formatAsNgnMoney(info.getValue())}</p>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.trx.status, {
      id: "Payment Status",
      cell: (info) =>
        formatStatus[info.getValue() as keyof typeof formatStatus],
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.reservation.checkIn, {
      id: "Check In",
      cell: (info) => dayjs(info.getValue()).format("DD-MMM-YYYY"),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.reservation.checkOut, {
      id: "Check Out",
      cell: (info) => dayjs(info.getValue()).format("DD-MMM-YYYY"),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.reservation.adults, {
      id: "Guests",
      cell: (info) => (
        <div>
          <p>{info.getValue()} Adults</p>
          <p>{info.row.original.reservation.children} Children</p>
        </div>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.status, {
      id: "Stay Staus",
      cell: (info) =>
        formatStayStatus[info.getValue() as keyof typeof formatStayStatus],
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.trx.id, {
      id: "Action",
      cell: (info) => (
        <Menu>
          <MenuHandler>
            <Button className="call-btn">
              <BsThreeDotsVertical className="text-2xl text-black dark:text-white" />
            </Button>
          </MenuHandler>
          <MenuList>
            <MenuItem onClick={() => navigate(`/booking/${info.getValue()}`)}>
              <p className="text-black">View Details</p>
            </MenuItem>
            <MenuItem>
              <p className="text-black">Hold Withdrawal</p>
            </MenuItem>
          </MenuList>
        </Menu>
      ),
      header: (info) => info.column.id,
    }),
  ];
  return (
    <div>
      <div>
        <DynamicTable
          columns={columns}
          data={data}
          next={() => false}
          prev={() => false}
          page={1}
          count={5}
        />
      </div>
    </div>
  );
};

export default BookingTableListing;
