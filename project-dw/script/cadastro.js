
const url = "https://go-wash-api.onrender.com/api/user";

async function cadastro(){
    let name     = document.getElementById('name').value
    let email    = document.getElementById('email').value
    let password = document.getElementById('password').value
    let cpf_cnpj = document.getElementById('cpf_cnpj').value
    let birthday = document.getElementById('birthday').value
    let terms    = document.getElementById('terms').checked

    const alert_msg = [
        { value: name      ,message: 'O campo Nome é obrigatório.' },
        { value: email     ,message: 'O campo E-mail é obrigatório.' },
        { value: password  ,message: 'O campo Senha é obrigatório.' },
        { value: cpf_cnpj  ,message: 'O campo CPF/CNPJ é obrigatório.' },
        { value: birthday  ,message: 'O campo Data de Nascimento é obrigatório.' },
        { value: terms     ,message: 'Você deve aceitar os termos.' }
    ];
    
    for (let i of alert_msg) {
        if (!i.value) {
            alert(i.message);
            return;
        }
    }

    try{
        let resposta = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "name": name,
                "email": email,
                "user_type_id":1,
                "password": password,
                "cpf_cnpj": cpf_cnpj,
                "terms": terms,
                "birthday": birthday
            }),
            headers: {
                'Content-Type':'application/json'
            }
        });

        if (resposta.ok){
            let data = await resposta.json();
            console.log(data);
            alert('Cadastro realizado com sucesso!');}
            else {
                let errodata = await resposta.json();
                let errorMessages = errodata.data.errors;
            
                let alertMessages = [];
            
                if (errorMessages.email) {
                    alertMessages.push('Erro no campo Email: ' + errorMessages.email);
                }
                if (errorMessages.cpf_cnpj) {
                    alertMessages.push('Erro no campo CPF/CNPJ: ' + errorMessages.cpf_cnpj);
                }
            
                if (alertMessages.length > 0) {
                    alert(alertMessages.join('\n'));
                }
            }
            } catch (error) {
                alert('Erro na requisição: ' + error);
            }
}