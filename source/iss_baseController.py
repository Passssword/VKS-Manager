import eel
import json

configFileName = 'iss_base.json'

@eel.expose
def iss_baseReadData():
    try:
        with open(configFileName, 'r', encoding='utf-8') as file:  
            dataJson = json.load(file)
        return dataJson
    except Exception as Error:
        return Error