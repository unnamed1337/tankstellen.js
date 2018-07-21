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
      returnVal="Used DemoKey - Will only return test data";
    }
    initialized=true;
    return returnVal;
  }
  function Search(data){
    if(initialized){
      lat=data.latitude!==undefined?data.latitude:50.941278;
      lng=data.longitude!==undefined?data.longitude:6.958281;
      radius=data.apiKey!==undefined?data.radius:10;
      radius=radius>=25?25:radius;
      type=data.spritType!==undefined?data.spritType:"all";
      type=(type=="e5"||type=="e10"||type=="diesel"||type=="all")?type:"all";
      order=data.sortBy!==undefined?data.sortBy:"dist";
      order=(order=="price"||order=="dist")?order:"dist";    
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
            return response;
          }
          else{
            console.log(response.message);
            return false;
          }
        }
      });
    }
    else{
      console.log("Not initialized.");
      return false;
    }
  }
  
  tankstellen.Init = Init;
  tankstellen.Finden = Search;
}( tankstellen || (tankstellen = {})));