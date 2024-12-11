import { ComparisonDataType } from "../../common/data/data_v1_0_2";
import { styles } from "../../common/styles/styles_v1_0_1";
import {
  SharedConfigurationsProvider,
  useSharedConfigurations,
} from "../../common/util/SPPTableConfigurationsUtil";
import TableHeader from "../table-header/TableHeaderV1_0_1";
import TableRow from "../table-row/TableRowV1_0_1";

// Reusable Comparison Component (handles N items)
const SPPTableV1_0_2 = ({
  data,
  rowValueValidator,
}: {
  data: ComparisonDataType<string>;
  rowValueValidator?: (rowValue: string) => boolean;
}) => (
  <SharedConfigurationsProvider
    data={data}
    rowValueValidator={rowValueValidator}
  >
    <AppContainerComponent />
  </SharedConfigurationsProvider>
);

const AppContainerComponent = () => {
  const {
    sharedData: { errors, validatedData: data },
  } = useSharedConfigurations<string>();

  if (errors.length > 0) {
    return (
      <div style={errorContainerStyle}>
        {errors.map((error, index) => (
          <div key={index} style={errorMessageStyle}>
            {error}
          </div>
        ))}
      </div>
    );
  }

  if (!data) return null; // Safe return if no data is provided

  return (
    <>
      <h1>{data.title}</h1>
      <table style={styles.table}>
        <TableHeader headers={data.headers || []} />
        <tbody>
          {data.rowData.map((item, index) => (
            <TableRow key={index} aspect={item.aspect} values={item.values} />
          ))}
        </tbody>
      </table>
    </>
  );
};

// Error container style
const errorContainerStyle = {
  backgroundColor: "#ffe5e5",
  border: "1px solid #ff4d4d",
  borderRadius: "5px",
  padding: "15px",
  margin: "20px 0",
  color: "#ff4d4d",
};

// Individual error message style
const errorMessageStyle = {
  marginBottom: "10px",
  fontWeight: "bold",
};

export default SPPTableV1_0_2;