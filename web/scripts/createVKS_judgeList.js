const JudgeSelectList = document.getElementById('CreateVKS_JudgeList');

const mapJudges = (judges) => {
    return judges.map(judge => {
        return (`
            <option value="${judge.Id}">${judge.name}</option>
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

document.addEventListener('DOMContentLoaded', async function() {
    // Document is loaded
    
    let judgeData = await eel.GetJudgesData()()
    console.log(judgeData)

    let judgesMap = mapJudges(judgeData)
    let judgesHTML = arrToString(judgesMap)
    JudgeSelectList.innerHTML = judgesHTML
  });