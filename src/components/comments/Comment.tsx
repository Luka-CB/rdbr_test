import styles from "./Comment.module.scss";

interface propsIFace {
  comment: {
    author_avatar: string;
    author_nickname: string;
    text: string;
  };
}

const Comment: React.FC<propsIFace> = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <img src={comment.author_avatar} alt="avatar" />
      <div className={styles.comment_body}>
        <h4>{comment.author_nickname}</h4>
        <p>{comment.text}</p>
      </div>
    </div>
  );
};

export default Comment;
