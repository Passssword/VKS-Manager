const JudgeList = document.getElementById('EditVKS_JudgeList');
const HallsSelectList = document.getElementById('EditVKS_HallsList');

const mapJudges = (judges, editPageData) => {
    return judges.map(judge => {
        let optionString = null
        if(!isNaN(editPageData.iventJudge)){
            if (judge.Id == editPageData.iventJudge) {
                return `<option value="${judge.Id}" selected>${judge.name}</option>`
            } else {
                return `<option value="${judge.Id}">${judge.name}</option>`
            }
        }
        else {optionString = `<option value="${judge.Id}">${judge.name}</option>`}
        return optionString
    })
}
const mapHalls = (halls, editPageData) => {
    return halls.map(hall => {
        if(!isNaN(editPageData.iventHall)){
            if ( editPageData.iventHall == 2 && hall.Id == 1 ) {
                return `<option value="${hall.Id}" selected>${hall.HallName} - ${hall.IpAdress}</option>`
            }
            else if ( editPageData.iventHall == 4 && hall.Id == 2 ) {
                return `<option value="${hall.Id}" selected>${hall.HallName} - ${hall.IpAdress}</option>`
            }
            else { return `<option value="${hall.Id}">${hall.HallName} - ${hall.IpAdress}</option>` }
        }
        return (`<option value="${hall.Id}">Зал не найден</option>`)
    })
}

const arrToString = (array) => {
    let stringValue = ""
    array.forEach(element => {
        stringValue += element
    });

    return stringValue
}

document.addEventListener('DOMContentLoaded', async function() {
    // Document is loaded
    let editPageData = await eel.GetIventEdiPageData()()
    let judgeData = await eel.GetJudgesData()()
    let configData = await eel.ReadConfig()()

    console.log(editPageData)
    console.log(judgeData)
    console.log(configData)

    let judgesMap = mapJudges(judgeData, editPageData)
    let judgesHTML = arrToString(judgesMap)
    let hallsMap = mapHalls(configData.Halls, editPageData)
    let hallsHTML = arrToString(hallsMap)

    JudgeList.innerHTML = judgesHTML
    HallsSelectList.innerHTML = hallsHTML
  });