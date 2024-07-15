import { FC} from "react";

interface Props {
  id: string;
}
const PlacesReviews: FC<Props> = ({id}) => {
    console.log(id);
    
  return (
    <div>
      <div className="flex justify-between items-center ">
        <p className="fw-600 text-lg lg:text-2xl">Reviews(0)</p>
      </div>
    </div>
  );
};

export default PlacesReviews;
