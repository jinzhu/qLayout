var qLayout = (function() {
  function handleDragStart(e) {
    this.style.opacity = '0.5';
  }

  function handleDragOver(e) {
    if (e.preventDefault) { e.preventDefault(); }
    return false;
  }

  function handleDragEnter(e) {
  }

  function handleDragLeave(e) {
  }

  function handleDrop(e) {
    if (e.stopPropagation) { e.stopPropagation(); } // stops the browser from redirecting.
    return false;
  }

  function handleDragEnd(e) {
    this.style.left = parseInt(this.style.left) + e.offsetX;
    this.style.top  = parseInt(this.style.top) + e.offsetY;
  }

  function registerAsDarggable(dom) {
    dom.setAttribute('draggable', true);

    dom.addEventListener('dragstart', handleDragStart, false);
    dom.addEventListener('dragenter', handleDragEnter, false);
    dom.addEventListener('dragover', handleDragOver, false);
    dom.addEventListener('dragleave', handleDragLeave, false);
    dom.addEventListener('drop', handleDrop, false);
    dom.addEventListener('dragend', handleDragEnd, false);

    var old_position    = dom.getBoundingClientRect();
    var parent_position = document.getElementById('container').getBoundingClientRect();
    dom.style.left      = old_position.left - parent_position.left;
    dom.style.top       = old_position.top - parent_position.top;
    dom.style.float     = 'none';
    dom.style.position  = 'absolute';
  }

  return {
    registerAsDarggable : registerAsDarggable
  }
})();


$(document).ready(function() {
  var elements = $('#container > div');
  var i;
  for(i=elements.length-1; i > 0; i--) {
    qLayout.registerAsDarggable(elements[i]);
  }
});
