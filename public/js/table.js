// This file aims to convert the output JSON file to a readable table

let tableBody = document.querySelector('tbody');
let d = new Date();
// parameter is an array of objects
function rowCreate(article){
  let tableRow = tableBody.insertRow();
  tableRow.insertCell().innerHTML = `<a href=${article.url} > ${article.title} </a>`;
  tableRow.insertCell().innerHTML = d;
}

function tableCreate(articles){
  articles.forEach(rowCreate);
}

axios.post('/api/websites/site/1').then(function (rsp) {
  tableCreate(rsp.data.article);
});

