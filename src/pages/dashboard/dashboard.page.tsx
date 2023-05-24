type WidgetProps = {
  children: JSX.Element | JSX.Element;
  className?: string;
};

const Widget = ({ children, className }: WidgetProps) => {
  return (
    <div
      className={
        "p-2 rounded-md bg-slate-400 " + className !== ""
          ? className
          : "bg-slate-400"
      }
    >
      {children}
    </div>
  );
};

const DashboardPage = () => {
  return (
    <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
      <Widget>
        <h3>Today</h3>
      </Widget>
      <Widget>
        <h3>Training</h3>
      </Widget>
      <Widget className="col-span-2">
        <h3>Courses</h3>
      </Widget>
    </div>
  );
};

export default DashboardPage;
