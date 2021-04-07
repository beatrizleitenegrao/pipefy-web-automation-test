import { FormPage } from "../page_objects/formPage";

const fullName = 'Beatriz Negrao';
const reason = 'I want to work at Pipefy because it is super fun!';
const user = 'felipe fantoni';
const menuOption = 'B'

describe('Fill web form', () => { 

  const formPage = new FormPage()  
  
  before(() => {
    formPage.navigate()
    formPage.checkFormPage()
    })

    it('Fill form', () => {
      formPage.fillYourName(fullName)
      
      formPage.fillReason(reason)
      
      formPage.selectBCheckbox()   

      formPage.selectUser(user)

      formPage.selectCurrentDateTime()

      formPage.selectMenuOption(menuOption)

      formPage.inputCurrentTime()

      formPage.selectPhoneNumberFromSpain()

    })
})