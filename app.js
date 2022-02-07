const lines = document.querySelector(".lines");
const loadBtn = document.getElementById("loadBtn");
const pizzaSlicesEl = document.getElementsByClassName("pizza-slices")[0];
const loadMessageEl = document.getElementsByClassName("load-message")[0];
const circleTextEl = document.getElementsByClassName("circle-text")[0];
let pizzaSliceCount = 0
let isLoading = false;


loadBtn.addEventListener("click", async () => {
  await fetchPizzaData().then(() => {
    if (!isLoading && pizzaSliceCount) {
      pizzaSlicesEl.classList.add("active");
      circleTextEl.innerText = `Pizza for ${pizzaSliceCount}`;

      createLines(pizzaSliceCount);
    }
  });
});

function createLine(rotation) {
  const element = document.createElement("span");
  const transform = `rotateZ(${rotation}deg)`;

  element.style.transform = transform;
  element.classList.add("line");
  lines.appendChild(element);
}

function createLines(linesCount) {
  clearLines();

  const angleFactor = 360 / linesCount;
  for (let i = 0; i < linesCount; i++) {
    createLine(angleFactor * i);
  }
}

function clearLines() {
  lines.innerHTML = ''
}

function getPizzaSlices(array) {
  return array.filter((el) => el.eatsPizza).length
}

async function fetchPizzaData() {
  isLoading = true;
  loadBtn.classList.add('loading');
  loadMessageEl.classList.add('active');
  await fetch("https://gp-js-test.herokuapp.com/pizza")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      isLoading = false;
      loadBtn.classList.remove("loading");
      loadMessageEl.classList.remove("active");
      pizzaSliceCount = getPizzaSlices(data.party);
    });
}
