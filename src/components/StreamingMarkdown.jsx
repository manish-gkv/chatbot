import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function StreamingMarkdown({ text, stream = false }) {
  const [displayedText, setDisplayedText] = useState(stream ? "" : text);

  useEffect(() => {
    if (!text) return;

    if (stream) {
      setDisplayedText("");
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 20); // streaming speed
      return () => clearInterval(interval);
    } else {
      setDisplayedText(text);
    }
  }, [text, stream]);

  return (
    <div className="prose max-w-none p-4 bg-white rounded-lg shadow">
      <ReactMarkdown
        children={displayedText}
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => (
            <a
              {...props}
              className="text-blue-600 underline hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          code: ({ node, inline, className, children, ...props }) => (
            <code
              {...props}
              className={`${
                inline
                  ? "bg-gray-200 px-1 py-0.5 rounded"
                  : "block bg-gray-900 text-white p-2 rounded-lg overflow-x-auto"
              } ${className}`}
            >
              {children}
            </code>
          ),
        }}
      />
    </div>
  );
}
