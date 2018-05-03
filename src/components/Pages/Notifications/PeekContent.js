import React from "react";
import ReactJson from "react-json-view";
import AceEditor from "react-ace";
import "brace/theme/monokai";

export const PeekContent = ({ json }) => {
  let modalContent = "";
  try {
    modalContent = json.toString().startsWith("<") ? (
      (modalContent = (
        <AceEditor
          mode="xml"
          theme="monokai"
          name="blah2"
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={json}
          setOptions={{
            animatedScroll: true,
            readOnly: true,
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 3
          }}
        />
      ))
    ) : (
      <ReactJson
        src={JSON.parse(JSON.stringify(json))}
        theme="monokai"
        name="message"
        iconStyle="triangle"
        enableClipboard={true}
        style={{ padding: "25px", fontFamily: "sans-serif" }}
        displayDataTypes={false}
      />
    );
  } catch (err) {
    console.log("err", err);
    modalContent = null;
  }
  return modalContent;
};
