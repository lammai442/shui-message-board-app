import { hashPassword } from '../utils/bcrypt.mjs';
import { client } from './client.mjs';
import {
	PutItemCommand,
	GetItemCommand,
	UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

export const registerUser = async (user) => {
	const command = new PutItemCommand({
		TableName: 'shui-table',
		Item: {
			PK: { S: `USER#${user.username}` },
			SK: { S: 'PROFILE' },
			attributes: {
				M: {
					username: { S: user.username },
					password: { S: await hashPassword(user.password) },
					email: { S: user.email },
					avatar: { S: user.avatarUrl },
					gender: { S: user.gender },
				},
			},
		},
	});

	try {
		await client.send(command);
		return {
			username: user.username,
			email: user.email,
			avatar: user.avatarUrl,
			gender: user.gender,
		};
	} catch (error) {
		console.log('ERROR in registerUser in client: ', error.message);
		return false;
	}
};

export const getUser = async (username) => {
	const command = new GetItemCommand({
		TableName: 'shui-table',
		Key: {
			PK: { S: `USER#${username}` },
			SK: { S: 'PROFILE' },
		},
	});

	try {
		const { Item } = await client.send(command);
		if (!Item) return false;

		const user = unmarshall(Item);
		return user;
	} catch (error) {
		console.log('ERROR in getUser in db: ', error.message);
	}
};

export const updateUser = async (user) => {
	const command = new UpdateItemCommand({
		TableName: 'shui-table',
		Key: {
			PK: { S: `USER#${user.username}` },
			SK: { S: 'PROFILE' },
		},
		UpdateExpression: 'SET attributes.email = :newEmail',
		ExpressionAttributeValues: {
			':newEmail': { S: user.email },
		},
		ReturnValues: 'ALL_NEW',
		// attributes: {
		// 	M: {
		// 		username: { S: user.username },
		// 		password: { S: await hashPassword(user.password) },
		// 		email: { S: user.email },
		// 		avatar: { S: user.avatarUrl },
		// 		gender: { S: user.gender },
		// 	},
		// },
	});

	try {
		const response = await client.send(command);
		const updatedUser = unmarshall(response.Attributes);

		return updatedUser.attributes;
	} catch (error) {
		console.log('ERROR in updateUser in client: ', error.message);
		return false;
	}
};
