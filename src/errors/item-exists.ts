export class ItemExistsError extends Error {
    constructor() {
      super();
      this.name = 'ItemExists';
      this.message = 'Item already exists';
    }
  }