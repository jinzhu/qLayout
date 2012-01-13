var qLayout = (function() {
  ////////////////////////////////////////////////////////////////////////////////
  // Drag Events
  ////////////////////////////////////////////////////////////////////////////////
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

  function handleDrop(e) {
    if (e.stopPropagation) { e.stopPropagation(); } // stops the browser from redirecting.
    return false;
  }

  function handleDragEnd(e) {
    var start_position = e.dataTransfer.start_position;
    this.style.left = parseInt(this.style.left) + (e.pageX - start_position.x);
    this.style.top  = parseInt(this.style.top) + (e.pageY - start_position.y);
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Element Actions
  ////////////////////////////////////////////////////////////////////////////////
  function doAction(e, action) {
    var elem = (e instanceof HTMLElement) ? e : e.target;
    elem.setAttribute("data-qlayout-action", action);
  }

  function doHoverAction(e) {
    doAction(e, 'hover');
  }

  function doMoveAction(e) {
    doAction(e, 'move');
  }

  function doNormalAction(e) {
    doAction(e, 'normal');
  }
  ////////////////////////////////////////////////////////////////////////////////

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

    dom.setAttribute("data-qlayout-element", true);
  }

  function init(elem) {
    function refresh() {
      var children = elem.querySelectorAll('[data-qlayout-element]');
      for (var i=0; i < children.length; i++) {
        registerAsDarggable(children[i]);
      }
    }

    function html(value) {
      if (value) { elem.innerHTML = value; refresh(); }
      return elem.innerHTML;
    }

    refresh();

    return {
      add  : registerAsDarggable,
      html : html
    }
  }

  return {
    init : init
  }
})();


// Code used for test
var qlayout;
$(document).ready(function() {
  qlayout = qLayout.init(document.getElementById('container'));

  if (localStorage.qlayout) {
    qlayout.html(localStorage.qlayout)
  } else {
    var elements = $('#container > div');
    for (var i=elements.length-1; i >= 0; i--) {
      qlayout.add(elements[i]);
    }
  }
});

function saveLayout() {
  localStorage.qlayout = qlayout.html();
  document.location.reload();
}

function removeSavedLayoutAndRefresh() {
  localStorage.removeItem('qlayout');
  document.location.reload();
}
