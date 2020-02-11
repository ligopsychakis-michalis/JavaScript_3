'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        cb(false, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.innerHTML = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  function renderRepoDetails(repo, ul) {
    createAndAppend('li', ul, {
      text : `<strong>Repository:</strong> <a href = "${repo.html_url}">${repo.name}</a><br>
              <strong>Description:</strong> ${repo.description}<br>
              <strong>Forks:</strong> ${repo.forks}<br>
              <strong>Uptade:</strong> ${repo.updated_at.slice(0,4)}/${repo.updated_at.slice(5,7)}/${repo.updated_at.slice(8,10)}, ${repo.updated_at.slice(11,19)}`
    });
  }

  function main(url) {
    createAndAppend("p" , root, { text : "HYF Repositories" });  //append the header on DOM

    fetchJSON(url, (err, repos) => {
      const root = document.getElementById('root');
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error',
        });
        return;
      }
      const ul = createAndAppend('ul', root);
      sortByName(repos);  
      repos.forEach(repo => renderRepoDetails(repo, ul));
    });
  }

  //function to sort the repos based on their names
  function sortByName(repos){
    repos.sort((a , b) => (a.name > b.name)? 1 : -1);
  } 


  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=10';
  window.onload = () => main(HYF_REPOS_URL);
}
