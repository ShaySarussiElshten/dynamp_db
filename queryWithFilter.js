const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-west-1'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const params = {
    TableName: 'OrdersTable',
    KeyConditionExpression: 'CustomerId = :customerId',
    FilterExpression: 'OrderStatus = :status',
    ExpressionAttributeValues: {
      ':customerId': 'C001',
      ':status': 'Shipped'
    }
  };
  
  dynamodb.query(params, (err, data) => {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
      console.log("Query succeeded:", JSON.stringify(data.Items));
    }
  });