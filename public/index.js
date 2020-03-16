/* jshint esversion: 8 */
/* eslint indent: 0 */

d3.json('events_normalized.json', (error, data) => {
  const tabulate = (data, columns) => {
    const table = (d3.select('body').append('table')
                   .style('border-collapse', 'collapse')
                   .style('border', '2px black solid'));
    const thead = table.append('thead');
    const tbody = table.append('tbody');
    data = data.events;

    // Append the header row to the table
    (thead.append('tr')
     .selectAll('th')
     .data(columns).enter()
     .append('th')
     .text((column) => {
       return column;
     }));

    // Create a data row for each object in the data (for each event)
    const rows = (tbody.selectAll('tr')
                  .data(data)
                  .enter()
                  .append('tr'));

    // Create a cell for each data item in each event
    const cells = (rows.selectAll('td')
                   .data((row) => {
                     return columns.map((column) => {
                       return {column: column, value: row[column]};
                     });
                   })
                   .enter()
                   .append('td')
                   .text((d) => {
                     return d.value;
                   }));

    return table;
  };

  // Render the table
  tabulate(data, [
    'AcmeApiId', 'UserName', 'SourceIp',
    'Target', 'EventTime', 'Action',
  ]);
});
