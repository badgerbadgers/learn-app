import styles from "../styles/Home.module.css";

export const PublicLayout = ({ children }) => {
  return <main className={styles.main}>{children}</main>;
};

export const publicLayout = (page) => <PublicLayout>{page}</PublicLayout>;
