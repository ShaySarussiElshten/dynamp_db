const AWS = require('aws-sdk');


AWS.config.update({
  region: 'eu-west-1', 
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();



const params = {
    TableName: 'OrdersTable',
    IndexName: 'StatusDateIndex',
    KeyConditionExpression: 'OrderStatus = :status',
    ExpressionAttributeValues: {
      ':status': 'Shipped'
    },
  };
  
  dynamoDB.query(params, function(err, data) {
    if (err) {
      console.error("Unable to query the index. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      data.Items.forEach(function(item) {
        console.log("Order found:", item.CustomerId, item.OrderId, item.OrderDetails, item.OrderDate);
      });
    }
  });