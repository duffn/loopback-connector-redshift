// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-connector-postgresql
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

'use strict';
var debug = require('debug')('loopback:connector:redshift:transaction');

module.exports = mixinTransaction;

/*!
 * @param {Redshift} Redshift connector class
 */
function mixinTransaction(Redshift) {
  /**
   * Begin a new transaction
   * @param isolationLevel
   * @param cb
   */
  Redshift.prototype.beginTransaction = function(isolationLevel, cb) {
    debug('Begin a transaction with isolation level: %s', isolationLevel);
    this.pg.connect(function(err, connection, done) {
      if (err) return cb(err);
      connection.query('BEGIN TRANSACTION ISOLATION LEVEL ' + isolationLevel,
        function(err) {
          if (err) return cb(err);
          cb(null, connection);
        });
    });
  };

  /**
   *
   * @param connection
   * @param cb
   */
  Redshift.prototype.commit = function(connection, cb) {
    debug('Commit a transaction');
    var self = this;
    connection.query('COMMIT', function(err) {
      self.releaseConnection(connection, err);
      cb(err);
    });
  };

  /**
   *
   * @param connection
   * @param cb
   */
  Redshift.prototype.rollback = function(connection, cb) {
    debug('Rollback a transaction');
    var self = this;
    connection.query('ROLLBACK', function(err) {
      //if there was a problem rolling back the query
      //something is seriously messed up.  Return the error
      //to the done function to close & remove this client from
      //the pool.  If you leave a client in the pool with an unaborted
      //transaction weird, hard to diagnose problems might happen.
      self.releaseConnection(connection, err);
      cb(err);
    });
  };

  Redshift.prototype.releaseConnection = function(connection, err) {
    if (typeof connection.release === 'function') {
      connection.release(err);
      connection.release = null;
    } else {
      var pool = this.pg;
      if (err) {
        pool.destroy(connection);
      } else {
        pool.release(connection);
      }
    }
  };
}
