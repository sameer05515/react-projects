# CSV Import Guide

This document explains how to import multiple projects in one action.

## Overview

CSV import is available in the frontend Projects List screen.  
It allows users to upload a CSV file, preview records, validate rows, and create projects in bulk through the backend endpoint:

- `POST /api/projects/bulk`

## CSV Template

Required headers:

| Column | Required | Example |
|---|---|---|
| `name` | Yes | `Website Revamp` |
| `description` | No | `Landing page migration` |
| `status` | Yes | `ACTIVE` |
| `startDate` | Yes | `2026-03-01` |
| `endDate` | No | `2026-06-30` |
| `owner` | No | `Asha` |
| `tags` | No | `frontend,marketing` |

## Supported Status Values

- `ACTIVE`
- `COMPLETED`
- `ON_HOLD`
- `CANCELLED`

Status is normalized to uppercase in import processing.

## How Import Works

1. User opens **Import CSV** from project list.
2. CSV is parsed using `papaparse` with headers enabled.
3. First 5 rows are shown as preview.
4. Each row is validated:
   - `name` required
   - `status` required and valid
   - `startDate` required
5. Valid rows are transformed to API payload (`ProjectRequest[]`).
6. Frontend sends one bulk request to backend.
7. Result panel shows:
   - Successful count
   - Failed count
   - Error list

## Date Handling

- Input dates from CSV are converted to ISO strings before API call.
- Use standard date formats like `YYYY-MM-DD` for best compatibility.

## Tags Handling

- `tags` can contain comma-separated values.
- Example: `ui,api,priority-high`
- Values are trimmed and empty items are ignored.

## Failure Scenarios

- Invalid rows are excluded from payload and reported in results.
- If bulk API fails, valid rows in that batch are reported as failed.
- Parsing errors are shown directly in result/errors.

## Template download

In the import UI, use **Download Template** to get a starter CSV (`project_import_template.csv`) with the correct header row and one example line. That matches the columns in [CSV Template](#csv-template).

## Best practices

- Start with a small CSV (5–10 rows) to validate format.
- Prefer the in-app **Download Template** so headers match exactly.
- Keep header names identical to this guide (case-sensitive for `papaparse` header mapping).
- Use only the supported status values (normalized to uppercase on import).

