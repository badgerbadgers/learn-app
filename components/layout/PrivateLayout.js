import NavBar from "./NavBar";
import Footer from "./Footer";

export const PrivateLayout = ({ children }) => (
  <>
    <NavBar />
    <main className="main">{children}</main>
    <Footer />
  </>
);

export const privateLayout = (page) => <PrivateLayout>{page}</PrivateLayout>;

