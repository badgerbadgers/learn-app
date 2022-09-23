import styles from "./Footer.module.css";

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div style={{ maxWidth: "2000px", margin: "auto" }}>
        COPYRIGHT © {year} CODE THE DREAM · ALL RIGHTS RESERVED · BUILT WITH
        THOUGHT BY CODE THE DREAM LABS
      </div>
    </footer>
  );
};
export default Footer;

