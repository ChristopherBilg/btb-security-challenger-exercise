# btb-security-challenger-exercise
Source code of the BTB Security "Challenger" interview exercise

## Links
[challenger.btbsecurity.com](https://challenger.btbsecurity.com/)<br />
[Authentication token link](https://challenger.btbsecurity.com/auth)<br />
[Event list link](https://challenger.btbsecurity.com/get-events): Usage: "/get-events?from=1000&to=2000" will return event records 1000-2000

## Tasks - Data Collection
1. Obtain the authorization token.
2. Establish a connection with the newly aquired authorization token.
3. Download all event data.
4. Normalize all of the newly aquired event data.
5. Save normalized event data to a JSON file on disk.

## Tasks - Data Visualization
1. Create a front-end web application to view the normalized event data.
2. Create graphs (for presentation) of some useful information seen in the normalized event data.

## Commands that can be run
**Run the command: "npm install" to install the dependencies.**

- "npm run ingest" -> ingest the data from the public URL (exports to public/events_raw.json)
- "npm run normalize" -> take the ingested data, and normalize it into workable data (exports to public/events_normalized.json)
- "npm run visualize" -> start a local server (127.0.0.1:8080) to display the normalized data
- "npm run test" -> run the testing scripts for the source code files
- "npm run lint" -> run the linting scripts for the source and test code files

## Commands to run for full 'challenge requirements' (Running commands out of order will yield correct error handled messages as well)
1. "npm run ingest"
2. "npm run normalize"
3. "npm run visualize"
4. After running command #3, open up your browser to 127.0.0.1:8080 (localhost:8080)
