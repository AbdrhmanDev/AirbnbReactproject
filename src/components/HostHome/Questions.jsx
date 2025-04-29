import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqData = [
  {
    title: 'Top questions',
    content: [
      {
        question: 'Is my place right for Airbnb?',
        answer:
          'Airbnb guests are interested in all kinds of places––spare rooms, apartments, houses, vacation homes, even treehouses.',
      },
      {
        question: 'Do I have to host all the time?',
        answer:
          'Nope—you control your calendar. You can host once a year, a few nights a month, or more often.',
      },
      {
        question: 'What are Airbnb’s fees?',
        answer:
          'It’s free to create a listing, and Airbnb typically collects a service fee of 3% of the reservation subtotal once you get paid. In many areas, Airbnb automatically collects and pays sales and tourism taxes on your behalf. Learn more about fees.',
      },
    ],
  },
  {
    title: 'Hosting basics',
    content: [
      {
        question: 'How do I get started?',
        answer:
          'You can create a listing in just a few steps, all at your own pace. Start by telling us about your home, take some photos, and add details about what makes it unique. Start your listing.',
      },
      {
        question: 'How do I get my home ready for guests?',
        answer:
          'Make sure your home is clean, clutter-free, and that everything is working properly. Items like fresh linens and stocked toiletries help create a comfortable and inviting place to stay. Check out our guide to getting your home ready.',
      },
      {
        question: 'How am I protected when I host?',
        answer:
          'AirCover for Hosts provides top-to-bottom protection every time you host your home on Airbnb. Learn more about AirCover for Hosts and what’s included.',
      },
      {
        question: 'Any tips on being a great host?',
        answer:
          'From sharing a list of your favorite local places to responding quickly to guest messages, there are lots of ways to be an excellent host. Get more hosting tips.',
      },
    ],
  },
  {
    title: 'Policy & regulations',
    content: [
      {
        question: 'Are there any regulations that apply in my city?',
        answer:
          'Some areas have laws and regulations for hosting your home. It’s important to familiarize yourself with any laws that may apply to your location. Also, depending on where you live, you may need to check with your HOA, read your lease agreement, or notify your landlord or neighbors about your plans to host on Airbnb. Learn more about responsible hosting.',
      },
      {
        question: 'What if I have other questions?',
        answer:
          'Local hosts are a great source for information and insights. We can connect you with an experienced Airbnb host in your area who may be able to answer additional questions. Ask a host.',
      },
    ],
  },
  {
    title: 'Co-hosts',
    content: [
      {
        question: 'What can co‑hosts help with?',
        answer:
          'You can hire a co‑host to do one thing or everything. While each co‑host offers different services, they can help with things like setting up your Airbnb listing, getting your home ready, managing reservations and messages, cleaning and maintenance, and assisting with onsite requests your guests may have.',
      },
      {
        question: 'Can I find a co‑host on Airbnb?',
        answer:
          'Airbnb makes it easy to find and hire a high‑quality, local co‑host in the Airbnb app. Review, message, and choose the co‑host that best fits your needs. Learn about the Co‑Host Network.',
      },
      {
        question: 'How do I pay my co‑host?',
        answer:
          'You and your co‑host should agree on payment terms before they start helping you. You have the option to share a part of each booking’s payout with your co‑host directly through Airbnb. Some limitations may apply, depending on your location as well as the location of your listing and co‑host. Learn how co-host payouts work.',
      },
    ],
  },
];

const FAQSection = () => {
  return (
    <Box sx={{ backgroundColor: '#f7f7f7', py: 8, px: 3 }}>
      <Typography
  variant="h2"
  fontWeight="bold"
  textAlign="center"
  mb={6}
  sx={{ lineHeight: 1.2 }}
>
  Your questions,<br />answered
</Typography>

      <Box maxWidth="800px" mx="auto">
        {faqData.map((section, i) => (
          <Box key={i}>
            <Accordion sx={{ boxShadow: 'none', backgroundColor: '#f7f7f7' }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontSize={'1.2rem'}>{section.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {section.content.map((item, j) => (
                  <Box key={j} mb={3}>
                    <Typography fontWeight="bold" mb={0.5}>
                      {item.question}
                    </Typography>
                    <Typography color="text.secondary">{item.answer}</Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
            {i < faqData.length - 1 && <Divider sx={{ my: 2 }} />}
          </Box>
        ))}
      </Box>

      {/* Call to action */}
      <Box textAlign="center" mt={8}>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Still have questions?
        </Typography>
        <Typography color="text.secondary" mb={2}>
          Get answers from an experienced local host.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'black',
            color: 'white',
            borderRadius: '999px',
            px: 4,
            py: 1.5,
            '&:hover': { backgroundColor: '#333' },
          }}
        >
          Ask a host
        </Button>
      </Box>
    </Box>
  );
};

export default FAQSection;
