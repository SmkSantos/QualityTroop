describe('Dado que o usuário deseja logar no sistema', () => {
  const currentDate = new Date().toISOString().slice(0, 10);
  beforeEach(() => {

    cy.visit('https://bugbank.netlify.app/')


  });
  context('Quando o usuário informa o e-mail em branco', () => {


    it('Deve mostrar mensagem de campo obrigatório', () => {
      
      cy.get('.card__login [placeholder="Informe sua senha"]').type('44156415')
      cy.get('.login__buttons [type="submit"]').click()
      cy.get('.input__warging').should('have.text','É campo obrigatório')
    
    })

  });

  context('Quando o usuário informa a senha em branco', () => {


    it('Deve mostrar mensagem de campo obrigatório', () => {

      cy.get('.card__login [placeholder="Informe seu e-mail"]').type('as1@asd1c.comsa')
      cy.get('.login__buttons [type="submit"]').click()
      cy.get('.input__warging').should('have.text','É campo obrigatório')

    })

  });

  context('Quando o usuário informa o e-mail e a senha incorreta', () => {


    it('Deve mostrar mensagem de invalidação', () => {

      cy.get('.card__login [placeholder="Informe seu e-mail"]').type('as1@asd1c.comsa')
      cy.get('.card__login [placeholder="Informe sua senha"]').type('44156415')
      cy.get('.login__buttons [type="submit"]').click()

      cy.get('p#modalText').should('have.text', 'Usuário ou senha inválido.\nTente novamente ou verifique suas informações!');

    })

  });
})