// import { fetchGeneric } from "@/common/utils/fetch-from-server/fetchGenericV1_0_2";
import { validateYamlV2 } from "@/lib/topics";

export default async function InterviewsPage() {

  const data= await validateYamlV2();
  return <div>Interview Management Content

    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>;
}
