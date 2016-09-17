## loopback-connector-redshift
The Redshift Connector module for for [loopback-datasource-juggler](http://docs.strongloop.com/loopback-datasource-juggler/).

This is based up the [loopback-connector-postgresql](PostgreSQL Connector) for LoopBack with updates
that make the connector usable with [Redshift](http://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html).

**This connector is in the early stages of development and not all features work.** 

## Connector settings

The connector can be configured using the following settings from the data source.
* url: The URL to the database, such as 'postgres://test:mypassword@mycluster.abc123.us-east-1.redshift.amazonaws.com:5439/dev'
* host or hostname: The host name or ip address of the Redshift DB server
* port: The port number of the Redshift DB server
* username or user: The user name to connect to the Redshift DB
* password: The password
* database: The Redshift database name
* debug (default to false)

The Redshift connector uses [node-postgres](https://github.com/brianc/node-postgres) as the driver. See more
information about configuration parameters, check [https://github.com/brianc/node-postgres/wiki/Client#constructors](https://github.com/brianc/node-postgres/wiki/Client#constructors).

## Methods

While the automated tests have not yet been updated for use with Redshift, I have
manually tested all of the checked REST API methods and have confirmed them as working.

- [x] PATCH /model
- [x] GET /model
- [x] PUT /model
- [x] POST /model
- [x] PATCH /model/{id}
- [x] GET /model/{id}
- [x] HEAD /model/{id}
- [x] PUT /model/{id}
- [x] DELETE /model/{id}
- [x] GET /model/{id}/exists
- [x] POST /model/{id}/replace
- [] GET /model/change-stream
- [] POST /model/change-stream
- [x] GET /model/count
- [x] GET /model/findOne
- [x] POST /model/replaceOrCreate
- [x] POST /model/update
- [x] POST /model/upsertWithWhere

## Discovery and Migration

Most of the discovery and migration code is still from the original PostgreSQL connector and
therefore, probably doesn't work. I've updated a few portions of the code, but 
the only function that I've tried so far is `autoMigrate` 
and this worked with the built-in LoopBack tables. The rest will be updated in time.

## Tests

Tests are the original PostgreSQL tests and nothing is going to work right now.
