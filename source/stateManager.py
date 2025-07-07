import eel

initialState = {
    "userData": {
        "Nickname": "Admin",
        "rolle": "Admin",
        "firstName": "",
        "lastName": "",
        "patronymic": ""
        },
    "UserEditPageData": {
        "EditUserData" : {
            "id": 0,
            "Nickname": "",
            "password": "",
            "rolle": "",
            "firstName": "",
            "lastName": "",
            "patronymic": ""
        }
    },
    "IventEditPageData": {
        "IventData": {
            "id": 0,
            "iventDate": "",
            "iventObject": "",
            "iventType": "",
            "iventJudge": "",
            "iventHall": "",
            "iventDescription": "",
            "iventWorker": "",
            "iventRegistrationDate": ""
        }
    }
}

@eel.expose
def GetUserData():
    return initialState['userData']

@eel.expose
def UpdateUserData(Nickname, rolle, firstName, lastName, patronymic):
    initialState['userData']['Nickname'] = Nickname
    initialState['userData']['rolle'] = rolle
    initialState['userData']['firstName'] = firstName
    initialState['userData']['lastName'] = lastName
    initialState['userData']['patronymic'] = patronymic
    return True

@eel.expose
def GetUserEdiPageData():
    return initialState['UserEditPageData']['EditUserData']

@eel.expose
def SetUserEdiPageData(id, Nickname, password, rolle, firstName, lastName, patronymic):
    initialState['UserEditPageData']['EditUserData']['id'] = id
    initialState['UserEditPageData']['EditUserData']['Nickname'] = Nickname
    initialState['UserEditPageData']['EditUserData']['password'] = password
    initialState['UserEditPageData']['EditUserData']['rolle'] = rolle
    initialState['UserEditPageData']['EditUserData']['firstName'] = firstName
    initialState['UserEditPageData']['EditUserData']['lastName'] = lastName
    initialState['UserEditPageData']['EditUserData']['patronymic'] = patronymic
    return True

@eel.expose
def GetIventEdiPageData():
    return initialState['IventEditPageData']['IventData']

@eel.expose
def SetIventEdiPageData(
    id,
    iventDate,
    iventObject,
    iventType,
    iventJudge,
    iventHall,
    iventDescription,
    iventWorker,
    iventRegistrationDate):
    initialState['IventEditPageData']['IventData']['id'] = id
    initialState['IventEditPageData']['IventData']['iventDate'] = iventDate
    initialState['IventEditPageData']['IventData']['iventObject'] = iventObject
    initialState['IventEditPageData']['IventData']['iventType'] = iventType
    initialState['IventEditPageData']['IventData']['iventJudge'] = iventJudge
    initialState['IventEditPageData']['IventData']['iventHall'] = iventHall
    initialState['IventEditPageData']['IventData']['iventDescription'] = iventDescription
    initialState['IventEditPageData']['IventData']['iventWorker'] = iventWorker
    initialState['IventEditPageData']['IventData']['iventRegistrationDate'] = iventRegistrationDate
    return True