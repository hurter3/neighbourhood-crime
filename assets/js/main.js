
        queue()
            .defer(d3.json, "assets/data/streetcrime.json")
            .await(makeGraphs);
        
        function makeGraphs(error, transactionsData) {
            var ndx = crossfilter(transactionsData);
            var name_dim = ndx.dimension(dc.pluck('category'));
            var total_per_category = name_dim.group().reduceCount();
            dc.pieChart('#piechart')
                .height(350)
                .radius(100)
                .transitionDuration(1500)
                .dimension(name_dim)
                .group(total_per_category)
                .slicesCap(4);
            
            
           
       
            
            dc.renderAll();
        }
    
  
    var map = new Datamap({element: document.getElementById('#map')});
