import { create } from "zustand";
import api from "../../utils/axios";

interface subCommentIFace {
  id: number;
  text: string;
  task_id: number;
  parent_id: number;
  author_avatar: string;
  author_nickname: string;
}

interface commentIFace {
  id: number;
  text: string;
  task_id: number;
  parent_id: number | null;
  author_avatar: string;
  author_nickname: string;
  sub_comments: subCommentIFace[];
}

interface CommentStore {
  comments: commentIFace[];
  commentsByTaskId: { [taskId: number]: commentIFace[] };
  status: "idle" | "loading" | "success" | "failed";
  reset: () => void;
  getComments: (task_id: number) => Promise<void>;
}

const useCommentStore = create<CommentStore>((set) => ({
  comments: [],
  commentsByTaskId: {},
  status: "idle",
  reset: () => set({ status: "idle" }),
  getComments: async (task_id: number) => {
    set({ status: "loading" });
    try {
      const { data } = await api.get(`/tasks/${task_id}/comments`);
      if (data) {
        set({ comments: data, status: "success" });
        set((state) => ({
          commentsByTaskId: {
            ...state.commentsByTaskId,
            [task_id]: data,
          },
        }));
      }
    } catch (error) {
      console.error(error);
      set({ status: "failed" });
    }
  },
}));

export default useCommentStore;
