import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

type RecurrenceType = "OneTime" | "Daily";
type YesNo = "yes" | "no";

interface ActionableData {
  id: string;
  activityName: string;
  activityDescription: string;
  recurrence: RecurrenceType;
  shouldContinue: YesNo;
  startDate: string;
  endDate: string;
}

const blankData: ActionableData = {
  id: "",
    activityName: "",
    activityDescription: "",
    recurrence: "OneTime",
    shouldContinue: "yes",
    startDate: "",
    endDate: "",
  };

interface ActionableFormProps {
  initialData?: ActionableData;
  postSaveAction?: (data: ActionableData) => void;
}

const ActionableForm: React.FC<ActionableFormProps> = ({
    initialData = blankData,
    postSaveAction = () => {}
}) => {
  const [formData, setFormData] = useState<ActionableData>({...initialData});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value as any,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can handle form submission here, e.g., save to a database
    const newActionable: ActionableData = { ...formData, id: uuidv4() };
    console.log("Form data:", newActionable);
    postSaveAction(newActionable);
    setFormData({...blankData});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Activity Name</label>
          <input
            type="text"
            name="activityName"
            value={formData.activityName}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">Activity Description</label>
          <textarea
            rows={3}
            name="activityDescription"
            value={formData.activityDescription}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Recurrence</label>
          <select
            name="recurrence"
            value={formData.recurrence}
            onChange={handleChange}
            className="w-full cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="OneTime">One Time</option>
            <option value="Daily">Daily</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Should Continue</label>
          <div className="flex items-center gap-4 rounded border border-gray-200 bg-gray-50 px-3 py-2">
            <label className="inline-flex items-center gap-2 text-sm text-gray-800">
              <input
                type="radio"
                name="shouldContinue"
                value="yes"
                checked={formData.shouldContinue === "yes"}
                onChange={handleChange}
                className="h-4 w-4 cursor-pointer text-blue-600 focus:ring-blue-500"
              />
              Yes
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-gray-800">
              <input
                type="radio"
                name="shouldContinue"
                value="no"
                checked={formData.shouldContinue === "no"}
                onChange={handleChange}
                className="h-4 w-4 cursor-pointer text-blue-600 focus:ring-blue-500"
              />
              No
            </label>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Save Activity
      </button>
    </form>
  );
};

export default ActionableForm;
