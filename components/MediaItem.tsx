"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}
const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data);

  if (!data || !data.id) return null;

  const handClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
    // TODO onclick(data.id)
  };
  return (
    <div
      onClick={handClick}
      className="
            flex
            items-center
            gap-x-3
            cursor-pointer
            hover:bg-neutral-800/50
            w-full
            p-2
            rounded-md
            "
    >
      <div
        className="
                relative
                rounded-md
                min-h-[48px]
                min-w-[48px]
                overflow-hidden
                "
      >
        <Image
          fill
          src={imageUrl || "../public/img/n2-tiger.png"}
          alt="Media Item"
          className="object-cover"
        />
      </div>
      <div
        className="
                flex
                flex-col
                gap-y-1
                overflow-hidden
                "
      >
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">{data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;
