'use strict';

var Submit = function Submit() {
  alert('submit');
};

var Click = function Click() {
  console.log('click');
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Scroll = exports.Scroll = function Scroll(id) {
  // Ta in ID att scrolla till.
  // Hitta det ID:t
  var targetId = document.getElementById(id);

  // event.preventDefault();

  // Är jag inte vid domRect.y, fortsätt scrolla en pixel eller fler(scrollLength).
  var targetPos = targetId.getBoundingClientRect().top;
  // console.log(targetId.getBoundingClientRect());
  var currentPos = 0;

  // Kolla ifall targetPos är negativt eller positivt
  var direction = targetPos > 0; // Borde också kolla ifall targetPos  === 0


  if (direction) {
    // true, means scroll down
    var scrollLength = 45;
    var intr = setInterval(function () {
      //


      window.scrollBy(0, scrollLength);
      currentPos += scrollLength;
      //Framme ? stanna där
      if (currentPos + 20 > targetPos) {
        clearInterval(intr);
      }
    }, 10);
  } else {
    // Scroll up
    var _scrollLength = -30;
    var _intr = setInterval(function () {
      window.scrollBy(0, _scrollLength);
      currentPos += _scrollLength;
      if (currentPos < targetPos) {
        clearInterval(_intr);
      }
    }, 10);
  }
};
