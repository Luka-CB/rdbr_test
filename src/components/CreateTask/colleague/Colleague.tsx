import { useEffect, useState } from "react";
import useColleagueStore, {
  colleagueIFace,
} from "../../../store/colleagueStore";
import useDepartmentStore from "../../../store/departmentStore";
import useModalStore from "../../../store/modalStore";
import styles from "./Colleague.module.scss";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";

const Colleague = () => {
  const [departmentEmployees, setDepartmentEmployees] = useState<
    colleagueIFace[]
  >([]);

  const { setToggleModal } = useModalStore();
  const { pickedDepartment } = useDepartmentStore();
  const {
    colleagues,
    getEmployees,
    toggleColleagueOptions,
    setToggleColleagueOptions,
  } = useColleagueStore();

  const handleToggleOptions = () => {
    setToggleColleagueOptions(!toggleColleagueOptions);
    if (!colleagues?.length) getEmployees();
  };

  const handleToggleModal = () => {
    setToggleModal(true);
    setToggleColleagueOptions(false);
  };

  useEffect(() => {
    if (colleagues?.length && pickedDepartment) {
      const filteredEmployees = colleagues.filter(
        (colleague) => colleague.department?.id === pickedDepartment.id
      );
      setDepartmentEmployees(filteredEmployees);
    }
  }, [colleagues.length, pickedDepartment]);

  return (
    <div className={styles.container}>
      <label className={!pickedDepartment ? styles.disabled_label : undefined}>
        პასუხისმგებელი თანამშრომელი*
      </label>
      <div
        className={
          !pickedDepartment
            ? styles.select_input_disabled
            : toggleColleagueOptions
            ? styles.select_input_active
            : styles.select_input
        }
        onClick={handleToggleOptions}
      >
        <span>{pickedDepartment ? "აირჩიე თანამშრომელი" : ""}</span>
        {toggleColleagueOptions ? (
          <FaChevronUp className={styles.icon} />
        ) : (
          <FaChevronDown className={styles.icon} />
        )}
      </div>
      {toggleColleagueOptions ? (
        <div className={styles.options} onClick={(e) => e.stopPropagation()}>
          <div className={styles.add_colleague} onClick={handleToggleModal}>
            <IoAddCircleOutline className={styles.icon} />
            <span>დაამატე თანამშრომელი</span>
          </div>
          <div className={styles.options_wrapper}>
            {departmentEmployees?.map((depEmp) => (
              <div className={styles.option} key={depEmp.id}>
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

export default Colleague;
