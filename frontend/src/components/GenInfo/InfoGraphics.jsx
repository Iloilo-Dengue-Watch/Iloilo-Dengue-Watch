import { Container, Typography, Box, Paper, Link, Grid } from '@mui/material';

export function InfoGraphics() {
    return (
        <Container maxWidth="lg" sx={{ my: 8 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: '12px', backgroundColor: '#f9f9f9' }}>
                {/* Title */}
                <Typography variant="h4" component="h1" align="center" color="text.primary" sx={{ mb: 4 }}>
                    What You Can Do!
                </Typography>

                {/* Description */}
                <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4, lineHeight: 1.5 }}>
                    We curated infographics from the internet to show what you can do to prevent and help stop the spread of dengue.
                </Typography>
                <Typography align="center" color="text.secondary">
                    You can also submit a feedback form to improve the website and its contents in the{' '}
                    <Link href="/feedback" color="primary" underline="hover">
                        Feedback Tab
                    </Link>
                    .
                </Typography>

                {/* Infographics */}
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    {/* First Infographic */}
                    <Grid item xs={12} sm={6}>
                        <Box>
                            <img
                                src="https://i.pinimg.com/originals/a5/88/ce/a588ce48671630e9ad11053c028db966.png"
                                alt="Dengue Prevention Infographic"
                                style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Typography variant="caption" align="center" color="text.secondary" sx={{ mt: 1 }}>
                                Source:
                                <Link
                                    href="https://i.pinimg.com/originals/a5/88/ce/a588ce48671630e9ad11053c028db966.png"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ ml: 1, color: 'primary.main', textDecoration: 'underline' }}
                                >
                                    SESC
                                </Link>
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Second Infographic */}
                    <Grid item xs={12} sm={6}>
                        <Box>
                            <img
                                src="https://i.pinimg.com/originals/a0/88/86/a0888617d4e9a355219ab28c4c85522c.png"
                                alt="Dengue Spread Prevention Infographic"
                                style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Typography variant="caption" align="center" color="text.secondary" sx={{ mt: 1 }}>
                                Source:
                                <Link
                                    href="https://i.pinimg.com/originals/a0/88/86/a0888617d4e9a355219ab28c4c85522c.png"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ ml: 1, color: 'primary.main', textDecoration: 'underline' }}
                                >
                                    Prashanth Hospital
                                </Link>
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
