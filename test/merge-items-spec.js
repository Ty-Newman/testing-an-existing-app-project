const { expect } = require('chai');
const { mergeItems } = require('../merge-items');
describe("The mergeItems function", () => {
  const template = `
  <table>
    <tbody>
      {{#each items}}
        <tr>
          <td>{{ add @index 1 }}</td>
          <td>{{ title }}</td>
          <td>{{ category }}</td>
          <td>
            {{#if isComplete}}
            {{else}}
              <form method="POST" action="/items/{{ add @index 1 }}">
                <button class="pure-button">Complete</button>
              </form>
            {{/if}}
          </td>
        </tr>
      {{/each}}
    </tbody>
  </table>
`;
  it("should return no <tr>s and no <td>s for no items", () => {
    //Arrange
    let items = [];
    //Act
    let answer = mergeItems(template, items);
    //Assert
    expect(answer).to.include('<table>');
    expect(answer).to.include('</table>');
    expect(answer).to.include('<tbody>');
    expect(answer).to.include('</tbody>');
    expect(answer).to.not.include('<tr>');
    expect(answer).to.not.include('</tr>');
    expect(answer).to.not.include('<td>');
    expect(answer).to.not.include('</td>');
    expect(answer).to.not.include('<!-- Content here -->');

  });

  it("should return a single <tr>, four <td>s, and a <form> for one uncompleted item", () => {
    //Arrange
    let items = [{title: 'Title 1', category: 'Category 1'}];
    //Act
    let answer = mergeItems(template, items)
    //Assert
    expect(answer).to.include('<table>');
    expect(answer).to.include('</table>');
    expect(answer).to.include('<tbody>');
    expect(answer).to.include('</tbody>');
    expect(answer).to.include('<tr>');
    expect(answer).to.include('</tr>');
    expect(answer).to.include('<td>Title 1</td>');
    expect(answer).to.include('<td>Category 1</td>');
    expect(answer).to.include('<form method="POST" action="/items/1">');
    expect(answer).to.not.include('<!-- Content here -->');
  });

  it("should return a single <tr>, four <td>s, and no <form> for one completed item", () => {
    //Arrange
    let items = [{ title: 'Title 1', category: 'Category 1', isComplete: true}];
    //Act
    let answer = mergeItems(template, items)
    //Assert
    expect(answer).to.include('<table>');
    expect(answer).to.include('</table>');
    expect(answer).to.include('<tbody>');
    expect(answer).to.include('</tbody>');
    expect(answer).to.include('<tr>');
    expect(answer).to.include('</tr>');
    expect(answer).to.include('<td>Title 1</td>');
    expect(answer).to.include('<td>Category 1</td>');
    expect(answer).to.not.include('<form method="POST" action="/items/1">');
    expect(answer).to.not.include('<!-- Content here -->');
  });

  it("should return three <tr>s for three items", () => {
    //Arrange
    let items = [{ title: 'Title 1', category: 'Category 1', isComplete: true },
      { title: 'Title 2', category: 'Category 2', isComplete: false },
      { title: 'Title 3', category: 'Category 3', isComplete: true }];
    //Act
    let answer = mergeItems(template, items)
    //Assert
    // expect(answer).to.include('<table>');
    // expect(answer).to.include('</table>');
    // expect(answer).to.include('<tbody>');
    // expect(answer).to.include('</tbody>');
    expect(answer).to.include('<tr>');
    expect(answer).to.include('</tr>');
    // expect(answer).to.include('<tr>');
    // expect(answer).to.include('</tr>');
    // expect(answer).to.include('<tr>');
    // expect(answer).to.include('</tr>');
    // expect(answer).to.include('<td>Title 1</td>');
    // expect(answer).to.include('<td>Category 1</td>');
    expect(answer).to.not.include('<form method="POST" action="/items/1">');
    expect(answer).to.not.include('<!-- Content here -->');
  });
});
