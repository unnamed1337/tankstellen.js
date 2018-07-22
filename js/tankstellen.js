var tankstellen;
(function(){
  var initialized,apiKey,lat,lng,radius,type,order;
  var basePath="https://creativecommons.tankerkoenig.de/json/";
  var listPath=basePath+"list.php";
  var pricePath=basePath+"prices.php";
  var datailPath=basePath+"detail.php";
  function Init(data){
    if(data.apiKey!==undefined){
       apiKey=data.apiKey;7
    }
    else{
      apiKey="00000000-0000-0000-0000-000000000002";
      console.log("Using Demo key - will only return test data");
    }
    initialized=true;
    return true;
  }
  function Search(data){
    let returnVal;
    data = data!==undefined?data:"";
    if(initialized && data !== undefined){
      lat=data.latitude!==undefined?data.latitude:50.941278;
      lng=data.longitude!==undefined?data.longitude:6.958281;
      radius=data.apiKey!==undefined?data.radius:5;
      radius=radius>=25?25:radius;
      type=data.spritType!==undefined?data.spritType:"all";
      type=(type=="e5"||type=="e10"||type=="diesel"||type=="all")?type:"all";
      order=data.sortBy!==undefined?data.sortBy:"dist";
      order=(order=="price"||order=="dist")?order:"dist";    
      $.ajax({
        url:listPath,
        async:false,
        cache:false,
        data:{
          lat:lat,
          lng:lng,
          rad:radius,
          sort:order,
          type:type,
          apikey:apiKey
        }
      }).done(function(response){
          if(response.status=="ok"){
            returnVal = response.stations;
          }
          else{
            console.error(response.message);
            returnVal = false;
          }
        }
      );
    }
    else if(data == undefined){
      returnVal = false;
    }
    else{
      console.error("Not initialized.");
      returnVal = false;
    }
    return returnVal;  
  }
  function prices(data){
    if(initialized){
      /*
        TODO
      */
    }
    else{
      console.log("Not initialized.");
      return false;
    }
  }
  function detail(data){
    let returnVal,id;
    if(initialized){
      id=data.id!==undefined?data.id:"4409a024-b190-4b4c-aa69-cb2cd3b4ca0a";
      $.ajax({
        url:datailPath,
        async:false,
        cache:false,
        data:{
          id:id,
          apikey:apiKey
        }
      }).done(function(response){
          if(response.status=="ok"){
            returnVal = response.station;
          }
          else{
            console.error(response.message);
            returnVal = false;
          }
        }
      );
    }
    else{
      console.log("Not initialized.");
      returnVal = false;
    }
    return returnVal;
  }
  
  tankstellen.Init = Init;
  tankstellen.Finden = Search;
  tankstellen.Preise = prices;
  tankstellen.Details = detail;
}( tankstellen || (tankstellen = {})));