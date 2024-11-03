import { useEffect, useState } from 'react';
import { Button, TextField, Typography, Paper, Container, Collapse } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

export default function Feedback({ handleTabChange }) {
    const [feedback, setFeedback] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(true); // State to control collapse

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateContactNumber = (contactNumber) => {
        const contactNumberRegex = /^09\d{9}$/;
        return contactNumberRegex.test(contactNumber);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (email && !validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (contactNumber && !validateContactNumber(contactNumber)) {
            setError('Contact number must be in the format 09xxxxxxxxx.');
            return;
        }

        const feedbackData = {
            feedback,
            email: email || undefined,
            name: name || undefined,
            contact_number: contactNumber || undefined,
        };

        try {
            const response = await fetch('https://dengue-watch-backend-f59b9593b035.herokuapp.com/feedback/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedbackData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to submit feedback');
            }

            setFeedback('');
            setEmail('');
            setName('');
            setContactNumber('');
            setSubmitted(true);
            setIsOpen(false); // Collapse the form on submit
        } catch (error) {
            console.error('Error:', error);
            setError('There was an error submitting your feedback. Please try again.');
        }
    };

    const handleNewFeedback = () => {
        setSubmitted(false);
        setIsOpen(true); // Reopen the form when starting new feedback
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} className="p-6 rounded-lg shadow-lg bg-[#f0f4f8]">
                <Typography variant="h5" component="h2" className="text-center font-bold mb-4">
                    Your Voice Matters
                </Typography>
                <Typography variant="body1" className="text-center mb-4">
                    Since this is a website designed to remove the barrier between science and the community, we would like to ask for your feedback to improve this project.
                </Typography>

                <Collapse in={!submitted || isOpen}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Your Feedback"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            required
                            sx={{
                                marginBottom: 2,
                                backgroundColor: 'white',
                                borderRadius: '8px',
                            }}
                        />
                        <TextField
                            label="Your Email (optional)"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{
                                marginBottom: 2,
                                backgroundColor: 'white',
                                borderRadius: '8px',
                            }}
                        />
                        <TextField
                            label="Your Name (optional)"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{
                                marginBottom: 2,
                                backgroundColor: 'white',
                                borderRadius: '8px',
                            }}
                        />
                        <TextField
                            label="Your Contact Number (optional)"
                            variant="outlined"
                            fullWidth
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            sx={{
                                marginBottom: 2,
                                backgroundColor: 'white',
                                borderRadius: '8px',
                            }}
                        />
                        {error && (
                            <Typography variant="body2" className="text-red-600 mb-2">
                                {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            startIcon={<SendIcon />}
                            sx={{
                                padding: '10px',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#1976d2',
                                },
                            }}
                        >
                            Submit Feedback
                        </Button>
                    </form>
                </Collapse>

                {submitted && !isOpen && (
                    <>
                        <Typography variant="body1" className="text-center text-green-600 font-semibold mt-4">
                            Thank you for your feedback!
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleNewFeedback}
                            sx={{
                                marginTop: 2,
                                padding: '10px',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#1976d2',
                                },
                            }}
                        >
                            Submit Another Feedback
                        </Button>
                    </>
                )}
            </Paper>
        </Container>
    );
}
