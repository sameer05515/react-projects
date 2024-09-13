import React from "react";
import HoverableSpan from "../../../common/components/HoverableSpan";
import HtmlTextRendrer from "../../../common/components/HtmlTextRenderer";
import RatingComponent from "../../../common/components/RatingComponent";
import { SmartPreviewer } from "../../../common/components/SmartEditor";
import { styles } from "../common/util";

const CategoryCard = ({
  category,
  onQuestionSelection = () => { },
  onCreateQuestionClick = () => { },
}) => {
  return (
    <>
      <div>
        <div>
          <div style={styles.datesStyle}>
            <span style={{ marginRight: "10px" }}>
              <strong>Rating:</strong> {category.rating}
            </span>
            <span style={{ marginRight: "10px" }}>
              <strong>Unique ID:</strong> {category.uniqueId}
            </span>
          </div>
          <h2>
            <b>Category: </b>
            <HtmlTextRendrer htmlString={category.heading} />
          </h2>
          <RatingComponent rating={category.rating} />
          <div
            style={{
              border: "1px solid #999", // Grey border
              padding: "2px 5px", // Adjust padding as needed
              borderRadius: "4px",
              marginBottom: "10px",
              width: "67vw",
              overflow: "auto",
            }}
          >
            {category.smartContent && (
              <SmartPreviewer data={category.smartContent} />
            )}
          </div>
        </div>
        <div>
          <div>
            <strong>{category?.questions?.length || 0} Questions</strong>
            <HoverableSpan
              style={{ padding: "0px 5px" }}
              onClick={() => {
                onCreateQuestionClick && onCreateQuestionClick();
              }}
            >
              Add New Question
            </HoverableSpan>
          </div>
          <div style={{}}>
            {category?.questions.length > 0 &&
              category.questions.map((q, index) => (
                <div
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    margin: "5px",
                  }}
                  key={q.uniqueId}
                >
                  <HoverableSpan onClick={() => onQuestionSelection(q)}>
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
