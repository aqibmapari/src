import { SQLite } from 'ionic-native';
//import { SqlStorage, Storage} from 'ionic-angular';
export class DatabaseService {
	public db : SQLite;
	//db : Storage;
    constructor() {
		this.db = new SQLite();

		//this.db = new Storage(SqlStorage);
    }
	openDB(){
		return new Promise((resolve, reject) => {
			resolve('success'); // test ionic serve
			// this.db.openDatabase({
			// 	name: 'iSFA.db',
			// 	location: 'default' // the location field is required
			// }).then(() => {
			// 	console.log('Success: iSFA opened');
			// 	resolve('success');
			// }, (err) => {
			// 	console.error('Unable to open database: ', err);
			// 	reject(err);
			// });
		});
	}
	createTableQuery(tableName,columns){
		console.log(this.db);
		return new Promise((resolve, reject) => {
			resolve('success'); // test ionic serve
			// console.log(this.db);
			// this.db.executeSql('CREATE TABLE IF NOT EXISTS '+tableName+' ('+columns+')', {}).then(() => {
			// 	resolve("success");
			// }, (err) => {
			// 	console.error('Unable to execute sql: ', err);
			// 	reject(err);
			// });
		});

	}
	insertIntoTableQuery(tableName,columns,params,index){
		return new Promise((resolve, reject) => {
			resolve('success'); // test ionic serve
			// let placeholders = '?';
			// let _length = columns.split(',').length;
			// for(var i=0; i<_length-1; i++){
			// 	placeholders += ',?';
			// }
			// this.db.executeSql('INSERT OR REPLACE INTO '+tableName+' ('+columns+') VALUES( '+placeholders+')', params).then((data) => {
			// 	data['index'] = index;
			// 	resolve(data);
			// }, (err) => {
			// 	console.error('Unable to execute sql: ', err);
			// 	reject(err);
			// });
		});

	}
	selectTableQuery(tableName,columns,whereClause,params,index){
		return new Promise((resolve, reject) => {
			resolve('success'); // test ionic serve
			// this.db.executeSql('SELECT '+columns+' FROM '+tableName+' '+whereClause, params).then((data) => {
			// 	data['index'] = index;
			// 	resolve(data);
			// }, (err) => {
			// 	console.error('Unable to execute sql: ', err);
			// 	reject(err);
			// });
		});

	}
	selectComplexQuery(query,params,index){
		return new Promise((resolve, reject) => {
			resolve('success'); // test ionic serve
			// this.db.executeSql(query, params).then((data) => {
			// 	data['index'] = index;
			// 	resolve(data);
			// }, (err) => {
			// 	console.error('Unable to execute sql: ', err);
			// 	reject(err);
			// });
		});

	}
	updateTableQuery(tableName,columns,whereClause,params,index){
		return new Promise((resolve, reject) => {
			resolve('success'); // test ionic serve
			// this.db.executeSql('update '+tableName+' SET '+columns+' '+whereClause, params).then((data) => {
			// 	data['index'] = index;
			// 	resolve(data);
			// }, (err) => {
			// 	console.error('Unable to execute sql: ', err);
			// 	reject(err);
			// });
		});

	}
	deleteTableQuery(tableName,whereClause,params){
		return new Promise((resolve, reject) => {
			resolve('success'); // test ionic serve
			// this.db.executeSql('DELETE FROM '+tableName+' '+whereClause, params).then((data) => {
			// 	resolve(data);
			// }, (err) => {
			// 	console.error('Unable to execute sql: ', err);
			// 	reject(err);
			// });
		});

	}
}
