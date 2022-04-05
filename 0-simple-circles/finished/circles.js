(function (d3) {
  const margin = 20;
  const width = 600 - margin * 2;
  const height = 400 - margin * 2;

  const circleData = [
    5, 6, 10, 11, 14, 9, 17, 8, 7, 22, 4, 13, 19, 2, 1, 3, 9, 12, 15, 16,
  ].map((c, idx) => ({
    x: Math.random() * (width - c * 2) + c,
    y: Math.random() * (height - c * 2) + c,
    radius: c,
    idx,
  }));

  const svg = d3
    .select("#canvas")
    .append("svg")
    .attr("class", "svg")
    .attr("width", width + margin * 2)
    .attr("height", height + margin * 2);

  svg
    .selectAll("circles")
    .data(circleData)
    .enter()
    .append("circle")
    .attr("cx", ({ x }) => x)
    .attr("cy", ({ y }) => y)
    .attr("r", ({ radius }) => radius)
    .attr("fill", ({ idx }) => d3.schemeCategory10[idx % 10]);
  // eslint-disable-next-line no-undef
})(d3);
