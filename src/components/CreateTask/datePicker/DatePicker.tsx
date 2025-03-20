import styles from "./DatePicker.module.scss";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateIcon from "../../../svgs/DateIcon";
import { ka } from "date-fns/locale";
import useDeadlineStore from "../../../store/deadlineStore";

registerLocale("ka", ka);

const CustomDatePicker = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const { date, setDate, dateError } = useDeadlineStore();

  return (
    <div className={dateError ? styles.deadline_error : styles.deadline}>
      <label>დედლაინი*</label>
      <DatePicker
        className={styles.date_picker}
        calendarClassName={styles.calendar}
        locale="ka"
        selected={date}
        onChange={(date) => setDate(date)}
        placeholderText="DD/MM/YYYY"
        dateFormat="dd/MM/yyyy"
        showIcon
        icon={
          <div className={styles.icon}>
            {" "}
            <DateIcon color={dateError ? "#fa4d4d" : undefined} />{" "}
          </div>
        }
        minDate={tomorrow}
      />
    </div>
  );
};

export default CustomDatePicker;
