const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".webp",
    ".bmp"
];

app.get("/", (req, res) => {
    res.render("index", {
        folderPath: "",
        images: [],
        error: null
    });
});

app.post("/gallery", async (req, res) => {

    const folderPath = req.body.folderPath?.trim();

    if (!folderPath) {
        return res.render("index", {
            folderPath: "",
            images: [],
            error: "Please enter a folder path."
        });
    }

    try {

        const stats = await fs.promises.stat(folderPath);

        if (!stats.isDirectory()) {
            return res.render("index", {
                folderPath,
                images: [],
                error: "The given path is not a directory."
            });
        }

        const files = await fs.promises.readdir(folderPath);

        const images = files
            .filter(file => {
                const extension = path.extname(file).toLowerCase();
                return allowedExtensions.includes(extension);
            })
            .map((file, index) => ({
                id: index,
                name: file,
                url: `/image?folder=${encodeURIComponent(folderPath)}&file=${encodeURIComponent(file)}`
            }));

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
            error: "Unable to read the folder. Please check the path and permissions."
        });
    }
});

app.get("/image", async (req, res) => {

    const folder = req.query.folder;
    const file = req.query.file;

    if (!folder || !file) {
        return res.status(400).send("Invalid request");
    }

    /*
        Security:
        Only take the filename portion so something like:

        ../../secret.txt

        cannot be directly used as the requested filename.
    */
    const safeFileName = path.basename(file);

    const imagePath = path.join(folder, safeFileName);

    const extension = path.extname(imagePath).toLowerCase();

    if (!allowedExtensions.includes(extension)) {
        return res.status(400).send("Unsupported file type");
    }

    try {

        const stats = await fs.promises.stat(imagePath);

        if (!stats.isFile()) {
            return res.status(404).send("Image not found");
        }

        res.sendFile(path.resolve(imagePath));

    } catch (error) {
        console.error(error);
        res.status(404).send("Image not found");
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});