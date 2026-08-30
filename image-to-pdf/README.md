# Image Folder to PDF

A simple **Node.js utility** that converts all supported images from a folder into a single PDF file.

Each image is placed on a separate **A4 page**, automatically scaled while preserving its original aspect ratio.

---

## Features

* Convert a folder of images into one PDF
* Supports:

  * `.jpg`
  * `.jpeg`
  * `.png`
* One image per PDF page
* A4 page size
* Automatically scales images to fit the page
* Preserves image aspect ratio
* Centers images on the page
* Natural filename sorting
* Custom output PDF path
* Works on Windows, Linux and macOS

---

## Requirements

* Node.js 18+
* npm

Check your Node.js version:

```bash
node --version
```

Check npm:

```bash
npm --version
```

---

## Project Structure

```text
image-to-pdf/
│
├── app.js
├── package.json
└── README.md
```

---

## Installation

Clone or copy the project:

```bash
git clone <repository-url>
cd image-to-pdf
```

Install dependencies:

```bash
npm install
```

---

## Dependencies

The application uses:

```text
pdf-lib
```

`pdf-lib` is used to create the PDF and embed JPG/PNG images.

---

## Basic Usage

Run:

```bash
node app.js "<folder-path>"
```

### Windows

```bash
node app.js "D:\Photos\Trip"
```

The generated PDF will be:

```text
D:\Photos\Trip\photos.pdf
```

### Linux / macOS

```bash
node app.js "/home/prem/photos/trip"
```

The generated PDF will be:

```text
/home/prem/photos/trip/photos.pdf
```

---

## Custom Output File

You can specify the output PDF path as the second argument.

```bash
node app.js "<folder-path>" "<output-pdf>"
```

Example:

```bash
node app.js "D:\Photos\Trip" "D:\Photos\trip-2026.pdf"
```

Output:

```text
D:\Photos\trip-2026.pdf
```

---

## Example

Suppose your folder contains:

```text
D:\Photos\Trip
│
├── 001.jpg
├── 002.jpg
├── 003.png
├── 004.jpg
└── 005.jpeg
```

Run:

```bash
node app.js "D:\Photos\Trip"
```

The utility creates:

```text
D:\Photos\Trip\photos.pdf
```

The PDF will contain:

```text
Page 1 → 001.jpg
Page 2 → 002.jpg
Page 3 → 003.png
Page 4 → 004.jpg
Page 5 → 005.jpeg
```

---

## Image Sorting

Images are sorted naturally by filename.

For example:

```text
1.jpg
2.jpg
3.jpg
10.jpg
11.jpg
```

Instead of normal alphabetical sorting:

```text
1.jpg
10.jpg
11.jpg
2.jpg
3.jpg
```

the application produces:

```text
1.jpg
2.jpg
3.jpg
10.jpg
11.jpg
```

This is useful for photos named sequentially.

---

## Supported Image Formats

Currently supported:

| Extension | Supported |
| --------- | --------- |
| `.jpg`    | ✅         |
| `.jpeg`   | ✅         |
| `.png`    | ✅         |
| `.gif`    | ❌         |
| `.webp`   | ❌         |
| `.bmp`    | ❌         |
| `.tiff`   | ❌         |

The supported extensions can be changed in `app.js`:

```javascript
const SUPPORTED_EXTENSIONS = [
    ".jpg",
    ".jpeg",
    ".png"
];
```

---

## PDF Page Layout

Each image is placed on an A4 page.

```text
┌──────────────────────────┐
│                          │
│                          │
│       ┌──────────┐       │
│       │          │       │
│       │  IMAGE   │       │
│       │          │       │
│       └──────────┘       │
│                          │
│                          │
└──────────────────────────┘
```

The image is automatically scaled to fit within the page margins.

The image's original aspect ratio is preserved.

---

## Image Scaling

The application uses the following logic:

```javascript
const scale =
    Math.min(
        maxWidth / imageWidth,
        maxHeight / imageHeight
    );

const drawWidth =
    imageWidth * scale;

const drawHeight =
    imageHeight * scale;
```

This prevents the image from being stretched or distorted.

---

## Output Example

Console output:

```text
Found 5 images

[1/5] 001.jpg
[2/5] 002.jpg
[3/5] 003.png
[4/5] 004.jpg
[5/5] 005.jpeg

======================================
PDF created successfully
Output: D:\Photos\Trip\photos.pdf
Images: 5
======================================
```

---

## Invalid Folder

If the folder doesn't exist:

```bash
node app.js "D:\Photos\DoesNotExist"
```

Output:

```text
ERROR: Folder does not exist: D:\Photos\DoesNotExist
```

---

## No Images

If the folder doesn't contain supported images:

```text
ERROR: No supported images found.
```

---

## Invalid Arguments

Running without a folder:

```bash
node app.js
```

Displays:

```text
Usage:

node app.js <folder> [output.pdf]

Example:

node app.js "D:\Photos\Trip"

Example with output:

node app.js "D:\Photos\Trip" "D:\Photos\Trip.pdf"
```

---

## Run Using npm

The `package.json` contains:

```json
{
    "scripts": {
        "start": "node app.js"
    }
}
```

Therefore you can also run:

```bash
npm start -- "D:\Photos\Trip"
```

With custom output:

```bash
npm start -- "D:\Photos\Trip" "D:\Photos\trip.pdf"
```

---

## How It Works

The application follows these steps:

```text
Folder
   │
   ▼
Read directory
   │
   ▼
Find image files
   │
   ▼
Sort filenames
   │
   ▼
Create PDF
   │
   ▼
Read image
   │
   ▼
Embed image
   │
   ▼
Calculate scaling
   │
   ▼
Create A4 page
   │
   ▼
Center image
   │
   ▼
Add page
   │
   ▼
Save PDF
```

---

## Important Notes

### Large Images

The utility embeds the original image data into the PDF.

Very large images or a folder containing hundreds/thousands of high-resolution images can result in a large PDF and increased memory usage.

For example:

```text
100 × 10 MB images
        ↓
Potentially very large PDF
```

For large photo collections, image resizing/compression before embedding is recommended.

---

## Future Improvements

Possible enhancements:

* [ ] Web UI
* [ ] EJS interface
* [ ] Drag & drop folder
* [ ] Recursive subfolder support
* [ ] JPG/PNG/WebP support
* [ ] Image compression
* [ ] Image quality selection
* [ ] A4 / Letter / Legal page sizes
* [ ] Portrait / Landscape
* [ ] Multiple images per page
* [ ] Custom margins
* [ ] Page numbering
* [ ] Filename below image
* [ ] PDF metadata
* [ ] Progress bar
* [ ] Cancel PDF generation
* [ ] Batch folder processing
* [ ] Thumbnail preview
* [ ] PDF password protection

---

## License

This project is provided for personal and educational use.

You can modify and extend it as required.
