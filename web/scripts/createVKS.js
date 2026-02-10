const input_Date = document.getElementById('CreateVKS_Date');
const input_Object = document.getElementById('CreateVKS_Object');
const input_Type = document.getElementById('CreateVKS_Type');
const JudgeList = document.getElementById('CreateVKS_JudgeList');
const HallsList = document.getElementById('CreateVKS_HallsList');
const input_Hall = document.getElementById('CreateVKS_Hall');
const input_Description = document.getElementById('CreateVKS_Description');
const btn_Create = document.getElementById('btn_CreateVKS_create');

btn_Create.onclick = async function () {
    let authData = await eel.GetUserData()()
    let dateNow = new Date()
    let dateIvent = new Date(input_Date.value)
    let hallValue = null;

    /*
    Данные условия заполнения поля Зала ВКС нужны для того что-бы база не поломалась, так как
    ранее в базу заносились данные зала числом, что означало номер зала, но позволяло вводить любые
    числовые значиние или не числовые что приводило к неправильному подсчету статистике в отчете.
    - По хорошему в базу нужно заносить id зала, и на основани этого id выводить значения в формах интерфейса.
    */
    if (HallsList.value == 1) {hallValue = 2}
    if (HallsList.value == 2) {hallValue = 4}

    let iventObject = {
        iventDate: Date.parse(dateIvent),
        iventObject: input_Object.value,
        iventType: input_Type.value,
        iventJudge: JudgeList.value,
        iventHall: hallValue,
        iventDescription: input_Description.value,
        iventWorker: `${authData.lastName} ${authData.firstName} ${authData.patronymic}`,
        registrationDate: Date.parse(dateNow)
    }

    console.log(iventObject)
    console.log(HallsList.value)

    eel.CreateNewIvent(iventObject)().then(res => {
        window.location.replace("tableListVKS.html");
    })
}
