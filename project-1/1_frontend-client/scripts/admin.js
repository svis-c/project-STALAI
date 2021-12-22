// Variables
const ordersInProgressTableElement = document.querySelector(
  '#orders-in-progress'
);
const ordersCompletedTableElement = document.querySelector('#orders-completed');

let orders = [];
// Funtions
// ---- inside fetch (in then) we will:
// -- geting orders data from API: http://localhost:5000/api/orders

const getOrdersInProgress = () => {
  return fetch('http://localhost:5000/api/orders')
    .then((response) => response.json())
    .then((data) => showOrdersInProgress(data));
};
// creates HTML form ordersInProgressTableElement
// table item must have button which makes them completed
// ----- filter orders (data) to: 1. completedOrders

const showOrdersInProgress = (ordersArray) => {
  let tableBodyRows = ordersArray.reduce((total, item) => {
    if (!item.completed) {
      total += `
      <tr id='${item._id}'>
  <td id='order-name' >${item.name}</td>
  <td id='order-email' >${item.email}</td>
  <td id='order-phone' >${item.phone}</td>
  <td id='order-dimenssions' >${item.dimenssions}</td>
  <td id='order-comments' >${item.comments}</td>
  <td id='order-status' >${(item.completed.innerText = 'Vykdoma')}</td>
  <td><button class='btn-secondary btn-completed' data-order-id='${
    item._id
  }'>Atlikta</button></td>
  
    </tr>
    `;
      return total;
    }
  }, '');
  ordersInProgressTableElement.innerHTML = `
  <table>
  <thead>
  <tr>
  <th> Vardas, Pavardė </th>
  <th> El. paštas </th>
  <th> Telefonas </th>
  <th> Stalo išmatavimai </th>
  <th> Komentarai </th>
  <th> Statusas </th>
 
  </tr>
  </thead>
  <tbody>
  ${tableBodyRows}
   </tbody>
  
  
  </table>
  
    `;
  const btnsUpdate = document.querySelectorAll('.btn-completed');
  btnsUpdate.forEach((btn) => btn.addEventListener('click', CompleteOrder));
};

const CompleteOrder = (e) => {
  const orderId = e.target.dataset.orderId;

  const trs = document.querySelectorAll('tr');

  const trToComplete = Array.from(trs).filter((tr) => tr.id === orderId)[0];

  const orderCompleted = {
    name: trToComplete.children[0].innerText,
    email: trToComplete.children[1].innerText,
    phone: trToComplete.children[2].innerText,
    dimenssions: trToComplete.children[3].innerText,
    comments: trToComplete.children[4].innerText,
    completed: (trToComplete.children[5].innerText = true),
  };

  fetch(`http://localhost:5000/api/orders/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderCompleted),
  })
    .then((response) => response.json())
    .then((data) => {
      showOrdersInProgress(data);
    });
};

// ----- filter orders (data) to:  2. CompletedOrders

// ----- calling createCompletedOrdersTable(completedOrders) and createInProgressOrdersTable(inProgressOrders)

// -- create completed orders table
// creates HTML for ordersCompletedTableElement
const getCompletedOrders = () => {
  return fetch('http://localhost:5000/api/orders')
    .then((response) => response.json())
    .then((data) => showCompletedOrders(data));
};
// creates HTML form ordersInProgressTableElement
// table item must have button which makes them completed
// ----- filter orders (data) to: 1. completedOrders

const showCompletedOrders = (completedOrdersArray) => {
  let tableBodyRowsCompleted = completedOrdersArray.reduce((total, item) => {
    if (item.completed.value) {
      total += `
    <tr id='${item._id}'>
  <td id='order-name' >${item.name}</td>
  <td id='order-email' >${item.email}</td>
  <td id='order-phone' >${item.phone}</td>
  <td id='order-dimenssions' >${item.dimenssions}</td>
  <td id='order-comments' >${item.comments}</td>
  <td><button class='btn-secondary btn-archive' data-order-id='${item._id}'>Archyvuoti</button></td>
  
    </tr>
    `;
      return total;
    }
  }, '');
  ordersCompletedTableElement.innerHTML = `
  <table>
  <thead>
  <tr>
  <th> Vardas, Pavardė </th>
  <th> El. paštas </th>
  <th> Telefonas </th>
  <th> Stalo išmatavimai </th>
  <th> Komentarai </th>
 
  </tr>
  </thead>
  <tbody>
  ${tableBodyRowsCompleted}
   </tbody>
  
  
  </table>
  
    `;
  const btnsArchive = document.querySelectorAll('.btn-archive');
  //btnsArchive.forEach((btn) => btn.addEventListener('click', ArchiveOrder));
};

// Events
document.addEventListener('DOMContentLoaded', getOrdersInProgress);
document.addEventListener('DOMContentLoaded', getCompletedOrders);
