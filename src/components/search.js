import { useEffect, useState } from 'react';
// components
import { AiOutlineSearch } from 'react-icons/ai';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const Form = styled.form`
	min-width: 25rem;
	width: 100%;
	padding: 0.7rem 1.5rem;

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

const Button = styled.button`
	overflow: hidden;
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

export const Search = ({ ...props }) => {
	const { query, push } = useRouter();
	const [text, setText] = useState(query.search ?? '');

	useEffect(() => {
		setText(query.search ?? '');
	}, [query.search]);

	const onSearch = text => {
		push(`/search?search=${text}`);
	};

	const onSubmit = e => {
		e.preventDefault();

		if (!text) return;
		onSearch(text);
	};

	return (
		<Form onSubmit={onSubmit} {...props}>
			<Input
				className='xz'
				type='text'
				placeholder='Что ищем?'
				value={text}
				onChange={e => setText(e.currentTarget.value)}
			/>
			<Button type='submit' tabIndex={!text ? -1 : 0}>
				<Icon text={text} />
			</Button>
		</Form>
	);
};
