export const getTeacherClasses = async (req, res) => {
  try {
    const classes = [
      { id: "CSE101", subject: "Computer Networks", semester: "5th", studentsCount: 45 },
      { id: "CSE102", subject: "Operating Systems", semester: "5th", studentsCount: 42 },
    ];
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
