import { HiOutlineBuildingOffice2, HiOutlineComputerDesktop } from 'react-icons/hi';
import { AiOutlineSecurityScan, AiOutlineAudio } from 'react-icons/ai';
import { SlScreenSmartphone } from 'react-icons/sl';
import { BsTools, BsPlug } from 'react-icons/bs';
import { GiCardboardBox } from 'react-icons/gi';

export const catalogData = [
	{
		icon: <HiOutlineComputerDesktop />,
		name: 'Телефоны и гаджеты',
		elements: [3633, 21396, 21360, 3645],
		id: 0
	},
	{
		icon: <HiOutlineComputerDesktop />,
		name: 'Компьютеры',
		elements: [3659, 5751, 5739, 3586, 21451, 3486, 5648, 3434, 3539, 3645, 3655],
		id: 1
	},
	{
		icon: <AiOutlineAudio />,
		name: 'ТВ, Аудио, Видео',
		elements: [3773, 3648, 3466, 3767, 5638, 3506],
		id: 2
	},
	{
		icon: <SlScreenSmartphone />,
		name: 'Электроника',
		elements: [
			5739, 3486, 3613, 3539, 3423, 5681, 3532, 3416, 3728, 3655, 5638, 3686, 3670, 3803, 21397, 3724, 5618, 3619,
			3878, 3557, 5685
		],
		id: 3
	},
	{
		icon: <BsPlug />,
		name: 'Сетевое оборудование',
		elements: [3547, 3451, 5650, 5739, 3706, 3787, 3595, 3724, 5618, 3619],
		id: 4
	},
	{
		icon: <AiOutlineSecurityScan />,
		name: 'Охранные системы',
		elements: [3732, 5652, 3547, 5650],
		id: 5
	},
	{
		icon: <BsTools />,
		name: 'Строительные инструменты и материалы',
		elements: [5611, 5606],
		id: 6
	},
	{
		icon: <HiOutlineBuildingOffice2 />,
		name: 'Дом и офис',
		elements: [3686, 3557],
		id: 7
	},
	{
		icon: <GiCardboardBox />,
		name: 'Другое',
		elements: [3878, 3557, 5685],
		id: 8
	}
];
