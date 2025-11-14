import eel
import json

configFileName = 'config.json'

@eel.expose
def ReadConfig():
    try:
        with open(configFileName, 'r', encoding='utf-8') as file:  
            dataJson = json.load(file)
        return dataJson
    except Exception as Error:
        return Error
    
@eel.expose
def SaveCongig(configData):
    return True