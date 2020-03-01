'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      // TODO: replace this comment and the console.log with your own code
      function renderRepoContributors(contributors, parent){
        parent.innerHTML = `<small>Contributions</small>`
        contributors.forEach(contributor => {
          parent.innerHTML += `
            <div class="contributor">
              <img src=${contributor.avatar_url} width=80 height=80>
              <a href=${contributor.html_url} target="_blank">${contributor.login}</a>
              <span>${contributor.contributions}</span>
            </div>
            <hr>
          `
        })
      }
      renderRepoContributors(contributors, document.querySelector(".contributors-container"))
    }
  }

  window.ContributorsView = ContributorsView;
}
