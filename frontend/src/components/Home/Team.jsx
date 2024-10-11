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
        description: 'John is a software engineer with a passion for AI and machine learning.',
        image: 'https://scontent.fceb1-4.fna.fbcdn.net/v/t39.30808-6/346282939_2104816486394416_807033072443840265_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF5JQLXwuF52V0wkJXXve7RQbhFh1CDXrdBuEWHUINet04FTs-Nsf-RKd2KLQQIRKDIALbEWasDkPz5kLsx4ro9&_nc_ohc=pznISB4qZAwQ7kNvgHgXB9s&_nc_zt=23&_nc_ht=scontent.fceb1-4.fna&_nc_gid=ANFIK_3owqZ6t5cNHEyjbCa&oh=00_AYDPkI6prdbfn63Kyb0kkgmdB4P7PG_ah-oxMDXyTHrWDA&oe=670F5A68'
    },
    {
        name: 'Jacob Maximus L. Usaraga',
        position: 'Member',
        school: 'University of the Philippines - Visayas',
        description: 'Jane specializes in data science and has a background in bioinformatics.',
        image: 'https://scontent.fceb1-1.fna.fbcdn.net/v/t39.30808-6/449295418_2242133129505403_8506786999160777870_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGw79wGzUwBTs9CZx5tSBIEK2m5gNXRRLorabmA1dFEunQmcBGDDFUdckLfW8DLhOIPVjPf_zmhe8A6PNLBJFUQ&_nc_ohc=ZSNut0eW_ZcQ7kNvgHKVhes&_nc_zt=23&_nc_ht=scontent.fceb1-1.fna&_nc_gid=Az41anw6K0FZUewavpAYc6C&oh=00_AYAYmcH8b-mWXCpiAxhkQqwlRL2ymqkw12zdprpeXCtXHg&oe=670F41B6'
    },
    {
        name: 'Fr. Mario Dimapilis',
        position: 'Member',
        school: 'De la Salle University',
        description: 'Alice is an expert in cloud computing and distributed systems.',
        image: 'https://scontent.fceb1-5.fna.fbcdn.net/v/t39.30808-6/357770442_10229950472123501_4384234892971185512_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGgF3ZpJDVKWncjBvG9vp15-dJKOfiGdnX50ko5-IZ2dfQpfIwdmCedO-O-8KBv4rp_d5JvXCsybmB7cPHaPSLa&_nc_ohc=KLm0V2jlz0UQ7kNvgFmaO6w&_nc_zt=23&_nc_ht=scontent.fceb1-5.fna&_nc_gid=ADBmq4MyLKlnNynqThVpZXk&oh=00_AYDRK2BUwLuEcZHMJ6Er6-sWMPOb1C9GV4xluETKCY5Txw&oe=670F62A6'
    },
    {
        name: 'Dr. Pearl Bongolan',
        position: 'Mentor',
        school: 'University of the Philippines - Diliman',
        description: 'Dr. Pearl is a data scientist with a focus on natural language processing.',
    }
];

export default function MeetTheTeam() {
    return (
        <Box sx={{ flexGrow: 1, p: 4, backgroundColor: 'rgba(240, 240, 240, 0.8)', borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h4" component="div" gutterBottom className="text-center text-gray-800 mb-4">
                Meet the Team
            </Typography>
            <Grid container spacing={4} justifyContent="center">
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