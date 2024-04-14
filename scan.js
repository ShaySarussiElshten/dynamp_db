const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-west-1'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const scanParams = {
  TableName: 'OrdersTable',
  FilterExpression: 'OrderDetails.Quantity < :quantity',
  ExpressionAttributeValues: {
    ':quantity': 10
  }
};

dynamodb.scan(scanParams, (err, data) => {
  if (err) {
    console.error("Unable to scan. Error:", JSON.stringify(err, null, 2));
  } else {
    console.log("Scan succeeded:", JSON.stringify(data.Items));
  }
});

