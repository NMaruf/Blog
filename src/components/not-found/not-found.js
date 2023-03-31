import React from 'react'
import { Alert } from 'antd'

import classes from './not-found.module.scss'

function NotFound() {
  return <Alert message="Страница не найдена" type="warning" showIcon className={classes.alert} />
}

export default NotFound
