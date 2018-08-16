
//declare variables and functions
const listDiv = document.querySelector('.list');
const listUl = listDiv.querySelector('ul');
const addItemInput = document.querySelector('input.addItemInput');
const addItemButton = document.querySelector('button.addItemButton');
const crawlButton = document.querySelector('button.Crawl');
const siteSelected = document.querySelector('.siteSelected');
const lis = listUl.children;
const firstListItem = listUl.firstElementChild;
const lastListItem = listUl.lastElementChild;
let tableBody = document.querySelector('tbody');
const d = new Date();

function attachListItemButtons(li) {

  let select = document.createElement('button');
  select.className = 'select';
  select.textContent = 'Select';
  li.appendChild(select); 

  let remove = document.createElement('button');
  remove.className = 'remove';
  remove.textContent = 'Remove';
  li.appendChild(remove);

}

// parameter is an array of objects
function rowCreate(article){
  let tableRow = tableBody.insertRow();
  tableRow.insertCell().innerHTML = `<a href=${article.url} > ${article.title} </a>`;
  tableRow.insertCell().innerHTML = d;
}

function tableCreate(articles){
  articles.forEach(rowCreate);
}
//attach 'Remove' and 'Select' button for every website added
for (let i = 0; i < lis.length; i += 1) {
  attachListItemButtons(lis[i]);
}

//add an event listener for the 'add a website' button

addItemButton.addEventListener('click', () => {
  let ul = document.getElementsByTagName('ul')[0];
  let li = document.createElement('li');
  li.textContent = addItemInput.value;
  attachListItemButtons(li);
  ul.appendChild(li);

  //when click on 'add a website' button, add the input to the db
  axios.post('/api/websites',{siteURL:addItemInput.value})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    addItemInput.value = '';
});

//add event listeners for these buttons
listUl.addEventListener('click', (event) => {
  if (event.target.tagName == 'BUTTON') {
    if (event.target.className == 'select') {
      let name = event.target.previousSibling;
      const p = document.createElement('p');
      p,textContent=name.textContent;
      siteSelected.appendChild(p);
      axios.post(`/api/websites/site/1`)
        .then(function (rsp) {
          tableCreate(rsp.data.article);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    if (event.target.className == 'remove') {
      let li = event.target.parentNode;
      let ul = li.parentNode;
      ul.removeChild(li);

      axios.delete(`/api/websites/site/:url`,{url:encodeURIComponent(li.textContent) })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
});
  
crawlButton.addEventListener('click',()=>{
  const req = event.target.parentNode.previousSibling.children[0];
  // console.log(req);
  axios.post(`/api/websites/site/1`)
  .then(function (rsp) {
    tableCreate(rsp.data.article);
  })
  .catch(function (error) {
    console.log(error);
  });
}) 

  