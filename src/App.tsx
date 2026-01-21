import React from "react";
import { ChevronDown, Folder, FileCode, FileText } from "lucide-react";
import { entries } from "./const.ts";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#a3a3a3] font-mono">
      
      <div className="flex items-center px-4 py-3 bg-[#161616] border-b border-white/5 text-[12px]">
        <div className="flex gap-2 mr-6">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        
        <div className="flex items-center gap-2 opacity-50">
          <span className="text-gray-400 font-bold">{">_"}</span>
          <span>citycom-cloud-v2</span>
          <span>/</span>
          <span>~/Users/suny</span>
        </div>
      </div>

      <div className="py-2">
        {entries.map(function (item) {
          return (
            <FileRow 
              key={item.path} 
              name={item.name} 
              isFile={item.isFile} 
            />
          );
        })}
      </div>

    </div>
  );
}

function FileRow(props: any) {
  let myIcon;
  if (props.isFile === false) {
    myIcon = <Folder className="w-4 h-4 text-gray-400 fill-gray-400/10" />;
  } else {
    myIcon = <FileCode className="w-4 h-4 text-blue-400/70" />;
  }

  let gapSize = "w-4";
  if (props.isFile === true) {
    gapSize = "w-10";
  }

  let labelColor = "text-white font-medium";
  if (props.isFile === true) {
    labelColor = "text-[#d4d4d4]";
  }

  return (
    <div className="flex items-center hover:bg-white/5 px-4 py-1 cursor-pointer group">
      
      <div className={gapSize}></div>

      <div className="w-5 flex items-center justify-center">
        {props.isFile === false ? (
          <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
        ) : null}
      </div>

      <div className="mr-3">
        <div className="w-4 h-4 rounded border border-white/20 group-hover:border-white/40"></div>
      </div>

      <div className="mr-3">
        {myIcon}
      </div>

      <span className={"text-[13px] tracking-wide " + labelColor}>
        {props.name}
      </span>

      <div className="flex-1 ml-4 h-px bg-white/5 opacity-10"></div>
      
    </div>
  );
}

export default App;