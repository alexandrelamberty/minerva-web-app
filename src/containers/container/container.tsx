const Container = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  return (
    <section className="relative bg-white dark:bg-gray-800 ">
      {children}
    </section>
  );
};
export default Container;
