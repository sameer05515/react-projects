/**
 * Pure ETL helpers for topic-mgmt step1 (MySQL topic row -> MongoDB Topic document).
 * Used by step1.js so mapping logic can be unit tested.
 */

/**
 * Maps a single MySQL topic row to a plain object suitable for new Topic(doc).
 * Column names match the step1 query: ID, creation_date, last_updation_date, description, isprivate, rating, title.
 *
 * @param {Object} row - MySQL row with ID, creation_date, last_updation_date, description, isprivate, rating, title
 * @returns {Object} Plain object with oldRdbmsId, createdDate, updatedDate, occurenceDate, description, isPrivate, rating, name
 */
function rowToTopicDoc(row) {
  if (!row) return null;
  return {
    oldRdbmsId: row.ID,
    createdDate: row.creation_date,
    updatedDate: row.last_updation_date,
    occurenceDate: row.creation_date,
    description: row.description,
    isPrivate: row.isprivate,
    rating: row.rating,
    name: row.title,
  };
}

/**
 * Maps an array of MySQL topic rows to topic documents.
 */
function rowsToTopicDocs(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.map(rowToTopicDoc).filter(Boolean);
}

module.exports = {
  rowToTopicDoc,
  rowsToTopicDocs,
};
