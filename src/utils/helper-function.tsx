export const  isImageUrl = (url: string): boolean => {
    if (!url) return false;
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
    const extension = url.split(".").pop()?.toLowerCase();
    return extension ? imageExtensions.includes(extension) : false;
  }
  
  export const isVideoUrl = (url: string): boolean => {
    if(!url) return false;
    const videoExtensions = [
      "mp4",
      "avi",
      "mov",
      "wmv",
      "flv",
      "mkv",
      "webm",
      "m4v",
    ];
    const extension = url.split(".").pop()?.toLowerCase();
    return extension ? videoExtensions.includes(extension) : false;
  }