import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OpenInNewSharpIcon from '@mui/icons-material/OpenInNewSharp';
import { format } from 'date-fns';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

// eslint-disable-next-line react/prop-types
export default function NewsCard({ title, summary, link, source, image, pub_date, description }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // Format the publication date
    const formattedDate = format(new Date(pub_date), 'MMMM dd, yyyy');

    return (
        <Card
            sx={{
                maxWidth: 345,
                minHeight: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 3,
                borderRadius: 2,
            }}
            className='!bg-blue-200 static'
        >
            <CardHeader
                title={<Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>{title}</Typography>}
                subheader={<Typography variant="caption" sx={{ color: 'gray' }}>{formattedDate}</Typography>}
            />
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt={title}
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {description}
                </Typography>
                <Typography variant="caption" sx={{ color: 'gray', marginTop: 1 }}>
                    Source: {source}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="open-link">
                    <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <OpenInNewSharpIcon sx={{ '&:hover': { color: 'primary.main' } }} />
                    </a>
                </IconButton>
            </CardActions>
            <CardActions disableSpacing>
                <p>ChatGPT Summary</p>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography>
                        {summary}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
