'use strict';

{
  function fetchJSON(url, cb) {
    fetch(url)
      .then(res => {
        if (res.status != 200) { 
          return cb(new Error(`Network error: ${res.status} - ${res.statusText}`)) 
        }
        return res.json() 
      })
      .then(data => cb(false, data))
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


  function renderRepoDetails(data, parent) {
    createAndAppend('div', parent, {
      text : `<strong>Repository:</strong> <a href = "${data.html_url}" target="_blank">${data.name}</a><br>
              <strong>Description:</strong> ${data.description}<br>
              <strong>Forks:</strong> ${data.forks}<br>
              <strong>Uptade:</strong> ${data.updated_at.slice(0,4)}/${data.updated_at.slice(5,7)}/${data.updated_at.slice(8,10)}, ${data.updated_at.slice(11,19)}`
    });
  }


  function renderRepoContributors(contributors, contributorsDiv){
    contributorsDiv.innerHTML = `<small>Contributions</small>`
    contributors.forEach(contributor => {
      contributorsDiv.innerHTML += `
        <div class="contributor">
          <img src=${contributor.avatar_url} width=80 height=80>
          <a href=${contributor.html_url} target="_blank">${contributor.login}</a>
          <span>${contributor.contributions}</span>
        </div>
        <hr>
      `
    })
  }


  function sortByName(repos){
    repos.sort((a , b) => (a.name > b.name)? 1 : -1);
  } 


  function removeFromDom(parent){
    while (parent.hasChildNodes()){
      parent.removeChild(parent.firstChild);
    }
  }


  //main function
  function mainPart(url) {
    const root = document.getElementById('root');
    const header = document.querySelector("header"); 
    const main = document.querySelector("main");
    //append title on DOM
    createAndAppend("p" , header, { text : "HYF Repositories" }); 

    //make the API call via fetchJSON function
    fetchJSON(url, (err, repos) => {
      //handle error
      if (err) {
        createAndAppend('div', root, {
          text: err.message,
          class: 'alert-error'
        });
        return;
      }
      //if it goes just fine
      sortByName(repos);
      createAndAppend("select", header);
      const select = document.querySelector("select");
      repos.forEach(repo => createAndAppend("option", select, {
        text : repo.name,
        value : repo.name,
      }))
      select.value = repos[displayRepo].name; 
      renderRepoDetails(repos[displayRepo], main);

      //make a new API call via fetchJSON function to get the contributions from 'repos.contributors_url'
      fetchJSON(repos[displayRepo].contributors_url, (err, contributors) => {
        //handle error
        if (err) {
          createAndAppend('div', root, {
            text: err.message,
            class: 'alert-error'
          });
          return;
        }

        //if it goes right
        createAndAppend('div', main);
        const contributorsDiv = document.querySelector("main div:last-child");
        renderRepoContributors(contributors, contributorsDiv);
      })

      //Event: change repo when user choose another repo from selection input
      select.addEventListener("change", () => {
        repos.forEach(repo => {
          if (repo.name === select.value) { displayRepo = repos.indexOf(repo) }
        })
        removeFromDom(header);
        removeFromDom(main);
        mainPart(HYF_REPOS_URL)
      })
    });
  }


  let displayRepo = 0;
  const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos';
  //start rendering when window is loaded
  window.onload = () => mainPart(HYF_REPOS_URL); 
}