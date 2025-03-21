import { useEffect, useState } from "react";
import useColleagueStore, { employeeIFace } from "../../../store/employeeStore";
import useDepartmentStore from "../../../store/departmentStore";
import useModalStore from "../../../store/modalStore";
import styles from "./Employee.module.scss";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";

const Employee = () => {
  const [departmentEmployees, setDepartmentEmployees] = useState<
    employeeIFace[]
  >([]);

  const { setToggleModal } = useModalStore();
  const { pickedDepartment } = useDepartmentStore();
  const {
    employees,
    getEmployees,
    toggleEmployeeOptions,
    setToggleEmployeeOptions,
    employeeError,
    setPickedEmployee,
    pickedEmployee,
  } = useColleagueStore();

  const handleToggleOptions = () => {
    setToggleEmployeeOptions(!toggleEmployeeOptions);
    if (!employees?.length) getEmployees();
  };

  const handleToggleModal = () => {
    setToggleModal(true);
    setToggleEmployeeOptions(false);
  };

  const handlePickEmployee = (employee: employeeIFace) => {
    setPickedEmployee(employee);
    setToggleEmployeeOptions(false);
  };

  useEffect(() => {
    if (employees?.length && pickedDepartment) {
      const filteredEmployees = employees.filter(
        (employee) => employee.department?.id === pickedDepartment.id
      );
      setDepartmentEmployees(filteredEmployees);
    }
  }, [employees, pickedDepartment]);

  return (
    <div className={employeeError ? styles.emp_error : styles.employee}>
      <label className={!pickedDepartment ? styles.disabled_label : undefined}>
        პასუხისმგებელი თანამშრომელი*
      </label>
      <div
        className={
          !pickedDepartment
            ? styles.select_input_disabled
            : toggleEmployeeOptions
            ? styles.select_input_active
            : styles.select_input
        }
        onClick={handleToggleOptions}
      >
        {pickedEmployee ? (
          <div className={styles.picked_employee}>
            <img src={pickedEmployee?.avatar as string} alt="avatar" />
            <span className={styles.name}>
              {pickedEmployee?.name} {pickedEmployee?.surname}
            </span>
          </div>
        ) : (
          <span className={styles.placeholder}>
            {pickedDepartment ? "აირჩიე თანამშრომელი" : ""}
          </span>
        )}
        {toggleEmployeeOptions ? (
          <FaChevronUp className={styles.icon} />
        ) : (
          <FaChevronDown className={styles.icon} />
        )}
      </div>
      {toggleEmployeeOptions ? (
        <div className={styles.options} onClick={(e) => e.stopPropagation()}>
          <div className={styles.add_colleague} onClick={handleToggleModal}>
            <IoAddCircleOutline className={styles.icon} />
            <span>დაამატე თანამშრომელი</span>
          </div>
          <div className={styles.options_wrapper}>
            {departmentEmployees?.map((depEmp) => (
              <div
                className={styles.option}
                key={depEmp.id}
                onClick={() => handlePickEmployee(depEmp)}
              >
                <div className={styles.avatar}>
                  <img src={depEmp.avatar as string} alt="avatar" />
                </div>
                <span>
                  {depEmp.name} {depEmp.surname}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Employee;
