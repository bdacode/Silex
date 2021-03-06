//////////////////////////////////////////////////
// Silex, live web creation
// http://projects.silexlabs.org/?/silex/
//
// Copyright (c) 2012 Silex Labs
// http://www.silexlabs.org/
//
// Silex is available under the GPL license
// http://www.silexlabs.org/silex/silex-licensing/
//////////////////////////////////////////////////

/**
 * @fileoverview
 *   This class is used to provide undo / redo functionnality
 *
 */


goog.provide('silex.model.UndoableAction');
goog.provide('silex.model.UndoRedoManager');


/**
 * @constructor
 * @param  {function} redoCallback  a function which is called when do() is called
 * @param  {function} undoCallback  a function which is called when undo() is called
 */
silex.model.UndoableAction = function(redoCallback, undoCallback) {
  this.redoCallback = redoCallback;
  this.undoCallback = undoCallback;
};


/**
 * reference to the {function} redoCallback which is called when do() is called
 */
silex.model.UndoableAction.prototype.redoCallback;


/**
 * reference to the {function} undoCallback which is called when undo() is called
 */
silex.model.UndoableAction.prototype.undoCallback;


/**
 * @constructor
 */
silex.model.UndoRedoManager = function() {
  this.undoableActions = [];
  this.currentIndex = -1;
};


/**
 * index of the current action
 * @type {number}
 */
silex.model.UndoRedoManager.prototype.currentIndex;


/**
 * the undoable actions
 * @type {array} array of UndoableAction
 */
silex.model.UndoRedoManager.prototype.undoableActions;


/**
 * undo the last action
 */
silex.model.UndoRedoManager.prototype.undo = function () {
  if (this.currentIndex > 0 && this.undoableActions.length > 0){
    console.log('undo');
    this.undoableActions[this.currentIndex--].undoCallback();
  }
  else{
    console.warn('nothing to undo');
  }
};


/**
 * redo the last undone action
 */
silex.model.UndoRedoManager.prototype.redo = function () {
  if (this.currentIndex < this.undoableActions.length - 1){
    console.log('redo');
    this.undoableActions[this.currentIndex++].redoCallback();
  }
  else{
    console.warn('nothing to redo');
  }
};


/**
 * add an undoable action
 * @param {UndoableAction} undoableAction
 */
silex.model.UndoRedoManager.prototype.add = function (undoableAction) {
  console.log('add action', undoableAction);
  // remove all actions after the current one
  while (this.currentIndex < this.undoableActions.length - 1){
    var action = this.undoableActions.pop();
    console.log('removed action', action, this.undoableActions);
  }
  this.undoableActions.push(undoableAction);
  this.currentIndex++;
};


