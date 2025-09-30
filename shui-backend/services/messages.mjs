import { client } from './client.mjs';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { generateId } from '../utils/uuid.mjs';

export const newMessage = async (messageData) => {
	const command = new PutItemCommand({
		TableName: 'shui-table',
		Item: {
			PK: { S: `USER#${messageData.username}` },
			SK: { S: `MESSAGE#${generateId(5)}` },
			CreatedAt: { S: new Date().toISOString() },
			Title: { S: messageData.title },
			Message: { S: messageData.message },
			Category: { S: messageData.category },
			GSI1PK: { S: 'MESSAGE' },
			GSI1SK: { S: `${new Date().toISOString()}` },
			GSI2PK: { S: 'CATEGORY' },
			GSI2SK: { S: `CATEGORY#${messageData.category}` },
		},
	});

	try {
		await client.send(command);
		return true;
	} catch (error) {
		console.log('ERROR in registerUser in client: ', error.message);
		return false;
	}
};
