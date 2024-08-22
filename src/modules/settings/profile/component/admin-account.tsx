import { AiOutlineEdit } from "react-icons/ai";
import useAuth from "../../../../hooks/authUser";
import useDialog from "../../../../hooks/useDialog";
import UpdateProfileForm from "./profile-form/update-profile-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { updateProfile } from "../../../../services/api/authApi";
import { uploadImage } from "../../../../services/api/routine";
import { toast } from "react-toastify";
import { GoPencil } from "react-icons/go";

const AdminAccount = () => {
  const { Dialog: ProfileInfo, setShowModal: ShowProfile } = useDialog();
  const { firstName, lastName, user, saveUser } = useAuth();
  const [isUpdate, setIsUpdate] = useState(false);
  const Update = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["update"],
  });

  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      const payload = {
        picture: data.image,
      };
      Update.mutate(payload, {
        onSuccess: () => {
          saveUser({
            ...user,
            image: data.image,
          });
          toast.success("Profile Photo Updated Successfully");
          setIsUpdate(false);
        },
        onError: (error: any) => {
          toast.success(error.response.data.message);
          setIsUpdate(false);
        },
      });
    },
    onError: (error: any) => {
      toast.success(error.response.data.message);
      setIsUpdate(false);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }
    const files = e.target.files[0];
    const fd = new FormData();
    fd.append("image", files);
    mutation.mutate(fd);
  };

  return (
    <div>
      <div>
        <p className="fw-600 lg:text-lg">My Profile</p>
        <div className="border border-[#E8EAED] rounded-[16px] mt-6">
          <div className="flex items-center gap-x-4 p-4">
            <div className="relative w-[70px]">
              <img
                src={
                  user.image
                    ? user.image
                    : "https://res.cloudinary.com/greenmouse-tech/image/upload/v1712921717/fantrip/Ellipse_56_frahhh.png"
                }
                alt="profile"
                className="w-[70px] h-[70px] circle object-cover"
              />
              <div className="absolute overflow-hidden bg-white top-0 -right-2 cursor-pointer w-6 h-6 circle place-center circle-shadow p-1">
                {!isUpdate && <GoPencil className="text-sm text-black" />}
                <input
                  type="file"
                  accept="image/*, .heic"
                  onChange={handleChange}
                  className="opacity-0 absolute object-cover"
                />
              </div>
            </div>
            <div>
              <p className="fw-600">{user.name}</p>
              <p className="mt-1 fs-500">Admin</p>
            </div>
          </div>
        </div>
        <div className="border border-[#E8EAED] rounded-[16px] mt-6 p-4">
          <div className="flex justify-between items-center">
            <p className="fw-600 lg:text-lg">Personal Information</p>
            <div
              className="flex gap-x-2 items-center border border-gray-400 px-2 rounded-[14px] text-gray-400 cursor-pointer"
              onClick={() => ShowProfile(true)}
            >
              <p>Edit</p>
              <AiOutlineEdit />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-5 items-center mt-7 pb-2">
            <div>
              <p className="fs-500 text-[#5F5F5F]">First Name</p>
              <p className="fw-500 mt-1">{firstName}</p>
            </div>
            <div>
              <p className="fs-500 text-[#5F5F5F]">Last Name</p>
              <p className="fw-500 mt-1">{lastName}</p>
            </div>
            <div>
              <p className="fs-500 text-[#5F5F5F]">Email</p>
              <p className="fw-500 mt-1">{user.email}</p>
            </div>
            <div>
              <p className="fs-500 text-[#5F5F5F]">Phone</p>
              <p className="fw-500 mt-1">{user.phone}</p>
            </div>
            <div className="col-span-2">
              <p className="fs-500 text-[#5F5F5F]">Bio</p>
              <p className="fw-500 mt-1">{user.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <ProfileInfo title="Update Profile Information" size="xl">
        <UpdateProfileForm close={() => ShowProfile(false)} />
      </ProfileInfo>
    </div>
  );
};

export default AdminAccount;
