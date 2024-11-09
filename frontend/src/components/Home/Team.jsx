import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const teamMembers = [
    {
        name: 'Miguel Angelo Bondad',
        position: 'Web Developer | Mathematical Modeling',
        school: 'University of the Philippines - Diliman',
        description: 'I am currently an undergraduate student at the University of the Philippines Diliman. I am working in the System Modeling and Simulation Laboratory for my thesis, with the topic of Environmental Surveillance. I am interested in the application of AI techniques, particularly using models to analyze data and gain insights, as well as exploring how machine learning and simulation can be leveraged in practical, data-driven environments.',
        image: '/Miguel.jpg'
    },
    {
        name: 'Jacob Maximus L. Usaraga',
        position: 'Web Developer | Data Scientist',
        school: 'University of the Philippines - Visayas',
        description: 'I am an applied mathematics student. I love doing data science, especially machine learning. I love building websites!',
        image: '/Jacob.jpg'
    },
    {
        name: 'Fr. Mario Dimapilis',
        position: 'Domain Expert | Public Health',
        school: 'De la Salle Medical and Health Sciences Institute',
        description: 'I have been a Registered Nurse for more than 30 years with a Master in Public Health. Currently, I am a student of PhD in Health Sciences (Research) at De La Salle Medical and Health Sciences Institute. I am also a Senior Nursing Clinical Instructor in the Department of Nursing of St. Anthony’s College in Antique, Philippines. I am interested in using generative AI in enhancing community participation and engagement in community health promotion programs like dengue management and hypertension among adults. I have also been a missionary Catholic priest for more than two decades with mission experiences in Kenya and in the Philippines.',
        image: '/Mario.png'
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
        <Box className = "p-8 md:p-20 flex flex-col !align-middle !justify-center items-center mt-8">
            <Typography variant="h4" component="div" gutterBottom className="text-center text-gray-800 mb-4">
                Meet the Team
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-10"> {/* Reduced spacing from 4 to 2 */}
                {teamMembers.map((member, index) => (
                    <div className='my-4 md:mx-4' key={index}>
                        <div className="border rounded-md overflow-hidden max-md:max-w-[300px]">
                        <img src={member.image} className="w-full h-60 object-contain object-top bg-gray-200" />

                        <div className="p-4">
                            <h4 className="text-gray-800 text-base font-bold">{member.name}</h4>
                            <p className="text-gray-600 text-xs mt-1">{member.school}</p>
                            <p className="text-gray-600 text-xs mt-1">{member.position}</p>
                            <div className="mt-4">
                                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                            </div>

                            <div className="space-x-4 mt-4">
                                <button type="button"
                                    className="w-7 h-7 inline-flex items-center justify-center rounded-full border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 155.139 155.139">
                                        <path
                                            d="M89.584 155.139V84.378h23.742l3.562-27.585H89.584V39.184c0-7.984 2.208-13.425 13.67-13.425l14.595-.006V1.08C115.325.752 106.661 0 96.577 0 75.52 0 61.104 12.853 61.104 36.452v20.341H37.29v27.585h23.814v70.761h28.48z"
                                            data-original="#010002" />
                                    </svg>
                                </button>
                                <button type="button"
                                    className="w-7 h-7 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#03a9f4] hover:bg-[#03a1f4] active:bg-[#03a9f4]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 512 512">
                                        <path
                                            d="M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z"
                                            data-original="#03a9f4" />
                                    </svg>
                                </button>
                                <button type="button"
                                    className="w-7 h-7 inline-flex items-center justify-center rounded-full border-none outline-none bg-[#0077b5] hover:bg-[#0055b5] active:bg-[#0077b5]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#fff" viewBox="0 0 24 24">
                                        <path
                                            d="M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 0 0 2.882 0z"
                                            data-original="#0077b5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
        </Box>
    );
}
