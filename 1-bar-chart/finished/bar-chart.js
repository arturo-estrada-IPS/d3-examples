(function (d3) {
  const margin = {
    top: 25,
    left: 50,
    right: 20,
    bottom: 70,
  };

  const height = 400 - margin.top - margin.bottom;
  const width = 600 - margin.left - margin.right;

  const chart = d3
    .select("#canvas")
    .append("svg")
    .attr("class", "chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("class", "chart-area")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // https://github.com/d3/d3-time-format
  const formatTime = d3.timeFormat("%B %Y");

  const x = d3.scaleBand().range([0, width]).padding(0.1);
  const y = d3.scaleLinear().range([height, 0]);

  const xAxis = d3.axisBottom(x).ticks(10).tickFormat(formatTime);
  const yAxis = d3.axisLeft(y).ticks(5);

  const chartData = d3.csv("./data.csv");
  chartData.catch(apiError).then(parse).then(draw);

  function parse(data) {
    return data.map((d) => ({
      date: new Date(d.date),
      value: +d.value,
    }));
  }

  function draw(data) {
    x.domain(data.map(({ date }) => date));
    y.domain([0, d3.max(data, ({ value }) => value)]);

    chart
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-44)");

    chart.append("g").attr("class", "y axis").call(yAxis);

    chart
      .selectAll("bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", ({ date }) => x(date))
      .attr("width", x.bandwidth())
      .attr("y", ({ value }) => y(value))
      .attr("height", ({ value }) => height - y(value))
      .style("fill", "steelblue");
  }

  function apiError() {
    console.error("Unable to fetch data");
  }

  // eslint-disable-next-line no-undef
})(d3);
