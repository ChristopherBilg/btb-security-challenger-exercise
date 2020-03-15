/* jshint esversion: 8 */
d3.json('events_normalized.json', (error, data) => {
  const tabulate = (data, columns) => {
    const table = (d3.select('body').append('table')
                   .style('border-collapse', 'collapse')
                   .style('border', '2px black solid'));
    const thead = table.append('thead');
    const tbody = table.append('tbody');
    data = data.events;

    // append the header row
    (thead.append('tr')
     .selectAll('th')
     .data(columns).enter()
     .append('th')
     .text((column) => {
       return column;
     }));

    // create a row for each object in the data
    const rows = (tbody.selectAll('tr')
                  .data(data)
                  .enter()
                  .append('tr'));

    // create a cell in each row for each column
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

  // render the table(s)
  tabulate(data, [
    'AcmeApiId', 'UserName', 'SourceIp',
    'Target', 'EventTime', 'Action',
  ]);
});
