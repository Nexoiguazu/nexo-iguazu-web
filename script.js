(function(){
  var el = document.getElementById('updated');
  if(el){
    el.textContent = new Date().toLocaleDateString('es-AR', { year:'numeric', month:'long', day:'numeric' });
  }
})();