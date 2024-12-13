// FeaturedPost.js
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Hidden from '@mui/material/Hidden';

export default function FeaturedPost(props) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href={post.link}>
        <Card sx={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {post.date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Read more...
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia
              component="img"
              sx={{ width: 160 }}
              image={post.image}
              alt={post.imageText}
              title={post.imageText}
            />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};