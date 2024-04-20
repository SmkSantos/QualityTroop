


describe('Dado que o usuário acesse a conta bancária', () => {

    let transfer = 500
    let massa = {

        account1: {
            agency: '007',
            digito: 1,
            mail: "quality@teste.com",
            pwd: "teste1234",
            balance: "5000"
        },
        account2: {
            agency: '007',
            digito: 2,
            mail: "quality2@teste.com",
            pwd: "teste12345",
            balance: "0"
        },


    }
    before(() => {
        cy.log(massa.account1.agency)
        cy.log(massa.account2.agency)
        cy.visit('https://bugbank.netlify.app/', {
            onBeforeLoad(win) {
                win.localStorage.setItem('quality@teste.com', `{"name":"Conta do Quality Troop","email":"${massa.account1.mail}","password":"${massa.account1.pwd}","accountNumber":"${massa.account1.agency}-${massa.account1.digito}","balance":${massa.account1.balance},"logged":false}`)
                win.localStorage.setItem('quality2@teste.com', `{"name":"Conta do Quality Troop","email":"${massa.account2.mail}","password":"${massa.account2.pwd}","accountNumber":"${massa.account2.agency}-${massa.account2.digito}","balance":${massa.account2.balance},"logged":false}`)
            },
        })


    });

    beforeEach(() => {
        cy.visit('https://bugbank.netlify.app/')
    });

    context('Quando acessa a conta pagante \nE realiza uma transferência ', () => {

        it('Então deve mmostrar mensagem de sucesso', () => {
            // cy.log(massa.account1.agency)
            // cy.log(massa.account2.agency)

            cy.get('.card__login [placeholder="Informe seu e-mail"]').type(massa.account1.mail)
            cy.get('.card__login [placeholder="Informe sua senha"]').type(massa.account1.pwd)
            cy.get('.login__buttons [type="submit"]').click()

            cy.get('#btn-TRANSFERÊNCIA').click()

            cy.get('[placeholder="Informe o número da conta"]').type(massa.account2.agency);
            cy.get('[placeholder="Informe o dígito da conta"]').type(massa.account2.digito);
            cy.get('[placeholder="Informe o valor da transferência"]').type(transfer);
            cy.get('[placeholder="Informe uma descrição"]').type(`Pagamento de RS ${transfer},00 - Conta ${massa.account2.agency}-${massa.account2.digito}`);

            cy.get('[type="submit"]').click();


            let count = massa.account1.balance - transfer

            cy.get('#btnBack').click();
            const formatoNumero = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
            let numeroFormatadoEsperado = formatoNumero.format(count);
            
            // Remove espaços em branco e caracteres especiais do texto do saldo
            cy.get('#textBalance > span').invoke('text').then((saldoTexto) => {

              const saldoFormatado = saldoTexto.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
              expect(saldoFormatado).to.equal(numeroFormatadoEsperado.replace(/\D/g, ''));
            
            });


            cy.getAllLocalStorage().then((result) => {
                cy.log(result)


                const chave = result["https://bugbank.netlify.app"][massa.account1.mail]
                cy.log(chave)

            })

            cy.get('#btnExit').click();


            cy.get('.card__login [placeholder="Informe seu e-mail"]').type(massa.account2.mail)
            cy.get('.card__login [placeholder="Informe sua senha"]').type(massa.account2.pwd)
            cy.get('.login__buttons [type="submit"]').click()

            let numeroFormatadoEsperado2= formatoNumero.format(transfer);
            
            // Remove espaços em branco e caracteres especiais do texto do saldo
            cy.get('#textBalance > span').invoke('text').then((saldoTexto) => {
              const saldoFormatado = saldoTexto.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
              expect(saldoFormatado).to.equal(numeroFormatadoEsperado2.replace(/\D/g, ''));
            });
            // cy.get('#textBalance > span').should('have.text', `R$ ${transfer},00`)



        });

    });




});

