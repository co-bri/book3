function analyze(){

  //
  // Getting To Know the Data
  //

  heading('Examples')

  ask('how many measurements were included in this dataset?', example1)

  ask('how many samples does each measurement contain?', example2)

  ask('at the 10-th measurement, what are valid sample values (> 0)?', example3)
  // a sample value is valid if it is greater than zero

  heading('Measurements and Samples')

  ask('how many unique non-zero, non-negative sample values in this dataset? what are they?', func1)

  ask('what is the average time (seconds) between two measurements?', func2)

  ask('at 09:57:18, how many samples in this measurement have the value 7?', func3)

  ask('which measurement has the most number of samples with the value 3?', func4)

  ask('how many measurements have no sample value greater than zero?', func5)

  ask('which valid (i.e., greater than zero) sample value is the most common?', func6)

  heading('Mapping')

  ask('when was the boat furthest away from NYC (40.7127 N, 74.0059 W)? what was the distance?', func7)
  // use Leaflet to draw a line between NYC and this "furtherest away" location

  ask('what was the path of the boat?', func8)
  // use Leaflet to draw a line between every two locations

  ask('where were the most common sample value measured?', func9)
  // say, your answer to Question Six is 13, draw a marker for each measurement that has
  // at least one sample whose value is 13

  ask('how does the desensity of valid sample values change across the geographical area?', func10)
  // use the brightness to indicate high number of valid sample values each
  // for each measurement, draw a marker,
  // use the brightness to represent the number of valid samples
  // the brighter a spot, the higher the number
  // for those measurements without a valid sample, draw nothing

  heading('Science')

  ask('what is the distribution of fish?', func11)

  ask('what is the distribution of  are schools of zooplankton?', func12)


  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  })
  toggleSourecode()
}

function example1(){
  return items.length
}

function example2(){
  return items[0].Samples.length
}

function example3(){
  return _.filter(items[9].Samples, function(d){
    return d > 0
  }).join(', ')
}

function func1(){
  stuff = _.pluck(items, 'Samples')
  allSamples = _.flatten(stuff)
  uniqueSamples = _.unique(allSamples)
  nonZero = _.filter(uniqueSamples,function(d){
    return d > 0
  })
  nonZero.sort()
  answer = "There are "+nonZero.length+" non-zero samples. They are: "
  _.forEach(nonZero, function(d){
    answer = answer + parseInt(d) + ", "
  })
  
  return answer
}

function func2(){
  // get all the dates
  var times = []
  var date1
  var time1
  _.forEach(items, function(d){
    date1= d.Ping_date
    time1= d.Ping_time
    var dateString = date1+" "+time1
    e = new Date(dateString)
    times.push(e)   
  })
  // FInd all the deltas
  var total_delta = 0
  var last_time = 0
  var first = true
  _.forEach(times, function(t){
    if (first) {
      first = false
    } else{
      total_delta = total_delta + (t - last_time) 
    }
    last_time = t
  })
  var avgTime = total_delta / (times.length - 1 )
  return avgTime/ 1000
}

function func3(){
  var look = _.find(items, function(d){
    return d.Ping_time == "09:57:18"
  })
  var samples = look.Samples
  var sevens = _.filter(samples, function(d){
    return parseInt(d) == 7
  }) 
  return sevens.length
}

function func4(){
  var times = _.groupBy(items, 'Ping_time')
  var threes = _.mapValues(times, function(d){
    x = d[0].Samples
    y = _.filter(x, function(e){
      return parseInt(e) == 3
    })
    return y.length
  })
  threes = _.pairs(threes)
  var threes2 = _.sortBy(threes, function(d){
    return d[1]  
  })
  return threes2[threes2.length - 1][0]
}

function func5(){
  x = _.filter(items, function(d){
    samples = d.Samples
    largest = _.max(samples)
    return largest <= 0
  })
  return x.length
}

function func6(){
  var counts = _.range(60).map(function(){
    return 0
  }) 
  var max = 0
  var maxIndex = 0
  _.forEach(items, function(d){
    _.forEach(d.Samples, function(e){
      f = parseInt(e)
      if ( f > 0 ) {
        counts[f] = counts[f] + 1  
        if ( counts[f] > max) {
          max = counts[f]
          maxIndex = f
        } 
      }
    })
  })
  answer = "The values for the non-zero counts are: "
  thisValue = 0
  _.forEach(counts, function(d){
      if (thisValue > 0){
        answer = answer + thisValue+":"+d+", "
      }
      thisValue = thisValue + 1
  })
  answer = answer + "\n\n and the largest non-zero count is at value "+maxIndex+" with a count of "+max 
  return answer
}

function func7(){

  // this sample code shows how to display a map and put a marker to visualize
  // the location of the first item (i.e., measurement data)
  // you need to adapt this code to answer the question
  console.log(items[1])
  var first = items[0]
  var pos = [first.Latitude, first.Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 5)

  var ny = [40.7127, -74.0059 ]
  var longest = 0
  var p = []
  var dataPoint
  _.forEach(items,function(d){
    point = [parseFloat(d.Latitude), parseFloat(d.Longitude)]
    dist = geolib.getDistance(ny,point)/1000
    if ( dist > longest){
      longest = dist
      p = point
      dataPoint = d
    }
  })
  console.log(p, longest)
  var circle = L.circle(p, 500, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
  }).addTo(map);
 
  var latlngs = [ny, p]
  var polyline = L.polyline(latlngs, {color: 'yellow'}).addTo(map);


  answer = "The boat was farthes away from NYC at "+dataPoint.Ping_time+" and the distance was "+longest+" km"
  return answer
}

