This is a readme txt



Use Config settings

i) npm install rc 
OR
ii) npm install config
and use require('config')

store settings in config/<name>.json


store passwords in config/custom-environment-variables.json             //mapping of config settings to env variables
use set <env_name>=<value> for windows
use export " " " " " " " " for mac





Debugging

i) npm install Debugging

during run, use set/export DEBUG=<namespace> nodemon <file>.js         or DEBUG=<key:*>        or DEBUG=