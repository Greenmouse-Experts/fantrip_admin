import { FC } from "react";
import { CommunityItemTyping } from ".";
import { GoChevronRight } from "react-icons/go";
import { useChat } from "../../../../../../hooks/useChat";

interface Props {
  item: CommunityItemTyping;
}
const ItemRender: FC<Props> = ({ item }) => {
  const { community, saveCommunity } = useChat();
  return (
    <div
      className={`flex justify-between items-center py-2 ${
        community.activeId === item.id
          ? `bg-[#EDEDFF] dark:bg-[#131313] px-2 rounded-lg`
          : ""
      }`}
      onClick={() =>
        saveCommunity({
          ...community,
          name: item.name,
          activeId: item.id,
        })
      }
    >
      <div className="flex gap-x-2 items-center">
        <img src={item.icon} alt="icon" className="w-5 h-5" />
        <p>{item.name}</p>
      </div>
      <GoChevronRight className="text-[#8C8C8C] fs-500" />
    </div>
  );
};

export default ItemRender;
