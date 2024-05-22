import { FC } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { StayItem } from "../../../../contracts/stay";
// import { useRefetch } from "../../../../hooks/useRefetch";
import { DynamicTable } from "../../../../components/DynamicTable";
import ProfileAvatar from "../../../../components/ProfileAvatar";
import { formatNumber } from "../../../../utils/formatHelp";

interface Props {
  data: StayItem[];
}
const StayTableListing: FC<Props> = ({ data }) => {
//   const { revalidateRoute } = useRefetch();
//   const [selected, setSelected] = useState<StayItem>();
//   const [selectedId, setSelectedId] = useState<string>();
//   const [isBusy, setIsBusy] = useState<boolean>(false);
//   const { Dialog: Edit, setShowModal: ShowEdit } = useDialog();
//   const { Dialog: Delete, setShowModal: ShowDelete } = useDialog();

//   const openEdit = (item: PlaceItem) => {
//     setSelected(item);
//     ShowEdit(true);
//   };
  // handle delete
//   const openDelete = (id: string) => {
//     setSelectedId(id);
//     ShowDelete(true);
//   };
//   const handleDelete = async () => {
//     setIsBusy(true);
//     await deletePlace(selectedId || "")
//       .then(() => {
//         toast.success("Place deleted Successfully");
//         setIsBusy(false);
//         ShowDelete(false);
//         revalidateRoute("get-places");
//       })
//       .catch((err) => {
//         toast.error(err.response.data.message);
//         setIsBusy(false);
//         ShowDelete(false);
//       });
//   };

  // table column configuration and formating
  const columnHelper = createColumnHelper<StayItem>();
  const columns = [
    columnHelper.accessor((row) => row.name, {
      id: "Stay Name",
      cell: (info) => <div className="min-w-[230px] flex gap-x-2 items-center">
        {!!info.row.original.photos.length && <img src={info.row.original.photos[0]} alt="condo-img" className="w-[80px] h-[60px] rounded-lg"/>}
        <p className="w-[160px] whitespace-nowrap">{info.getValue()}</p>
      </div>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.description, {
      id: "Description",
      cell: (info) => <p className="whitespace-normal w-[230px]">{info.getValue()}</p>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.address, {
      id: "Location",
      cell: (info) => <p>{info.getValue()}</p>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.host.picture, {
      id: "Host Name",
      cell: (info) => <div className="flex items-center gap-x-2 min-w-[180px]">
      <ProfileAvatar
        url={info.getValue()}
        name={`${info.row.original.host.firstName} ${info.row.original.host.lastName}`}
        font={18}
        size={40}
        type="dark"
      />
      <p>{`${info.row.original.host.firstName} ${info.row.original.host.lastName}`}</p>
    </div>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.createdDate, {
      id: "Created Date",
      cell: (info) => dayjs(info.getValue()).format("DD-MMM-YYYY"),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.isDisclosed, {
      id: "Approval Status",
      cell: (info) => (
        <div>
          {info.getValue() ? (
            <p className="flex gap-x-2 items-center">
              <span className="w-3 h-3 bg-green-600 circle"></span>{" "}
              <span className="text-green-600">Active</span>
            </p>
          ) : (
            <p className="flex gap-x-2 items-center">
              <span className="w-3 h-3 bg-orange-600 circle"></span>{" "}
              <span className="text-orange-600">Inactive</span>
            </p>
          )}
        </div>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.isDisclosed, {
      id: "Host Status",
      cell: (info) => (
        <div>
          {info.getValue() ? (
            <p className="flex gap-x-2 items-center">
              <span className="w-3 h-3 bg-green-600 circle"></span>{" "}
              <span className="text-green-600">Active</span>
            </p>
          ) : (
            <p className="flex gap-x-2 items-center">
              <span className="w-3 h-3 bg-orange-600 circle"></span>{" "}
              <span className="text-orange-600">Inactive</span>
            </p>
          )}
        </div>
      ),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.price, {
      id: "Price",
      cell: (info) => <p>${formatNumber(info.getValue())}</p>,
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.property.name, {
      id: "Property Type",
      cell: (info) => info.getValue(),
      header: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.id, {
      id: "Action",
      cell: () => (
        <Menu placement="bottom-start">
          <MenuHandler>
            <Button className="call-btn text-black dark:text-white text-lg">
              <BsThreeDotsVertical />
            </Button>
          </MenuHandler>
          <MenuList>
            <MenuItem
              className="flex gap-x-2 items-center"
            //   onClick={() => openEdit(info.row.original)}
            >
              <BiEdit className="text-lg" />
              Edit
            </MenuItem>
            <MenuItem
              className="flex gap-x-2 items-center"
            //   onClick={() => openDelete(info.getValue())}
            >
              <RiDeleteBin5Fill className="text-lg" />
              Delete
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
      {/* <Edit title="Edit Property Info" size="lg">
        <EditPlaceModal item={selected} close={() => ShowEdit(false)} />
      </Edit>
      <Delete title="" size="sm">
        <ReusableModal
          title="Are you sure you want to delete this place info"
          action={() => handleDelete()}
          actionTitle="Yes, Delete"
          closeModal={() => ShowDelete(false)}
          cancelTitle="No, Close"
          isBusy={isBusy}
        />
      </Delete> */}
    </div>
  );
};

export default StayTableListing;
