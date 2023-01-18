// components
import { BsFillChatRightTextFill } from 'react-icons/bs';
import styled from '@emotion/styled';
import { useState } from 'react';

const ChatButton = styled.button`
	width: 5.5rem;
	height: 5.5rem;
	z-index: 69;

	display: flex;
	justify-content: center;
	align-items: center;

	background: rgb(var(--${({ showChat }) => (showChat ? `error` : `primary`)}));
	border-radius: ${({ showChat }) => (showChat ? `0 0 50% 50%` : `50%`)};

	color: rgb(var(--white));
	font-size: 2.6rem;

	position: fixed;
	bottom: 1.5rem;
	right: 1.5rem;

	transition: background 0.6s ease 0s, border-radius 0.4s ease 0.2s;

	@media screen and (max-width: 1024px) {
		display: none;
	}
`;

const Chat = styled.iframe`
	width: 35rem;
	height: 40rem;
	overflow: hidden;
	z-index: 70;

	border: none;
	border-radius: 2rem 2rem 0 2rem;

	position: fixed;
	bottom: 6.5rem;
	right: ${({ showChat }) => (showChat ? `1.5rem` : `-40%`)};

	transition: right 0.6s ease 0s;

	@media screen and (max-width: 1024px) {
		display: none;
	}
`;

export const ChatBot = () => {
	const [showChat, setShowChat] = useState(false);

	return (
		<>
			<Chat
				showChat={showChat}
				allow='microphone;'
				loading='lazy'
				src='https://console.dialogflow.com/api-client/demo/embedded/db68f2ef-4d0a-402f-835c-2be299f89087'></Chat>
			<ChatButton showChat={showChat} onClick={() => setShowChat(!showChat)}>
				<BsFillChatRightTextFill />
			</ChatButton>
		</>
	);
};
