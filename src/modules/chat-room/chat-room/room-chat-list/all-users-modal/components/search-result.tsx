import { FC } from "react";
import { UserItem } from "../../../../../../contracts/users";
import ProfileAvatar from "../../../../../../components/ProfileAvatar";

interface Props {
  data: UserItem[];
  openChat: (value: UserItem) => void
}
const SearchResults: FC<Props> = ({ data, openChat }) => {
  return (
    <div className="grid gap-1">
      {data &&
        data.slice(0, 7).map((item) => (
          <div
            className="flex items-center gap-x-2 min-w-[180px] p-2 cursor-pointer rounded-lg hover:bg-[#EDEDFF] hover:dark:bg-[#131313]"
            key={item.id}
            onClick={() => openChat(item)}
          >
            <ProfileAvatar
              url={item.picture}
              name={`${item.firstName} ${item.lastName}`}
              font={18}
              size={40}
              type="dark"
            />
            <p>{`${item.firstName} ${item.lastName}`}</p>
          </div>
        ))}
    </div>
  );
};

export default SearchResults;
