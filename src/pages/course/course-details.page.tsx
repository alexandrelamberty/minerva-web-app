import { useEffect } from "react";
import { HiAnnotation, HiPencil, HiTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ActionMenu } from "../../components/action-menu/action-menu";
import AppAlert from "../../components/app-alert/app-alert";
import CourseDateListItem from "../../components/course-date-list-item/course-date-list-item";
import TeacherItem from "../../components/teacher-item/teacher-item";
import {
  deleteCourseAction,
  readCourseAction,
} from "../../store/actions/course.actions";
import { AppDispatch, RootState } from "../../store/store";
import MaterialListItem from "../../components/material-list-item/material-list-item";
import { CourseMaterial } from "../../models/course-material.model";

const courseMaterials = [
  {
    id: "78657685",
    name: "Introduction document",
    file: "introduction_document.pdf",
    type: "document",
  },
  {
    id: "78657665",
    name: "Introduction document",
    file: "introduction_document.pdf",
    type: "document",
  },
];

const CourseDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  // read router variable
  const { courseId } = useParams();

  // The course to display that we have loaded
  const { course } = useSelector((state: RootState) => state.courses);

  /**
   * Dispatch action to load the course we want to display
   */
  useEffect(() => {
    if (courseId) dispatch(readCourseAction(courseId));
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900">
      {/*  */}
      <ActionMenu title="View Course Details">
        <button type="button" className="btn-primary">
          <HiPencil className="mr-2" />
          Edit
        </button>

        <button
          type="button"
          className="btn-danger"
          onClick={() => {
            if (courseId)
              // FIXME: set id to delete and show confirm dialog
              dispatch(deleteCourseAction(courseId));
          }}
        >
          <HiTrash className="mr-2" />
          Delete
        </button>
      </ActionMenu>
      {/*  */}
      <div className="flex flex-col-reverse md:flex-row">
        <dl>
          <dt className="sr-only">name</dt>
          <dd>
            <h2>{course?.name}</h2>
          </dd>
          <dt>Details</dt>
          <dd>{course?.description}</dd>
          {/* Assigne teacher */}
          <dt>Assignee Teacher</dt>
          <dd>
            {course?.teacher ? (
              <TeacherItem teacher={course?.teacher} />
            ) : (
              // FIXME: Move login to item
              <p>No Teacher</p>
            )}
          </dd>
          {/* Dates */}
          <dt>Dates</dt>
          <dd>
            <ul className="max-w-md">
              {course?.dates && course.dates.length > 0 ? (
                course?.dates?.map((courseDate) => (
                  <CourseDateListItem
                    key={courseDate.id}
                    courseDate={courseDate}
                  />
                ))
              ) : (
                // FIXME: Move ternary logic into an list component containing the list item
                <AppAlert
                  title="Info"
                  message="There is no course dates at the moment"
                />
              )}
            </ul>
          </dd>

          {/* Materials */}
          <dt>Links</dt>
          <dd>
            <ul>
              <li>
                <HiAnnotation />
                Web
              </li>
              <li>Github</li>
            </ul>
          </dd>
          <dt>Materials</dt>
          <dd>
            <ul className="space-y-1">
              {courseMaterials.map((material: CourseMaterial) => (
                <MaterialListItem key={material.id} material={material} />
              ))}
            </ul>
          </dd>
          <dt>External Resources</dt>
        </dl>
        {/*  */}
        <dl>
          <dt className="">Cover</dt>
          <dd>
            <h2>
              <img src={course?.cover} />
            </h2>
          </dd>
        </dl>
      </div>
    </section>
  );
};

export default CourseDetailsPage;
