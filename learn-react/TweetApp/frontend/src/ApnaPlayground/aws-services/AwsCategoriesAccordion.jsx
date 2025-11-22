import { useState } from "react";
import servicesData from "./services.json";

export default function AwsCategoriesAccordion({ data = servicesData }) {
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
        className="w-full flex justify-between items-center p-4 font-semibold text-left"
        onClick={() => setOpen(!open)}
      >
        <div>
          <div className="text-lg">{group.name}</div>
          <div className="text-sm text-gray-500">{group.purpose}</div>
        </div>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="bg-gray-50 p-4 border-t">
          <ul className="space-y-3">
            {group.services.map((srv, idx) => {
              const serviceName = typeof srv === 'string' ? srv : srv.name;
              const serviceDescription = typeof srv === 'string' ? null : srv.description;
              
              return (
                <li key={idx} className="border-b border-gray-200 pb-3 last:border-b-0">
                  <div className="font-semibold text-blue-700 mb-1">{serviceName}</div>
                  {serviceDescription && (
                    <div className="text-sm text-gray-600 whitespace-pre-line">
                      {serviceDescription}
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
