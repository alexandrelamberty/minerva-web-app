import { Alert } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationHideAction } from "../../store/actions/notification.actions";
import { RootState } from "../../store/store";

/**
 * Application Notification Alert
 *
 * @param param0
 * @returns
 */
const AppNotification = () => {
  const dispatch = useDispatch();

  const { type, title, message, time, show, errors } = useSelector(
    (state: RootState) => state.notification
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(notificationHideAction());
    }, time);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <>
      <Alert
        color={type}
        className={`${
          show ? "" : "hidden"
        }  absolute top-3 left-1/2 transform -translate-x-1/2 `}
      >
        <span>
          <span className="font-medium mr-2">
            {title} - {type}
          </span>
          {message}
        </span>
      </Alert>
    </>
  );
};

export default AppNotification;
