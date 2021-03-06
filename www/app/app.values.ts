/**
 * values() Here we define each core variables
 * such as user logged Id, end points, etc
 *
 * @param {IDataConfig} dataConfig
 * @return {void}
 */

/*--  INTERFACE --*/
interface IDataConfig {
    baseUrl: string;
    googleMapKey: string;
    mixpanelToken: string;
    userId: string;
}

/*--  MAIN FUNCTION --*/
(function (): void {

    'use strict';

    // DEV Fake
    // baseUrl: 'http://localhost:3000/'
    // Use: command - json-server --watch db.json
    // DEV BackEnd
    // baseUrl: 'http://127.0.0.1:8000/api/v1/'
    // PRD BackEnd
    // baseUrl: 'https://ynasu-server.herokuapp.com/api/v1/'
    var dataConfig: IDataConfig = {
        baseUrl: 'http://localhost:3000/',
        googleMapKey: 'AIzaSyD-vO1--MMK-XmQurzNQrxW4zauddCJh5Y',
        mixpanelToken: '86a48c88274599c662ad64edb74b12da',
        userId: ''
    };


    angular
        .module('mainApp')
        .value('dataConfig', dataConfig);

})();
