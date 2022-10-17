export const PublicLayout = ({ children }) => {
  return <main className="main">{children}</main>;
};

export const publicLayout = (page) => <PublicLayout>{page}</PublicLayout>;

