import styles from "../styles/Home.module.css";
import Header from "./Header";
import NavBar from "./NavBar";
import Footer from "../Footer";

const PrivateLayout = ({ children }) => {
  return (
    <>
      <Header />
      <NavBar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default PrivateLayout;
