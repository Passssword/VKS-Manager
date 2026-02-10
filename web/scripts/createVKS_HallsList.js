const HallsSelectList = document.getElementById('CreateVKS_HallsList');


const mapHalls = (halls) => {
    return halls.map(hall => {
        return (`
            <option value="${hall.Id}">${hall.HallName} - ${hall.IpAdress}</option>
        `)
    })
}
// const arrToString = (array) => {
//     let stringValue = ""
//     array.forEach(element => {
//         stringValue += element
//     });

//     return stringValue
// }

document.addEventListener('DOMContentLoaded', async function() {
    let configData = await eel.ReadConfig()()

    let hallsMap = mapHalls(configData.Halls)
    let hallsHTML = arrToString(hallsMap)
    HallsSelectList.innerHTML = hallsHTML
})