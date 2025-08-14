import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function StreamingMarkdown({ text, stream = false }) {
  const [displayedText, setDisplayedText] = useState(stream ? "" : text);

  useEffect(() => {
    if (!text) return;

    if (stream) {
      setDisplayedText("");
      let i = 0;
      let chunkSize = 3; // Number of characters per frame

      function step() {
        setDisplayedText((prev) => prev + text.slice(i, i + chunkSize));
        i += chunkSize;
        if (i < text.length) {
          requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    } else {
      setDisplayedText(text);
    }
  }, [text, stream]);

  const CodeBlock = ({ inline, className, children }) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";
    const code = String(children).replace(/\n$/, "");

    if (!inline && language) {
      return (
        <div className="my-4 rounded-lg overflow-hidden font-mono text-sm border border-gray-200">
          <div className="flex justify-between items-center px-3 py-1 text-xs text-gray-600 bg-gray-50">
            <span>{language}</span>
            <CopyButton code={code} />
          </div>
          <SyntaxHighlighter
            language={language}
            style={oneLight}
            showLineNumbers
            wrapLongLines
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.875rem",
              backgroundColor: "white",
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );
    }
    return (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-pink-600 font-mono text-sm">
        {children}
      </code>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-4">
      <div className="bg-white rounded-2xl p-6 text-gray-800 leading-relaxed">
        <ReactMarkdown
          children={displayedText}
          remarkPlugins={[remarkGfm]}
          components={{
            code: CodeBlock,
          }}
        />
      </div>
    </div>
  );
}

function CopyButton({ code }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="opacity-70 hover:opacity-100 transition-opacity px-2 py-0.5 rounded hover:bg-gray-200"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
