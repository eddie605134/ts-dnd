// Component Base Class
export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  // 選取模板
  templateElement: HTMLTemplateElement;
  // 掛載在哪裡 ex: app
  hostElement: T;
  
  element: U;

  constructor (
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean = false,
    newElementId?: string,
  ) {
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T; 

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean = false) {
    this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
  }

  abstract configure(): void;
  abstract renderContent(): void;
}