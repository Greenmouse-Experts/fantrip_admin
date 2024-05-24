import { FC } from "react";
import { UserItem } from "../../../../contracts/users";
import { DynamicTable } from "../../../../components/DynamicTable";
import { createColumnHelper } from "@tanstack/react-table";
import ProfileAvatar from "../../../../components/ProfileAvatar";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { MdReadMore } from "react-icons/md";
import SuspendUser from "../../user-action/suspend-user";

interface Props {
  data: UserItem[];
  count: number;
  prev: () => void;
  next: () => void;
}
const GuestTableListing: FC<Props> = ({ data, count, next, prev }) => {
  const columnHelper = createColumnHelper<UserItem>();
  const columns = [
    columnHelper.accessor((row) => row.picture, {
      id: "Guest Name",
      cell: (info) => (
        <div className="flex items-center gap-x-2 min-w-[180px]">
          <ProfileAvatar
            url={info.getValue()}
            name={`${info.row.original.firstName} ${info.row.original.lastName}`}
            font={18}
            size={40}
            type="dark"
          />
          <p>{`${info.row.original.firstName} ${info.row.original.lastName}`}</p>
        </div>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.email, {
      id: "Email",
      cell: (info) => info.getValue(),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.country, {
      id: "Country",
      cell: (info) => info.getValue(),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.isSuspended, {
      id: "Status",
      cell: (info) => (
        <SuspendUser id={info.row.original.id} status={info.getValue()}/>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.createdDate, {
      id: "Date Joined",
      cell: (info) => dayjs(info.getValue()).format("DD-MMM-YYYY"),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.id, {
      id: "Action",
      cell: (info) => (
        <Link
          to={`/users/guest/${info.getValue()}`}
          className="flex items-center gap-x-1"
        >
          View Details <MdReadMore className="text-xl" />
        </Link>
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
          next={next}
          prev={prev}
          page={1}
          count={count}
        />
      </div>
    </div>
  );
};

export default GuestTableListing;
