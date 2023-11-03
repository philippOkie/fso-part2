const Total = ({ parts, prop }) => (
  <div>
    Total of :{" "}
    {parts.reduce((accumulator, object) => {
      return accumulator + object[prop];
    }, 0)}{" "}
    exercises
  </div>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Header = ({ course }) => <h2>{course}</h2>;

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} prop={"exercises"} />
        </div>
      ))}
    </div>
  );
};

export default Course;
