const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-west-1'
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'OrdersTable',
  KeySchema: [
    { AttributeName: 'CustomerId', KeyType: 'HASH' },
    { AttributeName: 'OrderId', KeyType: 'RANGE' }
  ],
  AttributeDefinitions: [
    { AttributeName: 'CustomerId', AttributeType: 'S' },
    { AttributeName: 'OrderId', AttributeType: 'S' },
    { AttributeName: 'OrderStatus', AttributeType: 'S' },
    { AttributeName: 'OrderDate', AttributeType: 'S' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  GlobalSecondaryIndexes: [{
    IndexName: 'StatusDateIndex',
    KeySchema: [
      { AttributeName: 'OrderStatus', KeyType: 'HASH' },
      { AttributeName: 'OrderDate', KeyType: 'RANGE' }
    ],
    Projection: {
      ProjectionType: 'ALL'
    },
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  }]
};

dynamodb.createTable(params, function(err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});