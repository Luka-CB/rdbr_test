import { useEffect, useState } from "react";
import useCommentStore from "../../store/comment/commentStore";
import styles from "./Comments.module.scss";
import AddComment from "./AddComment";
import useAddCommentStore from "../../store/comment/addCommentStore";
import Comment from "./comment";
import ReplyIcon from "../../svgs/ReplyIcon";
import AddReply from "./AddReply";

interface propsIFace {
  task_id: number;
}

const Comments: React.FC<propsIFace> = ({ task_id }) => {
  const { comments, getComments, reset, status } = useCommentStore();
  const { hasCommentAdded, setHasCommentAdded } = useAddCommentStore();

  const [clickedCommentIds, setClickedCommentIds] = useState<number[]>([]);

  useEffect(() => {
    if (status === "success") {
      setHasCommentAdded(false);
      reset();
    }
  }, [status, setHasCommentAdded, reset]);

  useEffect(() => {
    if (task_id !== 0 || (task_id !== 0 && hasCommentAdded))
      getComments(task_id);
  }, [task_id, hasCommentAdded, getComments]);

  const handleToggleReplies = (commentId: number) => {
    if (clickedCommentIds.includes(commentId)) {
      setClickedCommentIds((prev) => prev.filter((id) => id !== commentId));
    } else {
      setClickedCommentIds((prev) => [...prev, commentId]);
    }
  };

  return (
    <div className={styles.comments_wrapper}>
      <AddComment task_id={task_id} />
      <div className={styles.title}>
        <h3>კომენტარები</h3>
        <div className={styles.count}>
          <span>{comments?.length}</span>
        </div>
      </div>
      <div className={styles.comments}>
        {comments.map((comment) => (
          <div className={styles.comment_wrapper} key={comment.id}>
            <Comment
              comment={{
                author_avatar: comment.author_avatar,
                author_nickname: comment.author_nickname,
                text: comment.text,
              }}
            />
            <div className={styles.replies_wrapper}>
              <div
                className={styles.toggle_replies_btn}
                onClick={() => handleToggleReplies(comment.id)}
              >
                <ReplyIcon />
                <small>უპასუხე</small>
                <div className={styles.count}>
                  <span>{comment?.sub_comments.length}</span>
                </div>
              </div>
              {clickedCommentIds.includes(comment.id) ? (
                <div className={styles.replies}>
                  <AddReply task_id={task_id} commentId={comment.id} />
                  {comment.sub_comments
                    .sort((a, b) => b.id - a.id)
                    .map((subComment) => (
                      <div className={styles.reply_wrapper} key={subComment.id}>
                        <Comment
                          comment={{
                            author_avatar: subComment.author_avatar,
                            author_nickname: subComment.author_nickname,
                            text: subComment.text,
                          }}
                        />
                      </div>
                    ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
