var tankstellen;

(function(){
  var initialized,apiKey,lat,lng,radius,type,order;
  var basePath="https://creativecommons.tankerkoenig.de/json/";
  var listPath=basePath+"list.php";
  var pricePath=basePath+"prices.php";
  var dateilPath=basePath+"detail.php";
  function Init(data){
    let returnVal;
    if(data.apiKey!==undefined){
       apiKey=data.apiKey;7
       returnVal = "done";
    }
    else{
      apiKey="00000000-0000-0000-0000-000000000002";
      returnVal="Using Demo key - will only return test data";
    }
    initialized=true;
    return returnVal;
  }
  function Search(data){
    if(initialized && data !== undefined){
      lat=data.latitude!==undefined?data.latitude:50.941278;
      lng=data.longitude!==undefined?data.longitude:6.958281;
      radius=data.apiKey!==undefined?data.radius:10;
      radius=radius>=25?25:radius;
      type=data.spritType!==undefined?data.spritType:"all";
      type=(type=="e5"||type=="e10"||type=="diesel"||type=="all")?type:"all";
      order=data.sortBy!==undefined?data.sortBy:"price";
      order=(order=="price"||order=="dist")?order:"price";    
      $.ajax({
        url:listPath,
        data:{
          lat:lat,
          lng:lng,
          rad:radius,
          sort:order,
          type:type,
          apikey:apiKey
        },
        success: function(response){
          if(response.ok){
            console.log(response.stations);
            return response.stations;
          }
          else{
            console.log(response.message);
            return false;
          }
        }
      });
    }
    else if(data == undefined){
      return false;
    }
    else{
      console.log("Not initialized.");
      return false;
    }
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
  
  tankstellen.Init = Init;
  tankstellen.Finden = Search;
  tankstellen.Preise = prices;
  tankstellen.Details = detail;
}( tankstellen || (tankstellen = {})));