/// <reference types="Cypress"  />

describe('Keyword Search on DaftIE', function(){

  //Calling the fixtures file to read data from the test-data.json file to be accessible throughout this test
  before(function(){
    cy.fixture('test-data').then(function(data){
      this.data=data
    })
  })

//starting off the test case 
it('Searches for "Garage" in the Filtered Search Results Detail and Features Section  ',function(){

  cy.visit(this.data.baseURL)
  cy.wait(1000)

//Closing the survery popup
//cy.get('.css-wwiaj0').should('exist').click();
cy.get('.css-wwiaj0').should('be.visible').click();


//clicking on the Agree button of the Cookies Notice
cy.get('[data-testid="notice"]').find('#didomi-notice-agree-button').should('be.visible').click()

//Click on the search field on the Daft Home Buy page
cy.get('.HomepageSearchBox__InputContainer-sc-9ochkc-4').click()

//Selecting the Dublin for our search to filter results for the Dublin City
cy.get('.HomepageDropdown__Item-sc-4lvvqs-1').contains(this.data.location).click()


// Wait for the element to not be visible
cy.wait(1000)
cy.get('.ZeroResults__Container-sc-193ko9u-2.kUpnBy').should('not.exist')
  .then(() => {
    // Element is not visible, proceed and output "Search results available" to console
    cy.log('Search results available');
  });


//Click on Filters button available in the navigation
cy.get('[data-testid="open-filters-modal').click()

//click on the clear all to be sure no filters are applied 
cy.get('[data-testid="modal-clear-filter-button"]')

//Accessing the Text Filteration input field and Typing Garage
cy.get('[data-testid="terms-input-text"]').type(this.data.keyword)


//Assertion after typing the keyword in Filter
cy.get('[data-testid="terms-input-text"]').should('have.value', this.data.keyword, 'Input field should have the value "Garage"');


//Click the search button to refresh the search results
cy.get('[data-testid="filters-modal-show-results-button"]').click()
cy.wait(1000)

//Assertion on the URL to include the keyword
cy.url().should('include', this.data.keyword);


//verifying if there are any search results available after applying the filter
cy.get('.ZeroResults__Container-sc-193ko9u-2.kUpnBy').should('not.exist')
  .then(() => {
    cy.log('Search results are available for keyword');
  });



// Click on first search result found after filter is applied
cy.get('ul.SearchPagestyled__SearchResults-v8jvjf-3.hzMJok li.SearchPagestyled__Result-v8jvjf-2.iWPGnb:first')
.find('div[data-testid="card-wrapper"] div.Cardstyled__ContentWrapper-nngi4q-1.eNyJVC div[data-testid="card-content"] div.Cardstyled__TitleBlockWrapper-nngi4q-5.bsQod [data-testid="title-block"] h2[data-testid="address"]')
.click();

//Console log
cy.log('Clicked on the address element within the first result');

cy.wait(2000)
// Check in the description section
cy.get(':nth-child(1) > [data-testid="description"]')
  .contains(this.data.keyword)
  .should('exist');

// Check in the features section
cy.get('[data-testid="features"].styles__ContentSection-sc-15fxapi-3.kbrydT ul.PropertyDetailsList__PropertyDetailsListContainer-sc-1cjwtjz-0.ftSJzy li.PropertyDetailsList__PropertyDetailsListItem-sc-1cjwtjz-1.hqJwsU')
  .each(($li) => {
    cy.wrap($li).invoke('text').then((text) => {
      if (text.includes(this.data.keyword)) {
        cy.log('Keyword is Available in Features section');
      } else {
        cy.log('Keyword is Not Available in Features section');
      }
    });
  });


})

})