const dropBtn = document.querySelector(".drop-btn");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const xBtn = document.querySelector(".x-btn");
const menuContainer = document.querySelector(".menuContainer");
const dropDown = document.querySelector(".drop-down");

function animate({ timing, draw, duration }) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction);

    draw(progress); // draw it
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

function hamburgerBtnClick() {
  hamburgerMenu.classList.toggle("hidden");
  xBtn.classList.toggle("hidden");
  menuContainer.classList.toggle("hidden");
  animate({
    duration: 200,
    timing(timeFraction) {
      return timeFraction;
    },
    draw(progress) {
      dropDown.style.cssText = `height: ${progress * 100}%;`;
    },
  });
}

function xBtnClick() {
  animate({
    duration: 100,
    timing(timeFraction) {
      return timeFraction;
    },
    draw(progress) {
      newHeight = 100 - progress * 100;
      dropDown.style.cssText = `height: ${newHeight}%;`;
      if (progress >= 1) {
        hamburgerMenu.classList.toggle("hidden");
        xBtn.classList.toggle("hidden");
        menuContainer.classList.toggle("hidden");
      }
    },
  });
}

// FIRST -- USING setInterval. THE ABOVE IS BETTER, PER https://javascript.info/js-animation

// function hamburgerBtnClick() {
//   hamburgerMenu.classList.toggle("hidden");
//   xBtn.classList.toggle("hidden");
//   menuContainer.classList.toggle("hidden");
//   let start = Date.now();
//   let timer = setInterval(function () {
//     let timePassed = Date.now() - start;
//     if (timePassed >= 200) {
//       clearInterval(timer);
//       return;
//     }
//     draw(timePassed);
//   }, 4);
// }

// function xBtnClick() {
//   let start = Date.now();
//   let timer = setInterval(function () {
//     let timePassed = Date.now() - start;
//     if (timePassed >= 100) {
//       clearInterval(timer);
//       hamburgerMenu.classList.toggle("hidden");
//       xBtn.classList.toggle("hidden");
//       menuContainer.classList.toggle("hidden");
//       return;
//     }
//     unDraw(timePassed);
//   }, 4);
// }

// function draw(timePassed) {
//   dropDown.style.cssText = `height: ${timePassed / 2}%;`;
//   console.log({ timePassed, height: dropDown.style.height });
// }

// function unDraw(timePassed) {
//   newHeight = 100 - timePassed / 2;
//   dropDown.style.cssText = `height: ${newHeight}%;`;
//   console.log({ timePassed, height: dropDown.style.height });
// }
