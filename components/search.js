import { useState } from 'react';
// components
import { AiOutlineSearch } from 'react-icons/ai';
import styled from '@emotion/styled';

const Form = styled.form`
	min-width: 25rem;
	width: 100%;
	padding: 0.7rem 1.5rem;
	overflow: hidden;

	display: flex;
	align-items: center;
	gap: 1rem;

	background: rgba(var(--white), 0.7);
	backdrop-filter: blur(0.5rem);
	border-radius: 0.5rem;

	transition: background 0.4s ease 0s, box-shadow 0.4s ease 0s;

	&:focus-within,
	&:hover {
		background: rgba(var(--white), 0.9);
	}
`;

const Input = styled.input`
	width: 100%;
	height: 100%;

	color: rgb(var(--black));
	font-size: 1.4rem;
	font-weight: 500;

	&:hover,
	&:focus {
		outline: none;
		border: none;
	}

	&::placeholder {
		color: rgb(var(--gray));
	}
`;

const Icon = styled(AiOutlineSearch)`
	width: 2rem;
	height: 2rem;

	cursor: pointer;
	fill: rgb(var(--black));

	transform: translateY(${({ text }) => (!text ? `-5` : `0`)}rem);
	transition: transform 0.4s ease 0s;
`;

//text: string;

export const Search = ({ onSearch, ...props }) => {
	const [text, setText] = useState('');

	const onSubmit = (e, text) => {
		e.preventDefault();

		if (!text) return;
		onSearch(text);
	};

	return (
		<Form onSubmit={e => onSubmit(e, text)} {...props}>
			<Input
				className='xz'
				type='text'
				placeholder='Что ищем?'
				value={text}
				onChange={e => setText(e.currentTarget.value)}
			/>
			<button type='submit' tabIndex={!text ? -1 : 0}>
				<Icon text={text} />
			</button>
		</Form>
	);
};
