export const Status = {
  IN_USE: "In Use",
  NOT_IN_USE: "Not In Use",
  UNKNOWN: "Unknown",
};

class DataSource {
  constructor(
    sourceName = "Unknown Source",
    sourceType = "Unknown Type",
    status = Status.NOT_IN_USE,
    location = "Unknown Location",
    repositoryOrDbName = "N/A",
    lastModified = null,
    owner = "Unknown Owner",
    purpose = "No Purpose Specified",
    criticality = "Low",
    notes = ""
  ) {
    this.sourceName = sourceName || "Unknown Source";
    this.sourceType = sourceType || "Unknown Type";
    this.status = status || Status.NOT_IN_USE;
    this.location = location || "Unknown Location";
    this.repositoryOrDbName = repositoryOrDbName || "N/A";
    // this.lastModified = lastModified ? new Date(lastModified) : null; // Convert to Date object if provided
    this.lastModified = lastModified || ""; // Convert to Date object if provided
    this.owner = owner || "Unknown Owner";
    this.purpose = purpose || "No Purpose Specified";
    this.criticality = criticality || "Low";
    this.notes = notes || "";
  }

  /**
   * Static method to create a `DataSource` instance from a raw object.
   * @param {Object} obj - The raw object containing data for the data source.
   * @returns {DataSource} A new DataSource instance.
   */
  static fromObject(
    { sourceName, sourceType, status, location, repositoryOrDbName, lastModified, owner, purpose, criticality, notes } = {
      sourceName: "Unknown Source",
      status: Status.NOT_IN_USE,
      sourceType: "Unknown Type",
      location: "Unknown Location",
      repositoryOrDbName: "N/A",
      lastModified: null,
      owner: "Unknown Owner",
      purpose: "No Purpose Specified",
      criticality: "Low",
      notes: "",
    }
  ) {
    return new DataSource(sourceName, sourceType, status, location, repositoryOrDbName, lastModified, owner, purpose, criticality, notes);
  }
}

export default DataSource;
