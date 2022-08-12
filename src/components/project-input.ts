import Component from './base-component'
import { Validatable, validate } from '../util/validation';
import { projectState } from '../state/project-state';
import { AutoBind } from '../decorators/autobind';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor () {
    super('project-input', 'app', true, 'user-input')
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
  }

  configure () {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent() { }

  private gatherUserInput (): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    // 設定個欄位的驗證規則
    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    }

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    }

    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5
    }

    if (!validate(titleValidatable)) {
      alert('Please enter valid title');
    } else if (!validate(descriptionValidatable)) {
      alert('Please enter valid description');
      return;
    } else if (!validate(peopleValidatable)) {
      alert('Please enter valid people Number');
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInput () {
    this.titleInputElement.value = '';
    this.descriptInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @AutoBind
  private submitHandler (event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      this.clearInput();
    }
    console.log(projectState);
  }
}