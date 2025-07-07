const SettingsField = document.getElementById('settings_field');

const nodeField = document.getElementById('app_version');

const btnGetStatus = document.getElementById('btnGetStatus');
const btnSetWindowData = document.getElementById('btnSetWindowData');

// SettingsField.innerHTML = data.dataConfig()


const userData = {Nickname: "Admin",rolle: "Admin"}

btnGetStatus.onclick = function () {}


btnSetWindowData.onclick = function () {
    // При перезагрузке окон не сохраняется
    // window.userData = userData
    // document.userData = userData

    // LocalStorage
    // setItem(key, value) – сохранить пару ключ/значение.
    // getItem(key) – получить данные по ключу key.
    // removeItem(key) – удалить данные с ключом key.
    // clear() – удалить всё.
    // key(index) – получить ключ на заданной позиции.
    // length – количество элементов в хранилище.

    // localStorage.User = JSON.stringify(userData) // localStorage хранит только строки
}