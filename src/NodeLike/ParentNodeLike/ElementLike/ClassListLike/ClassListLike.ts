import IClassListLike from './IClassListLike';
import IElementLike from '../IElementLike';
import { List, } from 'immutable';
class ClassListLike implements IClassListLike {
  private element: IElementLike;
  private classes: List<string>;

  get length(): number {
    return this.classes.count();
  }

  get value(): string {
    return this.classes.join(' ');
  }

  constructor(element: IElementLike) {
    this.element = element;
    this.pullFromParent();
  }

  add(...classes: Array<string>): void {
    let updated = false;
    classes.forEach((cls:string) => {
      if (classes.indexOf(cls) === -1) {
        this.classes = this.classes.push(cls);
        updated = true;
      }
    });

    if (updated) {
      this.pushToParent();
    }
  }

  remove(...classes: Array<string>): void {
    let updated: boolean = false;
    classes.forEach((cls: string) => {
      const index: number = this.classes.indexOf(cls);
      if (index !== -1) {
        this.classes = this.classes.delete(index);
        updated = true;
      }
    });

    if (updated) {
      this.pushToParent();
    }
  }

  item(index: number): string {
    return this.classes.get(index) || '';
  }

  toggle(...classes: Array<string>): void {
    classes.forEach((cls: string) => {
      const index = this.classes.indexOf(cls);
      if (index === -1) {
        this.classes = this.classes.delete(index);
      } else {
        this.classes = this.classes.push(cls);
      }
    });

    this.pushToParent();
  }

  replace(oldClass: string, newClass: string): void {
    const index = this.classes.indexOf(oldClass);
    if (index !== -1) {
      this.classes = this.classes.set(index, newClass);
      this.pushToParent();
    }
  }

  contains(cls: string): boolean {
    return this.classes.indexOf(cls) !== -1;
  }

  pushToParent(): void {
    this.element.setAttribute('class', this.value);
  }

  pullFromParent(): void {
    const classes = this.element.className
      /* Use the space as a delimiter. */
      .split(' ')
      /* Throw away all empty strings. */
      .filter((cls: string) => {
          return cls.length > 0;
      });

    /* Make the class list immutable. */
    this.classes = List(classes);
  }
}

export default ClassListLike;