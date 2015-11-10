//
// TODO: implement the logic to decide whether or not to make a trade
//
var keyWordEffects = [
{'word':'game','effect':-1},
{'word':'news','effect':-1},
{'word':'money','effect':1},
{'word':'fun','effect':1},
{'word':'good','effect':1},
{'word':'actor','effect':1},
{'word':'news','effect':-1},
{'word':'movies','effect':-1},
{'word':'tech','effect':-1},
{'word':'music','effect':1},
{'word':'people','effect':-1},
{'word':'apple','effect':1},
{'word':'google','effect':0}]

function decideWhetherOrNotToTrade(item){
  length = keyWordEffects.length
  buyDollars = 0
  sellDollars = 0
  t = item.tweet.toLowerCase()
  for (i = 0; i<length; i++) {
    if ( t.search(keyWordEffects[i].word) != -1 ){
      if (keyWordEffects[i].effect == 1) {
        sellDollars = sellDollars + 1
      } else if ( keyWordEffects[i].effect == -1 ) {
        buyDollars = buyDollars + 1
      }
    }
  }
  if (bank.currency === 'USD'){ 
    if ( sellDollars >  buyDollars )
      trade()
  } else {
  // you have bitcoins 
    if ( buyDollars > sellDollars ) 
    {
      trade()
    }  
  }  
}
var oldTweets = []
var oldTweet = "" 
function trackEffects(tweet, price){  
  priceDelta = price - oldPrice 
  console.log(tweet) 
  x = tweet 
  if (priceDelta > 0){ 
    console.log("price up",price) 
    logHigher(oldTweet)   
  } else if (priceDelta < 0 ){ 
    console.log("price down",price) 
    logLower(oldTweet) 
  } else { 
    console.log("no change",price) 
  } 
  oldPrice = price 
  oldTweet = tweet 
  if (priceDelta > 0) 
  { 
    console.log("counts:",wordCounts) 
  } 
} 


var oldPrice = 1000
var keyWords = [
'game',
'news',
'money',
'fun',
'good',
'actor',
'news',
'movies',
'tech',
'music',
'people',
'apple',
'google']
var wordCounts = []



function setCounts(words){
  length = words.length
  for (i=0; i<length; i++) {
    wordCounts.push({'word':words[i],'up':0,'down':0,'noChange':0})
  }
}

function logHigher(t){
  len2 = wordCounts.length
  t.toLowerCase()
  for (j = 0; j < len2; j++){
    if(t.search(wordCounts[j].word) != -1){
      wordCounts[j].up = wordCounts[j].up + 1
      console.log("up:",wordCounts[j].word)
    }
  }
}

function logLower(t){
  len2 = wordCounts.length
  t.toLowerCase()
  for (j = 0; j < len2; j++){
    if(t.search(wordCounts[j].word) != -1){
      wordCounts[j].down = wordCounts[j].down + 1
      console.log("down:",wordCounts[j].word)
    }
  }
}


