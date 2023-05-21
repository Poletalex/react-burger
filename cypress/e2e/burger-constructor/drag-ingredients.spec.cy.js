describe('Оформление заказа', () => {
    before(() => {
        cy.visit('http://localhost:3000');
    });

    it('перенос ингредиентов', () => {
        cy.get('[class^=ingredient_container__]').eq(0).as('bun');
        cy.get('[class^=ingredient_container__]').eq(2).as('ingredient');
        cy.get('[class^=burger-constructor_container__]').first().as('order');

        cy.get('@bun').find('[draggable=true]').trigger("dragstart");
        cy.get('@order')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop")
            .trigger("dragend");
        
        
        cy.get('@ingredient').find('[draggable=true]').trigger("dragstart");
        cy.get('@order')
            .trigger("dragenter")
            .trigger("dragover")
            .trigger("drop")
            .trigger("dragend");
        

        cy.findByText('Оформить заказ').first().click();
        cy.url().should('contain', 'http://localhost:3000/login');
    });
}); 