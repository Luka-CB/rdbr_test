import useDepartmentStore, {
  departmentIFace,
} from "../../../store/departmentStore";
import styles from "./Department.module.scss";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const Department = () => {
  const {
    departments,
    getDepartments,
    toggleDepartmentOptions,
    setToggleDepartmentOptions,
    pickedDepartment,
    setPickedDepartment,
  } = useDepartmentStore();

  const handleToggleOptions = () => {
    setToggleDepartmentOptions(!toggleDepartmentOptions);
    if (!departments.length) getDepartments();
  };

  const handlePickDepartment = (value: departmentIFace) => {
    setPickedDepartment(value);
    setToggleDepartmentOptions(false);
  };

  return (
    <div className={styles.container}>
      <label>დეპარტამენტი*</label>
      <div
        className={
          toggleDepartmentOptions
            ? styles.select_input_active
            : styles.select_input
        }
        onClick={handleToggleOptions}
      >
        <span>
          {pickedDepartment ? pickedDepartment?.name : "აირჩიე დეპარტამენტი"}
        </span>
        {toggleDepartmentOptions ? (
          <FaChevronUp className={styles.icon} />
        ) : (
          <FaChevronDown className={styles.icon} />
        )}
      </div>
      {toggleDepartmentOptions ? (
        <div className={styles.options} onClick={(e) => e.stopPropagation()}>
          {departments?.map((department) => (
            <div
              className={styles.option}
              key={department.id}
              onClick={() => handlePickDepartment(department)}
            >
              <span>{department?.name}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Department;
