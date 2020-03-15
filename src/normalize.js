/* jshint esversion: 8 */
/* eslint indent: 0 */

const fs = require('fs');

const epochOffset = 1000;
const eventsJsonFile = 'public/events_raw.json';
const eventsJsonFileNormalized = 'public/events_normalized.json';
const eventList = {
  events: [],
};
const eventListNormalized = {
  events: [],
};

const normalize = (file) => {
  const doesRawFileExist = fs.existsSync(eventsJsonFile);
  if (!doesRawFileExist) {
    console.error(`Error: file at path \'${eventsJsonFile}\' does not exist`);
    return;
  }

  // File exists so let's attempt to read it as JSON object
  // ( async not necessary for now, so readFileSync > readFile )
  let fileContents = fs.readFileSync(eventsJsonFile, 'utf8');
  if (fileContents === null) {
    console.error('Error: failed to read file contents');
    return;
  }

  fileContents = fileContents.trim();

  // Normalize the JSON data structure
  for (const line of fileContents.split('\n')) {
    const json = JSON.parse(line);
    if (!json) {
      console.error(`Error: could not parse json of string \'${line}\'`);
      return;
    }

    eventList.events.push(json);
  }

  // Normalize the actual data
  const logonUnknown = 'Logon-Unknown';
  const logonSuccess = 'Logon-Success';
  const logonFailure = 'Logon-Failure';
  eventList.events.forEach((event) => {
    const newEvent = {};

    // AcmeApiId
    if (event.id) {
      newEvent.AcmeApiId = event.id;
    }

    // UserName
    if (event.user_Name) {
      let username;

      if (event.user_Name.trim().toLowerCase().includes('username is:')) {
        username = event.user_Name.trim().toLowerCase().split(': ')[1];
      } else {
        username = event.user_Name.toLowerCase();
      }

      newEvent.UserName = username;
    }

    // SourceIp
    if (event.ips) {
      if (typeof(event.ips) === 'object' && Array.isArray(event.ips)) {
        newEvent.SourceIp = event.ips[1];
      } else {
        newEvent.SourceIp = event.ips;
      }
    }

    // Target
    if (event.target) {
      newEvent.Target = event.target;
    }

    // EventTime
    if (event.DateTimeAndStuff) {
      const date = new Date(event.DateTimeAndStuff * epochOffset);
      if (date) {
        newEvent.EventTime = date;
      } else {
        newEvent.EventTime = '';
      }
    }

    // Action
    if (event.EVENT_0_ACTION) {
      let eventType = '';

      switch (event.EVENT_0_ACTION.toLowerCase()) {
        case ('logon very success'):
          eventType = logonSuccess;
          break;
        case ('success'):
          eventType = logonSuccess;
          break;
        case ('login success'):
          eventType = logonSuccess;
          break;
        case ('success login'):
          eventType = logonSuccess;
          break;
        case ('failed login'):
          eventType = logonFailure;
          break;
        case ('login failed'):
          eventType = logonFailure;
          break;
        case ('idk'):
          eventType = logonUnknown;
          break;
        default:
          eventType = logonUnknown;
          break;
      }

      newEvent.Action = eventType;
    }

    // Add to all events
    eventListNormalized.events.push(newEvent);
  });

  // Write events to disk
  fs.unlink(eventsJsonFileNormalized, (error) => {
    if (error) {
      console.error('Error:', error);
      return;
    }
  });

  fs.appendFileSync(eventsJsonFileNormalized,
                    JSON.stringify(eventListNormalized),
                    'utf8');
};

normalize(eventsJsonFile);
