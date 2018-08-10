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
  addItemInput.value = '';
});

//add event listeners for these buttons
listUl.addEventListener('click', (event) => {
  if (event.target.tagName == 'BUTTON') {
    if (event.target.className == 'select') {
      let name = event.target.previousSibling;
      siteSelected.textContent = `Site: ${name.textContent}`;
    }

    if (event.target.className == 'remove') {
      let li = event.target.parentNode;
      let ul = li.parentNode;
      ul.removeChild(li);
    }
  }
});
  
  

  