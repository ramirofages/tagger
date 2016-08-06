// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { app, Menu, dialog } from 'electron';
import { devMenuTemplate } from './helpers/dev_menu_template';
import { editMenuTemplate } from './helpers/edit_menu_template';
import createWindow from './helpers/window';
import jetpack from 'fs-jetpack'; // module loaded from npm

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

var mainWindow;

var setApplicationMenu = function () {
    var menus = [editMenuTemplate];
    if (env.name !== 'production') {
        menus.push(devMenuTemplate);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};
function check_database_config()
{
  let config_dir = app.getPath("documents")+"\\"+"tagger_config\\"
  jetpack.dir(config_dir)
  let db_config = jetpack.read(config_dir+'database_config.json', 'json');
  if(db_config == null)
  {
    let response = dialog.showMessageBox({
      type: "info",
      buttons: ["continue", "Cancel"],
      defaultId: 1,
      title: "Database configuration not found",
      message: "First you will need to select a folder to create the database in which your files will be saved. A new folder called 'tagger_database' will be created inside the one you selected."
    })
    if(response===0)
    {
      let folder_selected = dialog.showOpenDialog({
        title: "Select folder for database creation",
        defaultPath: app.getPath("documents"),
        buttonLabel: "Select",
        properties: ["openDirectory"]
      })
      if(folder_selected != null)
      {
        jetpack.dir(folder_selected[0]+"\\tagger_database", { mode: '700' });
        jetpack.write(config_dir+'database_config.json', {db_path: folder_selected[0]+"\\tagger_database"});
        return true

      }else{ return false}

    }else{ return false}

  }else{ return true }

}
app.on('ready', function () {
    let no_errors = check_database_config()

    if(no_errors){
      //setApplicationMenu();

      var mainWindow = createWindow('main', {
          width: 1000,
          height: 600
      });

      mainWindow.loadURL('file://' + __dirname + '/app.html');

      if (env.name !== 'production') {
          mainWindow.openDevTools();
      }
    }else{
      app.quit()
    }

});

app.on('window-all-closed', function () {
    app.quit();
});
