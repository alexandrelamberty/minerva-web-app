import { Progress } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TeacherItem from "../../components/teacher-item/teacher-item";
import { notificationShowAction } from "../../store/actions/notification.actions";
import { AppDispatch } from "../../store/store";

type WidgetProps = {
  children: JSX.Element | JSX.Element[];
  className?: string;
};

const Widget = ({ children, className }: WidgetProps) => {
  return (
    <div className=" p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
      {children}
    </div>
  );
};

const TodayCourse = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(
      notificationShowAction({
        type: "info",
        title: "Welcome to Minerva",
        message: "Minerva is Training Management System",
        time: 3000,
      })
    );
  }, []);
  return (
    <Widget>
      {/* Widget title */}
      <div className="flex items-center justify-between">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Today
        </h5>
        <h2>{new Date().toLocaleDateString()}</h2>
      </div>
      {/* Widget description */}
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Course for today schedule.
      </p>
      {/* Widget component Teacher */}
      <a
        href="#"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Read more
        <svg
          aria-hidden="true"
          className="w-4 h-4 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
      {/* Location */}
    </Widget>
  );
};

const DashboardPage = () => {
  // State user trainings ...
  return (
    <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
      {/* 
        Today
      */}
      <TodayCourse />
      {/* 
        Training
      */}
      <Widget>
        <div className="flex items-center justify-between">
          <h2>Training</h2>
          <h3>training_code</h3>
        </div>
        <h2>Full Stack Web Development</h2>
        <Progress progress={35} className="mb-2" />
        <p></p>
        <TeacherItem teacher={undefined} />
      </Widget>
      {/* 
        Tomorrow
      */}
      <Widget>
        <div className="flex items-center justify-between">
          <h2>Schedule</h2>
          <h2>{new Date().toLocaleDateString()}</h2>
        </div>
        <h2>Node.js</h2>
      </Widget>
      <Widget className="col-span-2">
        <h3>Materials</h3>
      </Widget>
    </div>
  );
};

export default DashboardPage;
