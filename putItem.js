const AWS = require('aws-sdk');


AWS.config.update({
  region: 'eu-west-1', 
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const orderItem = {
  TableName: 'OrdersTable',
  Item: {
    'CustomerId': 'C001',
    'OrderDate': '2024-04-06',
    'OrderDetails': {
      'ProductID': 'P001',
      'Quantity': 2
    },
    'OrderStatus': 'Shipped'
  }
};

dynamoDB.put(orderItem, function(err, data) {
  if (err) {
    console.error("Unable to insert item. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Item inserted:", JSON.stringify(data, null, 2));
  }
});