import axios from 'axios'
import { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { alpha, InputBase, Menu, styled } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { emailValidator, passwordValidator } from './utils/validators'

const Home = () => {
  const fetchImgFromUnsplash = async (params) => {
    const baseUrl = 'https://api.unsplash.com/photos'
    const accessKey = 'te4K-n4zfDdCgjhap7l-BOP3uihwJPvLBtDM03j7xTA'
    const response = await axios.get(`${baseUrl}/${params?.resolution}/?query=${params?.queryValue}&client_id=${accessKey}`)
  }
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const [searchValue, setSearchValue] = useState('')

  return (
    <div style={{ minHeight: '100vh', background: 'paleturquoise' }}>
      <div
        style={{
          width: '2rem',
          height: '2rem',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '1rem',
          transition: 'all 1s easeIn',
          '&:hover': {
            background: '#b3b3b378'
          }
        }}
        onClick={handleClick}
      >
        <MoreVertIcon
          style={{
            color: '#606060',
            width: '1.2em',
            height: '1.5em'
          }}
        />
      </div>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <SearchInput setSearchValue={setSearchValue} />
      </Menu>
    </div>
  )
}

const SearchInput = (props) => {
  const [query, setQuery] = useState('')

  useEffect(() => {
    props.setSearchValue(query)
  }, [query])

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.15)
    },
    marginLeft: 0,
    marginRight: '0.5em',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  }))

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }))

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0), // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch'
        }
      }
    }
  }))

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
    </Search>
  )
}

const validations = (password, email) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [emailError, setEmailError] = useState({ error: false })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [passwordError, setPasswordError] = useState({ error: false })
  const validationPassword = passwordValidator(password)
  const validationEmail = emailValidator(email)
  let valid = true
  if (validationPassword.error) {
    setPasswordError(validationPassword)
    valid = false
  } else {
    setPasswordError({ error: false })
  }
  if (validationEmail.error) {
    setEmailError(validationEmail)
    valid = false
  } else {
    setEmailError({ error: false })
  }
  return valid
}
