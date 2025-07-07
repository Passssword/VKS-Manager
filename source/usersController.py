import eel
import sqlite3


@eel.expose
def GetAllUsers():
    try:
        connection = sqlite3.connect('users.db')
        cursor = connection.cursor()
        cursor.execute('SELECT * FROM users')
        users = cursor.fetchall()
        connection.close()
        
        return users

    except Exception as Error:
        print(Error)
        return "Error"
    

@eel.expose
def CreateNewUser(userData):
    print(userData)
    connection = sqlite3.connect('users.db')
    cursor = connection.cursor()
    cursor.execute( 'INSERT INTO users (nickname, password, rolle, firstName, patronymic , LastName) VALUES (?, ?, ?, ?, ?, ?)', 
                   (userData['login'],userData['password'],userData['rolle'],userData['Name'],userData['Patronymic'],userData['LastName']) )
    connection.commit()
    connection.close()
    return True

@eel.expose
def UpdateUser(userData):
    try:
        sqlQuery = '''
            UPDATE users SET 
            nickname=?,
            password=?,
            rolle=?,
            firstName=?,
            patronymic=?,
            lastName=?
            WHERE id = ?;'''
        connection = sqlite3.connect('users.db')
        cursor = connection.cursor()
        cursor.execute(
            sqlQuery, (
            userData['nickname'],
            userData['password'],
            userData['rolle'],
            userData['firstName'],
            userData['patronymic'],
            userData['lastName'],
            userData['id'])
            )
        connection.commit()
        connection.close()
        
        return True

    except Exception as Error:
        print(Error)
        return "Error"

@eel.expose
def DeleteUser(userID):
    sqlQuery = f"DELETE FROM users WHERE id={userID}"

    try:
        connection = sqlite3.connect('users.db')
        cursor = connection.cursor()
        cursor.execute(sqlQuery)
        connection.commit()
        connection.close()
        return True
    except Exception as Error:
        print(Error)
        return "Error"