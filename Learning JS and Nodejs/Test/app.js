// let name = prompt("What is your name?");
// document.getElementById('welcome').innerHTML = `Welcome ${name}`;

let product1 = 'Pizza',
    price1 = 30,
    product2 = 'Cake',
    price2 = 50;


html = `
        <ul>
            <li>Item: ${product1} </li>
            <li>Price: ${price1} </li>
            <li>Item: ${product2} </li>
            <li>Price: ${price2} </li>
            <li>Total: ${price1 + price2} </li>
       `;

document.querySelector('#app').innerHTML = html;




array = [10,20,100,45,3,30,45];
sorted = array.sort((a,b) => a - b);
console.log(sorted);

const data = Map();

