import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import CustomButton from "../../../common/components/custom-button/CustomButton";

type ViewTaskProps = {
  id: string;
  itemEditHandler?: (item: any) => void;
};

function ViewTask({ id, itemEditHandler = () => {} }: ViewTaskProps) {
  const dataList = useSelector((state: RootState) => state.data as any[]);
  const selectedItem = dataList.find((item) => item._id === id);
  const editData = () => {
    itemEditHandler(selectedItem);
  };
  return (
    <div className="border border-gray-300 rounded-lg shadow-sm max-h-[400px] overflow-y-auto">
      <div className="p-4">
        <h5 className="text-lg font-semibold mb-2">
          [
          {format(new Date(selectedItem.date), "dd/MMM/yyyy", { locale: enGB })}
          ] -{selectedItem.title}
        </h5>
        <h6 className="mb-2 text-sm text-gray-600">Card Subtitle</h6>
        <div className="mb-4">
          <div dangerouslySetInnerHTML={{ __html: selectedItem.htmlText }} />
        </div>

        {selectedItem &&
          selectedItem.tags &&
          selectedItem.tags.map((tag, _index) => (
            <span key={_index} className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm mr-2 mb-2">
              {tag}
            </span>
          ))}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <CustomButton onClick={editData}>Edit</CustomButton>
        </div>
      </div>
    </div>
  );
}

export default ViewTask;
