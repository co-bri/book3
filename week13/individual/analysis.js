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
  return nonZero.length
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
  console.log(threes)
  threes = _.pairs(threes)
  var threes2 = _.sortBy(threes, function(d){
    return d[1]  
  })
  console.log(threes2)
  return threes2[threes2.length - 1][0]
}

function func5(){
  x = _.filter(items, function(d){
    samples = d.Samples
    console.log(samples, d)
    largest = _.max(samples)
    console.log(largest)
    return largest <= 0
  })
  return x.length
}

function func6(){
  return '...'
}

function func7(){

  // this sample code shows how to display a map and put a marker to visualize
  // the location of the first item (i.e., measurement data)
  // you need to adapt this code to answer the question

  var first = items[0]
  var pos = [first.Latitude, first.Longitude]
  var el = $(this).find('.viz')[0]    // lookup the element that will hold the map
  $(el).height(500) // set the map to the desired height
  var map = createMap(el, pos, 5)

  var circle = L.circle(pos, 500, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
  }).addTo(map);
  return '...'
}

function func8(){
  return '...'
}

function func9(){
  return '...'
}

function func10(){
  return '...'
}

function func11(){
  return '...'
}

function func12(){
  return '...'
}
