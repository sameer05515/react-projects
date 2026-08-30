
const fs = require("fs");
const path = require("path");
const {
    PDFDocument
} = require("pdf-lib");


// ======================================================
// Configuration
// ======================================================

const SUPPORTED_EXTENSIONS = [
    ".jpg",
    ".jpeg",
    ".png"
];


// ======================================================
// Main
// ======================================================

async function createPdf(folderPath, outputPdf) {

    // --------------------------------------------------
    // Validate folder
    // --------------------------------------------------

    if (!fs.existsSync(folderPath)) {
        throw new Error(
            `Folder does not exist: ${folderPath}`
        );
    }


    const folderStats =
        fs.statSync(folderPath);


    if (!folderStats.isDirectory()) {
        throw new Error(
            `Not a directory: ${folderPath}`
        );
    }


    // --------------------------------------------------
    // Read files
    // --------------------------------------------------

    let files =
        fs.readdirSync(folderPath);


    // --------------------------------------------------
    // Filter images
    // --------------------------------------------------

    files = files
        .filter(file => {

            const extension =
                path.extname(file)
                    .toLowerCase();

            return SUPPORTED_EXTENSIONS
                .includes(extension);

        })
        .sort((a, b) =>
            a.localeCompare(
                b,
                undefined,
                {
                    numeric: true,
                    sensitivity: "base"
                }
            )
        );


    if (files.length === 0) {

        throw new Error(
            "No supported images found."
        );

    }


    console.log(
        `Found ${files.length} images`
    );


    // --------------------------------------------------
    // Create PDF
    // --------------------------------------------------

    const pdfDoc =
        await PDFDocument.create();


    // --------------------------------------------------
    // Add images
    // --------------------------------------------------

    for (
        let i = 0;
        i < files.length;
        i++
    ) {

        const file = files[i];

        const imagePath =
            path.join(
                folderPath,
                file
            );


        console.log(
            `[${i + 1}/${files.length}] ${file}`
        );


        const imageBytes =
            fs.readFileSync(imagePath);


        const extension =
            path.extname(file)
                .toLowerCase();


        let image;


        // ----------------------------------------------
        // JPG
        // ----------------------------------------------

        if (
            extension === ".jpg" ||
            extension === ".jpeg"
        ) {

            image =
                await pdfDoc.embedJpg(
                    imageBytes
                );

        }


        // ----------------------------------------------
        // PNG
        // ----------------------------------------------

        else if (
            extension === ".png"
        ) {

            image =
                await pdfDoc.embedPng(
                    imageBytes
                );

        }


        if (!image) {
            continue;
        }


        // ----------------------------------------------
        // Original image dimensions
        // ----------------------------------------------

        const imageWidth =
            image.width;

        const imageHeight =
            image.height;


        // ----------------------------------------------
        // Create page with same aspect ratio
        //
        // Maximum page size:
        // 595 x 842 (A4)
        // ----------------------------------------------

        const A4_WIDTH = 595;

        const A4_HEIGHT = 842;

        const margin = 20;


        const maxWidth =
            A4_WIDTH - margin * 2;

        const maxHeight =
            A4_HEIGHT - margin * 2;


        const scale =
            Math.min(
                maxWidth / imageWidth,
                maxHeight / imageHeight
            );


        const drawWidth =
            imageWidth * scale;

        const drawHeight =
            imageHeight * scale;


        // ----------------------------------------------
        // Create A4 page
        // ----------------------------------------------

        const page =
            pdfDoc.addPage([
                A4_WIDTH,
                A4_HEIGHT
            ]);


        // ----------------------------------------------
        // Center image
        // ----------------------------------------------

        const x =
            (A4_WIDTH - drawWidth) / 2;

        const y =
            (A4_HEIGHT - drawHeight) / 2;


        page.drawImage(
            image,
            {
                x,
                y,

                width: drawWidth,

                height: drawHeight
            }
        );

    }


    // --------------------------------------------------
    // Save PDF
    // --------------------------------------------------

    const pdfBytes =
        await pdfDoc.save();


    fs.writeFileSync(
        outputPdf,
        pdfBytes
    );


    console.log("");
    console.log(
        "======================================"
    );

    console.log(
        "PDF created successfully"
    );

    console.log(
        `Output: ${outputPdf}`
    );

    console.log(
        `Images: ${files.length}`
    );

    console.log(
        "======================================"
    );

}


// ======================================================
// Command line arguments
// ======================================================

const folderPath =
    process.argv[2];


const outputPdf =
    process.argv[3];


if (!folderPath) {

    console.log(`
Usage:

node app.js <folder> [output.pdf]

Example:

node app.js "D:\\Photos\\Trip"

Example with output:

node app.js "D:\\Photos\\Trip" "D:\\Photos\\Trip.pdf"
`);

    process.exit(1);
}


// ======================================================
// Default output
// ======================================================

const finalOutput =
    outputPdf ||
    path.join(
        folderPath,
        "photos.pdf"
    );


// ======================================================
// Run
// ======================================================

createPdf(
    folderPath,
    finalOutput
)
    .catch(error => {

        console.error("");
        console.error(
            "ERROR:",
            error.message
        );

        process.exit(1);

    });

