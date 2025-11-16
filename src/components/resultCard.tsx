import {Card, CardActionArea, CardContent, Typography, CardActions, IconButton} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface ResultCardProps {
    title: string;
    description: string;
}

function ResultCard({title, description}: ResultCardProps) {
    return (
        <Card sx={{ width: 345,  }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton>
                    <FavoriteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default ResultCard