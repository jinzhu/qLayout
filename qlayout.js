var qLayout = (function() {
  function handleDragStart(e) {
    this.style.opacity = '0.5';
    e.dataTransfer.start_position = {x: e.pageX, y: e.pageY};
  }

  function handleDragOver(e) {
    if (e.preventDefault) { e.preventDefault(); }
    return false;
  }

  function handleDragEnter(e) {
    doHoverAction(e);
  }

  function handleDragLeave(e) {
    doNormalAction(e);
  }

  function doHoverAction(e) {
    e.target.setAttribute("data-qlayout-action", "hover");
  }

  function doMoveAction(e) {
    e.target.setAttribute("data-qlayout-action", "move");
  }

  function doNormalAction(e) {
    e.target.setAttribute("data-qlayout-action", "normal");
  }

  function handleDrop(e) {
    if (e.stopPropagation) { e.stopPropagation(); } // stops the browser from redirecting.
    return false;
  }

  function handleDragEnd(e) {
    var start_position = e.dataTransfer.start_position;
    this.style.left = parseInt(this.style.left) + (e.pageX - start_position.x);
    this.style.top  = parseInt(this.style.top) + (e.pageY - start_position.y);
  }

  function registerAsDarggable(dom) {
    dom.setAttribute('draggable', true);

    dom.addEventListener('mouseover', doHoverAction, false);
    dom.addEventListener('mouseout', doNormalAction, false);

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
  for(i=elements.length-1; i >= 0; i--) {
    qLayout.registerAsDarggable(elements[i]);
  }
});
