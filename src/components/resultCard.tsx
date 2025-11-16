import {Card, CardContent, Typography, CardActions} from '@mui/material';

interface ResultCardProps {
    title: string;
    description: string;
}

function ResultCard({title, description}: ResultCardProps) {
    return (
        <Card variant="outlined" sx={{ width: 345}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {description}
                    </Typography>
                </CardContent>
            <CardActions>
                {/*<IconButton>*/}
                {/*    <FavoriteIcon />*/}
                {/*</IconButton>*/}
            </CardActions>
        </Card>
    );
}

export default ResultCard