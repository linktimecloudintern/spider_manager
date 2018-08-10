
let tableBody = document.querySelector('tbody');

function rowCreate(article){
  let tableRow = tableBody.insertRow();
  tableRow.insertCell().innerHTML = article.pageTitle;
  tableRow.insertCell().innerHTML = article.pageSize;
  tableRow.insertCell().innerHTML = article.updateTime;
}

function tableCreate(articles){
  articles.forEach(rowCreate);
}

tableCreate([
  {
      "pageURL":"https://www.githubArticle1.com",
      "pageTitle": "githubArticle1",
      "pageSize":"50kB",
      "updateTime":"2018-07-31"
  },
  {
      "pageURL":"https://www.githubArticle2.com",
      "pageTitle": "githubArticle2",
      "pageSize":"51kB",
      "updateTime":"2018-07-31"
  },
  {
      "pageURL":"https://www.githubArticle3.com",
      "pageTitle": "githubArticle3",
      "pageSize":"53kB",
      "updateTime":"2018-07-31"
  }
]);
