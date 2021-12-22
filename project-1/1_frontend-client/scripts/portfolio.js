// Variables
const portfoliosContainerElement = document.querySelector(
  '#portfolios-container'
);

// Funtions
// -- get data
const getData = () => {
  return fetch('http://localhost:5000/api/portfolio')
    .then((res) => res.json())
    .then((data) => showData(data));
};

// -- show data
const showData = (array) => {
  portfoliosContainerElement.innerHTML = array.reduce((total, item) => {
    total += `
      <div>
        <img src="../assets/images/${item.image}" />
        <ul>
            <li>${item.description}</li>
            <li>${item.dimensions}</li>
            <li>${item.color}</li>
        </ul>
      </div>
      `;

    return total;
  }, '');
};

// Events
document.addEventListener('DOMContentLoaded', getData);
