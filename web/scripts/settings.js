const SettingsField = document.getElementById('settings_field');
const HallTableID = document.getElementById('HallTableID');

const mapHalls = (halls) => {
    return halls.map(hall => {
        return (`
            <tr>
                <td>${hall.Id}</td>
                <td>${hall.HallName}</td>
                <td>${hall.IpAdress}</td>
                <td><button class="btn edit">Редактировать</button></td>
            </tr>
        `)
    })
}

const arrToString = (array) => {
    let stringValue = ""
    array.forEach(element => {
        stringValue += element
    });

    return stringValue
}
let judgesTableCaptions = `<tr>
                            <th>ID</th>
                            <th>Зал</th>
                            <th>IP Адресс</th>
                            <th>Кнопки действия</th>
                        </tr>`

document.addEventListener('DOMContentLoaded', async function() {

    let configData = await eel.ReadConfig()()
    console.log("Чтение json конфиг файла -->")
    console.log(configData.Halls)

    let hallsMap = mapHalls(configData.Halls)
    let hallsHTML = arrToString(hallsMap)

    HallTableID.innerHTML = judgesTableCaptions + hallsHTML
} )