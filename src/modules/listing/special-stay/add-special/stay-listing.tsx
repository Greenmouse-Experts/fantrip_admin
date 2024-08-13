import { FC } from "react";
import { StayItem } from "../../../../contracts/stay";

interface Props {
  data: StayItem[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}
const StayListing: FC<Props> = ({ data, selected, setSelected }) => {
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      if (!selected.includes(value)) {
        setSelected([...selected, value]);
      }
    } else {
      const filtered = selected.filter((where) => where !== value);
      setSelected(filtered);
    }
  };
  return (
    <div className="grid gap-4 mt-3">
      {data.map((item) => (
        <div className="flex items-center gap-x-2" key={item.id}>
          <div className="w-6 shrink-0">
            <input
              type="checkbox"
              className="w-5 h-5"
              value={item.id}
              checked={selected.includes(item.id)}
              onChange={(e) => handleCheck(e)}
            />
          </div>
          <div className="min-w-[230px] flex gap-x-2 items-center">
            {!!item.photos.length && (
              <img
                src={item.photos[0]}
                alt="condo-img"
                className="w-[50px] h-[30px] rounded-lg"
              />
            )}
            <p className="w-[160px] whitespace-nowrap">{item.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StayListing;
