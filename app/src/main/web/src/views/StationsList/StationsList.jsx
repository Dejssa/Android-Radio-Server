import { 
	Button,
	Card, 
	List, 
	TextField, 
	Typography,
} from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import StationRow from './StationRow'
import AlertDialog from 'dialogs/AlertDialog'
import { useTranslation } from 'react-i18next'
import { 
	deleteAction,
	playAction,
} from 'service/station/actions'
import { styled } from '@mui/styles'
import { common } from '@mui/material/colors'
import EditStationDialog from 'dialogs/EditStationDialog'
import Header from './Header'
import Translation from 'components/Translation'

const ListCard = styled(Card)(() => ({
	'&.MuiCard-root':{
		background: 'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(89,116,99,1) 60%)',
		height: '100%',
		borderRadius: 0,
		display: 'flex',
		flexDirection: 'column',
		'& > ul': {
			height: '100%',
			overflow: 'auto',
		}
	},
}))

const Search = styled(TextField)(() => ({
	'&.MuiFormControl-root': {
		'& > .MuiInputBase-root': {
			borderRadius: 0,
			border: 'unset',
			backgroundColor: '#262227',
			paddingBlock: 12,
			paddingInline: 16,
			color: 'white'
		},
	}
}))

const ListTitle = styled(Typography)(({theme}) => ({
	'&.MuiTypography-root': {
		paddingBlock: theme.spacing(4),
		paddingInline: theme.spacing(2),
		background: 'rgba(89,116,99,1)',
		color: common.white,
	}
}))

const AddButton = styled(Button)(({theme}) => ({
	'&.MuiButton-root': {
		borderRadius: 0,
		height: 80,
	}
}))

