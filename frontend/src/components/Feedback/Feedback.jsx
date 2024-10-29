import { useEffect, useState } from 'react';
import { Button, TextField, Typography, Paper, Container } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material'; // Import icon for button

export default function Feedback({handleTabChange}) {
    const [feedback, setFeedback] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
        return emailRegex.test(email);
    };

    const validateContactNumber = (contactNumber) => {
        const contactNumberRegex = /^09\d{9}$/; // Regex for contact number format 09xxxxxxxxx
        return contactNumberRegex.test(contactNumber);
    };
    useEffect(() => {
    handleTabChange("Feedback");
    }, [handleTabChange]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset any previous error

        // Validate email and contact number
        if (email && !validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (contactNumber && !validateContactNumber(contactNumber)) {
            setError('Contact number must be in the format 09xxxxxxxxx.');
            return;
        }

        // Create the feedback object
        const feedbackData = {
            feedback,
            email: email || undefined, // Set to undefined if empty
            name: name || undefined,     // Set to undefined if empty
            contact_number: contactNumber || undefined, // Set to undefined if empty
        };

        try {
            const response = await fetch('https://dengue-watch-backend-f59b9593b035.herokuapp.com/feedback/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedbackData), // Send feedback in the correct format
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to submit feedback');
            }

            setFeedback(''); // Clear feedback input after submission
            setEmail('');    // Clear email input after submission
            setName('');     // Clear name input after submission
            setContactNumber(''); // Clear contact number input after submission
            setSubmitted(true); // Set submitted state to true
        } catch (error) {
            console.error('Error:', error);
            setError('There was an error submitting your feedback. Please try again.');
        }
    };

    const handleNewFeedback = () => {
        setSubmitted(false); // Reset submitted state to show the feedback form again
    };

    return (
        <Container
            maxWidth="sm"
            className="my-8"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Full viewport height for vertical centering
            }}
        >
            <Paper elevation={3} className="p-6 rounded-lg shadow-lg bg-[#f0f4f8]">
                <Typography variant="h5" component="h2" className="text-center font-bold mb-4">
                    Your Voice Matters
                </Typography>
                <Typography variant="body1" className="text-center mb-4">
                    Since this is a website designed to remove the barrier between science and the community, we would like to ask for your feedback to improve this project.
                </Typography>

                {submitted ? (
                    <>
                        <Typography variant="body1" className="text-center text-green-600 font-semibold">
                            Thank you for your feedback!
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleNewFeedback} // Call the handler to reset state
                            sx={{
                                marginTop: 2,
                                padding: '10px',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#1976d2', // Darker shade on hover
                                },
                            }}
                        >
                            Submit Another Feedback
                        </Button>
                    </>
                ) : (
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
                                backgroundColor: 'white', // Set background color for input
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
                                backgroundColor: 'white', // Set background color for input
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
                                backgroundColor: 'white', // Set background color for input
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
                                backgroundColor: 'white', // Set background color for input
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
                            startIcon={<SendIcon />} // Add send icon to button
                            sx={{
                                padding: '10px',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#1976d2', // Darker shade on hover
                                },
                            }}
                        >
                            Submit Feedback
                        </Button>
                    </form>
                )}
            </Paper>
        </Container>
    );
}
