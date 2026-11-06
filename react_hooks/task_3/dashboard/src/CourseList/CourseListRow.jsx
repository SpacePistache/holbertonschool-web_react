function CourseListRow({ isHeader = false, textFirstCell = '', textSecondCell = null }) {
  if (isHeader) {
    return (
      <tr className="bg-table-header/45">
        {textSecondCell === null ? (
          <th colSpan="2" className="border border-gray-400">{textFirstCell}</th>
        ) : (
          <>
            <th className="border border-gray-400">{textFirstCell}</th>
            <th className="border border-gray-400">{textSecondCell}</th>
          </>
        )}
      </tr>
    );
  }

  return (
    <tr className="bg-table-rows/45">
      <td className="border border-gray-400 pl-2">{textFirstCell}</td>
      <td className="border border-gray-400 pl-2">{textSecondCell}</td>
    </tr>
  );
}

export default CourseListRow;
