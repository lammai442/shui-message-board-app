import shuiLogoGroupBlack from '../assets/logo/shui-logo-group-black-bold.svg';
import shuiLogoBlack from '../assets/logo/shui-logo-black.svg';
import { FaRegLaugh } from 'react-icons/fa';
import lightbulbRegular from '../assets/icons/lightbulb-regular-full.svg';
import laugh from '../assets/icons/laugh.svg';
import question from '../assets/icons/question.svg';

export const users = [
	{
		username: 'adam',
		password: '1234',
		email: 'adam@gmail.com',
	},
];

export const categories = [
	{
		category: 'all',
		title: 'ALLA',
		className: 'category-btn all-btn',
		iconLeft: shuiLogoGroupBlack,
	},
	{
		category: 'tankar',
		title: 'TANKAR',
		className: 'category-btn tankar-btn',
		iconLeft: shuiLogoBlack,
	},
	{
		category: 'humor',
		title: 'HUMOR',
		className: 'category-btn humor-btn',
		iconLeft: laugh,
	},
	{
		category: 'ideer',
		title: 'IDÉER',
		className: 'category-btn ideer-btn',
		iconLeft: lightbulbRegular,
	},
	{
		category: 'frågor',
		title: 'FRÅGOR',
		className: 'category-btn frågor-btn',
		iconLeft: question,
	},
];

export const categoriesValues = [
	{ value: 'tankar', label: 'Tankar' },
	{ value: 'ideer', label: 'Idéer' },
	{ value: 'frågor', label: 'Frågor' },
	{ value: 'humor', label: 'Humor' },
];