function func8(){
  
  var first = items[0]
  var pos = [first.Latitude, first.Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 5)

  var ny = [40.7127, -74.0059 ]
  var p
  var oldp = [parseFloat(first.Latitude), parseFloat(first.Longitude)]
  _.forEach(items,function(d){
    p = [parseFloat(d.Latitude), parseFloat(d.Longitude)]
    var circle = L.circle(p, 5, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
    }).addTo(map);
    if (oldp != p)
    {
      var latlngs = [oldp, p]
      var polyline = L.polyline(latlngs, {color: 'yellow'}).addTo(map);
       oldp = p
    }
  })

return 'Red circles indicate data points, yellow lines are the path'
}

function func9(){
  // The most common sample value was 3
  // Map the locations that included at least one sample value of 3
  places = _.filter(items, function(d){
    threes = _.find(d.Samples , function(e){
      data = parseInt(e)
      return data == 3
    })  
    // if there is at least one sample
    return threes
  })
  console.log(items.length, places.length)

  
  var first = items[0]
  var pos = [first.Latitude, first.Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 5)

  var p
  _.forEach(items,function(d){
    p = [parseFloat(d.Latitude), parseFloat(d.Longitude)]
    var circle = L.circle(p, 5, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
    }).addTo(map);
 })

  _.forEach(places,function(d){
    p = [parseFloat(d.Latitude), parseFloat(d.Longitude)]
    var circle = L.circle(p, 2, {
      color: 'blue',
      fillColor: '#f03',
      fillOpacity: 0.5
    }).addTo(map);
 })


  return 'Red circles indicate each measurement spot, those which include a data point of 3 also have a blue center...'
}

function func10(){
  
  var first = items[0]
  var pos = [first.Latitude, first.Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 5)

 var densityMap = []
  var maxDensity = 0
  _.forEach(items, function(d){
    p = [parseFloat(d.Latitude), parseFloat(d.Longitude)]
    validSamples = _.filter( d.Samples, function(e){
      s = parseInt(e)
      return s > 0
    }) 
    density = validSamples.length
    if (density > maxDensity ) { maxDensity = density }
    densityMap.push( {'position':p, 'density':density})
  }) 
  console.log(densityMap)

  _.forEach(densityMap,function(d){
    p = d.position
    if (d.density > 0 ){  
      shade = d.density / maxDensity
      console.log(shade)
      
      var circle = L.circle(p, 5, {
        color: 'red',
        fillColor: 'red',
        fillOpacity: shade
      }).addTo(map);
    }
   })


  return 'Points with valid samples and shade indicates numer of valid samples at that location ...'
}

var byPosition = []
var byDepth = []

function func11(){

// Larger -- big fish
//18 kHz is mapped to 1 -> index 0
//38 kHz is mapped to 3 -> 1
//70 kHz is mapped to 29 -> 2
//120 kHz is mapped to 7 -> 3
//200 kHz is mapped to 13 ->  
// Smaller -- plankton

  var setReading = _.range(5).map(function(){ 
    return 0
  })

  byDepth = _.range(1000).map(function(){ 
    return  _.range(5).map(function(){ 
    	return 0
    })
  })

  _.forEach(items, function(d){
    p = [parseFloat(d.Latitude), parseFloat(d.Longitude)]
    thisReading = setReading
    depthIndex = 0
    _.forEach(d.Samples, function(e){
      datum = parseInt(e)
      if ( datum > 0 ){
        if ( datum >= 29 ){
          thisReading[2] = thisReading[2] + 1
          byDepth[depthIndex][2] = byDepth[depthIndex][2] + 1 
          datum = datum - 29
        }  
        if (datum >= 13 ){
          thisReading[4] = thisReading[4] + 1 
          byDepth[depthIndex][4] = byDepth[depthIndex][4] + 1 
          datum = datum - 13
        } 
        if (datum >= 7 ){
          thisReading[3] = thisReading[3] + 1 
          byDepth[depthIndex][3] = byDepth[depthIndex][3] + 1 
          datum = datum - 7
        } 
        if (datum >= 3 ){
          thisReading[1] = thisReading[1] + 1 
          byDepth[depthIndex][1] = byDepth[depthIndex][1] + 1 
          datum = datum - 3
        } 
        if (datum >= 1 ){
          thisReading[0] = thisReading[0] + 1 
          byDepth[depthIndex][0] = byDepth[depthIndex][0] + 1 
          datum = datum - 7
        }
        if ( datum > 0 ) { console.log("error datum = ", datum) } 
      }   
      depthIndex = depthIndex + 1 
    })
    byPosition.push({'position': p, 'reading':thisReading}) 
  })
  console.log(byDepth)
  console.log(byPosition)
  answer = "The distribution of fish by size found (frequency) at each depth, larger to smaller is "
  depth = 1
  _.forEach(byDepth, function(d){
    _.forEach(d, function(e){
      answer = answer + e + ", " 
    }) 
    answer = answer + "at a depth of "+depth*2+"m,              "
    depth = depth + 1 
  })
  return answer
}

function func12(){

  answer = "The plankton (smalles animal, therfore largest frequency) at each depth is "
  depth = 1
  _.forEach(byDepth, function(d){
    if (d[4] > 0) { 
      answer = answer + "count of "+d[4]+" at a depth of "+depth*2+"m, \r\n  "
    }
    depth = depth + 1 
  })
  return answer

}



