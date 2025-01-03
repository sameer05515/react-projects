// samplesConfig.js
import SampleV1 from "./samples/v1";
import SampleV2 from "./samples/v2";
import SampleV3 from "./samples/v3";
import SampleV4 from "./samples/v4";

const Samples = {
  SampleV1,
  SampleV2,
  SampleV3,
  SampleV4,
};

export const sampleNames = Object.keys(Samples).map((sampleName, idx) => ({
  id: `sample_no_${idx + 1}`,
  name: sampleName,
}));

export const getSampleComponent = (name) => Samples[name] || null;
