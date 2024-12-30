import { FC } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MarkDownProps {
  content: string;
}

const MarkDown: FC<MarkDownProps> = ({ content }) => {
  const renderers: Components = {
    h2: ({ children }) => <h2 className="font-serif text-lg">{children}</h2>,
    p: ({ children }) => <p className="font-sans text-base">{children}</p>,
    li: ({ children }) => <li className="font-sans text-base">{children}</li>,
    ul: ({ children }) => <ul className="font-sans text-base">{children}</ul>,
    ol: ({ children }) => <ol className="font-sans text-base">{children}</ol>,
  };

  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} components={renderers}>
      {content}
    </ReactMarkdown>
  );
};

export default MarkDown;
