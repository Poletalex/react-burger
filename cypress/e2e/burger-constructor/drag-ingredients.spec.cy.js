describe('Оформление заказа', () => {
    before(() => {
        cy.visit('http://localhost:3000');

        cy.intercept('GET', '*/ingredients', {
            fixture: "burger-constructor/ingredients.json",
        }).as('getIngredients');

        cy.intercept('POST', '*/auth/login', {
            fixture: "burger-constructor/user.json"
        }).as('login');

        cy.intercept('POST', '*/orders', {
            fixture: "burger-constructor/order.json"
        }).as('login');

        cy.wait(['@getIngredients']);
    });

    it('перенос ингредиентов, вход, создание заказа', () => {
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
        cy.get('input[type=email]').type('nafanalex@gmail.com');
        cy.get('input[type=password]').type('      ');

        cy.findByText('Войти').first().click();
        cy.findByText('Оформить заказ').first().click();

        cy.get('[class^=order-create-details_order__]').first().should('contain', 1234)
    });
}); 