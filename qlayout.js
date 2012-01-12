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
    this.style.left = e.offsetX;
    this.style.top  = e.offsetY;
  }

  function registerAsDarggable(dom) {
    dom.setAttribute('draggable', true);

    dom.addEventListener('dragstart', handleDragStart, false);
    dom.addEventListener('dragenter', handleDragEnter, false);
    dom.addEventListener('dragover', handleDragOver, false);
    dom.addEventListener('dragleave', handleDragLeave, false);
    dom.addEventListener('drop', handleDrop, false);
    dom.addEventListener('dragend', handleDragEnd, false);
  }

  return {
    registerAsDarggable : registerAsDarggable
  }
})();


$(document).ready(function() {
  var elements = $('#container > div');
  var i;
  for(i=0; i < elements.length; i++) {
    qLayout.registerAsDarggable(elements[i]);
  }
});
