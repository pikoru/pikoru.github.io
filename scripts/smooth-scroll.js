const Scroll = (id) => {
  // Ta in ID att scrolla till.
  // console.log(id);
  // Hitta det ID:t
  // console.log('Scrolling');
  const targetId = document.getElementById(id);
  event.preventDefault(); // Inte säker på om den här faktiskt behövs.
  // console.log(targetId);
  // const domRect = targetId.getBoundingClientRect();

  // räkna ut värdet mellan "här" och det ID:t
  // Scrolla så långt

  // För att ändra speed:
  // Är jag inte vid domRect.y, fortsätt scrolla en pixel eller fler.
    const targetPos = targetId.getBoundingClientRect().y;
    let currentPos = 0;

    // KOLLA ifall targetPos är negativt eller positivt
    const direction = targetPos > 0; // Borde också kolla ifall targetPos  === 0
    if ( direction ) { // true, means scroll down
      const scrollLength = 15;
      // console.log(scrollLength);
      const intr = setInterval(() => {

        window.scrollBy(0, scrollLength);
        currentPos += scrollLength;
        if ( currentPos + 20 > targetPos) { clearInterval(intr) }
      },10);
    } else { // Scroll up
      const scrollLength = -15;
      // console.log(scrollLength);
      const intr = setInterval(() => {
        window.scrollBy(0, scrollLength);
        currentPos += scrollLength;
        if ( currentPos < targetPos) { clearInterval(intr) }
      },10);
    }

}
