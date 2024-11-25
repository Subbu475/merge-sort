const container = document.getElementById("array-container");
const generateButton = document.getElementById("generate");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resumeButton = document.getElementById("resume");
const explanation = document.getElementById("explanation");
const progressBar = document.getElementById("progress");

let array = [];
let delay = 300;
let isPaused = false;

// Generate Random Array
function generateArray() {
  array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 150) + 10);
  renderArray();
  explanation.textContent = "Click 'Start Sorting' to begin!";
  updateProgress(0);
}

// Render Array
function renderArray() {
  container.innerHTML = "";
  array.forEach((value) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${value}px`;
    bar.style.width = "20px";
    bar.textContent = value;
    container.appendChild(bar);
  });
}

// Update Progress Bar
function updateProgress(percent) {
  progressBar.style.width = `${percent}%`;
}

// Delay Animation
function delayAnimation(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Merge Sort Visualization
async function mergeSort(arr, l = 0, r = arr.length - 1) {
  if (l < r) {
    const m = Math.floor((l + r) / 2);

    explanation.textContent = `Dividing array into two halves: ${arr.slice(l, m + 1)} and ${arr.slice(m + 1, r + 1)}`;
    await delayAnimation(delay);

    // Recursively divide the array into two halves
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);

    // Merge the two halves
    await merge(arr, l, m, r);
  }
}

// Merge function
async function merge(arr, l, m, r) {
  const left = arr.slice(l, m + 1);
  const right = arr.slice(m + 1, r + 1);
  let i = 0;
  let j = 0;
  let k = l;

  explanation.textContent = `Merging arrays: [${left}] and [${right}]`;

  // Merge arrays
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      updateBar(k, arr[k]);
      i++;
    } else {
      arr[k] = right[j];
      updateBar(k, arr[k]);
      j++;
    }
    k++;
    await delayAnimation(delay);
  }

  // Copy remaining elements
  while (i < left.length) {
    arr[k] = left[i];
    updateBar(k, arr[k]);
    i++;
    k++;
    await delayAnimation(delay);
  }
  while (j < right.length) {
    arr[k] = right[j];
    updateBar(k, arr[k]);
    j++;
    k++;
    await delayAnimation(delay);
  }

  updateProgress(((r + 1) / array.length) * 100);
}

// Update the visualization bar
function updateBar(index, value) {
  const bars = document.querySelectorAll(".bar");
  bars[index].style.height = `${value}px`;
  bars[index].textContent = value;
  bars[index].classList.add("active");
  setTimeout(() => {
    bars[index].classList.remove("active");
  }, delay);
}

// Event Listeners
generateButton.addEventListener("click", generateArray);
startButton.addEventListener("click", () => {
  isPaused = false;
  mergeSort(array);
});
pauseButton.addEventListener("click", () => {
  isPaused = true;
  explanation.textContent = "Sorting paused. Click 'Resume' to continue.";
});
resumeButton.addEventListener("click", () => {
  isPaused = false;
  explanation.textContent = "Sorting resumed!";
});

// Initialize on page load
generateArray();
