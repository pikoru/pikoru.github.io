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
const database = firebase.database();
const Scroll = (id) => {
  // Ta in ID att scrolla till.
  // Hitta det ID:t
  var targetId = document.getElementById(id);

  // event.preventDefault();

  // Är jag inte vid domRect.y, fortsätt scrolla en pixel eller fler(scrollLength).
    var targetPos = targetId.getBoundingClientRect().top;
    // console.log(targetId.getBoundingClientRect());
    let currentPos = 0;

    // Kolla ifall targetPos är negativt eller positivt
    var direction = targetPos > 0; // Borde också kolla ifall targetPos  === 0


    if ( direction ) { // true, means scroll down
      const scrollLength = 45;
      const intr = setInterval(() => {
        //


        window.scrollBy(0, scrollLength);
        currentPos += scrollLength;
        //Framme ? stanna där
        if ( currentPos + 20 > targetPos) {
          clearInterval(intr);
         }
      }, 10);
    } else { // Scroll up
      const scrollLength = -30;
      const intr = setInterval(() => {
        window.scrollBy(0, scrollLength);
        currentPos += scrollLength;
        if ( currentPos < targetPos) { clearInterval(intr) }
      },10);
    }
}

// const OnSubmit = (e) => {
//   e.preventDefault();
//   console.log('OnSubmit called');
//   const email = document.getElementById('email-input').value;
//   console.log(email);
//
//   return database.ref('emails').push(email)
//   .then(() => {
//     alert('Email added!!!');
//   }).catch((e) => {
//     console.log('error:', e.message);
//   });
//
// }

// function validateEmail(email) {
//     var char = '@';
//     return char.test(String(email).toLowerCase());
// }

const onSubmit = (e) => {
  e.preventDefault();
  const email = document.getElementById('email-input').value;
  validateEmail(email);
}

const validateEmail = (email) => {
  console.log('validate', email);
  const t = /@/;
  const res = t.test(email);
  console.log(res);
  if ((email.length > 2) && (res)) {
    return database.ref('emails').push(email)
    .then(() => {
      showAlert('success');
    }).catch((e) => {
      console.log('error:', e.message);
      showAlert('error');
    });

  } else {
    console.log('error with email');
    showAlert('error');
  }

}

const showAlert = (type) => {
  switch (type) {
    case 'success':
      document.getElementById('success-text').style.display = 'block';
      document.getElementById('error-text').style.display = 'none';
      break;
    case 'error':
      console.log('error');
      document.getElementById('error-text').style.display = 'block'
      document.getElementById('success-text').style.display = 'none'
      break;
  }

}
