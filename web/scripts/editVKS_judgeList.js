const JudgeList = document.getElementById('EditVKS_JudgeList');

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
    console.log(editPageData)
    console.log(judgeData)

    let judgesMap = mapJudges(judgeData, editPageData)
    let judgesHTML = arrToString(judgesMap)
    JudgeList.innerHTML = judgesHTML
  });