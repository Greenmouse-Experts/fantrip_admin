import { FC } from "react";
import { ReservationItem } from "../../../contracts/booking";
import { DynamicTable } from "../../../components/DynamicTable";
import { createColumnHelper } from "@tanstack/react-table";
import ProfileAvatar from "../../../components/ProfileAvatar";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

interface Props {
  data: ReservationItem[];
}
const ReservationTableListing: FC<Props> = ({ data }) => {
  // table column configuration and formating
  const columnHelper = createColumnHelper<ReservationItem>();
  const columns = [
    columnHelper.accessor((row) => row.stay.name, {
        id: "Stay Name",
        cell: (info) => (
          <div className="min-w-[230px] flex gap-x-2 items-center">
            {!!info.row.original.stay.photos.length && (
              <img
                src={info.row.original.stay.photos[0]}
                alt="condo-img"
                className="w-[80px] h-[60px] rounded-lg"
              />
            )}
            <div>
            <p className="w-[160px] whitespace-nowrap">{info.getValue()}</p>
            <Link to={`/lisiting/${info.row.original.stay.id}`} className="block mt-1 fw-600 syne text-pri underline">View Stay</Link>
            </div>
          </div>
        ),
        header: (info) => info.column.id,
      }),
    columnHelper.accessor((row) => row.guest.picture, {
      id: "Guest Profile",
      cell: (info) => (
        <div className="flex items-center gap-x-2 min-w-[180px]">
          <ProfileAvatar
            url={info.getValue()}
            name={`${info.row.original.guest.firstName} ${info.row.original.guest.lastName}`}
            font={18}
            size={40}
            type="dark"
          />
          <p>{`${info.row.original.guest.firstName} ${info.row.original.guest.lastName}`}</p>
        </div>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.checkIn, {
      id: "Check In",
      cell: (info) => info.getValue(),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.checkOut, {
        id: "Check Out",
        cell: (info) => info.getValue(),
        header: (info) => info.column.id,
      }),
      columnHelper.accessor((row) => row.adults, {
        id: "Guest Count",
        cell: (info) => <div>
            <p>{info.getValue()} Adults</p>
            <p>{info.row.original.children} Children</p>
        </div>,
        header: (info) => info.column.id,
      }),
    columnHelper.accessor((row) => row.createdDate, {
      id: "Created Date",
      cell: (info) => dayjs(info.getValue()).format("DD-MMM-YYYY"),
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

export default ReservationTableListing;
