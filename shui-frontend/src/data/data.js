import shuiLogoGroupBlack from '../assets/logo/shui-logo-group-black-bold.svg';
import shuiLogoBlack from '../assets/logo/shui-logo-black.svg';

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
		iconLeft: shuiLogoBlack,
	},
	{
		category: 'ideer',
		title: 'IDÉER',
		className: 'category-btn ideer-btn',
		iconLeft: shuiLogoBlack,
	},
	{
		category: 'frågor',
		title: 'FRÅGOR',
		className: 'category-btn frågor-btn',
		iconLeft: shuiLogoBlack,
	},
];

export const categoriesValues = [
	{ value: 'tankar', label: 'Tankar' },
	{ value: 'ideer', label: 'Idéer' },
	{ value: 'frågor', label: 'Frågor' },
	{ value: 'humor', label: 'Humor' },
];
