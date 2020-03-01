'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      // TODO: replace this comment and the console.log with your own code
      function renderRepoDetails(data, parent) {
        parent.innerHTML = `
          <div>
            <strong>Repository:</strong> <a href = "${data.html_url}" target="_blank">${data.name}</a><br>
            <strong>Description:</strong> ${data.description}<br>
            <strong>Forks:</strong> ${data.forks}<br>
            <strong>Uptade:</strong> ${data.updated_at.slice(0,4)}/${data.updated_at.slice(5,7)}/${data.updated_at.slice(8,10)}, ${data.updated_at.slice(11,19)}
          </div>`;
      }
      renderRepoDetails(repo, document.querySelector(".repo-container"));
    }
  }

  window.RepoView = RepoView;
}
