/**
 * 
 * @param {string} id 
 * @param {string} _self 
 * @param {number} _ts 
 * @param {string} _rid 
 * @param {string} _etag
 * @param {string} _attachments
 * 
 */
function DocumentBaseModel(id, _self, _ts, _rid, _etag, _attachments) {
  this.id = id;
  this._self = _self;
  this._ts = _ts;
  this._rid = _rid;
  this._etag = _etag;
  this._attachments = _attachments;
}

module.exports = DocumentBaseModel;