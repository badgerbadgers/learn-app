import styles from "../styles/Home.module.css";
import Header from "./Header";
import NavBar from "./NavBar";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Header />
      <NavBar/>
       <main className={styles.main}>{children}</main>
    </>
  );
};

export default PublicLayout;
