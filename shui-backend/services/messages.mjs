import { client } from './client.mjs';
import {
	PutItemCommand,
	QueryCommand,
	DeleteItemCommand,
} from '@aws-sdk/client-dynamodb';
import { generateId } from '../utils/uuid.mjs';
import { unmarshall } from '@aws-sdk/util-dynamodb';

export const getMessages = async () => {
	const command = new QueryCommand({
		TableName: 'shui-table',
		IndexName: 'GSI1',
		KeyConditionExpression: 'GSI1PK = :gsi1pk',
		ExpressionAttributeValues: {
			':gsi1pk': { S: 'MESSAGE' },
		},
		// Gör så att senaste kommer högst upp
		ScanIndexForward: false,
	});

	try {
		const response = await client.send(command);
		return response.Items.map((item) => unmarshall(item));
	} catch (error) {
		console.log('ERROR in getMessages in client: ', error.message);
		return [];
	}
};
export const newMessage = async (messageData) => {
	const command = new PutItemCommand({
		TableName: 'shui-table',
		Item: {
			PK: { S: `USER#${messageData.username}` },
			SK: { S: `MESSAGE#${generateId(5)}` },
			Avatar: { S: messageData.avatar },
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

export const deleteMessage = async (msgId, userId) => {
	const command = new DeleteItemCommand({
		TableName: 'shui-table',
		Key: {
			PK: { S: `USER#${userId}` },
			SK: { S: `MESSAGE#${msgId}` },
		},
		ReturnValues: 'ALL_OLD',
	});

	try {
		const result = await client.send(command);
		if (!result.Attributes) {
			return {
				success: false,
				message: 'Message not found or already deleted',
			};
		}

		return {
			success: true,
			message: 'Meddelande är borttagen',
			deletedMessage: result.Attributes,
		};
	} catch (error) {
		console.log('ERROR in deleteMessage in db', error.message);
		throw new Error('Could not delete message');
	}
};
