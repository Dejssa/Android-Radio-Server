import { Card, List, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import StationRow from './StationRow'
import AlertDialog from 'dialogs/AlertDialog'
import { useTranslation } from 'react-i18next'
import { deleteAction } from 'service/station/actions'
import { styled } from '@mui/styles'
import { common } from '@mui/material/colors'

const ListCard = styled(Card)(() => ({
	'&.MuiCard-root':{
		background: 'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(89,116,99,1) 60%)',
		height: '100%',
		borderRadius: 0,
		'& > ul': {
			height: '100%',
			overflow: 'auto',
		}
	},
}))

const ListTitle = styled(Typography)(({theme}) => {
	console.log(theme)
	return {
		'&.MuiTypography-root': {
			paddingBlock: theme.spacing(4),
			paddingInline: theme.spacing(2),
			background: 'rgba(89,116,99,1)',
			color: common.white,
		}
	}
})

const StationsList = () => {
	const stations = [
		{
			'Title': 'Radio ULRTA',
			'URL': 'https://nashe1.hostingradio.ru:80/ultra-128.mp3?wcid=fe5dada9-6a8b-4348-8087-aaaf0d7ac1fb&stationId=ultra-main',
			'UUID': '44bb3c5a-b153-4fb3-a185-7bee44472c49'
		},
		{
			'Title': 'Radio Record - Rock',
			'URL': 'https://radiorecord.hostingradio.ru/rock96.aacp',
			'UUID': 'cc697060-f60c-4d10-99fc-efcf60cbca0e'
		},
		{
			'Title': 'Radio Record - Goa psytrance',
			'URL': 'https://hls-01-radiorecord.hostingradio.ru/record-goa/96/playlist.m3u8',
			'UUID': '996c4f7d-777e-47ae-af97-7f3a51b3cff9'
		},
		{
			'Title': 'Radio Record - Midtempo',
			'URL': 'https://hls-01-radiorecord.hostingradio.ru/record-mt/96/playlist.m3u8',
			'UUID': '63c7881e-0315-4f11-b850-6390fb9d9d22'
		},
		{
			'Title': 'Radio Record - Synthwave',
			'URL': 'https://hls-01-radiorecord.hostingradio.ru/record-synth/96/playlist.m3u8',
			'UUID': 'e6534c56-de88-4c13-9490-ba9c44b975fa'
		},
		{
			'Title': 'Radio Record - Darkside',
			'URL': 'https://hls-01-radiorecord.hostingradio.ru/record-darkside/96/playlist.m3u8',
			'UUID': 'd2073bd1-11cc-4227-8346-167b381cdf4a'
		},
		{
			'Title': 'Skyrim ambient',
			'URL': 'https://stream-52.zeno.fm/y9cek178hv8uv?zs=VywVxTaYSNOyAyoUcBsAgw',
			'UUID': '4edcd393-ca2a-4977-bda2-71e316354ca0'
		},
		{
			'Title': 'DE - tf29',
			'URL': 'https://ia601809.us.archive.org/12/items/deus_ex_mankind_divided_ost_extended/08.%20Michael%20McCann%20-%20TF29.mp3',
			'UUID': '46567642-131b-4f51-b6dc-61f158ef660b'
		},
		{
			'Title': 'DE - Safehouse',
			'URL': 'http://mp3m.xn--80adhccsnv2afbpk.xn--p1ai/link.php?hash=782163564497384107115a15eed75c1agIlenamfMjAxNi1kZXVzLWV4LW1hbmtpbmQtZGl2aWRlZC8wNDI5Lm1wMw==',
			'UUID': '96b1da26-2932-4a5d-92f0-d891f3f1f236'
		},
		{
			'Title': 'Kyrie',
			'URL': 'https://i200.123muza.com/api/song/download/get/11/Death%20Note%20OST%202-kyrie%20II%20-%2001-textmp3.ru.mp3?origin=textmp3.ru&url=sid%3A%2F%2F216364381_419549172_db79e9bd8dc14ae836_63d5caf66aebefe661&artist=Death%20Note%20OST%202&title=kyrie%20II%20-%2001&index=0&user_id=193215062&future_urls=sid%3A%2F%2F16141210_66134724_d5477498aeb3273f7f_1cc7cbc0be246f4d5a%2Csid%3A%2F%2F121837340_456239244_b34bd4e2c7f244f62e_ba22304c5e1ef2d631%2Csid%3A%2F%2F231933096_456241280_a661de585a56248048_38857401c1007e0b9d%2Csid%3A%2F%2F546702483_456240294_de5de48394e3a6aa7b_4befc29d2650f723cd%2Csid%3A%2F%2F548986569_456239162_c208e2ff59726b4c60_24d5b4e64ac7321d74%2Csid%3A%2F%2F396090236_456239135_9ac756e95585df1d56_d30fdb8e70feef72da%2Csid%3A%2F%2F431151804_456243022_6a4e35b162af1d7255_1378b4a33dec679db7%2Csid%3A%2F%2F288713570_432045346_beb3080cdcea84a049_5dac95431ab18e04ed%2Csid%3A%2F%2F-27467089_237046834_e87866e594ea995bd7_b8d7648c19fa872229',
			'UUID': '214a81d2-a2f5-4249-8e8d-c7053deab733'
		},
		{
			'Title': 'Wake up Tigran (100% of volume)',
			'URL': 'https://fine.sunproxy.net/file/OW42dU5lVkM4VlFCV0liUi9Sa3FUa2ZsVlM1YWcxMjY1Vm94N2lOQnFXRS9uckFRbUN5K2ZxbHRvRXBWYlp2SzgrVDBDTDN3TFdsdEtYcFRyaFdTdWswZXJmaFVnVzYrNEcrWnN0eDgyb2M9/UT_99_OST_-_Mechanism_Eight_(Byfet.com).mp3',
			'UUID': 'e773697a-47ce-4be6-9b0a-a7b9b9ccfdf0'
		},
		{
			'Title': 'classical music',
			'URL': 'https://jfm1.hostingradio.ru:14536/rcstream.mp3?4603',
			'UUID': '5a05ed91-1b2b-488b-9d17-2f2d9c3494a6'
		},
		{
			'Title': 'Village of idiots',
			'URL': 'https://a1.dlshare.net/sde/30/80/da/-123376907_456239019.mp3',
			'UUID': 'c2856a30-efe3-45cf-b9f8-55478d4a6d2e'
		},
		{
			'Title': 'I can only count to four',
			'URL': 'https://now.morsmusic.org/load/135182167/Psychostick_-_Numbers_I_Can_Only_Count_To_Four_(musmore.com).mp3',
			'UUID': 'f17d5190-d6f6-4598-a939-fa1d81f62521'
		}
	]

	const { t } = useTranslation('text')

	const [deleteDialogOpen, setDeleteDialogOpen] = useState(null)
	const [selectedStation, setSelectedStation] = useState(null)

	const dispatch = useDispatch()

	const dispatchDeleteRequest = useCallback(item => dispatch(deleteAction(item.UUID)), [dispatch])
	
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
				{'Radio server'}
			</ListTitle>
			<List rowGap={2}>
				{stations.map(item => (
					<StationRow 
						station={item} 
						onDelete={handleOnDelete}
					/>
				))}
			</List>
			<AlertDialog 
				title={t('station.dialog.delete.title')}
				description={t('station.dialog.delete.description', { station: selectedStation?.Title })}
				open={deleteDialogOpen} 
				onConfirm={handleOnDialogConfirm}
				onCancel={handleOnCancel}
				onClose={handleOnDialogClose}
				isDeleteConfirmation
			/>
		</ListCard>
	)
}

export default StationsList