" use client";

import { Song } from "@/types";
import useSound from "use-sound";
import usePlayer from "@/hooks/usePlayer";
import { useEffect,   useState } from "react";

import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiMiniSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

import Slider from "./Slider";
import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";

interface playerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<playerContentProps> = ({
  song,
  songUrl
}) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiMiniSpeakerWave;
  
  const onPlayNext = () => {
    if(player.ids.length === 0){
      return;
    }
    const currentIndex = player.ids.findIndex((id)=> id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if(!nextSong){
      return player.setId(player.ids[0]);
    }
    player.setId(nextSong)
  }
  const onPlayPrevious = () => {
    if(player.ids.length === 0){
      return;
    }
    const currentIndex = player.ids.findIndex((id)=> id === player.activeId);
    const PreviousSong = player.ids[currentIndex - 1];

    if(!PreviousSong){
      return player.setId(player.ids[player.ids.length -1]);
    }
    player.setId(PreviousSong)
  }


  const [play,{pause,sound}] = useSound( songUrl,
    {
      volume: volume,
      onPlay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onend: () => {
      setIsPlaying (false);
      onPlayNext(); 
      },
     
      format: ['mp3']
   
    }
);

  useEffect (()=>{
    sound?.play(setIsPlaying(true));

    return () => {
      sound?.unload();
    }
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      console.log("play sound for", play);
      play();
      setIsPlaying(true)

     } else{
        pause();
        // setIsPlaying(false)
      }   
  };

  
  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    }else{
      setVolume(0);
    }
  }
  return (
    <div className=" grid grid-cols-2 md:grid-cols-3 h-full">
      <div
        className="
        flex
        w-full
        justify-start
        "
      >
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div
        className="
        flex
        md:hidden
        col-auto
        w-full
        justify-end
        items-center
        "
      >
        <div
          onClick={handlePlay}
          className="
            h-10
            w-10
            flex
            items-center
            justify-center
            rounded-full
            bg-white
            p-1
            cursor-pointer
            "
        >
          <Icon size={30} className=" text-black" />
        </div>
      </div>
      <div
        className="
        hidden
        h-full
        md:flex
        justify-center
        items-center
        w-full
        max-w-[722px]
        gap-x-6
        "
      >
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="
            text-neutral-400
            cursor-pointer
            hover:text-white
            transition
            "
        />
        <div
          onClick={handlePlay}
          className="
            flex
            items-center
            justify-center
            h-10
            w-10
            rounded-full
            bg-white
            p-1
            cursor-pointer

            "
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="
            text-neutral-400
            cursor-pointer
            hover:text-white
            transition
            "
        />
      </div>
      <div className="hidden md:flex w-full justift-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon onClick={toggleMute} className=" cursor-pointer" size={34} />
          <Slider 
          value={volume}
          onChange={(value)=> setVolume (value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
