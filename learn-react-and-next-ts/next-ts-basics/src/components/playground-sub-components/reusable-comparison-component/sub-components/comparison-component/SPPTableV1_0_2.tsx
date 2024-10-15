import { ComparisonDataType } from "../../common/data/data_v1_0_2";
import { styles } from "../../common/styles/styles_v1_0_1";
import {
  SharedConfigurationsProvider,
  useSharedConfigurations,
} from "../../common/util/SPPTableConfigurationsUtil";
import TableHeader from "../table-header/TableHeaderV1_0_1";
import TableRow from "../table-row/TableRowV1_0_1";

// Reusable Comparison Component (handles N items)
const SPPTableV1_0_2 = ({ data }: { data: ComparisonDataType<string> }) => (
  <SharedConfigurationsProvider data={data}>
    <AppContainerComponent />
  </SharedConfigurationsProvider>
);

const AppContainerComponent = () => {
  const {
    sharedData: { errors, validatedData: data },
  } = useSharedConfigurations<string>();

  if (errors.length > 0) {
    return (
      <>
        {errors.map((error, index) => (
          <div key={index} style={{ color: "red" }}>
            {error}
          </div>
        ))}
      </>
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

export default SPPTableV1_0_2;
