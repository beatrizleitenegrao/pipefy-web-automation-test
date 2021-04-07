export class FormPage {

    navigate() {
        cy.visit('https://app.pipefy.com/public/form/6qhKljB1') 
    }

    checkFormPage() {
        return cy.get('.pp-new-public-form-left-aside') 
                 .should('be.visible');
    }

    fillYourName(fullName) {
        cy.get('[name="customFields.your_name"]')
        .type(`${fullName}`)
        .should('have.value', `${fullName}`)
    }   

    fillReason(reason) {
        cy.get('[name="customFields.why_do_you_want_to_work_at_pipefy"]')
          .type(`${reason}`)
          .should('have.value', `${reason}`) 
    }

    selectBCheckbox() {
        cy.get('label[for="publicForm_customFields.check_b_option_B"]')
          .click()
    }

    selectUser(user) {
        // Open selector
        cy.get('[name="customFields.select_any_user"]')
          .click()
        cy.get('.pp-drop-down-content')
          .should('be.visible')
        
        //Select user 
        cy.get(`.pp-item-list a[title="${user}"]`)
          .click()
          
        // Close selector
        cy.get('.pp-labels .pp-labels-title')
          .contains(`${user}`)
          .click() 
          
        cy.contains('.pp-drop-down-content')
          .should('not.exist') 
    }

    selectCurrentDateTime() {
        // Open date picker
        cy.get('input[id="fake-pipe-field-publicForm-customFields_select_today_s_date-input"]')
          .click()
        
        cy.get('.pp-date-time-picker')
          .should('be.visible')

        // Input today's date
        let currentDate = getCurrentDate()
        
        cy.get('[id="date-time-select-date"]')
          .clear()
          .type(`${currentDate}`)
          
        cy.get('[id="date-time-select-date"]')
          .should('have.value', `${currentDate}`) 
          
        // Input today's time 
        let currentTime = getCurrentTime()
        let timeWithTwoDigitHours = currentTime[1];
        currentTime = currentTime[0];
        
        cy.get('[id="date-time-select-time"]')
          .clear()
          .type(`${currentTime}`)
        
        cy.get('[id="date-time-select-time"]')
          .should('have.value', `${timeWithTwoDigitHours}`) 
          
        // Save 
        cy.get('.pp-date-time-picker .pp-btn[title="Save"]')
          .click()
          
        // Date picker is closed
        cy.get('.pp-date-time-picker')
          .should('not.exist')

        // Date and time are set
        cy.get('[id="fake-pipe-field-publicForm-customFields_select_today_s_date-input"]')
          .should('include.value', `${currentDate}`)

        
        currentTime = currentTime.toUpperCase()
          
        cy.get('[id="fake-pipe-field-publicForm-customFields_select_today_s_date-input"]')
          .should('include.value', `${currentTime}`) 
    }

    selectMenuOption(option) {
        cy.get('[name="customFields.select_option_b"]')
          .scrollIntoView()
          .select(`${option}`)
    }

    inputCurrentTime() {
        let currentTime = getCurrentTime()
        let timeWithTwoDigitHours = currentTime[1]

        cy.get('[name="customFields.what_time_is_it_now"]')
          .click()
          .type(`${timeWithTwoDigitHours}`)

        cy.get('[name="customFields.what_time_is_it_now"]')
          .should('have.value',`${timeWithTwoDigitHours}`) 
    }

    selectPhoneNumberFromSpain() {
        cy.get('[name="customFields.place_a_phone_number_from_spain_country"]')
           .should('be.visible')

        cy.get('.flag-container')
          .click()        
         
        cy.get('.country-list')
          .should('be.visible')
          .trigger('mouseover')
          .find('[data-country-code="es"]')
          .click()
         
        cy.get('[name="customFields.place_a_phone_number_from_spain_country"][placeholder="612 34 56 78"]')
          .should('be.visible')
    }
}

const getCurrentDate = () => { 
    const date = new Date();
    let dd = '' + date.getDate();
    let mm = '' + (date.getMonth() + 1);
    const yyyy = date.getFullYear();
    
    if (dd < 10) {
        dd = '0' + `${dd}`;
    }
    
    if (mm < 10) {
        mm = '0' + `${mm}`;
    }
    
    return `${mm}/${dd}/${yyyy}`;
 }
 
 const getCurrentTime = () => { 
    const date = new Date(); 
    let time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
 
    let hour = date.getHours();
 
    time = time.toLowerCase();
    let timeWithTwoDigitHours = time;
 
     if (hour != 0 && (hour < 10 || hour > 12)) {
      timeWithTwoDigitHours = '0' + `${timeWithTwoDigitHours}`;
     }
 
    return[time, timeWithTwoDigitHours];
 }
