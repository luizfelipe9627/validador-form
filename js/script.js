// Variável com um objeto dentro responsável por parar o evento de envio:
let validador = {
    handleSubmit:(event) => {
        event.preventDefault();

        // Envia o formulário:
        let send = true;

        // Não envia o formulário, deu algum tipo de erro:
        let inputs = form.querySelectorAll('input');

        // Usado para limpar os erros:
        validador.clearErrors();

        // Puxa todos os inputs e faz um looping de verificação nos campos:
        for(let i=0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = validador.checkInput(input);

            if(check !== true) {
                send = false;
                validador.showError(input, check)
            }
        }

        // Se vai enviar o formulário:
        if (send) {
            form.submit()
        }
    },
    
    // Responsável por receber os inputs e verificar suas regras:
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules')

        if(rules !== null) {
            rules = rules.split('/');
            for(let k in rules) {
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Este campo é obrigatório.'
                        }
                    break;

                    case 'min':
                        if (input.value.length < rDetails[1]) {
                            return 'O campo tem que ter no mínimo '+rDetails[1]+' caracteres.';
                        }
                    break;

                    case 'email':
                        if(input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'E-mail digitado não é valido.';
                            }
                        }
                    break;
                }
            }
        }
        return true;
    },

    // Responsável por mostrar a mensagem de erro e botar a borda na cor vermelha:
    showError:(input, error) => {
        input.style.borderColor= '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },

    // Usado para limpar os avisos de erros:
    clearErrors:() => {
        let inputs = form.querySelectorAll('input');
        for(let i=0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i=0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
};

// Está puxando o formulário atribuído com a class validador:
let form = document.querySelector('.validador');

// Responsável por monitorar quando o formulário receber o comando de envio e assim realiza uma ação.
form.addEventListener('submit', validador.handleSubmit);

//


//


//


//