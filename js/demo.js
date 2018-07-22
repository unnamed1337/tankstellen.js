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
  
  var count = 10;
  $.each(test,function(k,v){
    count--;
    var row="<tr><td>"+v.brand+"</td><td>"+v.name+"</td><td>"+v.diesel+"</td><td>"+v.e5+"</td><td>"+v.e10+"</td><td>"+v.isOpen+"</td><td>"+v.place+"</td><td>"+v.postCode+"</td><td>"+v.street+"</td><td>"+v.houseNumber+"</td></tr>";
    $('#listdemo').append(row);
    if(count <= 0){
      return false;
    }
  });
});