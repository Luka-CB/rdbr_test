import { useState } from "react";
import styles from "./DatePicker.module.scss";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateIcon from "../../../svgs/DateIcon";
import { ka } from "date-fns/locale";

registerLocale("ka", ka);

const CustomDatePicker = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [startDate, setStartDate] = useState<Date | null>();

  return (
    <div className={styles.container}>
      <label>დედლაინი</label>
      <DatePicker
        className={styles.date_picker}
        calendarClassName={styles.calendar}
        locale="ka"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="DD/MM/YYYY"
        dateFormat="dd/MM/yyyy"
        showIcon
        icon={
          <div className={styles.icon}>
            {" "}
            <DateIcon />{" "}
          </div>
        }
        minDate={tomorrow}
      />
    </div>
  );
};

export default CustomDatePicker;
