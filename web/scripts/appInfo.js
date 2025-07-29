document.addEventListener('DOMContentLoaded', async function() {

    const appVersionField = document.getElementById('app_version');

    let configData = await eel.ReadConfig()()
    appVersionField.innerHTML = configData.AppInfo.version
    console.log("Чтение json конфиг файла -->")
    console.log(configData)

} )