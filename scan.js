const AWS = require('aws-sdk');


AWS.config.update({
  region: 'eu-west-1', 
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();


const params = {
    TableName: 'OrdersTable',
    FilterExpression: 'OrderStatus = :status',
    ExpressionAttributeValues: { ':status': 'Shipped' }
  };
  
  dynamoDB.scan(params, function(err, data) {
    if (err) {
      console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Scan succeeded. Items:", JSON.stringify(data.Items, null, 2));
    }
  });