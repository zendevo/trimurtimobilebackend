Folder Structure
config => MongoDB Connection, ENV variables
models => MongoDB Schema
controllers => Request/Response handling
services => business logic
routes => api routes
middlewares => common code to handle errors, roles validation
utils => helpers
validators Joi/Zod => to validate schema & request payload
jobs => cron / background jobs

Controller = HTTP logic
Service = business logic
Model = DB structure
