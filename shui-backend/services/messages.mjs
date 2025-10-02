import { client } from './client.mjs';
import {
	PutItemCommand,
	QueryCommand,
	DeleteItemCommand,
	UpdateItemCommand,
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
		console.log('RESPONSE: ', response);
		return response.Items.map((item) => unmarshall(item));
	} catch (error) {
		console.log('ERROR in getMessages in client: ', error.message);
		return [];
	}
};
export const newMessage = async (messageData) => {
	const messageId = `MESSAGE#${generateId(5)}`;
	const command = new PutItemCommand({
		TableName: 'shui-table',
		Item: {
			PK: { S: `USER#${messageData.username}` },
			SK: { S: messageId },
			Avatar: { S: messageData.avatar },
			CreatedAt: { S: new Date().toISOString() },
			Title: { S: messageData.title },
			Message: { S: messageData.message },
			Category: { S: messageData.category },
			GSI1PK: { S: 'MESSAGE' },
			GSI1SK: { S: `${new Date().toISOString()}` },
			GSI2PK: { S: `CATEGORY#${messageData.category}` },
			GSI2SK: { S: `${new Date().toISOString()}` },
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

export const getMessagesByUserId = async (userId) => {
	const command = new QueryCommand({
		TableName: 'shui-table',
		KeyConditionExpression: 'PK = :pk AND begins_with(SK, :skPrefix)',
		ExpressionAttributeValues: {
			':pk': { S: `USER#${userId}` },
			':skPrefix': { S: 'MESSAGE#' },
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

export const getMessagesByCategory = async (category) => {
	const command = new QueryCommand({
		TableName: 'shui-table',
		IndexName: 'GSI2',
		KeyConditionExpression: 'GSI2PK = :gsi2pk',
		ExpressionAttributeValues: {
			':gsi2pk': { S: `CATEGORY#${category}` },
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

export const editMessage = async (msgData) => {
	const command = new UpdateItemCommand({
		TableName: 'shui-table',
		Key: {
			PK: { S: `USER#${msgData.userId}` },
			SK: { S: msgData.msgId },
		},
		UpdateExpression:
			'SET Message = :message, Category = :category, Title = :title, GSI2PK = :gsi2pk, modifiedAt = :modifiedAt',
		ExpressionAttributeValues: {
			':message': { S: msgData.message },
			':title': { S: msgData.title },
			':gsi2pk': { S: `CATEGORY${msgData.category}` },
			':category': { S: msgData.category },
			':modifiedAt': { S: new Date().toISOString() },
		},
		// Här måste både PK och SK finnas för funktionen ska kunna köras
		ConditionExpression: 'attribute_exists(PK) AND attribute_exists(SK)',
		ReturnValues: 'ALL_NEW',
	});

	try {
		const response = await client.send(command);
		const editedMessage = unmarshall(response.Attributes);

		return editedMessage;
	} catch (error) {
		console.log('ERROR in EditMessage to db: ', error.message);
		return false;
	}
};
