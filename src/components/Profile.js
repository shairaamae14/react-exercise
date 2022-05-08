import React, { Component } from 'react'
// material ui imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import EmailIcon from '@mui/icons-material/Email';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import LanguageIcon from '@mui/icons-material/Language';
import WorkIcon from '@mui/icons-material/Work';
import Divider from '@mui/material/Divider';

class Profile extends Component {
  render() {
    return (
      <div>
           <h1 className="profHeader">Profile</h1>
            {this.props.profile.map((user, index) => {
                const fullName = user.name.split(' ');
                const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);

                const fullAddress = user.address.street+','+user.address.suite+','+user.address.city+','+user.address.zipcode;
                 return <Card key={user.id} sx={{ maxWidth: 500, minHeight: 800 }}>
                    <CardContent>
                        <CardHeader
                            avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="icon">
                                {initials}
                            </Avatar>}
                            title={user.name}
                            subheader={user.username}/>
                                <List
                                    sx={{
                                        width: '100%',
                                        maxWidth: 360,
                                        bgcolor: 'background.paper',
                                    }}>
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <EmailIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Email" secondary={user.email} />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <EmailIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Address" secondary={fullAddress} />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <ContactPhoneIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Phone" secondary={user.phone} />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <LanguageIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Website" secondary={user.website} />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem>
                                        <ListItemAvatar>
                                        <Avatar>
                                            <WorkIcon />
                                        </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Company Name" secondary={user.company.name} />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </List>
                    </CardContent>
                </Card>
            })}
      </div>
    )
  }
}

export default Profile