/**
 * @file utils Resizer.js
 * @author Rizky Adji Pangestu
 */

const sharp = require("sharp");
const path = require("path");
const datetime = require("./datetime");

class Resizer {
  constructor(folder, prefix = "") {
    this.folder = folder;
    this.prefix = prefix;
  }

  async save(buffer) {
    const filename = `${this.prefix}${datetime()}.webp`;
    const filepath = this.filepath(filename);

    // Resize image to 360p resolution
    await sharp(buffer)
      .resize(480, 360, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFormat("webp")
      .toFile(filepath);

    return filename;
  }

  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`);
  }
}

module.exports = Resizer;
