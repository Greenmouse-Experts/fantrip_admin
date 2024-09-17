
import React, { FC, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { IoImageOutline, IoVideocamOutline } from "react-icons/io5";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import Button from "../../../../../../components/Button";

const MAX_SIZE_MB = 20;

interface Props {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<any>>;
  handlePost: () => void;
  isBusy: boolean;
  photos: File[];
  video: File[];
  setVideo: React.Dispatch<React.SetStateAction<any>>;
}

const DisplayInput: FC<Props> = ({
  setText,
  text,
  setImage,
  video,
  setVideo,
  handlePost,
  isBusy,
  photos,
}) => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const handleRemove = (item: any) => {
    const filtered = photos.filter((where: File) => where.name !== item.name);
    setImage(filtered);
  };
  const handleAddVideo = (e: any) => {
    setImage([]);
    const file = e.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to megabytes
      if (fileSizeMB > MAX_SIZE_MB) {
        toast.info("File size is higher than 20mb");
        alert(`File size exceeds ${MAX_SIZE_MB}MB`);
        e.target.value = ""; // Clear the input
      } else {
        // Handle the file (e.g., upload)
        setVideo([...video, file])
      }
    }
  };

  const handleRemoveVideo = () => {
    setVideo([])
  }

  return (
    <div>
      <div>
        <textarea
          placeholder="write here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 h-24 shadow-sm border-none outline-none"
        />
      </div>
      {!!photos.length && (
        <div className="flex py-2 gap-x-2">
          {photos?.map((item, i) => (
            <div className="relative" key={i}>
              <FcCancel
                className="absolute -top-1 -right-2 bg-white circle cursor-pointer "
                onClick={() => handleRemove(item)}
              />
              <img
                src={URL.createObjectURL(item)}
                alt="room"
                className="lg:w-16 lg:h-12 object-cover"
              />
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex gap-x-3">
            <div className="relative">
              <BsEmojiSmile
                onClick={() => setOpenEmoji(!openEmoji)}
                className="text-[#8C8C8C] cursor-pointer text-[22px] relative top-[1px]"
              />
            </div>
            <div className="relative overflow-hidden">
              <IoImageOutline className="text-[#8C8C8C] cursor-pointer text-2xl" />
              <input
                type="file"
                accept="image/*, .heic"
                className="absolute top-0 left-0 opacity-0"
                onChange={(e: any) => {
                  if (e.target.files) {
                    setImage([...photos, ...e.target.files]);
                  }
                }}
              />
            </div>
            <div className="relative overflow-hidden">
            <IoVideocamOutline className="text-[#8C8C8C] cursor-pointer text-2xl" />
              <input
                type="file"
                accept="video/*"
                className="absolute top-0 left-0 opacity-0"
                onChange={handleAddVideo}
              />
            </div>
            
          </div>
        </div>
        {!!video.length && <div className="relative bg-primary rounded-full px-4 py-1">
          <p className="text-white fs-400 fw-500">{video.length} video added</p>
          <FcCancel
                className="absolute -top-1 -right-2 bg-white circle cursor-pointer "
                onClick={() => handleRemoveVideo()}
              />
        </div>}
        <div>
          <Button
            title={isBusy ? <BeatLoader color="white" /> : "Add Post"}
            onClick={handlePost}
            altClassName="btn-int px-4 py-[8px]"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayInput;
