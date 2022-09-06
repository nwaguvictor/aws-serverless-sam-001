const {DynamoDB} = require('aws-sdk');
const {v4: uuid} = require('uuid');

const db = new DynamoDB.DocumentClient();
const {TABLE_NAME} = process.env;

module.exports.handler = async (event) => {
  if (typeof event.body === 'string') {
    const {name, phone} = JSON.parse(event.body);
    const params = {
      TableName: TABLE_NAME,
      Item: {customer_id : uuid(), name, phone}
    }

    const {Item} = await db.put(params).promise();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({customer: Item})
    }
  }
}