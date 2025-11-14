import eel
import source.usersController
import source.configController
import source.iventsController
import source.stateManager
import source.autheficationController

eel.init('web')

eel.start('loginPage.html',
          mode='edge',
          port='23547'
          # mode='chrome'
          # mode='yandex'
    #   size=(700,400),
    #   geometry={'tableListVKS.html': {}},
    
      )
