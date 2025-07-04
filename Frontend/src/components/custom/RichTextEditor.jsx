import React, { useEffect, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "@/Services/AiModel";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Sparkles, LoaderCircle } from "lucide-react";

const PROMPT = `Create a JSON object with the following fields:
    "position_Title": A string representing the job title.
    "experience": An array of strings, each representing a bullet point describing relevant experience for the given job title in html format.
For the Job Title "{positionTitle}", create a JSON object with the following fields:
The experience array should contain 5-7 bullet points. Each bullet point should be a concise description of a relevant skill, responsibility, or achievement.`;
function RichTextEditor({ onRichTextEditorChange, index, resumeInfo }) {
  const [value, setValue] = useState(
    resumeInfo?.experience[index]?.workSummary || ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onRichTextEditorChange(value);
  }, [value]);

  const GenerateSummaryFromAI = async () => {
    if (!resumeInfo?.experience[index]?.title) {
      toast("Please Add Position Title");
      return;
    }
    setLoading(true);

    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience[index].title
    );
    const result = await AIChatSession.sendMessage(prompt);
    console.log(typeof result.response.text());
    console.log(JSON.parse(result.response.text()));
    const resp = JSON.parse(result.response.text());
    await setValue(
      resp.experience
        ? resp.experience?.join("")
        : resp.experience_bullets?.join("")
    );
    setLoading(false);
  };

  return (
    <div className="bg-gray-900 rounded-xl p-4 shadow-lg">
      <div className="flex justify-between my-2">
        <label className="text-xs text-gray-300">Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="flex gap-2 border-blue-500 text-blue-400 hover:bg-gray-800"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(value);
          }}
          className="bg-gray-800 text-gray-100 border border-gray-700 rounded-lg min-h-[120px]"
          style={{
            backgroundColor: "#1f2937",
            color: "#f3f4f6",
            border: "1px solid #374151",
            borderRadius: "0.5rem",
            minHeight: "120px",
            padding: "0.5rem",
          }}
        >
          <Toolbar className="bg-gray-800 text-gray-200 border-b border-gray-700 rounded-t-lg">
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
