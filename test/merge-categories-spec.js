const { expect } = require('chai');
const { mergeCategories } = require('../merge-categories');

describe("mergeCategories()", () => {
  context("Using <li> tags", () => {
    const template = `
      <div>
        <ul>
          {{#each categories}}
           <li>{{ this }}</li>
          {{/each}}
         </ul>
      </div>
    `;

    it("should return no <li>s for no categories", () => {
      let categories = [];
      let result = mergeCategories(template, categories, 'li');
      expect(result).to.include('<div>')
      expect(result).to.include('</div>')
      expect(result).to.include('<ul>')
      expect(result).to.include('</ul>')
      expect(result).to.not.include('<li>')
      expect(result).to.not.include('</li>')
      expect(result).to.not.include('<!-- Content here -->')
    });

    it("should return a single <li> for one category", () => {
      let categories = ['groceries'];
      let result = mergeCategories(template, categories, 'li');
      expect(result).to.include('<div>')
      expect(result).to.include('</div>')
      expect(result).to.include('<ul>')
      expect(result).to.include('</ul>')
      expect(result).to.include('<li>groceries</li>')
      expect(result).to.not.include('<!-- Content here -->')
      // expect.fail('please write this test');
    });

    it("should return an <li> for each category", () => {
      let categories = ['groceries', 'garden'];
      let result = mergeCategories(template, categories, 'li')
      expect(result).to.include('<div>')
      expect(result).to.include('</div>')
      expect(result).to.include('<ul>')
      expect(result).to.include('</ul>')
      expect(result).to.include('<li>groceries</li>')
      expect(result).to.include('<li>garden</li>');
      expect(result).to.not.include('<!-- Content here -->')
    });
  });

  context("using <option> tags", () => {
    const template = `
      <div>
        <select>
          {{#each categories}}
            <option>{{ this }}</option>
          {{/each}}
        </select>
      </div>
    `;

    it("should return no <option>s for no categories", () => {
      //Arrange
      let categories = [];
      //Act
      let result = mergeCategories(template, categories, 'option');
      //Assert
      expect(result).to.include('<div>')
      expect(result).to.include('</div>')
      expect(result).to.include('<select>')
      expect(result).to.include('</select>')
      expect(result).to.not.include('<option>')
      expect(result).to.not.include('</option>')
      expect(result).to.not.include('<!-- Content here -->')
    });

    it("should return a single <option> for one category", () => {
       //Arrange
       let categories = ['your string here'];
       //Act
       let result = mergeCategories(template, categories, 'option');
       //Assert
       expect(result).to.include('<div>')
       expect(result).to.include('</div>')
       expect(result).to.include('<select>')
       expect(result).to.include('</select>')
       expect(result).to.include('<option>your string here</option>')
       expect(result).to.not.include('<!-- Content here -->')
    });

    it("should return an <option> for each category", () => {
      //Arrange
      let categories = ['your string here', 'String 2', 'String 3'];
      //Act
      let result = mergeCategories(template, categories, 'option');
      //Assert
      expect(result).to.include('<div>')
      expect(result).to.include('</div>')
      expect(result).to.include('<select>')
      expect(result).to.include('</select>')
      expect(result).to.include('<option>your string here</option>')
      expect(result).to.include('<option>String 2</option>')
      expect(result).to.include('<option>String 3</option>')
      expect(result).to.not.include('<!-- Content here -->')
    });
  });
});
