import React, { useState } from "react";
import { Sparkles, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { AIChatSession } from "@/Services/AiModel";
import { updateThisResume } from "@/Services/resumeAPI";

const SUMMARY_PROMPT =
  "Job Title: {jobTitle}, Depends on job title give me list of summary for 3 experience levels: Senior Level, Mid Level and Fresher level in 3-4 lines in array format, with summary and experience_level field in JSON format";

function Summary({ resumeInfo, enabledNext, enabledPrev }) {
  const dispatch = useDispatch();
  const { resume_id } = useParams();
  
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(resumeInfo?.summary || "");
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState(null);

  const handleInputChange = (e) => {
    enabledNext(false);
    enabledPrev(false);
    
    dispatch(
      addResumeData({
        ...resumeInfo,
        [e.target.name]: e.target.value,
      })
    );
    
    setSummary(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log("Started saving summary");
    
    const data = {
      data: { summary },
    };

    if (resume_id) {
      try {
        await updateThisResume(resume_id, data);
        toast("Resume updated successfully", { type: "success" });
      } catch (error) {
        console.error("Error updating resume:", error);
        toast(`Error updating resume: ${error.message}`, { type: "error" });
      } finally {
        enabledNext(true);
        enabledPrev(true);
        setLoading(false);
      }
    }
  };

  const handleSetSummary = (summaryText) => {
    dispatch(
      addResumeData({
        ...resumeInfo,
        summary: summaryText,
      })
    );
    setSummary(summaryText);
  };

  const generateSummaryFromAI = async () => {
    setLoading(true);
    
    console.log("Generating summary from AI for:", resumeInfo?.jobTitle);
    
    if (!resumeInfo?.jobTitle) {
      toast("Please add job title first", { type: "error" });
      setLoading(false);
      return;
    }

    const prompt = SUMMARY_PROMPT.replace("{jobTitle}", resumeInfo.jobTitle);
    
    try {
      const result = await AIChatSession.sendMessage(prompt);
      const parsedResult = JSON.parse(result.response.text());
      const summaries = Array.isArray(parsedResult)
        ? parsedResult
        : parsedResult?.experience_levels || [];
      setAiGeneratedSummaryList(summaries);
      
      console.log("AI generated summaries:", parsedResult);
      toast("Summary generated successfully", { type: "success" });
    } catch (error) {
      console.error("Error generating AI summary:", error);
      toast(`Error generating summary: ${error.message}`, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (item) => {
    enabledNext(false);
    enabledPrev(false);
    handleSetSummary(item?.summary);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add summary for your job title</p>

        <form className="mt-7" onSubmit={handleSave}>
          <div className="flex justify-between items-end">
            <label htmlFor="summary">Add Summary</label>
            <Button
              variant="outline"
              onClick={generateSummaryFromAI}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
              disabled={loading}
            >
              <Sparkles className="h-4 w-4" /> 
              Generate from AI
            </Button>
          </div>
          
          <Textarea
            id="summary"
            name="summary"
            className="mt-5"
            required
            value={summary}
            onChange={handleInputChange}
            placeholder="Enter your professional summary..."
          />
          
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </div>

      {Array.isArray(aiGeneratedSummaryList) && aiGeneratedSummaryList.length > 0 && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(item)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:shadow-xl transition-shadow duration-200 border border-gray-200 hover:border-primary"
            >
              <h3 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h3>
              <p className="text-gray-700">{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;