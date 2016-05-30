'use strict!';

export class MainMenu {
  constructor(menuId, buttonId) {
    this.menuNode = document.getElementById(menuId);
    this.btnNode  = document.getElementById(buttonId);
    this.menuIsVisible = false;

    this.addMenuToggleAction();
  }

  addMenuToggleAction() {
    this.btnNode.addEventListener('click', () => {
      if (this.menuIsVisible) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    });
  }

  openMenu() {
    this.menuNode.removeAttribute('hidden');
    this.menuIsVisible = true;
  }

  closeMenu() {
    this.menuNode.setAttribute('hidden', true);
    this.menuIsVisible = false;
  }

  addActionToMenu(title, action) {
    const node = this.initActionNode(title);
    const ul   = this.menuNode.querySelector('ul');

    node.addEventListener('click', action);

    node.addEventListener('mouseup', () => {
      this.closeMenu();
    });

    ul.appendChild(node);
  }

  initActionNode(title) {
    const node = document.createElement('li');

		node.className = 'menu-item';
    node.innerText = title;

    return node;
  }
}
