import GuestContent from "./component/guest-content";
import ProfileSidebar from "./component/profile-sidebar";

const GuestDetailIndex = () => {
  return (
    <div className="lg:flex items-start gap-5 pt-5">
      <div className="w-[37%] bg-[#FFEDF2] dark:bg-[#131313] p-5 min-h-[80vh] rounded-lg shadow-lg">
        <ProfileSidebar />
      </div>
      <div className="w-[63%] min-h-[80vh] bg-[#FFEDF2] col-span-2 dark:bg-[#131313] p-5 rounded shadow-sm">
        <GuestContent />
      </div>
    </div>
  );
};

export default GuestDetailIndex;
