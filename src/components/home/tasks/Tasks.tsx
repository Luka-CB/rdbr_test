import { useEffect } from "react";
import useStatusStore from "../../../store/statusStore";
import Task from "./task/Task";
import styles from "./Tasks.module.scss";
import useTaskStore from "../../../store/task/taskStore";
import useFilterStore from "../../../store/filter/filterStore";
import useCommentStore from "../../../store/comment/commentStore";

const Tasks = () => {
  const { statuses, getStatuses } = useStatusStore();
  const { tasks, getTasks } = useTaskStore();
  const { filters } = useFilterStore();
  const { getComments, commentsByTaskId } = useCommentStore();

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

  useEffect(() => {
    if (!statuses?.length) {
      getStatuses();
    }

    if (statuses?.length) {
      getTasks();
    }
  }, [statuses?.length]);

  useEffect(() => {
    if (tasks?.length) {
      tasks.forEach((task) => {
        getComments(task.id);
      });
    }
  }, [tasks]);

  const filteredTasks = tasks?.filter((task) => {
    const departmentMatch =
      filters.departmentIds.length === 0 ||
      filters.departmentIds.includes(task.department.id);
    const priorityMatch =
      filters.priorityIds.length === 0 ||
      filters.priorityIds.includes(task.priority.id);
    const employeeMatch =
      !filters.employeeId || filters.employeeId === task.employee.id;

    return departmentMatch && priorityMatch && employeeMatch;
  });

  const tasksToDisplay =
    !filters.departmentIds.length &&
    !filters.priorityIds.length &&
    !filters.employeeId
      ? tasks
      : filteredTasks;

  return (
    <div className={styles.container}>
      {!tasksToDisplay?.length &&
      (filters.departmentIds.length ||
        filters.priorityIds.length ||
        filters.employeeId) ? (
        <div className={styles.no_tasks}>
          <span>დავალებები არ მოიძებნა!</span>
        </div>
      ) : null}
      {statuses.map((status) => (
        <div className={styles.tasks_wrapper} key={status.id}>
          <div
            className={styles.status}
            style={{ backgroundColor: statusColor(status.id) }}
          >
            <span>{status.name}</span>
          </div>
          <div className={styles.tasks}>
            {tasksToDisplay?.map((task) => (
              <div className={styles.task_wrapper} key={task.id}>
                {status.id === task.status?.id && (
                  <Task
                    borderColor={statusColor(status.id)}
                    task={task}
                    commentCount={commentsByTaskId[task.id]?.length || 0}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
