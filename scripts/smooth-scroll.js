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
