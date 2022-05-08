import React, { Component } from 'react'
import './App.css';
import axios from 'axios' 
// components
import UserTable from './components/Table'
import Posts from './components/Posts'
import Profile from './components/Profile'
// material-ui imports
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';




class Main extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       users: [],
       admin: [],
       adminPosts: [],
       right: false,
       drawerFlag: null,
       adminName: '',
	   initial: ''
      //  clickedUserId: null,
      //  profileInfo: [],
      //  posts: [],
      //  profName: '',
      //  right: false,
      //  drawerFlag: false,
    }
  }

	componentDidMount() {
		axios.get('https://jsonplaceholder.typicode.com/users')
			.then(response => {
				this.setState({users: response.data})
			})
			.catch(error => {
				console.log(error)
			})
		// acting admin account
		axios.get('https://jsonplaceholder.typicode.com/users?id=1')
		.then(response => {
			this.setState({admin: response.data})
			this.setState({adminName: response.data[0].name})
			this.getInitials();
		})
		.catch(error => {
			console.log(error)
		})
		axios.get('https://jsonplaceholder.typicode.com/posts?userId=1')
		.then(response => {
			this.setState({adminPosts: response.data})
		})
		.catch(error => {
			console.log(error)
		})
		
	}

	toggleDrawer(flag, event, flagDrawer ) {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		
		this.setState({drawerFlag: flagDrawer});
		this.setState({right: flag});
	}

	getInitials() {
		const fullName = this.state.adminName.split(' ');
		const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
		this.setState({initial: initials})
	}

  render() {
    const { users, right, drawerFlag, admin, adminPosts, adminName, initial} = this.state
	
    return (
      <div>
		<AppBar position="static">
			<Toolbar>
				<Avatar sx={{ bgcolor: red[500], width: 40, height: 40}}>{ initial }</Avatar>
				<Typography variant="h6" color="inherit" component="div">
					&nbsp; Hello, {adminName}
				</Typography>
			</Toolbar>
      </AppBar>
        <Drawer
		anchor="right"
		open={right}
		onClose={(evt) => this.toggleDrawer(false, evt)}>
				{ drawerFlag &&
					<div>
						<IconButton sx={{ display: 'flex', justifyContent: 'flex-end' }}aria-label="close" onClick={(evt) => this.toggleDrawer(false, evt, true)}>
							<CloseIcon />
						</IconButton>
						<Profile profile={admin}/>
					</div>
				}
				{ !drawerFlag &&
					<div>
						<IconButton sx={{ display: 'flex', justifyContent: 'flex-end' }}aria-label="close" onClick={(evt) => this.toggleDrawer(false, evt, false)}>
							<CloseIcon />
						</IconButton>
						<Posts posts={adminPosts} name={adminName}/>
					</div>
				}
          </Drawer>
          <div className="sidebar">
              <Button className="btnLink" onClick={(evt) => this.toggleDrawer(true, evt, true)}>Profile</Button>
              <Button className="btnLink" onClick={(evt) => this.toggleDrawer(true, evt, false)}>Post</Button>
          </div>
          <div className="row">
              <div className="column middle">
			  <UserTable userList={users}/>
              </div>
          </div>
      </div>
    )
  }
}

export default Main