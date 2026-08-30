
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = 3000;

const ALLOWED_EXTENSIONS = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".bmp"
];


// --------------------------------------------------
// Express configuration
// --------------------------------------------------

app.set("view engine", "ejs");

app.set(
    "views",
    path.join(__dirname, "views")
);

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);


// --------------------------------------------------
// Home page
// --------------------------------------------------

app.get("/", (req, res) => {

    res.render("index", {
        folderPath: "",
        images: [],
        error: null
    });

});


// --------------------------------------------------
// Load gallery
// --------------------------------------------------

app.post("/gallery", async (req, res) => {

    const folderPath =
        req.body.folderPath?.trim();

    if (!folderPath) {

        return res.render("index", {
            folderPath: "",
            images: [],
            error: "Please enter a folder path."
        });

    }


    try {

        // Check folder exists
        const stats =
            await fs.promises.stat(folderPath);


        // Make sure it is a directory
        if (!stats.isDirectory()) {

            return res.render("index", {
                folderPath,
                images: [],
                error:
                    "The given path is not a directory."
            });

        }


        // Read files
        const files =
            await fs.promises.readdir(
                folderPath
            );


        // Filter images
        const images = files
            .filter(file => {

                const extension =
                    path.extname(file)
                        .toLowerCase();

                return ALLOWED_EXTENSIONS
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
            )
            .map((file, index) => ({

                id: index,

                name: file,

                url:
                    `/image?folder=${encodeURIComponent(
                        folderPath
                    )}&file=${encodeURIComponent(
                        file
                    )}`

            }));


        // Render gallery
        res.render("index", {

            folderPath,

            images,

            error: null

        });

    } catch (error) {

        console.error(error);

        res.render("index", {

            folderPath,

            images: [],

            error:
                "Unable to read the folder. " +
                "Please check the path and permissions."

        });

    }

});


// --------------------------------------------------
// Serve image
// --------------------------------------------------

app.get("/image", async (req, res) => {

    const folder =
        req.query.folder;

    const file =
        req.query.file;


    if (!folder || !file) {

        return res
            .status(400)
            .send("Invalid request");

    }


    /*
     * Only use the filename portion.
     *
     * This prevents:
     *
     * ../../secret.txt
     *
     * from being used as the filename.
     */

    const safeFileName =
        path.basename(file);


    const imagePath =
        path.join(
            folder,
            safeFileName
        );


    const extension =
        path.extname(imagePath)
            .toLowerCase();


    if (!ALLOWED_EXTENSIONS
        .includes(extension)) {

        return res
            .status(400)
            .send("Unsupported file type");

    }


    try {

        const stats =
            await fs.promises.stat(
                imagePath
            );


        if (!stats.isFile()) {

            return res
                .status(404)
                .send("Image not found");

        }


        res.sendFile(
            path.resolve(imagePath)
        );

    } catch (error) {

        console.error(error);

        res
            .status(404)
            .send("Image not found");

    }

});


// --------------------------------------------------
// Start server
// --------------------------------------------------

app.listen(
    PORT,
    () => {

        console.log(
            `Server running at http://localhost:${PORT}`
        );

    }
);

