"use client";

import { FC, useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
}

const RichTextEditor: FC<RichTextEditorProps> = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);
  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ header: [1, 2, 3, false] }],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        },
      });

      quillInstance.current.root.innerHTML = value;

      quillInstance.current.on("text-change", () => {
        if (quillInstance.current) {
          const content = quillInstance.current.root.innerHTML;
          onChange(content);
        }
      });
    }
  }, [value, onChange]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm">{label}</label>
      <div
        ref={editorRef}
        className="border-gray-300"
        onBlur={onBlur}
        style={{ height: "200px" }}
      />
      {error && touched && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default RichTextEditor;
