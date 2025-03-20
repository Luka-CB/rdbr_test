import styles from "./Task.module.scss";
import { TfiComment } from "react-icons/tfi";
import { taskIFace } from "../../../../store/task/taskStore";
import { format } from "date-fns";
import { ka } from "date-fns/locale";
import { priorityColor, substringText } from "../../../../utils/misc";
import { useNavigate } from "react-router-dom";

interface propsIFace {
  borderColor: string;
  task: taskIFace;
}

const Task: React.FC<propsIFace> = ({ borderColor, task }) => {
  const navigate = useNavigate();

  const formattedDate = format(task?.due_date, "dd MMM, yyyy", { locale: ka });

  return (
    <div
      className={styles.task}
      style={{ borderColor, outlineColor: borderColor }}
      onClick={() => navigate(`/details/${task.id}`)}
    >
      <header className={styles.header}>
        <div className={styles.pills}>
          <div
            className={styles.priority}
            style={priorityColor(task.priority?.id)}
          >
            <img src={task.priority?.icon} alt="icon" className={styles.icon} />
            <span>{task.priority?.name}</span>
          </div>
          <div
            className={styles.department}
            title={
              task.department?.name?.length > 15
                ? task.department?.name
                : undefined
            }
          >
            <span>{substringText(task.department?.name, 15)}</span>
          </div>
        </div>
        <small>{formattedDate}</small>
      </header>
      <div className={styles.body}>
        <h5 title={task.name?.length > 30 ? task.name : undefined}>
          {substringText(task.name, 30)}
        </h5>
        <p>{substringText(task.description, 74)}</p>
      </div>
      <footer className={styles.footer}>
        <div className={styles.avatar}>
          <img src={task.employee?.avatar as string} alt="avatar" />
        </div>
        <div className={styles.comments}>
          <TfiComment className={styles.icon} />
          <span>8</span>
        </div>
      </footer>
    </div>
  );
};

export default Task;