const StationsList = () => {
	// const stations = useSelector(getRadioStations)
	const stations = [
		{
			'Title': 'Radio ULRTA',
			'URL': 'https://nashe1.hostingradio.ru:80/ultra-128.mp3?wcid=fe5dada9-6a8b-4348-8087-aaaf0d7ac1fb&stationId=ultra-main',
			'UUID': '0ef8cf60-b517-4bb8-8145-4c69fc5016c3'
		},
		{
			'Title': 'Radio Record - Rock',
			'URL': 'https://radiorecord.hostingradio.ru/rock96.aacp',
			'UUID': '2f1398b5-f742-4508-99ba-ecb0909aa180'
		},
		{
			'Title': 'Radio Record - Goa psytrance',
			'URL': 'https://hls-01-radiorecord.hostingradio.ru/record-goa/96/playlist.m3u8',
			'UUID': '17067bbd-ac62-4b19-86d2-a7760542ae8f'
		},
		{
			'Title': 'Radio Record - Midtempo',
			'URL': 'https://hls-01-radiorecord.hostingradio.ru/record-mt/96/playlist.m3u8',
			'UUID': 'aba8c56d-24a9-4c21-b761-9eca7a9e9c6d'
		},
		{
			'Title': 'Radio Record - Synthwave',
			'URL': 'https://hls-01-radiorecord.hostingradio.ru/record-synth/96/playlist.m3u8',
			'UUID': 'b6dd5604-3bc2-4de1-9cf8-a059c0f63c48'
		},
		{
			'Title': 'Radio Record - Darkside',
			'URL': 'https://hls-01-radiorecord.hostingradio.ru/record-darkside/96/playlist.m3u8',
			'UUID': 'bdd38402-b3ad-4874-901f-022e5251ba6a'
		},
		{
			'Title': 'DE - tf29',
			'URL': 'https://ia601809.us.archive.org/12/items/deus_ex_mankind_divided_ost_extended/08.%20Michael%20McCann%20-%20TF29.mp3',
			'UUID': '16859816-36a7-442b-b973-9f012b3ac4d5'
		},
		{
			'Title': 'DE - Safehouse',
			'URL': 'http://mp3m.xn--80adhccsnv2afbpk.xn--p1ai/link.php?hash=782163564497384107115a15eed75c1agIlenamfMjAxNi1kZXVzLWV4LW1hbmtpbmQtZGl2aWRlZC8wNDI5Lm1wMw==',
			'UUID': '891f48fb-5aee-4a23-b0d4-ad38b9970c7c'
		},
		{
			'Title': 'Kyrie',
			'URL': 'https://i200.123muza.com/api/song/download/get/11/Death%20Note%20OST%202-kyrie%20II%20-%2001-textmp3.ru.mp3?origin=textmp3.ru&url=sid%3A%2F%2F216364381_419549172_db79e9bd8dc14ae836_63d5caf66aebefe661&artist=Death%20Note%20OST%202&title=kyrie%20II%20-%2001&index=0&user_id=193215062&future_urls=sid%3A%2F%2F16141210_66134724_d5477498aeb3273f7f_1cc7cbc0be246f4d5a%2Csid%3A%2F%2F121837340_456239244_b34bd4e2c7f244f62e_ba22304c5e1ef2d631%2Csid%3A%2F%2F231933096_456241280_a661de585a56248048_38857401c1007e0b9d%2Csid%3A%2F%2F546702483_456240294_de5de48394e3a6aa7b_4befc29d2650f723cd%2Csid%3A%2F%2F548986569_456239162_c208e2ff59726b4c60_24d5b4e64ac7321d74%2Csid%3A%2F%2F396090236_456239135_9ac756e95585df1d56_d30fdb8e70feef72da%2Csid%3A%2F%2F431151804_456243022_6a4e35b162af1d7255_1378b4a33dec679db7%2Csid%3A%2F%2F288713570_432045346_beb3080cdcea84a049_5dac95431ab18e04ed%2Csid%3A%2F%2F-27467089_237046834_e87866e594ea995bd7_b8d7648c19fa872229',
			'UUID': '0f178ea9-f76e-4036-a1d0-855119d69f7d'
		},
		{
			'Title': 'Wake up Tigran (100% of volume)',
			'URL': 'https://fine.sunproxy.net/file/OW42dU5lVkM4VlFCV0liUi9Sa3FUa2ZsVlM1YWcxMjY1Vm94N2lOQnFXRS9uckFRbUN5K2ZxbHRvRXBWYlp2SzgrVDBDTDN3TFdsdEtYcFRyaFdTdWswZXJmaFVnVzYrNEcrWnN0eDgyb2M9/UT_99_OST_-_Mechanism_Eight_(Byfet.com).mp3',
			'UUID': 'bccdc845-b6a4-4376-986b-3c3a02cfff84'
		},
		{
			'Title': 'classical music',
			'URL': 'https://jfm1.hostingradio.ru:14536/rcstream.mp3?4603',
			'UUID': '618cb068-fe00-43fe-b8ab-128304d10d30'
		},
		{
			'Title': 'Village of idiots',
			'URL': 'https://a1.dlshare.net/sde/30/80/da/-123376907_456239019.mp3',
			'UUID': '3d7210d7-ef6d-4fb3-ad66-e552ce4c8412'
		},
		{
			'Title': 'I can only count to four',
			'URL': 'https://now.morsmusic.org/load/135182167/Psychostick_-_Numbers_I_Can_Only_Count_To_Four_(musmore.com).mp3',
			'UUID': 'efae9050-672a-464c-9e59-9844d752b1fa'
		},
		{
			'Title': 'Skyrim Atmospheres',
			'URL': 'https://www.gamethemesongs.com/song/download/46325',
			'UUID': '8af7cb57-c252-466d-ace6-648b11c4fe4b'
		},
		{
			'Title': 'Skyrim ambient',
			'URL': 'https://stream-52.zeno.fm/y9cek178hv8uv?zs=VywVxTaYSNOyAyoUcBsAgw',
			'UUID': '783a147b-91af-46b6-a4c7-1e97d89f5edb'
		}
	]

	const { t } = useTranslation(['stations'])

	const [deleteDialogOpen, setDeleteDialogOpen] = useState(null)
	const [selectedStation, setSelectedStation] = useState(null)

	const dispatch = useDispatch()

	const dispatchDeleteRequest = useCallback(item => dispatch(deleteAction(item.UUID)), [dispatch])
	const dispatchPlayRequest = useCallback(item => dispatch(playAction(item.UUID)), [dispatch])

	const handleOnDelete = useCallback(item => {
		setSelectedStation(item)
		setDeleteDialogOpen(true)
	}, [])
	
	const handleOnCancel = useCallback(() => setDeleteDialogOpen(false), [])

	const handleOnDialogClose = useCallback(() => setSelectedStation(null), [])

	const handleOnDialogConfirm = useCallback(() => {
		dispatchDeleteRequest(selectedStation)
		setDeleteDialogOpen(false)
	}, [dispatchDeleteRequest, selectedStation])

	return (
		<ListCard>
			<ListTitle variant='h6'>
				<Header/>
			</ListTitle>
			<Search
				placeholder={t('stations:list.search')}
				variant='standard'
				fullWidth
			/>
			<List rowGap={2}>
				{stations.map(item => (
					<StationRow 
						key={`station-${item.UUID}`}
						station={item} 
						onPlay={dispatchPlayRequest}
						onDelete={handleOnDelete}
					/>
				))}
			</List>
			<AddButton 
				variant='contained'
				size='large'
			>
				{t('stations:list.add')}
			</AddButton>
			<AlertDialog 
				title={t('stations:dialog.delete.title')}
				description={(
					<Translation
						t={t}
						text={'stations:dialog.delete.description'}
						values={{ name: selectedStation?.Title }}
					/>
				)}
				open={deleteDialogOpen} 
				onConfirm={handleOnDialogConfirm}
				onCancel={handleOnCancel}
				onClose={handleOnDialogClose}
				isDeleteConfirmation
			/>
			<EditStationDialog
				open={true}
			/>
		</ListCard>
	)
}

export default StationsList