/*  
  TODO: Create Demo
*/

$(function(){
  tankstellen.Init({
    apiKey:"00000000-0000-0000-0000-000000000002"
  });
  
  
  var test = tankstellen.Finden({
    sortBy:"dist"
  });
  
  console.log(test);
});