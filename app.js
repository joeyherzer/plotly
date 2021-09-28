d3.json("./samples.json").then(function(data) {
    d3.select("#selectorData")
     .selectAll("option")
     .data(data.names)
     .enter()
     .append("option")
     .text(sample)
     .attr("value",d=>d);

 optionChanged(d3.select("#selectorData").property("value"));
});

// Create Horizontal Bar Chart
function CreateHBar(x,y,text) {
 var data = [{
     type: 'bar',
     x: x,
     y: y,
     text: text,
     orientation: 'h'
 }];

 var layout = {
     title: "Top 10 OTUs Found"
   };

 Plotly.newPlot('bar', data, layout);
}

// Create Bubble Chart
function CreateBubble(x,y,text) {
 var data = [{
     x: x,
     y: y,
     text: text,
     mode: 'markers',
     marker: {
       size: y,
       color: x.map(value=>value)
     }
 }];
 var layout = {
     title: "OTU Values",
     xaxis: {
         title: {
           text: 'OTU IDs',
         }
     }
 };
 Plotly.newPlot('bubble', data, layout);
}


function Meta(data) {
 var div = d3.select("#selectorData");
 div.html("")
 var list = div.append("ul");
 Object.entries(data).forEach(([key, value]) => {
     list.append("li").text(key + ": " + value);
  });
}

// Load all charts
function optionChanged(value) {
 d3.json("./samples.json").then(function(data) {
     var metadata = data.metadata.filter(data => data.id ==value);
     var sample = data.samples.filter(data => data.id ==value);
 
     CreateHBar(sample[0].sample_values.slice(0,10).reverse(),sample[0].otu_ids.slice(0,10).reverse().map(a=>"OTU "+ a),sample[0].otu_labels.slice(0,10).reverse());
     CreateBubble(sample[0].otu_ids,sample[0].sample_values,sample[0].otu_labels);
     Meta(metadata[0]);
    ;
 });


}
