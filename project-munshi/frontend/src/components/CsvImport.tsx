import React, { useState, useRef } from 'react';
import Papa from 'papaparse';
import { projectApi } from '../services/projectApi';
import { ProjectRequest } from '../types/project';
import './CsvImport.css';

interface CsvImportProps {
  onImportComplete: () => void;
  onClose: () => void;
}

interface CsvRow {
  name: string;
  description?: string;
  status: string;
  startDate: string;
  endDate?: string;
  owner?: string;
  tags?: string;
}

interface ImportResult {
  success: number;
  failed: number;
  errors: Array<{ row: number; error: string }>;
}

const CsvImport: React.FC<CsvImportProps> = ({ onImportComplete, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<CsvRow[]>([]);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.csv')) {
      alert('Please select a CSV file');
      return;
    }

    setFile(selectedFile);
    setResult(null);
    parseCsv(selectedFile);
  };

  const parseCsv = (csvFile: File) => {
    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as CsvRow[];
        setPreview(data.slice(0, 5)); // Show first 5 rows as preview
      },
      error: (error) => {
        alert(`Error parsing CSV: ${error.message}`);
      },
    });
  };

  const validateRow = (row: CsvRow, index: number): string | null => {
    if (!row.name || row.name.trim() === '') {
      return `Row ${index + 1}: Name is required`;
    }
    if (!row.status || row.status.trim() === '') {
      return `Row ${index + 1}: Status is required`;
    }
    const validStatuses = ['ACTIVE', 'COMPLETED', 'ON_HOLD', 'CANCELLED'];
    if (!validStatuses.includes(row.status.toUpperCase())) {
      return `Row ${index + 1}: Status must be one of: ${validStatuses.join(', ')}`;
    }
    if (!row.startDate || row.startDate.trim() === '') {
      return `Row ${index + 1}: Start date is required`;
    }
    try {
      new Date(row.startDate);
    } catch {
      return `Row ${index + 1}: Invalid start date format`;
    }
    if (row.endDate) {
      try {
        new Date(row.endDate);
      } catch {
        return `Row ${index + 1}: Invalid end date format`;
      }
    }
    return null;
  };

  const convertToProjectRequest = (row: CsvRow): ProjectRequest => {
    const tags = row.tags
      ? row.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag !== '')
      : undefined;

    return {
      name: row.name.trim(),
      description: row.description?.trim() || undefined,
      status: row.status.toUpperCase().trim(),
      startDate: new Date(row.startDate).toISOString(),
      endDate: row.endDate ? new Date(row.endDate).toISOString() : undefined,
      owner: row.owner?.trim() || undefined,
      tags: tags && tags.length > 0 ? tags : undefined,
    };
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    setResult(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const rows = results.data as CsvRow[];
        const errors: Array<{ row: number; error: string }> = [];
        const validProjects: ProjectRequest[] = [];

        // Validate all rows
        rows.forEach((row, index) => {
          const error = validateRow(row, index);
          if (error) {
            errors.push({ row: index + 1, error });
          } else {
            try {
              validProjects.push(convertToProjectRequest(row));
            } catch (err) {
              errors.push({
                row: index + 1,
                error: err instanceof Error ? err.message : 'Failed to convert row',
              });
            }
          }
        });

        // Import valid projects
        let successCount = 0;
        let failedCount = errors.length;

        if (validProjects.length > 0) {
          try {
            await projectApi.createProjectsBulk(validProjects);
            successCount = validProjects.length;
          } catch (err) {
            failedCount += validProjects.length;
            errors.push({
              row: 0,
              error: err instanceof Error ? err.message : 'Failed to import projects',
            });
          }
        }

        setResult({
          success: successCount,
          failed: failedCount,
          errors,
        });

        setImporting(false);

        if (successCount > 0) {
          setTimeout(() => {
            onImportComplete();
            onClose();
          }, 2000);
        }
      },
      error: (error) => {
        setResult({
          success: 0,
          failed: 0,
          errors: [{ row: 0, error: error.message }],
        });
        setImporting(false);
      },
    });
  };

  const downloadTemplate = () => {
    const template = `name,description,status,startDate,endDate,owner,tags
Project 1,Description of project 1,ACTIVE,2024-01-01,2024-12-31,John Doe,"tag1, tag2"
Project 2,Description of project 2,COMPLETED,2024-02-01,,Jane Smith,"tag3, tag4"`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project_import_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="csv-import-overlay" onClick={onClose}>
      <div className="csv-import-modal" onClick={(e) => e.stopPropagation()}>
        <div className="csv-import-header">
          <h2>Import Projects from CSV</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="csv-import-body">
          <div className="csv-import-section">
            <label className="csv-import-label">
              Select CSV File
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="csv-file-input"
              />
            </label>
            {file && (
              <div className="file-info">
                <span>Selected: {file.name}</span>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => {
                    setFile(null);
                    setPreview([]);
                    setResult(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          <div className="csv-import-section">
            <div className="template-section">
              <p>Need a template? Download the CSV template:</p>
              <button className="btn btn-secondary" onClick={downloadTemplate}>
                Download Template
              </button>
            </div>
          </div>

          {preview.length > 0 && (
            <div className="csv-import-section">
              <h3>Preview (first 5 rows)</h3>
              <div className="preview-table-container">
                <table className="preview-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Start Date</th>
                      <th>Owner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((row, index) => (
                      <tr key={index}>
                        <td>{row.name}</td>
                        <td>{row.status}</td>
                        <td>{row.startDate}</td>
                        <td>{row.owner || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {result && (
            <div className="csv-import-section">
              <h3>Import Results</h3>
              <div className="import-results">
                <div className="result-stat success">
                  <strong>Success:</strong> {result.success} projects
                </div>
                <div className="result-stat failed">
                  <strong>Failed:</strong> {result.failed} projects
                </div>
              </div>
              {result.errors.length > 0 && (
                <div className="error-list">
                  <h4>Errors:</h4>
                  <ul>
                    {result.errors.map((error, index) => (
                      <li key={index}>{error.error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="csv-import-footer">
          <button className="btn btn-secondary" onClick={onClose} disabled={importing}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleImport}
            disabled={!file || importing}
          >
            {importing ? 'Importing...' : 'Import Projects'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CsvImport;

