import { useState } from "react";
import designPatternsData from "./design-pattern.json";

export default function DesignPatternAccordion({ data = designPatternsData }) {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {data.map((group, index) => (
        <AccordionItem key={index} group={group} />
      ))}
    </div>
  );
}

function AccordionItem({ group }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded mb-3 shadow-sm">
      <button
        className="w-full flex justify-between items-center p-4 font-semibold text-left hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <div>
          <div className="text-lg">{group.name}</div>
          <div className="text-sm text-gray-500">{group.purpose}</div>
        </div>
        <span className="text-xl text-gray-600">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="bg-gray-50 p-4 border-t">
          <ul className="space-y-3">
            {group.patterns.map((pattern, idx) => {
              const patternName = typeof pattern === 'string' ? pattern : pattern.name;
              const patternDescription = typeof pattern === 'string' ? null : pattern.description;
              
              return (
                <li key={idx} className="border-b border-gray-200 pb-3 last:border-b-0">
                  <div className="font-semibold text-purple-700 mb-1">{patternName}</div>
                  {patternDescription && (
                    <div className="text-sm text-gray-600 whitespace-pre-line">
                      {patternDescription}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
