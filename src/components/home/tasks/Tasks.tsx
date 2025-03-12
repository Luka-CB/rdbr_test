import Task from "./task/Task";
import styles from "./Tasks.module.scss";

const statuses = [
  {
    id: 1,
    name: "დასაწყები",
  },
  {
    id: 2,
    name: "პროგრესში",
  },
  {
    id: 3,
    name: "მზად ტესტირებისთვის",
  },
  {
    id: 4,
    name: "დასრულებული",
  },
];

const Tasks = () => {
  const statusColor = (id: number) => {
    return id === 1
      ? "#f7bc30"
      : id === 2
      ? "#fb5607"
      : id === 3
      ? "#ff006e"
      : id === 4
      ? "#3a86ff"
      : "";
  };

  return (
    <div className={styles.container}>
      {statuses.map((status) => (
        <div className={styles.tasks_wrapper} key={status.id}>
          <div
            className={styles.status}
            style={{ backgroundColor: statusColor(status.id) }}
          >
            <span>{status.name}</span>
          </div>
          <div className={styles.tasks}>
            <Task borderColor={statusColor(status.id)} />
            <Task borderColor={statusColor(status.id)} />
            <Task borderColor={statusColor(status.id)} />
            <Task borderColor={statusColor(status.id)} />
            <Task borderColor={statusColor(status.id)} />
            <Task borderColor={statusColor(status.id)} />
            <Task borderColor={statusColor(status.id)} />
            <Task borderColor={statusColor(status.id)} />
            <Task borderColor={statusColor(status.id)} />
            <Task borderColor={statusColor(status.id)} />
            <Task borderColor={statusColor(status.id)} />
            <Task borderColor={statusColor(status.id)} />
            <Task borderColor={statusColor(status.id)} />
            <Task borderColor={statusColor(status.id)} />
            <Task borderColor={statusColor(status.id)} />
            <Task borderColor={statusColor(status.id)} />
            <Task borderColor={statusColor(status.id)} />
            <Task borderColor={statusColor(status.id)} />
            <Task borderColor={statusColor(status.id)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
