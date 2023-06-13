describe('Automate Internet Herokuapp',()=>{

it('FileUpload, Single file Upload',()=>{
    cy.visit('http://the-internet.herokuapp.com/upload');
    cy.get('#file-upload').attachFile('sampleCV.pdf');
    cy.get('#file-submit').click();
    cy.wait(5000);

    cy.get("div[class='example'] h3").should('have.text','File Uploaded!');
})

it('FileUpload, File Rename',()=>{
    cy.visit('http://the-internet.herokuapp.com/upload');
    cy.get('#file-upload').attachFile({filePath:'sampleCV.pdf',fileName:'cv'});
    cy.get('#file-submit').click();
    cy.wait(5000);

    cy.get("div[class='example'] h3").should('have.text','File Uploaded!');
})

it('FileUpload, Drag and drop',()=>{
    cy.visit('http://the-internet.herokuapp.com/upload');
    cy.get('#drag-drop-upload').attachFile('sampleCV.pdf', {subjectType:'drag-n-drop'})
    
})
it('handling frames approach 1', ()=>{
    cy.visit('https://the-internet.herokuapp.com/iframe');

    const iframe=cy.get('#mce_0_ifr')
        .its('0.contentDocument.body')
        .should('be.visible')
        .then(cy.wrap)

        iframe.clear().type("Welcome {cmd+a}");
        cy.get("[aria-label='Bold']").click();
})

it('handling frames approach 2 by using custom command', ()=>{
    cy.visit('https://the-internet.herokuapp.com/iframe');

    cy.getIframe('#mce_0_ifr').clear().type("Welcome")
        

       
        cy.get("[aria-label='Bold']").click();
})

it('handling frames approach 3 by using cypress-iframe plugin', ()=>{
    cy.visit('https://the-internet.herokuapp.com/iframe');

    cy.frameLoaded('#mce_0_ifr')

    cy.iframe('#mce_0_ifr').clear().type("Welcome")
        

       
        cy.get("[aria-label='Bold']").click();
})

it('Handle tabs approach 1',()=>{
    cy.visit("https://the-internet.herokuapp.com/windows")  //parent tab
    cy.get('.example >a').invoke('removeAttr','target').click(); //clicking on link

    cy.url().should('include','https://the-internet.herokuapp.com/windows/new')

    //operations
    cy.go('back');  //back to parent tab
})

it('Handle tabs approach 2',()=>{
    cy.visit("https://the-internet.herokuapp.com/windows")  //parent tab
    
    cy.get('.example >a').then((e)=>{
        let url=e.prop('href')
        cy.visit(url)
    })
    cy.url().should('include','https://the-internet.herokuapp.com/windows/new')
    
    cy.wait(5000)

    //operations
    cy.go('back');  //back to parent tab
})


//Js Alert : It will have some text and an 'OK' button
    it('Js alert', ()=>{
    cy.visit("http://the-internet.herokuapp.com/javascript_alerts")
    cy.get("button[onclick='jsAlert()']").click();

    cy.on('window:alert', (t)=>{
        expect(t).to.contains('I am a JS Alert');
    })
    //alert window automatically closed by cypress
    cy.get("#result").should('have.text','You successfully clicked an alert')
})


//Js Confirm alert: It will have text with 'OK'  and 'Cancel' button
it('Js confirm alert', ()=>{
    cy.visit("http://the-internet.herokuapp.com/javascript_alerts")
    cy.get("button[onclick='jsConfirm()']").click();

    cy.on('window:alert', (t)=>{
        expect(t).to.contains('I am a JS Confirm');
    })
    //alert window automatically closed by cypress

    cy.on('window:confirm', ()=>false)   //cypress closes alert windwo using cancel button
    
    cy.get("#result").should('have.text','You clicked: Cancel')
})
  
//Js Prompt Alert: It will have some text with a text box for user input along with 'Ok'

it('Js prompt alert', ()=>{
    cy.visit("http://the-internet.herokuapp.com/javascript_alerts")

    cy.window().then((win)=>{
        cy.stub(win,'prompt').returns('welcome')
    })
    cy.get("button[onclick='jsPrompt()']").click();

    
    //alert window automatically closed by cypress
    cy.get("#result").should('have.text','You entered: welcome')
})

//Authenticated alert
it('Athenticated alert',()=>{
    cy.visit("http://the-internet.herokuapp.com/basic_auth", {
        auth:
        {
            username:'admin',
            password:'admin'
        }
    } );
    cy.get("div[class='example'] p").should('have.contain','Congratulations')
})

})