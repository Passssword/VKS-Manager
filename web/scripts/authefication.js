// -----------------------------
// -------Вход-в-систему--------
// -----------------------------
const fieldLogin = document.getElementById('login');
const fieldPassword = document.getElementById('password');
const btnInterSystem = document.getElementById('btnInterSystem');

btnInterSystem.onclick = async function () {
    let authData = {login: fieldLogin.value, password: fieldPassword.value}
    
    eel.AuteficateUser(fieldLogin.value, fieldPassword.value)().then( result => {
        
        if (result != null){
            console.log(result)
            eel.UpdateUserData(result[1], result[3], result[4], result[6], result[5])
            eel.GetAllJudges()().then( jugdesData => {
                eel.SetJudgesData(jugdesData)
                window.location.replace("tableListVKS.html");
            })
            
        }
        else{
            console.log("Пользователь не найден")
        }
    } )

    // let result = await data.checkUser(authData)
    // if (await result) {
    //     console.log(result)
    //     stateManager.setAuthStatus(result);
    //     window.location.replace("settings.html");
    // }
    // else {
    //     // если result = undefained
    //     console.log("Неверные пользовательские данные")
    // }
}