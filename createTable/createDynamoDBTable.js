const AWS = require('aws-sdk');

// Configure AWS
AWS.config.update({
  region: 'us-west-1', 
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName : 'OrdersTable',
  KeySchema: [       
      { AttributeName: 'CustomerId', KeyType: 'HASH'},  // Partition key
      { AttributeName: 'OrderId', KeyType: 'RANGE' }  // Sort key
  ],
  AttributeDefinitions: [       
      { AttributeName: 'CustomerId', AttributeType: 'S' },
      { AttributeName: 'OrderId', AttributeType: 'S' }
  ],
  ProvisionedThroughput: {       
      ReadCapacityUnits: 1, 
      WriteCapacityUnits: 1
  }
};

dynamodb.createTable(params, function(err, data) {
  if (err) {
      console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
      console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});