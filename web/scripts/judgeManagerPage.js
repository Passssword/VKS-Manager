const input_Judge = document.getElementById('judge_Name');
const btn_AddJudge = document.getElementById('btn_AddJudge');
const table_Judge = document.getElementById('judgeTableID');

btn_AddJudge.onclick = function () {
    let judgeName = input_Judge.value
    console.log(judgeName)
    eel.CreateJudge(judgeName)().then( res => {
        if (res) { window.location.replace("judgeManagerPage.html"); }
        else { console.log(res) }
    })
}

const mapJudges = (judges) => {
    return judges.map(judge => {
        return (`
            <tr>
                <td>${judge[0]}</td>
                <td class="judgeTableID_judgeName">${judge[1]}</td>
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
                            <th>Судья</th>
                            <th>Кнопки действия</th>
                        </tr>`

document.addEventListener('DOMContentLoaded', async function() {
    const judgesArray = await eel.GetAllJudges()()
    
    let judgesMap = mapJudges(judgesArray)
    let judgesHTML = arrToString(judgesMap)
    
    table_Judge.innerHTML = judgesTableCaptions + judgesHTML
});

function ShowModalWindow (idJudge) {
    console.log('ShowModalWindow: '+idJudge)
}