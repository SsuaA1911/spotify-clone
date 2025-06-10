import { Song } from "@/types";

import useAuthModal from "./userAuthModal";
import usePlayer from "./usePlayer";
import { useUser } from "./useUser";

const useOnplay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }
    player.setIds(songs.map((song) => song.id));
    player.setId(id);
  };
  return onPlay;
};
export default useOnplay;
