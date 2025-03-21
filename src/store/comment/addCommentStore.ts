import { create } from "zustand";
import api from "../../utils/axios";

interface commentIFace {
  text: string;
  parent_id: number | null;
}

interface AddCommentStore {
  hasCommentAdded: boolean;
  status: "idle" | "loading" | "success" | "failed";
  setHasCommentAdded: (value: boolean) => void;
  addComment: (comment: commentIFace, task_id: number) => Promise<void>;
  reset: () => void;
}

const useAddCommentStore = create<AddCommentStore>((set) => ({
  hasCommentAdded: false,
  status: "idle",
  setHasCommentAdded: (value: boolean) => set({ hasCommentAdded: value }),
  addComment: async (comment: commentIFace, task_id: number) => {
    set({ status: "loading" });
    try {
      const { data } = await api.post(`/tasks/${task_id}/comments`, comment);
      if (data) {
        set({ status: "success" });
      }
    } catch (error) {
      console.error(error);
      set({ status: "failed" });
    }
  },
  reset: () => set({ status: "idle" }),
}));

export default useAddCommentStore;
