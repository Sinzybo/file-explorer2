import {
  Folder,
  File,
  Square,
  ChevronRight,
  Check,
  ArrowUpDown,
  CornerDownLeft,
  FileText,
} from "lucide-react";
import { entries } from "./const.ts";
import { useEffect, useState, type KeyboardEvent } from "react";

export default function App() {
  const [selectedFileCharCount, setSelectedFileCharCount] = useState<number>(0);
  const [checkedState, setCheckedState] = useState<boolean[]>(
    entries.map(() => false),
  );
  const [highlighted, setHighlighted] = useState<number>(0);

  const [fileSelected, setFileSelected] = useState<number>(0);

  function getPercent(fileCharCount: number) {
    return (fileCharCount / sumCharCount) * 100;
  }

  function formatNumber(value: number): string {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + "k";
    }
    return value.toString();
  }

  useEffect(() => {
    const numberOfchecked = checkedState.filter((item) => item === true);
    setFileSelected(numberOfchecked.length);
  }, [checkedState]);

  let sumCharCount = 0;
  entries.forEach((file) => {
    sumCharCount += file.charCount;
  });

  useEffect(() => {
    let total = 0;
    entries.forEach((obj, index) => {
      if (checkedState[index]) {
        total += obj.charCount;
      }
    });
    setSelectedFileCharCount(total);
  }, [fileSelected]);
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "ArrowDown") {
        setHighlighted((prev) => {
          if (prev === entries.length - 1) {
            return 0;
          } else {
            return prev + 1;
          }
        });
      } else if (event.key === "ArrowUp") {
        setHighlighted((prev) => {
          if (prev === 0) {
            return entries.length - 1;
          } else {
            return prev - 1;
          }
        });
      } else if (event.key === " ") {
        const newArray = [...checkedState];
        newArray[highlighted] = !newArray[highlighted];
        setCheckedState(newArray);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [highlighted, checkedState]);
  return (
    <div>
      <div className="flex items-center px-4 py-3 bg-black text-[12px]">
        <div className="flex gap-2 mr-6 mt-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 hover:bg-red-500 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 hover:bg-yellow-500 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 hover:bg-green-500 transition-colors"></div>
          <div className="opacity-50 text-sm text-white mb-1.5">
            <span className="ml-1">{">_"}</span>
            <span className="ml-3.5">citycom-cloud-v2</span>
            <span className="ml-2">/</span>
            <span className="ml-2">~/Users/Suny</span>
          </div>
        </div>
      </div>
      {entries.map((obj, index) => {
        return (
          <div
            key={obj.path}
            className={` select-none pl-10 flex items-center py-1.5 relative hover:bg-zinc-900 cursor-pointer ${highlighted === index ? "bg-zinc-800" : ""}`}

            onClick={() => {
  const newArray = [...checkedState];
  newArray[index] = !newArray[index];
  setCheckedState(newArray);
}}
          >
            {highlighted === index && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] z-10"></div>
            )}
            {!obj.isFile && (
              <ChevronRight size={16} className="mr-2 text-[#D4D4D8]" />
            )}

            {obj.isFile ? (
              <div
                className={`
          w-4 h-4 mr-3 flex items-center justify-center border rounded-[3px] transition-all duration-200
          border-zinc-600 ml-12 ${checkedState[index] ? "bg-blue-400" : ""}`}
                onClick={() => {
                  const newArray = [...checkedState];
                  newArray[index] = !newArray[index];
                  setCheckedState(newArray);
                }}
              ></div>
            ) : (
              <div
                className={`
          w-4 h-4 mr-3 flex items-center justify-center border rounded-[3px] transition-all duration-200
          border-zinc-600 ${checkedState[index] ? "bg-blue-400" : ""}`}
                onClick={() => {
                  const newArray = [...checkedState];
                  newArray[index] = !newArray[index];
                  setCheckedState(newArray);
                }}
              ></div>
            )}

            {obj.isFile ? (
              <div className="text-[#D4D4D8] flex items-center">
                <FileText
                  size={16}
                  className="mr-1"
                  stroke={checkedState[index] ? "#06B6D4" : "#52525B"}
                />
                <span
                  className={`${checkedState[index] ? "text-[#06B6D4]" : ""} ${obj.charCount === 0 ? "text-zinc-500" : ""} `}
                >
                  {obj.name}
                </span>
              </div>
            ) : (
              <div className="flex text-[#D4D4D8] items-center">
                <Folder
                  size={16}
                  stroke={checkedState[index] ? "#06B6D4" : "#52525B"}
                />
                <span
                  className={`ml-2 ${checkedState[index] ? "text-[#06B6D4]" : "text-[#D4D4D8]"} ${obj.charCount === 0 ? "text-zinc-500" : ""} `}
                >
                  {obj.name}
                </span>
              </div>
            )}

            <div className="absolute right-36">
              {obj.charCount > 0 && (
                <span
                  className={`${checkedState[index] ? "text-[#06B6D4]" : "text-zinc-500"}`}
                >
                  {formatNumber(obj.charCount)}
                </span>
              )}
            </div>

            <div className="absolute right-5">
              <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden relative">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${checkedState[index] ? "bg-[#06B6D4]" : "bg-zinc-700"}`}
                  style={{ width: `${getPercent(obj.charCount)}%` }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-0 h-12 min-w-full bg-[#18181b]">
        <div className="text-zinc-500 mt-3.5">
          <span
            className={`ml-2 text-sm ${fileSelected > 0 ? "text-[#06B6D4]" : "text-zinc-500"}`}
          >
            {fileSelected} selected
          </span>
          <span className="ml-2 text-xs">|</span>
          <span
            className={`ml-2 ${selectedFileCharCount > 0 ? "text-[#06B6D4]" : "text-zinc-500"}`}
          >
            {formatNumber(selectedFileCharCount)}
          </span>
          <span className="ml-3">/</span>
          <span className="ml-1">{formatNumber(sumCharCount)} tokens</span>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 text-xs text-zinc-300 bg-zinc-800 border border-zinc-600 rounded shadow-sm">
                <ArrowUpDown size={14} />
              </kbd>
              <span className="text-zinc-500 text-sm">MOVE</span>
            </div>

            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 text-xs text-zinc-300 bg-zinc-800 border border-zinc-600 rounded shadow-sm">
                SPACE
              </kbd>
              <span className="text-zinc-500 text-sm">SELECT</span>
            </div>

            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 text-xs text-zinc-300 bg-zinc-800 border border-zinc-600 rounded shadow-sm">
                <CornerDownLeft size={14} />
              </kbd>
              <span className="text-zinc-500 text-sm">EXECUTE</span>
            </div>
          </div>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <button
            className={`px-4 py-1.5 text-sm rounded transition-colors ${fileSelected > 0 ? "bg-blue-500 text-white" : "bg-zinc-700 text-zinc-400"}`}
          >
            EXECUTE ⌘
          </button>
        </div>
      </div>
    </div>
  );
}
