import { hashPassword } from '../utils/bcrypt.mjs';
import { client } from './client.mjs';
import {
	PutItemCommand,
	GetItemCommand,
	UpdateItemCommand,
	QueryCommand,
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
					avatar: { S: user.avatar },
					gender: { S: user.gender },
					role: { S: user.role },
				},
			},
			CreatedAt: { S: new Date().toISOString() },
			GSI1PK: { S: 'EMAIL' },
			GSI1SK: { S: `${user.email}` },
		},
	});

	try {
		await client.send(command);
		return {
			username: user.username,
			email: user.email,
			avatar: user.avatar,
			gender: user.gender,
			role: user.role,
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

export const getUserByEmail = async (email) => {
	const command = new QueryCommand({
		TableName: 'shui-table',
		IndexName: 'GSI1',
		KeyConditionExpression: 'GSI1PK = :pk AND GSI1SK = :sk',
		ExpressionAttributeValues: {
			':pk': { S: 'EMAIL' },
			':sk': { S: email },
		},
	});

	try {
		const { Items } = await client.send(command);
		if (!Items || Items.length === 0) return false;
		console.log('ITEMS IN getuserbyemail : ', Items);

		const user = unmarshall(Items[0]);
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
		UpdateExpression:
			'SET attributes.email = :newEmail, attributes.avatar = :newAvatar, attributes.password = :newPassword, attributes.gender = :newGender, modifiedAt = :newModifiedAt',
		ExpressionAttributeValues: {
			':newEmail': { S: user.email },
			':newAvatar': { S: user.avatar },
			':newPassword': { S: user.password },
			':newGender': { S: user.gender },
			':newModifiedAt': { S: new Date().toISOString() },
		},
		ReturnValues: 'ALL_NEW',
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
