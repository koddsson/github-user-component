class GitHubUserElement extends HTMLElement {
  shadowRoot = this.attachShadow({mode: 'open'})

  async connectedCallback() {
    const response = await fetch(`https://api.github.com/users/${this.username}`)
    const data = await response.json()

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: grid;
          font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
        }

        img {
          border-radius: 50%;
          border: black 2px solid;
        }

        #name {
          font-size: 1.5em;
          font-weight: 600;
          padding-top: 1em;
        }

        #username {
          font-size: 1.25em;
          font-weight: 300;
          padding-bottom: 1em;
        }
      </style>
      <img src="${data.avatar_url}">
      <span id="name">${data.name}</span>
      <span id="username">${data.login}</span>
      <span>${data.bio}</span>
    `
  }
  
  get username() {
    return this.getAttribute('username')
  }

  set username(value) {
    this.setAttribute('username', value)
  }
}


if(!window.customElements.get('github-user')) {
  window.customElements.define('github-user', GitHubUserElement)
  window.GitHubUserElement = GitHubUserElement
}
