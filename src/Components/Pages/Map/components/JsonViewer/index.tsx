import { UnControlled as CodeMirror } from "react-codemirror2";
import { useDispatch, useSelector } from "react-redux";
import { BoxShowJson } from "../../../Style";
import { RootState } from "@/store/interfaces";
import { useEffect, useRef, useState } from "react";
import Copy from "./Copy";
import Download from "./Download";
import { openSnackbar } from "@/store/Actions/Root";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript"; // Ensure JSON mode is included
import "codemirror/addon/fold/foldgutter.css"; // Style for the gutter
import "codemirror/addon/fold/foldgutter"; // Enables folding gutter
import "codemirror/addon/fold/foldcode"; // Code folding core
import "codemirror/addon/fold/brace-fold"; // Braces folding
import "codemirror/addon/fold/comment-fold"; // Comment folding

const JsonViewer = ({ isShow, jsonData, setPointData, selected }: any) => {
  const dispatch = useDispatch();
  const [showCopy, setShowCopy] = useState(false);
  const codeMirrorRef: any = useRef(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Timeout reference
  const [marker, setMarker] = useState<any>(null);

  const getPropertiesName = selected?.getProperties().name;

  useEffect(() => {
    if (getPropertiesName) {
      scrollToData(getPropertiesName);
    } else if (isShow) {
      scrollToTop();
    }
  }, [getPropertiesName]);

  const scrollToData = (name: any) => {
    const editor = codeMirrorRef.current.editor;
    const json = JSON.stringify(jsonData, null, 2);
    const lines = json.split("\n");
    const targetLineIndex = lines.findIndex((line) =>
      line.includes(`"name": "${name}"`)
    );
    if (targetLineIndex >= 0) {
      let openBrackets = 0;
      let startLine = targetLineIndex;
      let endLine = targetLineIndex;

      for (let i = targetLineIndex; i >= 0; i--) {
        if (lines[i].includes("{")) {
          openBrackets++;
        }
        if (lines[i].includes("{")) {
          openBrackets--;
        }
        if (
          openBrackets === 0 &&
          (lines[i].trim() === "{" || lines[i].trim() === `}`)
        ) {
          startLine = i;
          break;
        }
      }
      openBrackets = 0;
      for (let i = targetLineIndex; i < lines.length; i++) {
        if (lines[i].includes("{")) {
          openBrackets++;
        }
        if (lines[i].includes("},")) {
          openBrackets--;
        }
        if (
          (openBrackets === -1 && lines[i].trim() === "},") ||
          lines[i].trim() === "},"
        ) {
          endLine = i;
          break;
        }
      }
      if (marker) {
        marker.clear();
      }
      const middleLine = Math.max(
        0,
        startLine -
          Math.floor(
            editor.getScrollInfo().clientHeight / editor.defaultTextHeight() / 2
          )
      );
      editor.scrollIntoView({ line: middleLine, ch: 0 });
      editor.setCursor({ line: startLine + 20, ch: 0 });

      const newMarker = editor.markText(
        { line: startLine, ch: 0 },
        { line: endLine + 1, ch: 0 },
        { className: "highlighted-text" }
      );
      setMarker(newMarker);
    }
  };

  const scrollToTop = () => {
    const editor = codeMirrorRef?.current.editor;
    editor.scrollIntoView({ line: 0, ch: 0 });
    if (marker) {
      marker.clear();
    }
  };

  const handleEditorChange = (_editor: any, _data: any, value: string) => {
    // Clear the previous timeout if it exists
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set a new timeout to delay the state update
    typingTimeoutRef.current = setTimeout(() => {
      try {
        const parsedData = JSON.parse(value);
        setPointData(parsedData);
      } catch (error) {
        if (!value) {
          const initial = {
            features: [],
            type: "FeatureCollection",
          };
          setPointData(initial);
        } else {
          dispatch(
            openSnackbar({
              message: `فرمت اشتباه می باشد :${error}`,
              type: "error",
            })
          );
        }
      }
    }, 2000); // Delay in milliseconds (e.g., 300ms)
  };

  return (
    <BoxShowJson
      $isShow={isShow}
      onMouseEnter={() => setShowCopy(true)}
      onMouseLeave={() => setShowCopy(false)}
    >
      <Copy jsonData={jsonData} show={showCopy} />
      <Download
        jsonData={jsonData}
        name={"mojtaba-pourkhanlar"}
        show={showCopy}
      />

      <CodeMirror
        ref={codeMirrorRef}
        value={JSON.stringify(jsonData, null, 2)}
        options={{
          mode: "application/json",
          theme: "",
          lineNumbers: true,
          readOnly: true,
          foldGutter: true, // Enable fold gutter
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], // Add the fold gutter
          foldOptions: {
            widget: "...", // Customize folded content widget (e.g., "..." or custom text)
          },
        }}
        // onChange={(editor, data, value) =>
        //   handleEditorChange(editor, data, value)
        // }
      />
      <style>
        {`
          .highlighted-text {
            background-color: #b84747;
          }
            
        `}
      </style>
    </BoxShowJson>
  );
};

export default JsonViewer;
