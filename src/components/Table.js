import React, { Component } from 'react'
import axios from 'axios' 
import Posts from './Posts'
import Profile from './Profile'

// material ui imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';;



class UserTable extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         clickedUserId: null,
         profileInfo: [],
         posts: [],
         profName: '',
         right: false,
         drawerFlag: false,
      }
    }

    handlePost(id) {
        this.setState({clickedUserId: id})
        this.handleProfile(id, true);
        axios.get('https://jsonplaceholder.typicode.com/posts', {
                params : {
                     userId : id
                   }
        })
        .then(response => {
            this.setState({posts: response.data})
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleProfile(id, flag) {
        this.setState({clickedUserId: id})
        axios.get('https://jsonplaceholder.typicode.com/users', {
            params : {
                 id : id
               }
        })
        .then(response => {
            this.setState({profileInfo: response.data})
            if (flag) {
                this.setState({profName: response.data[0].name});
            }
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

    render() {
        const {profileInfo, posts, profName, right, drawerFlag} = this.state
        return (
            <div>
                <TableContainer id="tableUser" component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Username</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Phone</TableCell>
                        <TableCell align="right">Website</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.userList.map((user) => (
                        <TableRow
                            key={user.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            {user.name}
                            </TableCell>
                            <TableCell align="right">{user.username}</TableCell>
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="right">{user.phone}</TableCell>
                            <TableCell align="right">{user.website}</TableCell>
                            <TableCell align="right">
                            <Button variant="contained" onClick={(evt) => {this.handleProfile(user.id, false); this.toggleDrawer(true, evt, true);}}>View Profile</Button>
                            </TableCell>
                            <TableCell align="right">
                            <Button variant="contained" onClick={(evt) => {this.handlePost(user.id); this.toggleDrawer(true, evt, false);}}>View Post</Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                <Drawer
                anchor="right"
                open={right}
                onClose={(evt) => this.toggleDrawer(false, evt)}>
                    { drawerFlag &&
                    <div>
                        <IconButton sx={{ display: 'flex', justifyContent: 'flex-end' }}aria-label="close" onClick={(evt) => this.toggleDrawer(false, evt, true)}>
                            <CloseIcon />
                        </IconButton>
                            <Profile profile={profileInfo}/>
                    </div>
                    }
                    { !drawerFlag &&
                    <div>
                        <IconButton sx={{ display: 'flex', justifyContent: 'flex-end' }}aria-label="close" onClick={(evt) => this.toggleDrawer(false, evt, true)}>
                            <CloseIcon />
                        </IconButton>
                            <Posts posts={posts} name={profName}/>
                    </div>
                    }
                </Drawer>
            </div>
        )
    }
}

export default UserTable