import { useParams } from "react-router-dom";
import Comments from "../../components/comments/Comments";
import Status from "../../components/CreateTask/status/Status";
import ClockIcon from "../../svgs/ClockIcon";
import DateIcon from "../../svgs/DateIcon";
import UserIcon from "../../svgs/UserIcon";
import styles from "./Details.module.scss";
import useTaskStore from "../../store/task/taskStore";
import { useEffect } from "react";
import { priorityColor } from "../../utils/misc";
import useStatusStore from "../../store/statusStore";
import { format } from "date-fns";
import { ka } from "date-fns/locale";

const Details = () => {
  const { getTask, task } = useTaskStore();
  const { setPickedStatus, pickedStatusDetails } = useStatusStore();

  const { id } = useParams();

  useEffect(() => {
    if (id) getTask(+id);
  }, [id]);

  useEffect(() => {
    if (task?.status) setPickedStatus(task.status, true);
  }, [task?.status]);

  console.log(pickedStatusDetails);

  const formattedDate = task?.due_date
    ? format(new Date(task.due_date), "EEE - MM/d/yyyy", { locale: ka })
    : "N/A";

  return (
    <main className={styles.container}>
      <div className={styles.task}>
        <div className={styles.pills}>
          <div
            className={styles.priority}
            style={priorityColor(task?.priority.id)}
          >
            <img src={task?.priority.icon} alt="icon" />
            <span>{task?.priority.name}</span>
          </div>
          <div className={styles.department}>
            <span>{task?.department.name}</span>
          </div>
        </div>
        <h1>{task?.name}</h1>
        <p>{task?.description}</p>

        <div className={styles.task_details}>
          <h3>დავალების დეტალები</h3>
          <div className={styles.status}>
            <div className={styles.title}>
              <ClockIcon />
              <span>სტატუსი</span>
            </div>
            <div className={styles.status_dropdown}>
              <Status hasLabel={false} />
            </div>
          </div>
          <div className={styles.employee}>
            <div className={styles.title}>
              <UserIcon />
              <span>თანამშრომელი</span>
            </div>
            <div className={styles.employee_info}>
              <img src={task?.employee.avatar as string} alt="avatar" />
              <div className={styles.employee_name}>
                <span>{task?.employee.department?.name}</span>
                <h4>
                  {task?.employee.name} {task?.employee.surname}
                </h4>
              </div>
            </div>
          </div>
          <div className={styles.date}>
            <div className={styles.title}>
              <DateIcon />
              <span>დავალების ვადა</span>
            </div>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
      <Comments />
    </main>
  );
};

export default Details;
