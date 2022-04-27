import styles from "../styles/Home.module.css";

const PublicLayout = ({ children }) => {
  return (
    <>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default PublicLayout;
