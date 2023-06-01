import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  deleteTrainingCategoryAction,
  readTrainingCategoryAction,
} from "../../store/actions/training-category.actions";
import { HiPencil, HiTrash } from "react-icons/hi";
import { getUserByIdAction } from "../../store/actions/user.actions";
import { Avatar } from "flowbite-react";

const UserDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Retrieve the id from the url
  const { userId } = useParams();

  //
  const { user, loading, errors } = useSelector(
    (state: RootState) => state.users
  );

  /**
   * Dispatch an action to retrieve the details of a training category
   */
  useEffect(() => {
    if (userId) dispatch(getUserByIdAction(userId));
  }, []);

  return (
    <>
      {/*  */}
      <div className="flex items-center space-x-4">
        <button
          type="button"
          className="btn-primary"
          onClick={() => navigate("./edit")}
        >
          <HiPencil className="mr-2" />
          Edit
        </button>
        <button
          type="button"
          className="btn-danger"
          onClick={() => {
            if (userId)
              // FIXME: set id to delete and show confirm dialog
              dispatch(deleteTrainingCategoryAction(userId));
          }}
        >
          <HiTrash className="mr-2" />
          Delete
        </button>
      </div>
      {/*  */}
      <div className="md:max-w-lg">
        <h2>{user?.name}</h2>
        <dl>
          <dt>Cover</dt>
          <dd>
            <img
              height={420}
              className="object-cover h-48 w-96"
              src={"http://localhost:3000/" + user?.avatar}
            />
          </dd>
          <dt>FirstName</dt>
          <dd>{user?.firstName}</dd>
          <dt>LastName</dt>
          <dd>{user?.lastName}</dd>
          <dt>Email</dt>
          <dd>{user?.email}</dd>
          <dt>Role</dt>
          <dd>{user?.role}</dd>
        </dl>
      </div>
    </>
  );
};

export default UserDetailsPage;
