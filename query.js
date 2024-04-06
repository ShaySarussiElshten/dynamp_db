const AWS = require('aws-sdk');


AWS.config.update({
  region: 'eu-west-1', 
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: 'OrdersTable',
  KeyConditionExpression: 'CustomerId = :customerId',
  ExpressionAttributeValues: {
    ':customerId': 'C001',
  }
};

dynamoDB.query(params, function(err, data) {
  if (err) {
    console.error("Unable to query items. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Query succeeded. Items:", JSON.stringify(data.Items, null, 2));
  }
});