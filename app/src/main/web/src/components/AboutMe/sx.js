import { common, grey } from '@mui/material/colors'

export default {
  link: (hasLink, current) => ({
    'color': common.white,
    'textDecoration': 'none',
    ...hasLink && {
      ':hover': {
        color: grey[400],
      },
    },
    ...current && {
      border: '2px white solid',
      borderRadius: 2,
      px: 2,
    },
  }),
  content: {
    mb: 8,
  },
  sectionBlack: {
    py: 8,
    backgroundColor: common.black,
    color: common.white,
  },
  section: {
    py: 8,
  },
  subSection: {
    overflow: 'auto',
    pt: 8,
    pb: 2,
  },
}
