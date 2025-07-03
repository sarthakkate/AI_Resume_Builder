import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllResumeData } from "@/Services/resumeAPI";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";

function Dashboard() {
  const user = useSelector((state) => state.editUser.userData);
  const [resumeList, setResumeList] = React.useState([]);

  const fetchAllResumeData = async () => {
    try {
      const resumes = await getAllResumeData();
      console.log(
        `Printing from DashBoard List of Resumes got from Backend`,
        resumes.data
      );
      setResumeList(resumes.data);
    } catch (error) {
      console.log("Error from dashboard", error.message);
    }
  };

  useEffect(() => {
    fetchAllResumeData();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-10 md:px-20 lg:px-32">
      <h2 className="font-black text-3xl md:text-4xl text-white mb-2 tracking-tight">
        My Resume
      </h2>
      <p className="py-3 text-gray-300 text-lg mb-6">
        Start creating your{" "}
        <span className="font-semibold text-blue-400">AI resume</span> for your
        next job role.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 mt-5 gap-6">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCard
              key={resume._id}
              resume={resume}
              refreshData={fetchAllResumeData}
            />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
