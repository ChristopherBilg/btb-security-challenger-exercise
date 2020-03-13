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

## Commands to run
**Python 3.6+ was used as a language requirement as well as "npm install" to install the dependencies.**

"npm run ingest" -> ingest the data from the public URL<br />
"npm run visualize" -> start a local server (127.0.0.1:8080) to display the normalized data<br />
"npm run test" -> run the testing scripts for the source code files<br />
"npm run lint" -> run the linting scripts for the source and test code files<br />