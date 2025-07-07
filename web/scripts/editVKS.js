const EditVKS_id_container = document.getElementById('EditVKS_id_container');
const input_Date = document.getElementById('EditVKS_Date');
const input_Object = document.getElementById('EditVKS_Object');
const input_Type = document.getElementById('EditVKS_Type');
const Option_Inbox = document.getElementById('EditVKS_TypeOption_Inbox');
const Option_Outbox = document.getElementById('EditVKS_TypeOption_Outbox');
const input_Judge = document.getElementById('EditVKS_Judge');
const input_Hall = document.getElementById('EditVKS_Hall');
const input_Description = document.getElementById('EditVKS_Description');
const EditVKS_createWorker = document.getElementById('EditVKS_createWorker_container');
const EditVKS_createDate = document.getElementById('EditVKS_createDate_container');
const btn_EditVKS = document.getElementById('btn_EditVKS_edit');

function PrepareRegistrationDate (registrationDate) {
    date = new Date( parseInt(registrationDate) ).toISOString()
    reqDate = new Date(date).toLocaleDateString()
    reqTime = new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    return `${reqDate} - ${reqTime}`
}
function PrepareIventDate (dateIvent) {
    let iventDateTime = new Date( parseInt(dateIvent) ).toISOString()
    let iventDate = iventDateTime.split('T')
    iventTime = new Date(iventDateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    return `${iventDate[0]}T${iventTime}`
}

eel.GetIventEdiPageData()().then( iventDataResponse => {
    console.log(iventDataResponse)
    let Date = PrepareIventDate(iventDataResponse.iventDate)
    let reqDate = PrepareRegistrationDate(iventDataResponse.iventRegistrationDate)

    EditVKS_id_container.innerHTML = iventDataResponse.id
    if(iventDataResponse.iventType == 'Inbox') {
        Option_Inbox.selected = true
        Option_Outbox.selected = false
    } else {
        Option_Inbox.selected = false
        Option_Outbox.selected = true
    }
    input_Date.value = Date
    input_Object.value = iventDataResponse.iventObject
    input_Judge.value = iventDataResponse.iventJudge
    input_Hall.value = iventDataResponse.iventHall
    input_Description.value = iventDataResponse.iventDescription
    EditVKS_createWorker.innerHTML = iventDataResponse.iventWorker
    EditVKS_createDate.innerHTML = reqDate
})