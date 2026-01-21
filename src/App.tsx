import React, { useState } from "react";
import { ChevronDown, Folder, FileCode, FileText } from "lucide-react";
import { entries } from "./const.ts";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#a3a3a3] font-mono selection:bg-blue-500/30">
      <div className="flex items-center px-4 py-3 bg-[#161616] border-b border-white/5 text-[12px]">
        <div className="flex gap-2 mr-6">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="flex items-center gap-2 opacity-50 tracking-tight">
          <span className="text-gray-400 font-bold">{">_"}</span>
          <span>citycom-cloud-v2</span>
          <span>/</span>
          <span>~/Users/suny</span>
        </div>
      </div>

      <div className="py-2">
        {entries.map(function (obj) {
          return <IndividualRow key={obj.path} info={obj} />;
        })}
      </div>
    </div>
  );
}

function IndividualRow(stuff: { info: any }) {
  const info = stuff.info;
  const [isClicked, setIsClicked] = useState(false);

  function clickerFunc() {
    if (isClicked === true) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  }

  let myIcon;
  if (info.isFile === false) {
    myIcon = <Folder className="w-4 h-4 text-gray-400 fill-gray-400/10" />;
  } else if (
    info.name.endsWith(".tsx") ||
    info.name.endsWith(".ts") ||
    info.name.endsWith(".json")
  ) {
    myIcon = <FileCode className="w-4 h-4 text-blue-400/70" />;
  } else {
    myIcon = <FileText className="w-4 h-4 text-gray-500" />;
  }

  let gapDiv = "w-4";
  if (info.isFile === true) {
    gapDiv = "w-10";
  }

  let theBox =
    "w-4.5 h-4.5 rounded border transition-all duration-150 flex items-center justify-center ";
  if (isClicked === true) {
    theBox =
      theBox +
      "bg-[#3b82f6] border-[#3b82f6] shadow-[0_0_8px_rgba(59,130,246,0.3)]";
  } else {
    theBox = theBox + "border-white/20 group-hover:border-white/40";
  }

  let namingStyles = "text-[13px] tracking-wide ";
  if (info.isFile === true) {
    namingStyles = namingStyles + "text-[#d4d4d4]";
  } else {
    namingStyles = namingStyles + "text-white font-medium";
  }

  return (
    <div
      className="group flex items-center hover:bg-white/4 px-4 py-0.75 cursor-pointer transition-colors select-none"
      onClick={clickerFunc}
    >
      <div className={gapDiv}></div>

      <div className="w-5 flex items-center justify-center">
        {info.isFile === false ? (
          <ChevronDown className="w-3.5 h-3.5 text-gray-600" strokeWidth={3} />
        ) : null}
      </div>

      <div className="relative mr-3">
        <div className={theBox}>
          {isClicked === true ? (
            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm"></div>
          ) : null}
        </div>
      </div>

      <div className="mr-3 shrink-0">{myIcon}</div>

      <span className={namingStyles}>{info.name}</span>
      {entries.map((file) => {
        return (
          <div key={file.path}>
            <h1>{file.charCount}</h1>
          </div>
        );
      })}
      <div className="flex-1 ml-4 h-px bg-white/5 opacity-20"></div>
    </div>
  );
}

export default App;
