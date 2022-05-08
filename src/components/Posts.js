import React, { Component } from 'react'
// material ui imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';

class Posts extends Component {

    get getInitials() {
        const fullName = this.props.name.split(' ');
        const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
        return initials;
    }

    get random() {
        const min = Math.ceil(1);
        const max = Math.floor(10);
        const days = Math.floor(Math.random() * (max - min + 1)) + min;
        return days;
    }

    render() {
        return (
            <div>
                <h1 className="profHeader">Posts</h1>
               {this.props.name !== '' &&
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="icon">
                                {this.getInitials}
                            </Avatar>} 
                    title={this.props.name}/>
                }
                {this.props.posts.map((post, index) => {
                    return <Card key={post.id} sx={{ maxWidth: 375 }}>
                    <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {this.random} days ago
                    </Typography>
                    <Typography variant="h5" component="div">
                        {post.title}
                    </Typography>
                    <Typography variant="body2">
                        {post.body}
                        <br />
                    </Typography>
                    </CardContent>
                    </Card>
                    })
                }
             </div>
        )
    }
}
export default Posts