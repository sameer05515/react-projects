import React from "react";
import HoverableSpan from "../../../common/components/hoverable-span/HoverableSpan";
import HtmlTextRendrer from "../../../common/components/html-text-renderer/HtmlTextRenderer";
import RatingComponent from "../../../common/components/rating-component/RatingComponent";
import { SmartPreviewer } from "../../../common/components/Smart/Editor/v3";

interface CategoryCardProps {
  category: any;
  onQuestionSelection?: (question: any) => void;
  onCreateQuestionClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onQuestionSelection = () => { },
  onCreateQuestionClick = () => { },
}) => {
  return (
    <>
      <div>
        <div>
          <div className="text-xs rounded mb-2.5">
            <span className="mr-2.5">
              <strong>Rating:</strong> {category.rating}
            </span>
            <span className="mr-2.5">
              <strong>Unique ID:</strong> {category.uniqueId}
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2">
            <b>Category: </b>
            <HtmlTextRendrer htmlString={category.heading} />
          </h2>
          <RatingComponent rating={category.rating} />
          <div className="border border-gray-600 px-1.5 py-0.5 rounded mb-2.5 w-[67vw] overflow-auto">
            {category.smartContent && (
              <SmartPreviewer data={category.smartContent} />
            )}
          </div>
        </div>
        <div>
          <div className="mb-2.5">
            <strong>{category?.questions?.length || 0} Questions</strong>
            <HoverableSpan
              className="px-1.5 py-0 cursor-pointer hover:underline"
              onClick={() => {
                onCreateQuestionClick && onCreateQuestionClick();
              }}
            >
              Add New Question
            </HoverableSpan>
          </div>
          <div>
            {category?.questions.length > 0 &&
              category.questions.map((q, index) => (
                <div
                  className="border border-black p-2.5 m-1.5"
                  key={q.uniqueId}
                >
                  <HoverableSpan onClick={() => { onQuestionSelection(q); }}>
                    {q.heading || q.name}
                  </HoverableSpan>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
