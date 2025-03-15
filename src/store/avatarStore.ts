import { create } from "zustand";

interface AvatarStore {
  avatar: string | null;
  setAvatar: (url: string | null) => void;
  avatarError: string | null;
  setAvatarError: (msg: string) => void;
}

const useAvatarStore = create<AvatarStore>((set) => ({
  avatar: null,
  avatarError: null,
  setAvatar: (url: string | null) => set({ avatar: url, avatarError: null }),
  setAvatarError: (msg: string) => set({ avatarError: msg }),
}));

export default useAvatarStore;
