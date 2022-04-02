import styles from "../styles/Home.module.css";
import Header from "./Header";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Header />
      {/* TO DO ADD NAVBAR*/}
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default PublicLayout;
