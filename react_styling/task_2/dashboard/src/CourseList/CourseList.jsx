import CourseListRow from './CourseListRow';
import WithLogging from '../HOC/WithLogging';

function CourseList({ courses = [] }) {
  return (
    <div className="w-4/5 mx-auto my-8 overflow-x-auto">
      <table id="CourseList" className="w-full">
        <thead>
          <CourseListRow textFirstCell="Available courses" isHeader={true} />
          <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <CourseListRow textFirstCell="No course available yet" isHeader={true} />
          ) : (
            courses.map(({ id, name, credit }) => (
              <CourseListRow key={id} textFirstCell={name} textSecondCell={credit} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default WithLogging(CourseList);
