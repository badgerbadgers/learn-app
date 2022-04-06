import styles from "../styles/Home.module.css";
import Header from "./Header";
import NavBar from "./NavBar";

const PrivateLayout = ({ children }) => {
  return (
    <>
      <Header />
      <NavBar/>
       <main className={styles.main}>{children}</main>
    </>
  );
};

export default PrivateLayout;
