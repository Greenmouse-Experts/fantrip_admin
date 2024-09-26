import { Country } from "country-state-city";

export const isImageUrl = (url: string): boolean => {
  if (!url) return false;
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"];
  const extension = url.split(".").pop()?.toLowerCase();
  return extension ? imageExtensions.includes(extension) : false;
};

export const isVideoUrl = (url: string): boolean => {
  if (!url) return false;
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
};

export const extractNumbers = (text: string): string[] => {
  // Use a regular expression to match one or more digits
  const matches = text.match(/\d+/g);
  // Return the matches, or an empty array if no matches found
  return matches ? matches : [];
};

export const checkIfIsoAndFormat = (country: string): string => {
  if (!country) return "";
  const length = country.length;
  const formatted =
    length > 2 ? country : Country.getCountryByCode(country)?.name;
  return `${formatted}`;
};

export const formatText = (text: string) => {
  // Split the text by brackets
  const parts = text.split(/(\[.*?\])/);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("[") && part.endsWith("]")) {
          const content = part.slice(1, -1);
          return (
            <span key={index} style={{ fontWeight: "bold", color: "#9847fe" }}>
              {content}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};
