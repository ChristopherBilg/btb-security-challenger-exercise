/* jshint esversion: 8 */

const fs = require('fs');

const eventsJsonFile = 'public/events_raw.json';

const normalize = (file) => {
  const doesRawFileExist = fs.existsSync(eventsJsonFile);
  if (!doesRawFileExist) {
    console.error(`Error: file at path \'${eventsJsonFile}\' does not exist`);
    return;
  }

  // File exists so let's attempt to read it as JSON object
  // ( async not necessary for now, so readFileSync > readFile )
  const fileContents = fs.readFileSync(eventsJsonFile, 'utf8');
  if (fileContents === null) {
    console.error('Error: failed to read file contents');
    return;
  }

  console.log(fileContents);
};

normalize(eventsJsonFile);
