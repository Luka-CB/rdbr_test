import useAvatarStore from "../../store/avatarStore";
import PictureIcon from "../../svgs/PictureIcon";
import styles from "./Avatar.module.scss";
import { PiTrash } from "react-icons/pi";

const Avatar = () => {
  const { avatar, avatarError, setAvatar, setAvatarError } = useAvatarStore();

  const handleChooseFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (file.size > 600000) {
        return setAvatarError("სურათი არ უნდა აღემატებოდეს 600kb-ს ზომაში!");
      }
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.avatar}>
      <label className={avatarError ? styles.label_error : undefined}>
        ავატარი*
      </label>
      <div className={avatarError ? styles.file_error : styles.file}>
        <input
          type="file"
          name="file"
          id="file"
          hidden
          accept="image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            e.target.files !== null && handleChooseFile(e.target.files[0])
          }
        />
        {avatar ? (
          <div className={styles.image}>
            <img src={avatar} alt="avatar" className={styles.img} />
            <div className={styles.icon} onClick={() => setAvatar(null)}>
              <PiTrash />
            </div>
          </div>
        ) : (
          <label htmlFor="file">
            <PictureIcon color={avatarError ? "#fa4d4d" : "#343A40"} />
            <span>ატვირთე ფოტო</span>
            {avatarError ? <p>{avatarError}</p> : null}
          </label>
        )}
      </div>
    </div>
  );
};

export default Avatar;
