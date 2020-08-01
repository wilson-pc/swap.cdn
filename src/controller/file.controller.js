const status = require("http-status-codes");
const { resolve, extname } = require("path");
const sharp = require("sharp");
const { existsSync, createReadStream, unlink } = require("fs");

async function GetImage(req, res, next) {
    let name = req.params.name;
    let originalFormat = extname(name);
    const format = req.query.format;
    let transform = true;
    if (format == undefined) {
        transform = false;
    }

    if (originalFormat == ".gif") {
        transform = false;
        ress;
    }

    if (existsSync(resolve("./assets/images/" + name))) {
        if (transform) {
            let query = req.query;
            let zise = {};
            for (var name1 in query) {
                let temp = parseInt(query[name1] + "");
                if (!isNaN(temp)) {
                    zise[name1] = temp;
                } else {
                    zise[name1] = query[name1];
                }
            }

            res.type(`image/${format || "png"}`);
            Rezise("assets/images/" + name, format, zise).pipe(res);
        } else {
            res.sendFile(resolve("./assets/images/" + name));
        }
    } else {
        res.sendFile(resolve("./static/img/defaultimage.png"));
    }
}
async function uploadImage(req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host') + "/api/v1.0/file/image/" + req.file.filename;

    res.status(status.CREATED).send({ filename: req.file.filename, url: fullUrl });
}
async function SaveImages(req, res, next) {
    let images = [];
    req.files.forEach((element) => {
        var fullUrl = req.protocol + '://' + req.get('host') + "/api/v1.0/file/image/" + element.filename;
        images.push({ filename: element.filename, url: fullUrl });
    });
    res.status(status.CREATED).send({ images: images });
}
async function DeleteImage(req, res, next) {
    let name = req.params.name;
    unlink(resolve("./assets/images/" + name), (err) => {
        if (err) {
            res.status(status.OK).send({ status: false });
        } else {
            res.status(status.OK).send({ status: true });
        }
    });
}

function Rezise(path, format, query) {
    const readStream = createReadStream(path);
    let transform = sharp();

    if (format) {
        transform = transform.toFormat(format);
    }
    transform = transform.resize(query);

    return readStream.pipe(transform);
}



module.exports = { uploadImage, GetImage, DeleteImage, SaveImages }