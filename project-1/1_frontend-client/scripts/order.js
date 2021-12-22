// Variables
const addOrderFormELement = document.querySelector('#order-form');
const formSubmitMessageElement = document.querySelector('#form-submit-message');
// Funtions
// -- send order to API: http://localhost:5000/api/orders
// --- data from form
const addOrder = (e) => {
  e.preventDefault();
  const order = {
    name: e.target.name.value,
    email: e.target.email.value,
    phone: e.target.phone.value,
    dimenssions: e.target.dimenssions.value,
    comments: e.target.freetext.value,
  };
  return fetch('http://localhost:5000/api/orders', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .then((data) => {
      formSubmitMessageElement.innerHTML = data.message;
      formSubmitMessageElement.classList.add('message');

      addOrderFormELement.reset();
      
    });
};

// --- fetching data from form to API using POST method

// Events
addOrderFormELement.addEventListener('submit', addOrder);
