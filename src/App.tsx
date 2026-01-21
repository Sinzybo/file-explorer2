import { Folder, File, Square, ChevronRight, Check } from "lucide-react";
import { entries } from "./const.ts";
export default function App() {
  function formatNumber(value: number) {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + "K";
    } else {
      return value;
    }
  }
  let sumCharCount = 0;
  const sum = entries.map((file) => {
    sumCharCount += file.charCount
    return sumCharCount
  }) 
  return (
    <div>
      <div className="flex items-center px-4 py-3 bg-black text-[12px]">
        <div className="flex gap-2 mr-6 mt-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          <div className="opacity-50 text-sm text-white mb-1.5">
            <span className="  ml-1 ">{">_"}</span>
            <span className=" ml-3.5 ">citycom-cloud-v2</span>
            <span className="ml-2">/</span>
            <span className="ml-2"> ~/Users/Suny</span>
          </div>
        </div>
      </div>
      {entries.map((obj) => {
        return (
          <div key={obj.path} className=" font-bold ml-10 flex ">
            {obj.isFile ? (
              <div className="
          w-4 h-4 mr-3 flex items-center justify-center border rounded-[3px] transition-all duration-200
          border-zinc-600 ml-12 
        "></div>
            ) : (
            <div className="
          w-4 h-4 mr-3 flex items-center justify-center border rounded-[3px] transition-all duration-200
          border-zinc-600
        "></div>)} 

            
            {obj.isFile ? (
              <div className="text-gray-300  flex ">
                <File className="mr-1" />
                <span>{obj.name}</span>
              </div>
            ) : (
              <div className="flex text-gray-300">
                <ChevronRight />

                <Folder className="mr-1 " />

                <span className=" ml-2 ">{obj.name}</span>
              </div>
            )}
            <div className="absolute right-0">
              <span className="text-white">{formatNumber(obj.charCount)}</span>
            </div>
          </div>
        );
      })}
      <div className="absolute bottom-0 h-12 min-w-full bg-[#18181b]">
        <div className="text-zinc-500 mt-3 ">
        <span className="ml-2 text-sm">0 selected</span>
      <span className="ml-2 text-xs"> | </span>
      <span>{sum}</span>
      </div>
      </div>
    </div>
  );
}
