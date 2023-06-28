import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@mui/material'
import { Trans } from 'react-i18next'

const components = {
	b: <b />,
}

function Translation({ t, text, values, ...props }) {
	const translation = useMemo(() => (
		<Trans
			t={t}
			i18nKey={text}
			values={values}
			components={components}
		/>
	), [t, text, values])

	return (
		<Typography {...props}>
			{translation}
		</Typography>
	)
}

Translation.propTypes = {
	/** I18n function. */
	t: PropTypes.func.isRequired,
	/** I18n text code of translation. */
	text: PropTypes.string.isRequired,
	/** Values which may be used in translation. */
	values: PropTypes.object,
	/** Difene if text must be wrapepd in EllipsisText. */
	ellipsis: PropTypes.bool,
}

Translation.defaultProps = {
	values: {},
	ellipsis: false,
}

export default Translation
