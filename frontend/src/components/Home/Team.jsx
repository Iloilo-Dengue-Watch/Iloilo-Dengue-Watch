import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const teamMembers = [
    {
        name: 'Miguel Angelo Bondad',
        position: 'Member',
        school: 'University of the Philippines - Diliman',
        description: 'I am currently an undergraduate student at the University of the Philippines Diliman. I am working in the System Modeling and Simulation Laboratory for my thesis, with the topic of Environmental Surveillance. I am interested in the application of AI techniques, particularly using models to analyze data and gain insights, as well as exploring how machine learning and simulation can be leveraged in practical, data-driven environments.',
        image: '/Miguel.jpg'
    },
    {
        name: 'Jacob Maximus L. Usaraga',
        position: 'Member',
        school: 'University of the Philippines - Visayas',
        description: 'I am an applied mathematics student. I love doing data science, especially machine learning. I love building websites!',
        image: '/Jacob.jpg'
    },
    {
        name: 'Fr. Mario Dimapilis',
        position: 'Member',
        school: 'De la Salle Medical and Health Sciences Institute',
        description: 'I have been a Registered Nurse for more than 30 years with a Master in Public Health. Currently, I am a student of PhD in Health Sciences (Research) at De La Salle Medical and Health Sciences Institute. I am also a Senior Nursing Clinical Instructor in the Department of Nursing of St. Anthony’s College in Antique, Philippines. I am interested in using generative AI in enhancing community participation and engagement in community health promotion programs like dengue management and hypertension among adults. I have also been a missionary Catholic priest for more than two decades with mission experiences in Kenya and in the Philippines.',
        image: 'https://scontent.fceb1-5.fna.fbcdn.net/v/t39.30808-6/357770442_10229950472123501_4384234892971185512_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGgF3ZpJDVKWncjBvG9vp15-dJKOfiGdnX50ko5-IZ2dfQpfIwdmCedO-O-8KBv4rp_d5JvXCsybmB7cPHaPSLa&_nc_ohc=KLm0V2jlz0UQ7kNvgFmaO6w&_nc_zt=23&_nc_ht=scontent.fceb1-5.fna&_nc_gid=ADBmq4MyLKlnNynqThVpZXk&oh=00_AYDRK2BUwLuEcZHMJ6Er6-sWMPOb1C9GV4xluETKCY5Txw&oe=670F62A6'
    },
    //{
      //  name: 'Dr. Pearl Bongolan',
        //position: 'Mentor',
       // school: 'University of the Philippines - Diliman',
       // description: 'Dr. Pearl is a data scientist with a focus on natural language processing.',
    //}
];

export default function MeetTheTeam() {
    return (
        <Box sx={{ flexGrow: 1, p: 8 }}>
            <Typography variant="h4" component="div" gutterBottom className="text-center text-gray-800 mb-4">
                Meet the Team
            </Typography>
            <Grid container spacing={2} justifyContent="center"> {/* Reduced spacing from 4 to 2 */}
                {teamMembers.map((member, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ maxWidth: 345, minHeight: 400, backgroundColor: 'white', boxShadow: 3, borderRadius: 2 }}>
                            <CardContent className="text-center">
                                <Avatar
                                    alt={member.name}
                                    src={member.image}
                                    sx={{ width: 100, height: 100, margin: '0 auto 16px auto' }}
                                />
                                <Typography variant="h6" component="div" className="text-gray-800">
                                    {member.name}
                                </Typography>
                                <Typography variant="h7" component="div" className="!font-bold">
                                    {member.position}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {member.school}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" mt={2}>
                                    {member.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
