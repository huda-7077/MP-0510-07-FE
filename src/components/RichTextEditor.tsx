"use client";
import { FC } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Label } from "./ui/label";

const QuillEditor = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

interface RichTextEditorProps {
  label: string;
  value: string;
  isError: boolean;
  onChange: (value: string) => void;
}

const RichTextEditor: FC<RichTextEditorProps> = ({
  label,
  value,
  isError,
  onChange,
}) => {
  const quillModules = {
    toolbar: {
      container: [
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
      ],
    },
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <Label>{label}</Label>
      <QuillEditor
        modules={quillModules}
        value={value}
        onChange={onChange}
        className="h-[300px] pb-16"
      />

      {isError && (
        <div className="text-xs text-red-500">This field is required</div>
      )}
    </div>
  );
};

export default RichTextEditor;
