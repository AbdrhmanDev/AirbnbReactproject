import { Box } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
}
export default function ImagePar() {
    const images = [
        'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1312735387230913419/original/940e47a3-8a44-4593-96cf-6a44790502f0.jpeg',
        'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1312735387230913419/original/3edc3861-5447-4a63-a968-aa7a39edc390.jpeg',
        'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1312735387230913419/original/0cf04998-8784-4d28-8d1b-d2e7131898cd.jpeg',
        'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1312735387230913419/original/89eade4a-2d75-469c-a624-4c1644933721.jpeg',
        'https://a0.muscache.com/im/pictures/prohost-api/Hosting-1312735387230913419/original/08ff8f94-4f70-4312-8924-3312987674b8.jpeg',
    ];

    const itemData = [
        { img: images[0], title: 'Sea View', rows: 2, cols: 2 },
        { img: images[1], title: 'Living Room' },
        { img: images[2], title: 'Kitchen' },
        { img: images[3], title: 'Bedroom' },
        { img: images[4], title: 'Balcony' },
    ];

    return (
        <Box p={3}>
        <ImageList variant="quilted" cols={4} rowHeight={121}>
            {itemData.map((item) => (
                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                    <img
                        {...srcset(item.img, 121, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                        style={{ borderRadius: '12px', width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    </Box>
    )
}
