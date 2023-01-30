import { HiOutlineBuildingOffice2, HiOutlineComputerDesktop } from 'react-icons/hi';
import { AiOutlineSecurityScan, AiOutlineAudio } from 'react-icons/ai';
import { SlScreenSmartphone } from 'react-icons/sl';
import { BsTools, BsPlug } from 'react-icons/bs';
import { GiCardboardBox } from 'react-icons/gi';
import { FaNetworkWired } from 'react-icons/fa';

export const catalogData = [
	{
		icon: <SlScreenSmartphone />,
		name: 'Телефоны и гаджеты',
		categories: [3633, 21396, 21360, 3645],
		id: 0
	},
	{
		icon: <HiOutlineComputerDesktop />,
		name: 'Компьютеры',
		categories: [3659, 5751, 5739, 3586, 21451, 3486, 5648, 3434, 3539, 3645, 3655],
		id: 1
	},
	{
		icon: <AiOutlineAudio />,
		name: 'ТВ, Аудио, Видео',
		categories: [3773, 3648, 3466, 3767, 5638, 3506],
		id: 2
	},
	{
		icon: <BsPlug />,
		name: 'Электроника',
		categories: [
			5739, 3486, 3613, 3539, 3423, 5681, 3532, 3416, 3728, 3655, 5638, 3686, 3670, 3803, 21397, 3724, 5618, 3619,
			3878, 3557, 5685
		],
		id: 3
	},
	{
		icon: <FaNetworkWired />,
		name: 'Сетевое оборудование',
		categories: [3547, 3451, 5650, 5739, 3706, 3787, 3595, 3724, 5618, 3619],
		id: 4
	},
	{
		icon: <AiOutlineSecurityScan />,
		name: 'Охранные системы',
		categories: [3732, 5652, 3547, 5650],
		id: 5
	},
	{
		icon: <BsTools />,
		name: 'Строительные инструменты и материалы',
		categories: [5611, 5606],
		id: 6
	},
	{
		icon: <HiOutlineBuildingOffice2 />,
		name: 'Дом и офис',
		categories: [3686, 3557],
		id: 7
	},
	{
		icon: <GiCardboardBox />,
		name: 'Другое',
		categories: [3878, 3557, 5685],
		id: 8
	}
];
