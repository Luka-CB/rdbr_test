import { useEffect, useState } from "react";
import useAddCommentStore from "../../store/comment/addCommentStore";
import styles from "./Comments.module.scss";

interface propsIFace {
  task_id: number;
}

const AddComment: React.FC<propsIFace> = ({ task_id }) => {
  const { addComment, status, reset, setHasCommentAdded } =
    useAddCommentStore();

  const [comment, setComment] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (comment.length > 0) setIsError(false);
    if (status === "success") {
      setComment("");
      setHasCommentAdded(true);
      reset();
    }
  }, [status, comment, reset, setHasCommentAdded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      setComment("");
      setIsError(true);
      return;
    }

    if (task_id !== 0) addComment({ text: comment, parent_id: null }, task_id);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={isError ? styles.error : undefined}
    >
      <textarea
        placeholder="დაწერე კომენტარი"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button type="submit">დააკომენტარე</button>
    </form>
  );
};

export default AddComment;
