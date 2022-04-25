import styles from "../styles/Home.module.css";

const PublicLayout = ({ children }) => {
  return (
    <>
      <title>Code the Dream Labs Internal Application </title>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default PublicLayout;
