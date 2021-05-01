module.exports = function(reqFields, reqValues, table) {
	var fields = [];
	var values = [];
	var index = [];
	for(var i = 0; i<reqValues.length; i++) {
		if(reqValues[i] != '') {
			fields.push(reqFields[i]);
			values.push(reqValues[i]);
			index.push('$' + fields.length);
		}
	}
	var query = {
		text: 'INSERT INTO ' + table +' (' + fields.join(', ') + ') VALUES (' + index.join(', ') + ')', 
		values: values
	}
	return query;
}
