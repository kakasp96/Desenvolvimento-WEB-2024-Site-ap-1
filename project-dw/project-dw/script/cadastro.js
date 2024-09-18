
const url = "https://go-wash-api.onrender.com/api/user";

async function cadastro(){
    try{let name     = document.getElementById('name').value
        let email    = document.getElementById('email').value
        let password = document.getElementById('password').value
        let cpf_cnpj = document.getElementById('cpf_cnpj').value
        let birthday = document.getElementById('birthday').value
        let terms    = document.getElementById('terms').checked
        
        let resposta = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "name": name,
                "email": email,
                "user_type_id":1,
                "password": password,
                "cpf_cnpj": cpf_cnpj,
                "terms": 1,
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
        else{
            let errodata = await resposta.json();
            console.log(errodata.data.errors)}
    } catch (error){
        alert(error)
    }
}