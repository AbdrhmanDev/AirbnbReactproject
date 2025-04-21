import React, { useState } from 'react';
import {
    Container,
    Typography,
    Breadcrumbs,
    Link,
    Box,
    Alert,
    Button,
    Tabs,
    Tab,
    Divider,
    Stack,
    Checkbox,
    FormControlLabel,
} from '@mui/material';

const Notifications = () => {
    const [tab, setTab] = useState(0);
    const [unsubscribeAll, setUnsubscribeAll] = useState(false);

    const handleTabChange = (event, newValue) => setTab(newValue);

    const renderSettingItem = (title, status) => (
        <Box sx={{ mb: 2 }}>
            <Typography fontWeight={400} fontSize={"15px"}>{title}</Typography>
            <Typography variant="body2" color="text.secondary">
                On: {status}
            </Typography>
            <Link href="#" underline="" color='black' sx={{ fontSize: 14 }}>
                Edit
            </Link>
        </Box>
    );

    const renderSection = (heading, description, items) => (
        <Box sx={{ mb: 1, p: 3, bgcolor: 'background.paper', borderRadius: 1 }}>
           
            <Typography variant="title1" fontSize={"25PX"}  fontWeight="semibold" gutterBottom>
                {heading}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {description}
            </Typography>
            <Stack spacing={2}>
                {items.map((item, idx) => (
                    <Box key={idx}>{renderSettingItem(item.title, item.status)}</Box>
                ))}
            </Stack>
            <Divider sx={{ mt: 1 }} />
        </Box>
    );

    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            {/* Breadcrumb */}
            <Breadcrumbs sx={{ mb: 2 }}>
                <Link underline="hover" color="inherit" href="/account">
                    Account
                </Link>
                <Typography color="text.primary">Notifications</Typography>
            </Breadcrumbs>

            {/* Page Title */}
            <Typography variant="h5" gutterBottom>
                Notifications
            </Typography>

            {/* Tabs */}
            <Tabs
               value={tab}
               onChange={handleTabChange}
               indicatorColor="primary"
               textColor="inherit"
               variant="fullWidth"
               sx={{ mb: 3, bgcolor: 'white', color: 'black', borderRadius: 1, '& .MuiTabs-indicator': { backgroundColor: 'black' } }}
             >
                <Tab label="Offers and updates" />
                <Tab label="Account" />
            </Tabs>

            {/* Offers and updates tab */}
            {tab === 0 && (
                <>
                    {renderSection('Travel tips and offers', 'Inspire your next trip with personalized recommendations and special offers.', [
                        { title: 'Inspiration and offers', status: 'Email and SMS' },
                        { title: 'Trip planning', status: 'Email and SMS' },
                    ])}
                    {renderSection('Airbnb updates', 'Stay up to date on the latest news from Airbnb, and let us know how we can improve.', [
                        { title: 'News and programs', status: 'Email and SMS' },
                        { title: 'Feedback', status: 'Email and SMS' },
                        { title: 'Travel regulations', status: 'Email and SMS' },
                    ])}
                </>
            )}

            {/* Account tab */}
            {tab === 1 && (
                <>
                    {renderSection('Account activity and policies', 'Confirm your booking and account activity, and learn about important Airbnb policies.', [
                        { title: 'Account activity', status: 'Email' },
                        { title: 'Guest policies', status: 'Email' },
                    ])}
                    {renderSection('Reminders', 'Get important reminders about your reservations, listings, and account activity.', [
                        { title: 'Reminders', status: 'Email' },
                    ])}
                    {renderSection('Guest and Host messages', 'Keep in touch with your Host or guests before and during your trip.', [
                        { title: 'Messages', status: 'Email' },
                    ])}
                </>
            )}

            {/* Unsubscribe checkbox (offers & updates tab only) */}
            {tab === 0 && (
                <Box sx={{ mt: 4 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={unsubscribeAll}
                                onChange={(e) => setUnsubscribeAll(e.target.checked)}
                            />
                        }
                        label="Unsubscribe from all marketing emails"
                    />
                </Box>
            )}

            {/* Footer Note */}
            <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block' }}>
                By opting in to text messages, you agree to receive automated marketing messages from Airbnb at mobile number. To receive messages at a different number,&nbsp;
                <Link href="#" underline="" color='black'>
                    update your phone number settings
                </Link>
                &nbsp;on your personal info page.
            </Typography>
        </Container>
    );
};

export default Notifications;
