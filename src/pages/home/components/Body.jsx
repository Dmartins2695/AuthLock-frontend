import React, { useEffect, useState } from 'react'
import classes from './Body.module.sass'
import StarIcon from '@mui/icons-material/Star'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import { IconButton, Popover, Typography } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import SecurityIcon from '@mui/icons-material/Security'
import Grid from '@mui/material/Grid'
import { useGetPasswordsMutation, useUpdatePasswordApiMutation } from '../../../features/password/passwordApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUserId } from '../../../features/auth/authSlice'
import { addNewPassword, selectCurrentPasswords, setPasswords, updatePassword } from '../../../features/password/passwordSlice'
import { i18n } from '../../../features/i18n/i18n'
import { differenceInDays } from 'date-fns'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const RenderColumnsTitles = ({ handleAddNewPassword }) => {
  return (
    <Grid
      container
      flexDirection='row'
      justifyContent='flex-start'
      alignItems='center'
      sx={{ background: 'rgba(232, 244, 255, 0.6)', borderBottom: '1px solid #b7b7b7' }}
    >
      <Grid item xs={0.3}>
        <IconButton size='small' onClick={handleAddNewPassword}>
          <AddIcon sx={{ color: '#20c015' }} />
        </IconButton>
      </Grid>
      <Grid item xs={11.6}>
        <Grid container flexDirection='row' justifyContent='flex-start' alignItems='center'>
          <Grid item xs={0.3} className={classes.bodyDataItemNumber}>
            <Typography>{i18n('table_title_number')}</Typography>
          </Grid>
          <Grid item xs={1} className={classes.bodyDataItemFavorite}>
            <Typography>{i18n('table_title_favorite')}</Typography>
          </Grid>
          <Grid item xs={3} className={classes.bodyDataItemWebsite}>
            <Typography>{i18n('table_title_website')}</Typography>
          </Grid>
          <Grid item xs={3} className={classes.bodyDataItePassword}>
            <Typography>{i18n('table_title_password')}</Typography>
          </Grid>
          <Grid item xs={1.7} className={classes.bodyDataItemCreatedAt}>
            <Typography>{i18n('table_title_date_of_creation')}</Typography>
          </Grid>
          <Grid item xs={1.7} className={classes.bodyDataItemCreatedAt}>
            <Typography>{i18n('table_title_date_of_update')}</Typography>
          </Grid>
          <Grid item xs={1} className={classes.bodyDataItemWeak}>
            <Typography>{i18n('table_title_strength')}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const RenderEditItem = ({ item, index, setEditObj }) => {
  const [data, setData] = useState({ websiteUrl: item?.websiteUrl, password: item?.value })
  const style = index % 2 !== 0 ? { background: 'rgba(232, 244, 255, 0.6)' } : {}
  const createdAt =
    differenceInDays(new Date(item?.createdAt), new Date()) >= 0
      ? differenceInDays(new Date(item?.createdAt), new Date())
      : differenceInDays(new Date(item?.createdAt), new Date()) * -1
  const updatedAt =
    differenceInDays(new Date(item?.updatedAt), new Date()) >= 0
      ? differenceInDays(new Date(item?.updatedAt), new Date())
      : differenceInDays(new Date(item?.updatedAt), new Date()) * -1
  const dispatch = useDispatch()
  const [updatePasswordApi] = useUpdatePasswordApiMutation()
  const userId = useSelector(selectCurrentUserId)
  const handleItemMenu = () => {
    setEditObj((prevState) => !prevState)
  }

  const handleConfirmEdit = () => {
    updatePasswordApi({ userId, password: data.password, websiteUrl: data.websiteUrl, id: item.id }).then((response) => {
      if (response.error) {
        console.error(response.error)
      } else {
        console.log(response)
        dispatch(updatePassword({ password: response.data, index }))
        setEditObj({ edit: false, rowNumber: -1 })
      }
    })
  }

  const onChange = (e) => {
    setData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }))
  }

  return (
    <Grid container justifyContent='flex-start' alignItems='center' sx={style}>
      <Grid item xs={0.5}>
        <Grid container flexDirection='row' justifyContent='flex-start' alignItems='center'>
          <Grid item>
            <IconButton
              size='small'
              onClick={() => {
                setEditObj({ edit: false, rowNumber: -1 })
              }}
            >
              <CloseIcon style={{ color: '#ec1d24' }} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton size='small' onClick={handleConfirmEdit}>
              <CheckIcon style={{ color: '#1dec77' }} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={11.5}>
        <Grid container flexDirection='row' justifyContent='flex-start' alignItems='center'>
          <Grid item xs={0.1} className={classes.bodyDataItemNumber}>
            <Typography>{index + 1}</Typography>
          </Grid>
          <Grid item xs={1} className={classes.bodyDataItemFavorite}>
            {item?.favorite ? <StarIcon style={{ color: 'rgb(245 183 69)' }} /> : <StarOutlineIcon style={{ color: 'rgb(179 179 179)' }} />}
          </Grid>
          <Grid item xs={3} className={classes.bodyDataItemWebsite}>
            <TextField id='websiteUrl' value={data.websiteUrl} variant='outlined' size='small' onChange={onChange} />
          </Grid>
          <Grid item xs={3} className={classes.bodyDataItePassword}>
            <Grid container flexDirection='row' justifyContent='center' alignItems='center'>
              <Grid item>
                <TextField id='password' value={data.password} variant='outlined' size='small' onChange={onChange} />
              </Grid>
              <Grid item>
                <IconButton size='small' disabled>
                  <VisibilityIcon sx={{ width: '0.8em', height: '0.8em' }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1.8} className={classes.bodyDataItemCreatedAt}>
            <Typography>{createdAt} days ago</Typography>
          </Grid>
          <Grid item xs={1.8} className={classes.bodyDataItemCreatedAt}>
            <Typography>{updatedAt} days ago</Typography>
          </Grid>
          <Grid item xs={1} className={classes.bodyDataItemWeak}>
            {item?.weak ? <SecurityIcon style={{ color: '#ec1d24' }} /> : <SecurityIcon style={{ color: '#1dec77' }} />}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const RenderItem = ({ item, index, setEditObj }) => {
  const [visible, setVisible] = useState(false)
  const style = index % 2 !== 0 ? { background: 'rgba(232, 244, 255, 0.6)' } : {}
  const [anchorEl, setAnchorEl] = React.useState(null)

  const createdAt =
    differenceInDays(new Date(item?.createdAt), new Date()) >= 0
      ? differenceInDays(new Date(item?.createdAt), new Date())
      : differenceInDays(new Date(item?.createdAt), new Date()) * -1
  const updatedAt =
    differenceInDays(new Date(item?.updatedAt), new Date()) >= 0
      ? differenceInDays(new Date(item?.updatedAt), new Date())
      : differenceInDays(new Date(item?.updatedAt), new Date()) * -1

  const handleEditMode = () => {
    setEditObj({ edit: true, rowNumber: index })
  }
  const handleDeleteItem = () => {
    setEditObj({ edit: true, rowNumber: index })
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleFavoriteButton = () => {}
  const handleItemMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const hiddenPassword = () => {
    return item?.value?.length ? new Array(item?.value?.length + 1).join('\u25CF') : ''
  }

  return (
    <Grid container justifyContent='flex-start' alignItems='center' sx={style}>
      <Grid item xs={0.3}>
        <IconButton size='small' onClick={handleItemMenu}>
          <MoreVertIcon />
        </IconButton>
      </Grid>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <Grid container flexDirection='column' justifyContent='center' alignItems='flex-start'>
          <Grid item>
            <Button size='small' onClick={handleEditMode} sx={{ textTransform: 'none', fontSize: 12 }}>
              <Grid container flexDirection='row' justifyContent='flex-start' alignItems='center'>
                <Grid item style={{ paddingTop: '0.2em' }}>
                  <ModeEditIcon sx={{ width: '0.8em', height: '0.8em' }} />
                </Grid>
                <Grid item style={{ paddingLeft: '0.5em' }}>
                  <Typography>{i18n('pop_over_edit')}</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
          <Grid item>
            <Button size='small' onClick={handleEditMode} sx={{ textTransform: 'none', fontSize: 12, color: '#ec1d24' }}>
              <Grid container flexDirection='row' justifyContent='flex-start' alignItems='center'>
                <Grid item style={{ paddingTop: '0.2em' }}>
                  <RemoveCircleIcon sx={{ width: '0.8em', height: '0.8em' }} />
                </Grid>
                <Grid item style={{ paddingLeft: '0.5em' }}>
                  <Typography>{i18n('pop_over_delete')}</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </Popover>
      <Grid item xs={11.6}>
        <Grid container flexDirection='row' justifyContent='flex-start' alignItems='center'>
          <Grid item xs={0.3} className={classes.bodyDataItemNumber}>
            <Typography>{index + 1}</Typography>
          </Grid>
          <Grid item xs={1} className={classes.bodyDataItemFavorite}>
            <IconButton size='small' onClick={handleFavoriteButton}>
              {item?.favorite ? <StarIcon style={{ color: 'rgb(245 183 69)' }} /> : <StarOutlineIcon style={{ color: 'rgb(179 179 179)' }} />}
            </IconButton>
          </Grid>
          <Grid item xs={3} className={classes.bodyDataItemWebsite}>
            <Typography>{item?.websiteUrl}</Typography>
          </Grid>
          <Grid item xs={3} className={classes.bodyDataItePassword}>
            <Grid container flexDirection='row' justifyContent='flex-start' alignItems='center'>
              <Grid item>
                <Typography>{visible ? item?.value : hiddenPassword()}</Typography>
              </Grid>
              <Grid item>
                {visible ? (
                  <IconButton size='small' onClick={() => setVisible((prevState) => !prevState)}>
                    <VisibilityIcon sx={{ width: '0.8em', height: '0.8em' }} />
                  </IconButton>
                ) : (
                  <IconButton size='small' onClick={() => setVisible((prevState) => !prevState)}>
                    <VisibilityOffIcon sx={{ width: '0.8em', height: '0.8em' }} />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1.7} className={classes.bodyDataItemCreatedAt}>
            <Typography>{createdAt} days ago</Typography>
          </Grid>
          <Grid item xs={1.7} className={classes.bodyDataItemCreatedAt}>
            <Typography>{updatedAt} days ago</Typography>
          </Grid>
          <Grid item xs={1} className={classes.bodyDataItemWeak}>
            {item?.weak ? <SecurityIcon style={{ color: '#ec1d24' }} /> : <SecurityIcon style={{ color: '#1dec77' }} />}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export const Body = () => {
  const [getPassword] = useGetPasswordsMutation()
  const userId = useSelector(selectCurrentUserId)
  const passwords = useSelector(selectCurrentPasswords)
  const [editObj, setEditObj] = useState({ edit: false, rowNumber: -1 })

  const dispatch = useDispatch()

  useEffect(() => {
    const callGetPasswords = async () => {
      return getPassword(userId)
    }
    callGetPasswords().then((response) => {
      if (response.error) {
        console.error(response.error)
      } else {
        dispatch(setPasswords({ passwords: response.data }))
      }
    })
  }, [])

  const handleAddNewPassword = () => {
    dispatch(addNewPassword())
  }
  return (
    <Grid className={classes.bodyDataArea}>
      <Grid className={classes.bodyDataTable}>
        <RenderColumnsTitles handleAddNewPassword={handleAddNewPassword} />
        {passwords.map((password, index) => {
          return editObj.edit && index === editObj.rowNumber ? (
            <RenderEditItem key={`${index}-edit`} index={index} item={password} setEditObj={setEditObj} />
          ) : (
            <RenderItem key={index} index={index} item={password} setEditObj={setEditObj} />
          )
        })}
      </Grid>
    </Grid>
  )
}
