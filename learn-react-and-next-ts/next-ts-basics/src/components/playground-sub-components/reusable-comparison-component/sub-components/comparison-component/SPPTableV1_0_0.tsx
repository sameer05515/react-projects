import { type ComparisonDataType } from "../../common/data/data_v1_0_0";
import { thStyle, tdStyle } from "../../common/styles/styles_v1_0_0";

// Reusable Comparison Component
const SPPTableV1_0_0 = ({ data }: { data: ComparisonDataType }) => {
  return (
    <>
      <h1>{data.title}</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Aspect</th>
            <th style={thStyle}>ArrayList</th>
            <th style={thStyle}>LinkedList</th>
          </tr>
        </thead>
        <tbody>
          {data.differences.map((item, index) => (
            <tr key={index}>
              <td style={tdStyle}>{item.aspect}</td>
              <td style={tdStyle}>{item.ArrayList}</td>
              <td style={tdStyle}>{item.LinkedList}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SPPTableV1_0_0;
