import { useEffect, useState } from "react";
import useAddCommentStore from "../../store/comment/addCommentStore";
import styles from "./Comments.module.scss";

interface propsIFace {
  commentId?: number | null;
  task_id: number;
}

const AddReply: React.FC<propsIFace> = ({ task_id, commentId }) => {
  const { addComment, status, reset, setHasCommentAdded } =
    useAddCommentStore();

  const [reply, setReply] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (reply.length > 0) setIsError(false);

    if (status === "success") {
      setReply("");
      setHasCommentAdded(true);
      reset();
    }
  }, [status, reply, reset, setHasCommentAdded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!reply.trim()) {
      setReply("");
      setIsError(true);
      return;
    }

    if (task_id !== 0 && commentId)
      addComment({ text: reply, parent_id: commentId as number }, task_id);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={isError ? styles.error : undefined}
    >
      <textarea
        placeholder="დაწერე კომენტარი"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      ></textarea>
      <button type="submit">დააკომენტარე</button>
    </form>
  );
};

export default AddReply;
