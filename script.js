let cityData;

d3.csv('cities.csv', d3.autoType).then(data=>{ 
    data = data.filter(function (city) {  //filter out non-EU cities
        return city.eu === true;
    })
    cityData = data;
    console.log('cities', cityData);

    d3.select('.city-count').text(function() {
        return "Number of Cities: " + cityData.length}); //display Number of Cities

    const w = 700;
    const h = 550;
    const svg = d3.select('.population-plot')
                    .append('svg')
                    .attr('width', w)
                    .attr('height', h)
    
    //create datapoints
    svg.selectAll("circle")
        .data(cityData)
        .enter()
        .append("circle")
        .attr('cx', (d, i) => d.x)
        .attr('cy', (d) => d.y)
        .attr('r', function(d){
            if (d.population < 1000000){
                return 4;
            } else {
                return 8;
            }
        })
        .attr("fill", "#4695eb");

    //create labels
    svg.selectAll("text")
        .data(cityData)
        .enter()
        .append("text")
        .text(function(d){
            return d.country
        })
        .attr("x", function(d){
            return d.x;
        })
        .attr("y", function(d){
            return d.y-12;
        })
        .attr("text-anchor", "middle")
        .attr("font-size", 11)
        .attr("opacity", function(d){
            if (d.population < 1000000){
                return 0;
            } else {
                return 1;
            }
        })
        

})


