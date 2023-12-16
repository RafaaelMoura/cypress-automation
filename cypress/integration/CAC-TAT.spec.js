/// <reference types="Cypress"///>

describe('Central de Atendimento ao Cliente TAT', function() {
    it('verifica o título da aplicação', function() {
      cy.visit('./src/index.html')
  
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    /// Seleciona apenas um dele
    it('marca o tipo de atendimento "Feedback"', function() {
      cy.get('input[type="radio"][value="feedback"]').check()
      .should('have.value', 'feedback')
    })
    /// Seleciona todos e verifica.
    it('marca cada tipo de atendimentos', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
      cy.get('#firstName').type('Rafael')
      cy.get('#lastName').type('Moura')
      cy.get('#email').type('Cypress@teste.com')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('Treinando Cypress')
      cy.contains('button', 'Enviar').click()
      
      cy.get('.error').should('be.visible')
    })
    it('seleciona um arquivo da pasta fixtures', function(){
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })
    it('seleciona um arquivo simulando um drag-and-drop', function(){
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example').as('sampleFile')
      cy.get('input[type="file"]')
      .selectFile('@sampleFile')
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
    cy.get('#privacy a')
     .invoke('removeAttr','target')
     .click()

     cy.contains('Talking About Testing').should('be.visible')
    })
    
    it('testa a página da política de privacidade de forma independente', function(){
      cy.visit('./src/privacy.html')

      cy.contains('Talking About Testing').should('be.visible')
    })
  })
