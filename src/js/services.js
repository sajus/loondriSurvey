define(function(require) {
    var Backbone = require('backbone');

    var _ajax = function(url, data) {
        return $.ajax({
            url: Backbone.Model.gateWayUrl + url,
            data: JSON.stringify(data),
        });
    };

    /* Survey Services */

    var _getSurveyById = function(data) {
        return _ajax('/getSurveyById', data);
    };

    /* Question Services */

    var _createQuestions = function(data) {
        return _ajax('/createQuestions', data);
    };

    var _getQuestionById = function(data) {
        return _ajax('/getQuestionById', data);
    };

    var _updateQuestions = function(data) {
        return _ajax('/updateQuestions', data);
    };

    var _deleteQuestions = function(data) {
        return _ajax('/deleteQuestions', data);
    };

    /* Category Services */

    var _createCategory = function(data) {
        return _ajax('/createCategory', data);
    };

    var _getCategoryById = function(data) {
        return _ajax('/getCategoryById', data);
    };

    var _deleteCategory = function(data) {
        return _ajax('/deleteCategories', data);
    };

    /* Options Services */

    var _createOptions = function(data) {
        return _ajax('/createOptions', data);
    };

    var _deleteOptions = function(data) {
        return _ajax('/deleteOptions', data);
    };

    var _updateOptions = function(data) {
        return _ajax('/updateOptions', data);
    };


    return {
        deleteCategory: _deleteCategory,
        getCategoryById: _getCategoryById,
        createQuestions: _createQuestions,
        createCategory: _createCategory,
        updateOptions: _updateOptions,
        deleteOptions: _deleteOptions,
        createOptions: _createOptions,
        updateQuestions: _updateQuestions,
        getSurveyById: _getSurveyById,
        getQuestionById: _getQuestionById,
        deleteQuestions: _deleteQuestions
    }
});