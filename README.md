Solar Topps UI Repo

Pre requisites:
System must have nodeJs 10.15.0 installed
Download from here : https://nodejs.org/en/


How to set up
git clone git@bitbucket.org:solartopps/st_ui_web.git
cd into the st_ui_web folder

npm install
npm start

open chrome
run localhost:3001
App should be up


This repo contains the UI level code and uses node/express js to mount the react/redux app.

We will be using prefixes in front of the branch name
prefixes will be

feature_<branch_name>
fix_<branch_name>


Quick git commands:
git clone <git_repo_url>
git pull origin master
git add <file_name>
git commit -m "Usefull commit message"
git push origin master



#Rebase steps

git checkout develop
git pull origin develop
git checkout <your branch name>
git rebase develop
git rebase --continue
 ## Resolve any conflicts
 ## unitil it says no rebase in progress
git push origin -f <your branch name>

