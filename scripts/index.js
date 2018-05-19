"use strict";

// import { Scroll } from './scroll';
console.log('functions are loaded correctly');
var config = {
  apiKey: "AIzaSyDFWC9p9viBaemsqO3WLDCPE2tjCH65Ey4",
  authDomain: "pikoru-afa35.firebaseapp.com",
  databaseURL: "https://pikoru-afa35.firebaseio.com",
  projectId: "pikoru-afa35",
  storageBucket: "pikoru-afa35.appspot.com",
  messagingSenderId: "361342662087"
};
firebase.initializeApp(config);
var database = firebase.database();

var Scroll = function Scroll(id) {
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

var onSubmit = function onSubmit(e) {
  e.preventDefault();
  var email = document.getElementById('email-input').value;
  validateEmail(email);
};

var validateEmail = function validateEmail(email) {
  console.log('validate', email);
  var t = /@/;
  var res = t.test(email);
  console.log(res);
  if (email.length > 2 && res) {
    return database.ref('emails').push(email).then(function () {
      showAlert('success');
    }).catch(function (e) {
      console.log('error:', e.message);
      showAlert('error');
    });
  } else {
    console.log('error with email');
    showAlert('error');
  }
};

var showAlert = function showAlert(type) {
  switch (type) {
    case 'success':
      document.getElementById('success-text').style.display = 'block';
      document.getElementById('error-text').style.display = 'none';
      break;
    case 'error':
      console.log('error');
      document.getElementById('error-text').style.display = 'block';
      document.getElementById('success-text').style.display = 'none';
      break;
  }
};

var unCheck = function unCheck() {

  setTimeout(function () {
    document.getElementById('navi-toggle').checked = false;
  }, 100);

  document.removeEventListener('click', unCheck);
};

function hideOnClickOutside(element) {
  var outsideClickListener = function outsideClickListener(event) {

    if (!element.contains(event.target)) {

      if (document.getElementById('navi-toggle').checked === true) {
        document.addEventListener('click', unCheck);
      }
    }
  };

  var isVisible = function isVisible(element) {

    var visibility = window.getComputedStyle(element).visibility;
    if (visibility === 'visible') {
      return true;
    } else {
      return false;
    }
  };

  var removeClickListener = function removeClickListener() {
    document.removeEventListener('click', outsideClickListener);
  };

  document.addEventListener('click', outsideClickListener);
}

//lazy Loading
var lazyLoadSections = function lazyLoadSections() {
  document.addEventListener("DOMContentLoaded", function () {
    var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy"));

    if ("IntersectionObserver" in window) {
      var lazyBackgroundObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            lazyBackgroundObserver.unobserve(entry.target);
          } else if (entry.isIntersecting === undefined) {
            //fallback if polyfill is needed and fails.
            entry.target.classList.add("visible");
            lazyBackgroundObserver.unobserve(entry.target);
          }
        });
      });

      lazyBackgrounds.forEach(function (lazyBackground) {
        lazyBackgroundObserver.observe(lazyBackground);
      });
    } else {
      //skip lazy loading.
      lazyBackgrounds.forEach(function (element) {
        element.classList.add('visible');
      });
    }
  });
};

var lazyLoadImages = function lazyLoadImages() {
  document.addEventListener("DOMContentLoaded", function () {
    var lazyImages = [].slice.call(document.querySelectorAll(".lazy-img"));

    if ("IntersectionObserver" in window) {
      var lazyImageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy-img");
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });

      lazyImages.forEach(function (lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    }
  });
};

hideOnClickOutside(document.getElementById('nav'));
lazyLoadSections();
lazyLoadImages();
