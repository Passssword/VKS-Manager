import eel
import sqlite3

@eel.expose
def AuteficateUser(nickname, password):
    print("Попытка логина - "+"Login: "+nickname+"  /  "+"Password: "+password)

    try:
        sqlQuery = 'SELECT * FROM users WHERE nickname = ? AND password = ?'

        connection = sqlite3.connect('users.db')
        cursor = connection.cursor()
        cursor.execute( sqlQuery, (nickname, password) )
        user = cursor.fetchone()
        connection.close()
        
        return user
    
    except Exception as Error:
        return Error