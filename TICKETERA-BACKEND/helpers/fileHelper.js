const fs = require("fs");
const path = require("path");
const { logger } = require("../logger");

const deleteTmpFiles = (folderPath = "", olderThanSeconds = 3600) => {
  try {
    const files = fs.readdirSync(folderPath);

    const currentTime = Date.now();

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const fileStats = fs.statSync(filePath);
      const fileAgeInSeconds = (currentTime - fileStats.mtime.getTime()) / 1000;

      if (fileAgeInSeconds > olderThanSeconds) {
        fs.unlinkSync(filePath);
        logger.info(`Deleted file: ${filePath}`);
      }
    });

    return "Files deleted successfully.";
  } catch (error) {
    logger.error(error);
    return "";
  }
};

const checkAndCreateFolder = (folderPath) => {

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
}

const getCleanName = (name) => {
  let modifiedString = name.replace(/ /g, '_');

  // Convertir a minúsculas
  modifiedString = modifiedString.toLowerCase();

  // Reemplazar tildes y caracteres especiales
  const accentMap = {
    'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
    'ü': 'u', 'ñ': 'n'
  };

  modifiedString = modifiedString.replace(/[áéíóúüñ]/g, match => accentMap[match] || match);
  modifiedString = modifiedString.replace(/[^a-z0-9_]/g, '');

  return modifiedString;
}

module.exports = { deleteTmpFiles, checkAndCreateFolder, getCleanName };