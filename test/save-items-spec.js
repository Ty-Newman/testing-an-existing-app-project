const { expect } = require('chai');
const { saveItems } = require('../save-items');
describe("The saveItems function", () => {
  it('adds the new item to the list', () => {
    //Arange
    let items = [];
    let newItem = 'apple';
    //Act
    let result = saveItems(items, newItem);
    //Assert
    expect(result).to.eql(['apple']);
  });

  it('makes sure the result and the original are different', () => {
    //Arange
    let items = [];
    let newItem = 'apple';
    //Act
    let result = saveItems(items, newItem);
    //Assert
    // expect(result).to.not.eql([]);
    expect(items).to.not.equal(result);
  });
});
