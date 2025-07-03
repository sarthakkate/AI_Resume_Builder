import React, { useEffect } from "react";
import ResumeForm from "../components/ResumeForm";
import PreviewPage from "../components/PreviewPage";
import { useParams } from "react-router-dom";
import { getResumeData } from "@/Services/resumeAPI";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";

export function EditResume() {
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getResumeData(resume_id).then((data) => {
      dispatch(addResumeData(data.data));
    });
  }, [resume_id]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 md:p-10 text-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-6 md:p-8 text-gray-100">
          <ResumeForm />
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-6 md:p-8 text-gray-100">
          <PreviewPage />
        </div>
      </div>
    </div>
  );
}

export default EditResume;
